import { useState } from 'react'
import { moduleById } from '@/content/modules'
import { getQuestion } from '@/content/questions'
import { Bullets, DataTable, ModuleFooter, OnThisPage, PageHeader, Panel, Section, ToolFrame } from '@/components/learn/Blocks'
import { Callout } from '@/components/learn/Callout'
import { DateField, NumberField, Result, Segmented } from '@/components/learn/Controls'
import { num } from '@/lib/utils'
import { QuickCheck } from '@/components/learn/QuestionCard'
import { correctedAge, midParentalHeight, newbornWeightChangePct, weightVelocity } from '@/lib/clinical/growth'
import { parseISODate, todayUTC, toISODate } from '@/lib/clinical/dates'

const mod = moduleById.growth

function daysToText(days: number): string {
  if (days < 0) return 'not yet term-equivalent'
  if (days < 7 * 13) return `${Math.floor(days / 7)} wk ${days % 7} d`
  const months = Math.floor(days / 30.4375)
  if (months < 24) return `${months} mo`
  return `${Math.floor(months / 12)} y ${months % 12} mo`
}

function MphTool() {
  const [father, setFather] = useState('178')
  const [mother, setMother] = useState('164')
  const [sex, setSex] = useState<'male' | 'female'>('female')
  const f = num(father)
  const m = num(mother)
  const r = f && m && f > 100 && m > 100 && f < 230 && m < 230 ? midParentalHeight(f, m, sex) : null
  return (
    <ToolFrame id="tool-mph" title="Mid-parental (target) height" description="Compare a child’s projected adult height with the family’s genetic potential." refs={['who-cdc-charts']}>
      <div className="grid gap-4 sm:grid-cols-3">
        <NumberField label="Father’s height" value={father} onChange={setFather} unit="cm" min={100} max={230} />
        <NumberField label="Mother’s height" value={mother} onChange={setMother} unit="cm" min={100} max={230} />
        <Segmented label="Child’s sex" value={sex} onChange={setSex} options={[{ value: 'female', label: 'Female' }, { value: 'male', label: 'Male' }]} />
      </div>
      {r && (
        <Result tone="info" title={`Target height ${r.targetCm} cm (range ${r.lowCm}–${r.highCm} cm)`}>
          <p>
            Formula: (father + mother {sex === 'male' ? '+' : '−'} 13) ÷ 2; the ±8.5 cm range ≈ ±2 SD. A child whose height percentile projects well below this range — or who crosses percentiles
            downward after age 2–3 — needs evaluation even if the absolute height looks “normal.”
          </p>
        </Result>
      )}
    </ToolFrame>
  )
}

function CorrectedAgeTool() {
  const [dob, setDob] = useState('')
  const [ga, setGa] = useState('30')
  const [on, setOn] = useState(toISODate(todayUTC()))
  const dobD = parseISODate(dob)
  const onD = parseISODate(on)
  const g = num(ga)
  const r = dobD && onD && g && g >= 22 && g <= 42 && onD >= dobD ? correctedAge(dobD, g, onD) : null
  return (
    <ToolFrame id="tool-corrected-age" title="Corrected age for prematurity" description="Use corrected age for growth and milestones until 24 months; vaccines use chronological age.">
      <div className="grid gap-4 sm:grid-cols-3">
        <DateField label="Date of birth" value={dob} onChange={setDob} />
        <NumberField label="Gestational age at birth" value={ga} onChange={setGa} unit="weeks" min={22} max={42} />
        <DateField label="Assessment date" value={on} onChange={setOn} />
      </div>
      {!dob && <p className="text-sm text-muted-foreground">Enter a date of birth to calculate.</p>}
      {r && (
        <Result tone={r.shouldCorrect ? 'info' : 'good'} title={r.shouldCorrect ? `Corrected age: ${daysToText(r.correctedDays)} (chronological ${daysToText(r.chronologicalDays)})` : `Chronological age: ${daysToText(r.chronologicalDays)}`}>
          {r.shouldCorrect ? (
            <p>
              Born {r.weeksPremature} weeks early. Plot growth and judge milestones at the corrected age; give vaccines at the chronological age.
            </p>
          ) : (
            <p>{g && g >= 37 ? 'Term birth — no correction needed.' : 'Past 24 months chronological age — correction is generally no longer applied.'}</p>
          )}
        </Result>
      )}
    </ToolFrame>
  )
}

function VelocityTool() {
  const [dob, setDob] = useState('')
  const [d1, setD1] = useState('')
  const [w1, setW1] = useState('')
  const [d2, setD2] = useState('')
  const [w2, setW2] = useState('')
  const dobD = parseISODate(dob)
  const d1D = parseISODate(d1)
  const d2D = parseISODate(d2)
  const kg1 = num(w1)
  const kg2 = num(w2)
  const r = dobD && d1D && d2D && kg1 && kg2 && d1D >= dobD ? weightVelocity(kg1, d1D, kg2, d2D, dobD) : null
  return (
    <ToolFrame id="tool-velocity" title="Weight-gain velocity" description="Turns two weights into g/day and compares with typical infant gain. Always plot on the chart too.">
      <div className="grid gap-4 sm:grid-cols-3">
        <DateField label="Date of birth" value={dob} onChange={setDob} />
        <DateField label="Visit 1 date" value={d1} onChange={setD1} />
        <NumberField label="Visit 1 weight" value={w1} onChange={setW1} unit="kg" min={0.5} max={30} />
        <span className="hidden sm:block" />
        <DateField label="Visit 2 date" value={d2} onChange={setD2} />
        <NumberField label="Visit 2 weight" value={w2} onChange={setW2} unit="kg" min={0.5} max={30} />
      </div>
      {r && (
        <Result
          tone={r.status === 'below' ? 'warn' : r.status === 'typical' ? 'good' : 'info'}
          title={`${r.gPerDay} g/day over ${r.days} days`}
        >
          {r.band ? (
            <p>
              Typical for {r.band.label}: ≈{r.band.low}–{r.band.high} g/day.{' '}
              {r.status === 'below' && 'Below typical — take a feeding history, observe a feed, and look for percentile crossing on the chart.'}
              {r.status === 'typical' && 'Within the typical range.'}
              {r.status === 'above' && 'Above typical — check weight-for-length trajectory.'}
            </p>
          ) : (
            <p>Beyond 2 years, assess growth by percentile tracking and BMI rather than g/day.</p>
          )}
        </Result>
      )}
    </ToolFrame>
  )
}

function NewbornWeightTool() {
  const [bw, setBw] = useState('3400')
  const [cw, setCw] = useState('3120')
  const b = num(bw)
  const c = num(cw)
  const pct = b && c && b > 400 && c > 300 ? newbornWeightChangePct(b, c) : null
  const loss = pct !== null ? -pct : null
  return (
    <ToolFrame id="tool-newborn-weight" title="Newborn weight change" description="Percent change from birth weight in the first two weeks." refs={['newt']}>
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField label="Birth weight" value={bw} onChange={setBw} unit="g" min={400} max={6500} />
        <NumberField label="Current weight" value={cw} onChange={setCw} unit="g" min={300} max={7000} />
      </div>
      {loss !== null && (
        <Result
          tone={loss >= 10 ? 'bad' : loss >= 7 ? 'warn' : 'good'}
          title={loss > 0 ? `${loss}% below birth weight` : `${Math.abs(loss)}% above birth weight`}
        >
          <p>
            {loss >= 10 && 'Above the expected range. Same-day feeding assessment (latch, transfer, voids/stools), supplement with expressed milk or formula as needed, check bilirubin ± sodium, and recheck in 24–48 h.'}
            {loss >= 7 && loss < 10 && 'Common with exclusive breastfeeding but warrants a feeding assessment and close follow-up.'}
            {loss < 7 && 'Within the usual range. Most newborns regain birth weight by 10–14 days.'}
          </p>
          <p className="text-xs text-muted-foreground">Hour-specific percentiles by delivery mode: NEWT nomograms (newbornweight.org).</p>
        </Result>
      )}
    </ToolFrame>
  )
}

export default function Growth() {
  return (
    <div className="space-y-10">
      <PageHeader module={mod} refs={['who-cdc-charts', 'aap-obesity-2023', 'bright-futures']} />
      <OnThisPage
        items={[
          { id: 'charts', label: 'Charts' },
          { id: 'normal', label: 'Normal growth' },
          { id: 'short', label: 'Short stature' },
          { id: 'faltering', label: 'Faltering growth' },
          { id: 'obesity', label: 'Obesity' },
          { id: 'preventive', label: 'Preventive schedule' },
        ]}
      />

      <Section id="charts" title="Measure and plot correctly" refs={['who-cdc-charts']}>
        <DataTable
          head={['Age / situation', 'Chart', 'Practical notes']}
          rows={[
            ['Birth – 24 months', 'WHO growth standards', 'Recumbent length. Cutoffs: 2nd and 98th percentiles (±2 SD). Describes optimal growth of breastfed infants.'],
            ['2 – 20 years', 'CDC 2000 growth charts', 'Standing height. Cutoffs: 5th and 95th percentiles; BMI-for-age from 2 years.'],
            ['BMI above the 97th percentile', 'CDC extended BMI-for-age (2022)', 'Plots severe obesity as % of the 95th percentile instead of compressed percentile lines.'],
            ['Preterm', 'Fenton or INTERGROWTH-21st until term-equivalent', 'Then WHO charts at corrected age until 24 months chronological.'],
            ['Down syndrome, Turner syndrome', 'Condition-specific charts', 'Use alongside standard charts; growth failure is still abnormal.'],
          ]}
        />
        <CorrectedAgeTool />
        <QuickCheck question={getQuestion('gr-corrected-age')} />
      </Section>

      <Section id="normal" title="Normal growth: numbers to know">
        <div className="grid gap-4 md:grid-cols-3">
          <Panel title="Weight">
            <Bullets
              items={[
                'Loses ≤7–10% in the first days; regains birth weight by 10–14 days.',
                '≈25–35 g/day (0–3 mo), 15–21 g/day (3–6 mo), 10–13 g/day (6–12 mo).',
                'Doubles birth weight by 4–5 months; triples by 12 months.',
              ]}
            />
          </Panel>
          <Panel title="Length / height">
            <Bullets
              items={[
                '+25 cm in year 1, +12 cm in year 2, then ≈6–7 cm/year; ≈5–6 cm/year until puberty.',
                'Peak height velocity: girls ≈8 cm/y early in puberty; boys ≈9–10 cm/y later in puberty.',
                'Length percentile shifts in the first 2 years toward genetic potential are common.',
              ]}
            />
          </Panel>
          <Panel title="Head circumference">
            <Bullets
              items={[
                '+2 cm/month (0–3 mo), +1 cm/month (3–6 mo), +0.5 cm/month (6–12 mo) — ≈12 cm in year 1.',
                'Crossing HC percentiles up or down needs neuro exam and usually imaging.',
                'Plot HC at every visit to 24 months (36 months in many practices).',
              ]}
            />
          </Panel>
        </div>
        <VelocityTool />
        <NewbornWeightTool />
      </Section>

      <Section id="short" title="Short stature: read the pattern">
        <DataTable
          head={['Pattern', 'Height velocity', 'Weight vs height', 'Bone age', 'Think']}
          rows={[
            ['Familial short stature', 'Normal, tracks low channel', 'Proportional', '= chronological', 'Short parents; normal puberty timing'],
            ['Constitutional delay', 'Slows in first 2–3 y, then normal', 'Proportional', 'Delayed', 'Late puberty in family; adult height normal'],
            ['Endocrine', 'Falls (crosses percentiles)', 'Weight preserved or rising', 'Delayed', 'Hypothyroidism, GH deficiency, glucocorticoid excess'],
            ['Nutritional / systemic', 'Falls after weight', 'Weight falls first', 'Delayed', 'Inadequate intake, celiac disease, IBD, renal disease'],
            ['Syndromic / skeletal', 'Variable', 'Disproportion possible', 'Variable', 'Turner syndrome, Noonan, SHOX, skeletal dysplasia'],
          ]}
        />
        <MphTool />
        <Callout tone="redflag" title="Evaluate when">
          <Bullets
            items={[
              'Height < −2 SD (≈3rd percentile) or more than ≈2 SD below mid-parental target.',
              'Crossing ≥2 major percentile lines after age 2–3, or velocity <4–5 cm/year before puberty.',
              'Disproportion, dysmorphic features, or delayed/absent puberty (no breast budding by 13 in girls, no testicular enlargement by 14 in boys).',
            ]}
          />
        </Callout>
        <Callout tone="pitfall">
          Any girl with unexplained short stature needs a karyotype for Turner syndrome — typical features may be absent. Do not label it “familial” without checking.
        </Callout>
        <QuickCheck question={getQuestion('gr-endocrine-pattern')} />
      </Section>

      <Section id="faltering" title="Faltering growth (failure to thrive)">
        <div className="grid gap-4 md:grid-cols-2">
          <Panel title="Definition and causes">
            <Bullets
              items={[
                'No single criterion. Commonly: weight-for-age or weight-for-length below the 2nd percentile (WHO) on repeated measures, or a fall across ≥2 major percentile lines.',
                'Most cases are inadequate intake (feeding technique, formula mixing, food insecurity, psychosocial stress).',
                'Less often: malabsorption (celiac, CF, cow’s milk protein allergy), increased needs (CHD, chronic lung disease), or vomiting (GERD, anatomical, metabolic).',
              ]}
            />
          </Panel>
          <Panel title="Approach">
            <Bullets
              items={[
                'Feeding history, 3-day food record, observed feed, stooling/vomiting, psychosocial and safety assessment.',
                'Labs only when history/exam point somewhere; untargeted panels rarely change management.',
                'Catch-up growth needs ≈1.5× usual calories (concentrated formula/fortified foods with a dietitian).',
                'Admit for severe malnutrition, dehydration, safety concerns, or failed outpatient care; watch for refeeding syndrome (phosphate, K, Mg).',
              ]}
            />
          </Panel>
        </div>
        <QuickCheck question={getQuestion('gr-ftt-history')} />
      </Section>

      <Section id="obesity" title="Obesity — AAP 2023" refs={['aap-obesity-2023', 'aap-bp-2017']}>
        <DataTable
          head={['Category (≥2 years)', 'BMI-for-age']}
          rows={[
            ['Overweight', '85th to <95th percentile'],
            ['Obesity (class 1)', '≥95th percentile'],
            ['Class 2 (severe)', '≥120% of the 95th percentile, or BMI ≥35'],
            ['Class 3 (severe)', '≥140% of the 95th percentile, or BMI ≥40'],
          ]}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Panel title="Evaluate">
            <Bullets
              items={[
                'Blood pressure at every visit from age 3 when obese.',
                'Age ≥10 with obesity: lipids, HbA1c or fasting glucose, ALT. Consider at 2–9 with risk factors.',
                'Screen for sleep apnea, depression, PCOS symptoms, and weight stigma/bullying.',
              ]}
            />
          </Panel>
          <Panel title="Treat — no watchful waiting">
            <Bullets
              items={[
                'Intensive health behavior and lifestyle treatment (IHBLT): ≥26 face-to-face hours over 3–12 months, family-based.',
                'Offer pharmacotherapy from age 12 with obesity as an adjunct (e.g., GLP-1 receptor agonists).',
                'Offer referral for metabolic and bariatric surgery evaluation from age 13 with severe obesity.',
                'Use person-first, non-stigmatizing language; BMI is a screen, not a diagnosis of health.',
              ]}
            />
          </Panel>
        </div>
        <QuickCheck question={getQuestion('gr-obesity-2023')} />
      </Section>

      <Section id="preventive" title="Preventive care that changes outcomes" refs={['bright-futures']}>
        <DataTable
          head={['Age', 'Universal screening (Bright Futures)']}
          rows={[
            ['Newborn', 'Metabolic/genetic screen (24–48 h), hearing (by 1 mo), CCHD pulse oximetry (≥24 h), bilirubin before discharge'],
            ['1, 2, 4, 6 mo', 'Caregiver (perinatal) depression screening'],
            ['9, 18, 30 mo', 'Standardized developmental screening; autism screening at 18 and 24 mo'],
            ['12 mo', 'Hemoglobin/hematocrit; lead risk (blood lead at 12 and 24 mo for Medicaid/high risk)'],
            ['From 1st tooth to 5 y', 'Fluoride varnish every 3–6 months; dental home by 12 months'],
            ['From 3 y', 'Blood pressure yearly; instrument-based vision screening; visual acuity from 4 y'],
            ['9–11 y and 17–21 y', 'Lipid panel (non-fasting acceptable)'],
            ['12–21 y', 'Depression (e.g., PHQ-A) and suicide-risk screening yearly; substance use (CRAFFT); HIV once 15–18 y'],
          ]}
        />
        <Panel title="High-yield anticipatory guidance" refs={['aap-safe-sleep-2022', 'aap-vitd-2008', 'aap-iron-2010', 'niaid-peanut-2017']}>
          <Bullets
            items={[
              'Safe sleep: back to sleep on a firm, flat, dedicated surface; room-share without bed-sharing, ideally for at least 6 months; no inclined sleepers or soft bedding.',
              'Vitamin D 400 IU/day for breastfed and partially breastfed infants from the first days of life.',
              'Iron 1 mg/kg/day from 4 months for exclusively breastfed term infants until iron-rich foods are established.',
              'Introduce peanut and egg early — around 4–6 months, once ready for solids (not before 4 months); early introduction prevents allergy. NIAID 2017 suggests evaluation first for severe eczema or egg allergy; later consensus guidance does not require routine pre-testing.',
              'No honey before 12 months; no cow’s milk as a main drink before 12 months; no juice before 12 months.',
            ]}
          />
        </Panel>
        <QuickCheck question={getQuestion('gr-lipids')} />
      </Section>

      <ModuleFooter module={mod} />
    </div>
  )
}
