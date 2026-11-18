import { useEffect, useMemo, useState } from 'react'
import { Pause, Play, RotateCcw } from 'lucide-react'
import { moduleById } from '@/content/modules'
import { getQuestion } from '@/content/questions'
import { Bullets, DataTable, ModuleFooter, OnThisPage, PageHeader, Panel, Section, ToolFrame } from '@/components/learn/Blocks'
import { Callout } from '@/components/learn/Callout'
import { Cite } from '@/components/learn/Cite'
import { NumberField, Result, Segmented } from '@/components/learn/Controls'
import { QuickCheck } from '@/components/learn/QuestionCard'
import { Button } from '@/components/ui/button'
import { computeDose, drugs, type DrugCategory } from '@/lib/clinical/dosing'
import { bpBands, estimateWeightKg, ettSize, hypotensionThreshold, vitalBandForAge, vitalBands } from '@/lib/clinical/vitals'
import { cn, num } from '@/lib/utils'

const mod = moduleById.emergencies

type Pat = 'normal' | 'abnormal'

function patImpression(a: Pat, w: Pat, c: Pat): { title: string; tone: 'good' | 'warn' | 'bad'; action: string } {
  const A = a === 'abnormal'
  const W = w === 'abnormal'
  const C = c === 'abnormal'
  if (A && W && C) return { title: 'Cardiopulmonary failure', tone: 'bad', action: 'Immediate resuscitation: airway, ventilation, IV/IO access, fluids/vasoactives; prepare for arrest.' }
  if (A && W) return { title: 'Respiratory failure', tone: 'bad', action: 'High-flow oxygen, airway positioning, bag-mask ventilation if needed; call for airway expertise.' }
  if (A && C) return { title: 'Decompensated (hypotensive) shock', tone: 'bad', action: 'IV/IO access now, fluid boluses 10–20 mL/kg with reassessment, early vasoactives, treat cause (sepsis, hemorrhage).' }
  if (W && C) return { title: 'Respiratory distress with compensated shock', tone: 'warn', action: 'Oxygen, IV access, cautious fluid bolus with reassessment (e.g., pneumonia with sepsis).' }
  if (A) return { title: 'Primary CNS or systemic/metabolic dysfunction', tone: 'warn', action: 'Check glucose now; consider seizure/postictal state, toxins, infection, raised ICP, abuse.' }
  if (W) return { title: 'Respiratory distress', tone: 'warn', action: 'Position of comfort, oxygen as needed, targeted therapy (e.g., albuterol, epinephrine for croup).' }
  if (C) return { title: 'Compensated shock', tone: 'warn', action: 'IV/IO access, fluid bolus, find the cause — hypotension is a late sign in children.' }
  return { title: 'Stable', tone: 'good', action: 'Proceed to the primary survey and focused history.' }
}

function PatTool() {
  const [a, setA] = useState<Pat>('normal')
  const [w, setW] = useState<Pat>('abnormal')
  const [c, setC] = useState<Pat>('normal')
  const r = patImpression(a, w, c)
  const opts = [
    { value: 'normal' as const, label: 'Normal' },
    { value: 'abnormal' as const, label: 'Abnormal' },
  ]
  return (
    <ToolFrame id="tool-pat" title="Pediatric Assessment Triangle" description="A 30-second, hands-off look from the doorway." refs={['pat-2010']}>
      <div className="grid gap-4 md:grid-cols-3">
        <Segmented label="Appearance (TICLS)" hint="Tone, Interactiveness, Consolability, Look/gaze, Speech/cry" value={a} onChange={setA} options={opts} />
        <Segmented label="Work of breathing" hint="Abnormal sounds, retractions, flaring, positioning, head bobbing" value={w} onChange={setW} options={opts} />
        <Segmented label="Circulation to skin" hint="Pallor, mottling, cyanosis" value={c} onChange={setC} options={opts} />
      </div>
      <Result tone={r.tone} title={r.title}>
        <p>{r.action}</p>
      </Result>
    </ToolFrame>
  )
}

function VitalsTool() {
  const [years, setYears] = useState('3')
  const [months, setMonths] = useState('0')
  const [weight, setWeight] = useState('')
  const y = num(years) ?? 0
  const m = num(months) ?? 0
  const ageMonths = Math.max(0, y * 12 + m)
  const band = vitalBandForAge(ageMonths)
  const hypo = hypotensionThreshold(ageMonths)
  const est = estimateWeightKg(ageMonths)
  const wKg = num(weight) ?? est ?? null
  const ett = ettSize(ageMonths / 12)
  const dose = (id: string) => {
    const d = drugs.find((x) => x.id === id)
    return d && wKg ? computeDose(d, wKg) : null
  }
  const epi = dose('epi-arrest')
  const epiIm = dose('epi-im')
  const bolus = dose('bolus')
  const d10 = dose('d10')
  const midaz = dose('midazolam-in')
  const lev = dose('levetiracetam')
  return (
    <ToolFrame id="tool-vitals" title="Vitals by age & resuscitation numbers" description="Reference ranges are for a calm child; interpret trends and context (fever raises HR ~10/min per °C)." refs={['pals-2020', 'fleming-2011']}>
      <div className="grid gap-4 sm:grid-cols-3">
        <NumberField label="Age — years" value={years} onChange={setYears} min={0} max={18} step={1} />
        <NumberField label="+ months" value={months} onChange={setMonths} min={0} max={11} step={1} />
        <NumberField label="Measured weight (optional)" value={weight} onChange={setWeight} unit="kg" min={0.5} max={150} hint={est ? `APLS estimate: ${est} kg` : 'No formula estimate above 12 y — weigh the child'} />
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border bg-muted/40 p-3 text-sm">
          <p className="text-xs text-muted-foreground">{band.label}</p>
          <p className="font-semibold">HR awake {band.hrAwake[0]}–{band.hrAwake[1]}</p>
          <p className="text-muted-foreground">asleep {band.hrAsleep[0]}–{band.hrAsleep[1]}</p>
        </div>
        <div className="rounded-lg border bg-muted/40 p-3 text-sm">
          <p className="text-xs text-muted-foreground">Respiratory rate</p>
          <p className="font-semibold">
            {band.rr[0]}–{band.rr[1]} /min
          </p>
        </div>
        <div className="rounded-lg border border-rose-500/50 bg-rose-500/10 p-3 text-sm">
          <p className="text-xs text-muted-foreground">Hypotension (systolic)</p>
          <p className="font-semibold">&lt;{hypo} mmHg</p>
        </div>
      </div>
      {wKg ? (
        <DataTable
          caption={`Resuscitation card for ${wKg} kg${num(weight) ? '' : ' (estimated — confirm with scale or length-based tape)'}`}
          head={['Intervention', 'Dose']}
          rows={[
            ['Epinephrine (arrest) IV/IO', epi ? `${epi.doseText} = ${epi.volumeText}` : '—'],
            ['Epinephrine IM (anaphylaxis)', epiIm ? `${epiIm.doseText} = ${epiIm.volumeText}` : '—'],
            ['Defibrillation', `${Math.round(2 * wKg)} J, then ${Math.round(4 * wKg)} J (max 10 J/kg or adult dose)`],
            ['Synchronized cardioversion', `${Math.round(0.5 * wKg * 10) / 10}–${Math.round(wKg)} J, then ${Math.round(2 * wKg)} J`],
            ['Adenosine (SVT)', `${Math.min(Math.round(0.1 * wKg * 10) / 10, 6)} mg rapid push, then ${Math.min(Math.round(0.2 * wKg * 10) / 10, 12)} mg`],
            ['Amiodarone (VF/pVT)', `${Math.min(Math.round(5 * wKg), 300)} mg`],
            ['Fluid bolus (isotonic)', bolus?.doseText ?? '—'],
            ['Dextrose 10% (hypoglycemia)', d10?.doseText ?? '—'],
            ['Midazolam IN/IM (seizure)', midaz ? `${midaz.doseText} = ${midaz.volumeText}` : '—'],
            ['Levetiracetam IV (2nd line)', lev?.doseText ?? '—'],
            ['Endotracheal tube', ett ? `Cuffed ${ett.cuffed} mm (uncuffed ${ett.uncuffed})` : ageMonths < 12 ? 'Cuffed 3.0 mm (infant)' : 'Cuffed 3.5 mm (1–2 y)'],
          ]}
        />
      ) : (
        <p className="text-sm text-muted-foreground">Enter a weight to build the resuscitation card.</p>
      )}
    </ToolFrame>
  )
}

const categories: DrugCategory[] = ['Analgesia & fever', 'Antimicrobials', 'Respiratory', 'GI', 'Emergency & resuscitation', 'Seizures']

function DoseTool() {
  const [category, setCategory] = useState<DrugCategory>('Analgesia & fever')
  const inCat = drugs.filter((d) => d.category === category)
  const [drugId, setDrugId] = useState(inCat[0].id)
  const [weight, setWeight] = useState('14')
  const drug = drugs.find((d) => d.id === drugId && d.category === category) ?? inCat[0]
  const w = num(weight)
  const r = w ? computeDose(drug, w) : null
  return (
    <ToolFrame id="tool-dose" title="Weight-based dose calculator" description="Every result is capped at the per-dose maximum. Confirm the product concentration on the bottle." refs={['red-book']}>
      <Segmented
        label="Category"
        value={category}
        onChange={(c) => {
          setCategory(c)
          setDrugId(drugs.find((d) => d.category === c)?.id ?? drugId)
        }}
        options={categories.map((c) => ({ value: c, label: c }))}
      />
      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <div className="space-y-1">
          <label htmlFor="drug-select" className="block text-sm font-semibold">
            Drug
          </label>
          <select id="drug-select" value={drug.id} onChange={(e) => setDrugId(e.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-base">
            {inCat.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
        <NumberField label="Weight" value={weight} onChange={setWeight} unit="kg" min={0.5} max={200} />
      </div>
      {r ? (
        <Result tone={r.capped ? 'warn' : 'info'} title={`${r.doseText}${r.volumeText ? ` = ${r.volumeText}` : ''}`}>
          <p>
            <strong>{drug.route}</strong> · {drug.frequency}
          </p>
          <p className="text-muted-foreground">{drug.indication}</p>
          {drug.kind === 'per-kg' && (
            <p>
              Basis: {Array.isArray(drug.perKg) ? `${drug.perKg[0]}–${drug.perKg[1]}` : drug.perKg} {drug.unit}/kg/dose
              {drug.maxDose !== undefined ? `, max ${drug.maxDose.toLocaleString('en-US')} ${drug.unit}/dose` : ''}
              {drug.maxDaily ? `; daily max ${drug.maxDaily}` : ''}.
            </p>
          )}
          {r.capped && <p className="font-medium">Capped at the maximum single dose.</p>}
          {drug.notes && <p>{drug.notes}</p>}
          <Cite ids={drug.refs} />
        </Result>
      ) : (
        <p className="text-sm text-muted-foreground">Enter a weight between 0.5 and 200 kg.</p>
      )}
    </ToolFrame>
  )
}

const sePhases = [
  { at: 0, label: '0–5 min: Stabilize', detail: 'Time it. Airway positioning, O₂, monitor SpO₂/ECG, check glucose (treat if <60 mg/dL), IV/IO access — do not delay the first benzodiazepine for access.' },
  { at: 5, label: '5 min: First benzodiazepine', detail: 'No IV: midazolam IN/IM 0.2 mg/kg (max 10 mg) or rectal diazepam. IV: lorazepam 0.1 mg/kg (max 4 mg).' },
  { at: 10, label: '10 min: Second benzodiazepine', detail: 'Repeat once if still seizing. Maximum two doses in total, including pre-hospital.' },
  { at: 15, label: '≈15 min: Second-line agent', detail: 'Levetiracetam 60 mg/kg (max 4,500 mg) OR fosphenytoin 20 mg PE/kg (max 1,500) OR valproate 40 mg/kg (max 3,000). Phenobarbital if none available.' },
  { at: 30, label: '≈30–40 min: Refractory', detail: 'PICU, airway control, continuous EEG, anesthetic infusion (e.g., midazolam). Search hard for a cause: infection, trauma, toxins (isoniazid → pyridoxine), hyponatremia, hypocalcemia.' },
]

function SeizureTimer() {
  const [running, setRunning] = useState(false)
  const [start, setStart] = useState<number | null>(null)
  const [elapsed, setElapsed] = useState(0)
  const [w, setW] = useState('15')

  useEffect(() => {
    if (!running || start === null) return
    const id = window.setInterval(() => setElapsed(Math.floor((Date.now() - start) / 1000)), 500)
    return () => window.clearInterval(id)
  }, [running, start])

  const minutes = elapsed / 60
  const current = [...sePhases].reverse().find((p) => minutes >= p.at) ?? sePhases[0]
  const weight = num(w)
  const doses = useMemo(() => {
    if (!weight) return null
    const pick = (id: string) => {
      const d = drugs.find((x) => x.id === id)
      return d ? computeDose(d, weight)?.doseText : undefined
    }
    return { mid: pick('midazolam-in'), lor: pick('lorazepam'), lev: pick('levetiracetam'), fos: pick('fosphenytoin'), val: pick('valproate') }
  }, [weight])

  const toggle = () => {
    if (running) {
      setRunning(false)
    } else {
      setStart(Date.now() - elapsed * 1000)
      setRunning(true)
    }
  }
  const reset = () => {
    setRunning(false)
    setStart(null)
    setElapsed(0)
  }
  const mm = String(Math.floor(elapsed / 60)).padStart(2, '0')
  const ss = String(elapsed % 60).padStart(2, '0')

  return (
    <ToolFrame id="tool-se-timer" title="Status epilepticus timer (practice or real time)" description="Prompts follow AES 2016 timing; many pathways give the second-line agent as soon as two benzodiazepine doses fail." refs={['aes-se-2016', 'esett-2019']}>
      <div className="flex flex-wrap items-end gap-4">
        <div className="text-5xl font-bold tabular-nums" aria-live="off">
          {mm}:{ss}
        </div>
        <div className="flex gap-2">
          <Button onClick={toggle} className="gap-1">
            {running ? <Pause className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />} {running ? 'Pause' : elapsed ? 'Resume' : 'Start'}
          </Button>
          <Button variant="outline" onClick={reset} className="gap-1">
            <RotateCcw className="h-4 w-4" aria-hidden /> Reset
          </Button>
        </div>
        <NumberField label="Weight" value={w} onChange={setW} unit="kg" min={1} max={150} />
      </div>
      <ol className="space-y-2">
        {sePhases.map((p) => {
          const active = p === current
          const done = minutes >= p.at && !active
          return (
            <li key={p.label} className={cn('rounded-lg border p-3 text-sm', active ? 'border-2 border-primary bg-primary/10' : done ? 'opacity-60' : '')} aria-current={active ? 'step' : undefined}>
              <p className="font-semibold">{p.label}</p>
              <p>{p.detail}</p>
            </li>
          )
        })}
      </ol>
      {doses && (
        <p className="text-sm">
          <strong>For {weight} kg:</strong> midazolam IN/IM {doses.mid} · lorazepam IV {doses.lor} · levetiracetam {doses.lev} · fosphenytoin {doses.fos} · valproate {doses.val}
        </p>
      )}
    </ToolFrame>
  )
}

export default function AcuteCare() {
  return (
    <div className="space-y-10">
      <PageHeader module={mod} refs={['pat-2010', 'pals-2020', 'anaphylaxis-2023', 'aes-se-2016', 'ten4-2021']} />
      <OnThisPage
        items={[
          { id: 'assessment', label: 'Rapid assessment' },
          { id: 'vitals', label: 'Vitals' },
          { id: 'dosing', label: 'Dosing safety' },
          { id: 'anaphylaxis', label: 'Anaphylaxis' },
          { id: 'status', label: 'Status epilepticus' },
          { id: 'abuse', label: 'Child abuse' },
        ]}
      />

      <Section id="assessment" title="Rapid assessment: the general impression" refs={['pat-2010']}>
        <PatTool />
        <QuickCheck question={getQuestion('em-pat-resp-failure')} />
        <QuickCheck question={getQuestion('em-pat-shock')} />
      </Section>

      <Section id="vitals" title="Vital signs and weight" refs={['pals-2020']}>
        <VitalsTool />
        <div className="grid gap-4 md:grid-cols-2">
          <DataTable
            caption="Heart and respiratory rates (PALS)"
            head={['Age', 'HR awake', 'RR']}
            rows={vitalBands.map((b) => [b.label, `${b.hrAwake[0]}–${b.hrAwake[1]}`, `${b.rr[0]}–${b.rr[1]}`])}
          />
          <DataTable caption="Normal blood pressure (PALS)" head={['Age', 'Systolic', 'Diastolic']} rows={bpBands.map((b) => [b.label, `${b.sbp[0]}–${b.sbp[1]}`, `${b.dbp[0]}–${b.dbp[1]}`])} />
        </div>
        <Callout tone="pearl">
          Tachycardia and prolonged capillary refill appear long before hypotension. Weight: use a measured weight; if impossible, a length-based tape beats age formulas (APLS formulas underestimate in populations with high obesity rates).
        </Callout>
        <QuickCheck question={getQuestion('em-hypotension')} />
        <QuickCheck question={getQuestion('em-weight')} />
      </Section>

      <Section id="dosing" title="Dosing safety">
        <DoseTool />
        <div className="grid gap-4 md:grid-cols-2">
          <Callout tone="pitfall" title="How 10-fold and dosing errors happen">
            <Bullets
              items={[
                'Weight recorded in pounds or estimated — always weigh in kilograms.',
                'mg/kg/dose confused with mg/kg/day.',
                'Wrong concentration (infant vs children’s ibuprofen; diluted vs concentrated solutions).',
                'Trailing zeros (“1.0 mg” read as 10) or missing leading zeros (“.5”).',
                'Household spoons — prescribe in mL and give an oral syringe.',
              ]}
            />
          </Callout>
          <Callout tone="action" title="Habits that prevent them">
            <Bullets
              items={[
                'Write mg/kg, the calculated mg, and mL together so errors are visible.',
                'Never exceed the adult dose, whatever the weight.',
                'Independent double-check for high-alert drugs (opioids, insulin, sedatives, electrolytes).',
                'Use dosing by actual body weight for most drugs, but cap at adult doses in children with obesity.',
              ]}
            />
          </Callout>
        </div>
        <QuickCheck question={getQuestion('em-dose-amox')} />
        <QuickCheck question={getQuestion('em-acetaminophen')} />
      </Section>

      <Section id="anaphylaxis" title="Anaphylaxis" refs={['anaphylaxis-2023', 'aap-epi-2017', 'neffy-2025']}>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel title="Recognize (either)">
            <Bullets
              items={[
                'Acute skin/mucosal involvement (hives, flushing, lip/tongue swelling) PLUS respiratory compromise, low BP/end-organ dysfunction, or severe GI symptoms.',
                'OR after exposure to a likely allergen: acute hypotension, bronchospasm or laryngeal involvement — even without skin signs.',
                'Infants: sudden irritability, lethargy, vomiting, pallor; skin signs can be subtle.',
              ]}
            />
          </Panel>
          <Callout tone="action" title="Treat">
            <Bullets
              items={[
                'IM epinephrine 0.01 mg/kg (1 mg/mL) in the anterolateral thigh — max 0.3 mg prepubertal, 0.5 mg adolescents. Repeat every 5–15 min as needed.',
                'Lie flat with legs raised (do not sit or stand suddenly); position of comfort if breathing is hard.',
                'Oxygen; IV isotonic fluid 20 mL/kg if hypotensive; albuterol for persistent wheeze after epinephrine.',
                'Not responding to 2–3 IM doses: epinephrine infusion with expert help.',
                'Antihistamines and steroids are adjuncts only and do not prevent biphasic reactions.',
              ]}
            />
          </Callout>
        </div>
        <Panel title="Before discharge">
          <Bullets
            items={[
              'Observe longer for severe reactions or if >1 epinephrine dose was needed.',
              'Prescribe two epinephrine devices (auto-injector 0.1/0.15/0.3 mg by weight, or nasal spray 1 mg for 15–<30 kg or 2 mg for ≥30 kg), teach use, and give a written action plan.',
              'Refer to an allergist; identify and avoid the trigger.',
            ]}
          />
        </Panel>
        <QuickCheck question={getQuestion('em-anaphylaxis')} />
        <QuickCheck question={getQuestion('em-autoinjector')} />
        <QuickCheck question={getQuestion('em-anaph-discharge')} />
      </Section>

      <Section id="status" title="Convulsive status epilepticus" refs={['aes-se-2016', 'esett-2019', 'consept-eclipse-2019']}>
        <p className="prose-clinical">
          Treat any seizure lasting <strong>≥5 minutes</strong> (or repeated seizures without recovery) as status epilepticus. Delay makes seizures harder to stop.
        </p>
        <SeizureTimer />
        <Callout tone="pearl">
          Neonates: phenobarbital is first-line; check glucose, calcium, magnesium and sodium; consider pyridoxine for refractory neonatal seizures and HSV in the first weeks.
        </Callout>
        <QuickCheck question={getQuestion('em-se-benzo')} />
        <QuickCheck question={getQuestion('em-se-second')} />
      </Section>

      <Section id="abuse" title="Recognize physical abuse" refs={['ten4-2021', 'aap-abuse-2015']}>
        <div className="grid gap-4 md:grid-cols-2">
          <Callout tone="redflag" title="TEN-4-FACESp bruising rule">
            <Bullets
              items={[
                'Any bruise in an infant ≤4.99 months.',
                'In children <4 years: bruising on the Torso, Ears, Neck; or Frenulum, Angle of jaw, Cheeks (fleshy), Eyelids, Subconjunctivae; or patterned bruising.',
                '“Those who don’t cruise rarely bruise.” Sentinel injuries often precede severe abuse.',
              ]}
            />
          </Callout>
          <Panel title="Other red flags and work-up">
            <Bullets
              items={[
                'History absent, changing, or inconsistent with the injury or development; delayed care.',
                'Fractures: rib or classic metaphyseal fractures in infants; femur fracture in a non-ambulatory child.',
                'Skeletal survey for all children <2 years with suspected physical abuse; consider head imaging (especially infants) and screen for abdominal injury (liver enzymes, lipase, urinalysis).',
                'Report reasonable suspicion — certainty is not required. Assess siblings.',
              ]}
            />
          </Panel>
        </div>
        <QuickCheck question={getQuestion('em-ten4')} />
      </Section>

      <ModuleFooter module={mod} />
    </div>
  )
}
