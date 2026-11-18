import { useState } from 'react'
import { moduleById } from '@/content/modules'
import { getQuestion } from '@/content/questions'
import { Bullets, DataTable, ModuleFooter, OnThisPage, PageHeader, Panel, Section, ToolFrame } from '@/components/learn/Blocks'
import { Callout } from '@/components/learn/Callout'
import { NumberField, Result, Segmented } from '@/components/learn/Controls'
import { QuickCheck } from '@/components/learn/QuestionCard'
import { cdsCategory, cdsItems, cdsScore, whoClassify, type CdsValues, type WhoInput } from '@/lib/clinical/dehydration'
import { bolusMl, maintenance, ongoingLossesMl, ortPlan, whoPlanC } from '@/lib/clinical/fluids'
import { computeDose, drugs } from '@/lib/clinical/dosing'
import { num } from '@/lib/utils'

const mod = moduleById.fluids
const ondansetron = drugs.find((d) => d.id === 'ondansetron')!

function CdsTool() {
  const [v, setV] = useState<CdsValues>({ appearance: 1, eyes: 1, mucous: 1, tears: 1 })
  const score = cdsScore(v)
  const cat = cdsCategory(score)
  return (
    <ToolFrame id="tool-cds" title="Clinical Dehydration Scale (1–36 months)" description="Validated in children with gastroenteritis. Score the four items." refs={['cds-2004']}>
      <div className="grid gap-4 md:grid-cols-2">
        {cdsItems.map((item) => (
          <Segmented
            key={item.key}
            label={item.label}
            value={v[item.key]}
            onChange={(s) => setV((x) => ({ ...x, [item.key]: s }))}
            columns={1}
            options={item.options.map((o) => ({ value: o.score, label: o.label, hint: `${o.score} pt` }))}
          />
        ))}
      </div>
      <Result
        tone={cat === 'none' ? 'good' : cat === 'some' ? 'warn' : 'bad'}
        title={`Score ${score}/8 — ${cat === 'none' ? 'no dehydration (<3%)' : cat === 'some' ? 'some dehydration (3 to <6%)' : 'moderate/severe dehydration (≥6%)'}`}
      >
        {cat === 'none' && <p>Continue feeding; offer fluids; replace ongoing losses. Diluted apple juice/preferred fluids are fine for children &gt;6 months with minimal dehydration.</p>}
        {cat === 'some' && <p>Oral rehydration (ORS 50–100 mL/kg over 4 h) — ondansetron if vomiting. Reassess hourly.</p>}
        {cat === 'moderate-severe' && (
          <p>Start ORT (or NG ORS) if perfusion and mental status allow; IV isotonic bolus 20 mL/kg if shock, altered consciousness, or ORT fails. Check glucose and electrolytes.</p>
        )}
      </Result>
    </ToolFrame>
  )
}

function WhoTool() {
  const [v, setV] = useState<WhoInput>({ condition: 'restless', eyes: 'sunken', drinking: 'eagerly', skinPinch: 'slow' })
  const [w, setW] = useState('9')
  const [ageMo, setAgeMo] = useState('10')
  const r = whoClassify(v)
  const weight = num(w)
  const months = num(ageMo)
  const planC = weight && months !== null ? whoPlanC(weight, months) : null
  const planB = weight ? ortPlan(weight, 75) : null
  return (
    <ToolFrame id="tool-who" title="WHO / IMCI dehydration plans" description="Used worldwide; Plan C differs for severe acute malnutrition (use the WHO malnutrition protocol)." refs={['who-diarrhoea-2005']}>
      <div className="grid gap-4 md:grid-cols-2">
        <Segmented label="General condition" value={v.condition} onChange={(x) => setV((s) => ({ ...s, condition: x }))} options={[{ value: 'well', label: 'Well, alert' }, { value: 'restless', label: 'Restless, irritable' }, { value: 'lethargic', label: 'Lethargic or unconscious' }]} />
        <Segmented label="Eyes" value={v.eyes} onChange={(x) => setV((s) => ({ ...s, eyes: x }))} options={[{ value: 'normal', label: 'Normal' }, { value: 'sunken', label: 'Sunken' }]} />
        <Segmented label="Drinking" value={v.drinking} onChange={(x) => setV((s) => ({ ...s, drinking: x }))} options={[{ value: 'normally', label: 'Normally' }, { value: 'eagerly', label: 'Eagerly, thirsty' }, { value: 'poorly', label: 'Poorly / not able' }]} />
        <Segmented label="Skin pinch" value={v.skinPinch} onChange={(x) => setV((s) => ({ ...s, skinPinch: x }))} options={[{ value: 'immediate', label: 'Goes back immediately' }, { value: 'slow', label: 'Slowly' }, { value: 'very-slow', label: 'Very slowly (≥2 s)' }]} />
        <NumberField label="Weight" value={w} onChange={setW} unit="kg" min={1} max={80} />
        <NumberField label="Age" value={ageMo} onChange={setAgeMo} unit="months" min={0} max={216} />
      </div>
      {r.category === 'none' && (
        <Result tone="good" title="No dehydration → Plan A (home)">
          <Bullets items={['ORS after each loose stool: <2 y 50–100 mL; 2–10 y 100–200 mL; older children as much as wanted.', 'Continue breastfeeding and usual diet.', 'Zinc 10–14 days where recommended (low- and middle-income settings): 10 mg/day <6 months, 20 mg/day ≥6 months.']} />
        </Result>
      )}
      {r.category === 'some' && (
        <Result tone="warn" title="Some dehydration → Plan B">
          <p>ORS 75 mL/kg over 4 h{planB ? ` = ${planB.totalMl} mL (≈${planB.per5MinMl} mL every 5 min)` : ''}; then reassess and choose Plan A, B or C.</p>
        </Result>
      )}
      {r.category === 'severe' && (
        <Result tone="bad" title="Severe dehydration → Plan C (IV Ringer’s lactate 100 mL/kg)">
          {planC ? (
            <p>
              {planC.firstMl} mL over {planC.firstOver}, then {planC.thenMl} mL over {planC.thenOver}. Repeat the first portion if the radial pulse is still weak; start ORS (~5 mL/kg/h) once the child can drink.
            </p>
          ) : (
            <p>Enter weight and age for volumes.</p>
          )}
        </Result>
      )}
      <p className="text-xs text-muted-foreground">
        Signs counted: severe-level {r.severeSigns}, some-level {r.someSigns} (≥2 needed for each category).
      </p>
    </ToolFrame>
  )
}

function OrtTool() {
  const [w, setW] = useState('12')
  const [perKg, setPerKg] = useState<50 | 75 | 100>(50)
  const [stools, setStools] = useState('2')
  const [emeses, setEmeses] = useState('1')
  const weight = num(w)
  const plan = weight ? ortPlan(weight, perKg) : null
  const losses = weight ? ongoingLossesMl(weight, num(stools) ?? 0, num(emeses) ?? 0) : 0
  const ond = weight ? computeDose(ondansetron, weight) : null
  return (
    <ToolFrame id="tool-ort" title="ORT volume planner" description="Turns a rehydration target into amounts a caregiver can give." refs={['cdc-age-2003', 'ondansetron-2006']}>
      <div className="grid gap-4 md:grid-cols-2">
        <NumberField label="Weight" value={w} onChange={setW} unit="kg" min={2} max={80} />
        <Segmented label="Replacement target over 4 h" value={perKg} onChange={setPerKg} columns={3} options={[{ value: 50, label: '50 mL/kg', hint: 'mild (3–5%)' }, { value: 75, label: '75 mL/kg', hint: 'WHO Plan B' }, { value: 100, label: '100 mL/kg', hint: 'moderate (6–9%)' }]} />
        <NumberField label="Diarrheal stools during the period" value={stools} onChange={setStools} min={0} max={30} step={1} />
        <NumberField label="Emeses during the period" value={emeses} onChange={setEmeses} min={0} max={30} step={1} />
      </div>
      {plan && weight && (
        <Result tone="info" title={`${plan.totalMl + losses} mL ORS over 4 hours`}>
          <Bullets
            items={[
              `Deficit replacement: ${plan.totalMl} mL (${plan.perHourMl} mL/h).`,
              `Ongoing losses: ${losses} mL (10 mL/kg per stool, 2 mL/kg per emesis).`,
              `Give ≈${Math.round(((plan.totalMl + losses) / 48) * 10) / 10} mL every 5 minutes by spoon, syringe or cup; increase as tolerated. NG ORS if the child won’t drink.`,
              ond ? `If vomiting (age ≥6 months): ondansetron ODT ${ond.doseText}, start ORT 15–30 min later.` : '',
              'Continue breastfeeding throughout; resume age-appropriate diet as soon as rehydrated (no restrictive diets).',
            ].filter(Boolean)}
          />
        </Result>
      )}
    </ToolFrame>
  )
}

function MaintenanceTool() {
  const [w, setW] = useState('25')
  const weight = num(w)
  const m = weight && weight > 0 ? maintenance(weight) : null
  const b = weight ? bolusMl(weight, 20) : null
  return (
    <ToolFrame id="tool-maintenance" title="Maintenance IV fluids (Holliday–Segar)" description="Rate is a starting point — adjust to clinical state, losses and electrolytes." refs={['aap-ivf-2018', 'nice-ivf']}>
      <NumberField label="Weight" value={w} onChange={setW} unit="kg" min={1} max={150} />
      {m && b && (
        <Result tone="info" title={`${m.mlPerHour} mL/h · ${m.mlPerDay} mL/day`}>
          <Bullets
            items={[
              m.capped ? 'Capped at the adult maintenance rate (100 mL/h, 2.4 L/day).' : '4-2-1 rule: 4 mL/kg/h for the first 10 kg, 2 mL/kg/h for the next 10 kg, 1 mL/kg/h thereafter.',
              'Fluid (age 28 days–18 years): isotonic with dextrose and KCl, e.g., D5 0.9% NaCl + 20 mEq/L KCl or D5 balanced crystalloid.',
              `Resuscitation bolus (separate from maintenance): 20 mL/kg = ${b.ml} mL isotonic crystalloid${b.capped ? ' (capped at 1 L)' : ''}.`,
              'Consider 50–80% of maintenance when fluid retention is likely (meningitis, pneumonia, bronchiolitis, post-op, CNS injury — NICE) and monitor sodium.',
            ]}
          />
        </Result>
      )}
    </ToolFrame>
  )
}

export default function Dehydration() {
  return (
    <div className="space-y-10">
      <PageHeader module={mod} refs={['cds-2004', 'steiner-2004', 'cdc-age-2003', 'aap-ivf-2018', 'ispad-dka-2022']} />
      <OnThisPage
        items={[
          { id: 'assess', label: 'Assess' },
          { id: 'ort', label: 'Oral rehydration' },
          { id: 'iv', label: 'IV fluids' },
          { id: 'electrolytes', label: 'Electrolytes' },
          { id: 'dka', label: 'DKA' },
        ]}
      />

      <Section id="assess" title="Assess dehydration" refs={['steiner-2004', 'cds-2004']}>
        <DataTable
          head={['Approach', 'What it tells you']}
          rows={[
            ['Weight change from a recent pre-illness weight', 'Reference standard (1 kg ≈ 1 L); rarely available'],
            ['Best single signs (JAMA Rational Exam)', 'Prolonged capillary refill, abnormal skin turgor, abnormal (deep, acidotic) breathing'],
            ['Combined scales', 'Clinical Dehydration Scale (1–36 mo) or WHO/IMCI — more reliable than any single sign'],
            ['Labs', 'Not needed for mild–moderate dehydration on ORT. Check glucose and electrolytes if IV fluids, severe dehydration, or altered mental status'],
          ]}
        />
        <CdsTool />
        <QuickCheck question={getQuestion('fl-cds')} />
        <QuickCheck question={getQuestion('fl-best-sign')} />
        <WhoTool />
        <QuickCheck question={getQuestion('fl-who-c')} />
      </Section>

      <Section id="ort" title="Oral rehydration first" refs={['cdc-age-2003', 'ondansetron-2006', 'apple-juice-2016', 'probiotics-2018']}>
        <div className="grid gap-4 md:grid-cols-2">
          <Callout tone="action" title="Works">
            <Bullets
              items={[
                'ORS (e.g., WHO reduced-osmolarity ORS; commercial pediatric solutions) — as effective as IV for mild–moderate dehydration, with fewer complications.',
                'Small, frequent volumes; NG ORS when the child refuses.',
                'Single dose of ondansetron (≥6 months) reduces vomiting, IV use and admission.',
                'Early refeeding with a normal diet; continue breastfeeding.',
                'Zinc for 10–14 days in low- and middle-income settings (shorter, less severe diarrhea).',
              ]}
            />
          </Callout>
          <Callout tone="pitfall" title="Doesn’t work or harms">
            <Bullets
              items={[
                'Sports drinks, soda or undiluted juice for dehydration (high sugar, low sodium) — diluted apple juice is only for minimal dehydration in children >6 months.',
                'Probiotics (two large 2018 RCTs: no benefit).',
                'Loperamide and other antidiarrheals in young children; promethazine under 2 years (respiratory depression).',
                '“Gut rest” or restrictive BRAT diets.',
              ]}
            />
          </Callout>
        </div>
        <OrtTool />
        <Callout tone="redflag" title="Go IV (or admit)">
          Shock or severe dehydration, altered mental status, ORT failure despite ondansetron, bilious vomiting, suspected surgical abdomen, ileus, or caregivers unable to deliver ORT. Bloody diarrhea with pallor or low urine output → check for hemolytic uremic syndrome (CBC, smear, creatinine); avoid antibiotics for suspected STEC.
        </Callout>
        <QuickCheck question={getQuestion('fl-ort-plan')} />
        <QuickCheck question={getQuestion('fl-probiotics')} />
      </Section>

      <Section id="iv" title="Maintenance IV fluids" refs={['aap-ivf-2018']}>
        <MaintenanceTool />
        <Callout tone="evidence" title="Why isotonic (AAP 2018)">
          Illness (pain, nausea, pneumonia, CNS disease, surgery) raises ADH, so hypotonic maintenance fluids cause hospital-acquired hyponatremia and, rarely, cerebral edema and death. Isotonic fluids reduce hyponatremia without increasing hypernatremia. The guideline excludes neonates &lt;28 days, neurosurgical, cardiac, renal or liver disease, diabetes insipidus, and severe burns.
        </Callout>
        <QuickCheck question={getQuestion('fl-maint')} />
        <QuickCheck question={getQuestion('fl-isotonic')} />
      </Section>

      <Section id="electrolytes" title="Electrolyte disorders you must handle safely">
        <DataTable
          head={['Disorder', 'Key principle', 'Acute treatment']}
          rows={[
            ['Hyponatremia with seizures/coma', 'Raise Na 4–6 mEq/L fast to stop symptoms; then ≤8–10 mEq/L total in 24 h', '3% saline 2 mL/kg (max 100 mL) over 10 min; repeat up to 2× if still symptomatic'],
            ['Hypernatremic dehydration', 'Lower Na ≤10–12 mEq/L per 24 h (≈0.5 mEq/L/h); rehydrate over ~48 h', 'Isotonic bolus for shock first; frequent Na checks; seizures during correction = cerebral edema'],
            ['Hyperkalemia with ECG changes', 'Stabilize membrane, shift, then remove', 'Calcium gluconate 10% 0.5–1 mL/kg IV (max 20 mL); insulin 0.1 U/kg + dextrose 0.5 g/kg; nebulized albuterol; bicarbonate only if acidotic; binders/dialysis'],
            ['Hypoglycemia', 'Check glucose in every sick child', 'D10W 2–5 mL/kg IV, then dextrose-containing infusion; recheck in 15 min'],
          ]}
        />
        <QuickCheck question={getQuestion('fl-hyponat-seizure')} />
        <QuickCheck question={getQuestion('fl-hypernatremia')} />
      </Section>

      <Section id="dka" title="Diabetic ketoacidosis essentials" refs={['ispad-dka-2022', 'pecarn-fluid-2018']}>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel title="Diagnose (ISPAD 2022)">
            <Bullets
              items={[
                'Glucose >200 mg/dL (11 mmol/L), venous pH <7.3 or bicarbonate <18 mmol/L, and ketonemia (β-hydroxybutyrate ≥3 mmol/L) or moderate/large ketonuria.',
                'Severity: mild pH <7.3/HCO₃ <18; moderate pH <7.2/HCO₃ <10; severe pH <7.1/HCO₃ <5.',
                'Kussmaul breathing can be mistaken for pneumonia or asthma; abdominal pain for appendicitis.',
              ]}
            />
          </Panel>
          <Panel title="Treat">
            <Bullets
              items={[
                'Fluids: 10–20 mL/kg isotonic over 20–30 min (repeat if shocked), then replace deficit over 24–48 h. Do not under-resuscitate — rate and saline content did not change neurologic outcomes (PECARN FLUID).',
                'Insulin 0.05–0.1 U/kg/h starting ≥1 h after fluids begin; no bolus.',
                'Potassium: add once K is not high and urine is passing (total body K is depleted). Add dextrose when glucose falls to ~250–300 mg/dL.',
                'No routine bicarbonate.',
              ]}
            />
          </Panel>
        </div>
        <Callout tone="redflag" title="Cerebral edema — act on signs, not imaging">
          Headache, slowing heart rate, rising blood pressure, falling level of consciousness, incontinence or vomiting after initial improvement → mannitol 0.5–1 g/kg IV over 10–15 min or 3% saline 2.5–5 mL/kg, head-up positioning, reduce fluid rate, PICU.
        </Callout>
        <QuickCheck question={getQuestion('fl-dka')} />
      </Section>

      <ModuleFooter module={mod} />
    </div>
  )
}
