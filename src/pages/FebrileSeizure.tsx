import { useState } from 'react'
import { moduleById } from '@/content/modules'
import { getQuestion } from '@/content/questions'
import { Bullets, DataTable, ModuleFooter, OnThisPage, PageHeader, Panel, Section, ToolFrame } from '@/components/learn/Blocks'
import { Callout } from '@/components/learn/Callout'
import { NumberField, Result, Toggle } from '@/components/learn/Controls'
import { QuickCheck } from '@/components/learn/QuestionCard'
import { classifyFebrileSeizure, recurrenceRiskLabel, type FsInput, type RecurrenceFactors } from '@/lib/clinical/febrileSeizure'
import { num } from '@/lib/utils'

const mod = moduleById.seizures

const lpText: Record<string, string> = {
  perform: 'LP should be performed',
  option: 'LP is an option',
  individualize: 'LP: individualize',
  'not-routine': 'LP not routinely indicated',
}

function ClassifierTool() {
  const [age, setAge] = useState('18')
  const [temp, setTemp] = useState('39.4')
  const [dur, setDur] = useState('3')
  const [flags, setFlags] = useState({
    focal: false,
    recurredWithin24h: false,
    meningealSignsOrCnsInfectionConcern: false,
    priorAfebrileSeizure: false,
    hibOrPcvIncompleteOrUnknown: false,
    pretreatedWithAntibiotics: false,
    backToBaselineWithin1h: true,
  })
  const a = num(age)
  const t = num(temp)
  const d = num(dur)
  const r =
    a !== null && t !== null && d !== null
      ? classifyFebrileSeizure({ ageMonths: a, tempC: t, durationMin: d, ...flags } satisfies FsInput)
      : null
  const set = (k: keyof typeof flags, v: boolean) => setFlags((s) => ({ ...s, [k]: v }))
  return (
    <ToolFrame id="tool-fs" title="Febrile seizure classifier & LP decision" description="Applies the AAP 2011 definition and lumbar-puncture indications." refs={['aap-fs-2011']}>
      <div className="grid gap-4 sm:grid-cols-3">
        <NumberField label="Age" value={age} onChange={setAge} unit="months" min={0} max={216} />
        <NumberField label="Temperature" value={temp} onChange={setTemp} unit="°C" min={34} max={43} />
        <NumberField label="Seizure duration" value={dur} onChange={setDur} unit="min" min={0} max={240} />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <Toggle label="Focal onset or features (incl. Todd paresis)" checked={flags.focal} onChange={(v) => set('focal', v)} />
        <Toggle label="Another seizure within 24 h" checked={flags.recurredWithin24h} onChange={(v) => set('recurredWithin24h', v)} />
        <Toggle label="Meningeal signs or suspected CNS infection" hint="Neck stiffness, bulging fontanelle, Kernig/Brudzinski, toxic appearance" checked={flags.meningealSignsOrCnsInfectionConcern} onChange={(v) => set('meningealSignsOrCnsInfectionConcern', v)} />
        <Toggle label="Prior afebrile seizure" checked={flags.priorAfebrileSeizure} onChange={(v) => set('priorAfebrileSeizure', v)} />
        <Toggle label="Hib or pneumococcal vaccines incomplete/unknown" checked={flags.hibOrPcvIncompleteOrUnknown} onChange={(v) => set('hibOrPcvIncompleteOrUnknown', v)} />
        <Toggle label="On antibiotics before the seizure" checked={flags.pretreatedWithAntibiotics} onChange={(v) => set('pretreatedWithAntibiotics', v)} />
        <Toggle label="Back to baseline within ~1 hour" checked={flags.backToBaselineWithin1h} onChange={(v) => set('backToBaselineWithin1h', v)} />
      </div>
      {r && (
        <Result tone={r.classification === 'simple' ? 'good' : r.classification === 'not-febrile-seizure' ? 'bad' : 'warn'} title={r.label}>
          <Bullets items={r.reasons} />
          <p>
            <strong>{lpText[r.lumbarPuncture]}.</strong> {r.lpReason}
          </p>
          <Bullets items={r.workup} />
          {r.warnings.length > 0 && <p className="font-medium text-rose-700 dark:text-rose-300">{r.warnings.join(' ')}</p>}
        </Result>
      )}
    </ToolFrame>
  )
}

function RecurrenceTool() {
  const [f, setF] = useState<RecurrenceFactors>({
    firstSeizureUnder18Months: true,
    firstDegreeRelativeWithFs: false,
    lowTempAtSeizure: false,
    shortFeverDuration: false,
  })
  const r = recurrenceRiskLabel(f)
  const set = (k: keyof RecurrenceFactors, v: boolean) => setF((s) => ({ ...s, [k]: v }))
  return (
    <ToolFrame id="tool-recurrence" title="Recurrence risk (for counseling)" refs={['aap-fs-2008']}>
      <div className="grid gap-2 sm:grid-cols-2">
        <Toggle label="First febrile seizure before 18 months" checked={f.firstSeizureUnder18Months} onChange={(v) => set('firstSeizureUnder18Months', v)} />
        <Toggle label="Febrile seizures in a parent or sibling" checked={f.firstDegreeRelativeWithFs} onChange={(v) => set('firstDegreeRelativeWithFs', v)} />
        <Toggle label="Relatively low temperature at the seizure (<40 °C)" checked={f.lowTempAtSeizure} onChange={(v) => set('lowTempAtSeizure', v)} />
        <Toggle label="Seizure <1 hour after fever onset" checked={f.shortFeverDuration} onChange={(v) => set('shortFeverDuration', v)} />
      </div>
      <Result tone={r.count >= 3 ? 'warn' : 'info'} title={`Recurrence risk: ${r.label}`}>
        <p>Overall about 1 in 3 children have another febrile seizure (≈50% if the first occurred before 12 months). Most recurrences happen within a year.</p>
      </Result>
    </ToolFrame>
  )
}

export default function FebrileSeizure() {
  return (
    <div className="space-y-10">
      <PageHeader module={mod} refs={['aap-fs-2011', 'aap-fs-2008', 'aes-se-2016']} />
      <OnThisPage
        items={[
          { id: 'define', label: 'Definition' },
          { id: 'evaluate', label: 'Evaluation & LP' },
          { id: 'manage', label: 'Acute management' },
          { id: 'counsel', label: 'Counseling' },
          { id: 'mimics', label: 'Mimics & look-alikes' },
        ]}
      />

      <Section id="define" title="Definition and classification" refs={['aap-fs-2011']}>
        <p className="prose-clinical">
          A seizure with fever ≥38.0 °C in a child aged <strong>6–60 months</strong> without CNS infection, metabolic disturbance, or prior afebrile seizures. Affects 2–5% of children, peak 12–18 months, usually on the first day of fever (often the first sign of illness).
        </p>
        <DataTable
          head={['', 'Simple (≈70–75%)', 'Complex (any one)']}
          rows={[
            ['Type', 'Generalized', 'Focal features or postictal focal deficit'],
            ['Duration', '<15 minutes', '≥15 minutes (≥30 min = febrile status epilepticus)'],
            ['Recurrence in 24 h', 'No', 'Yes'],
          ]}
        />
        <ClassifierTool />
        <QuickCheck question={getQuestion('fs-complex')} />
      </Section>

      <Section id="evaluate" title="Evaluation after a simple febrile seizure" refs={['aap-fs-2011']}>
        <div className="grid gap-4 md:grid-cols-2">
          <Callout tone="action" title="Do">
            <Bullets
              items={[
                'Find the fever source (history, exam; urine testing as you would for any febrile child of that age).',
                'LP when meningeal signs are present or history/exam suggests intracranial infection.',
                'Consider LP (option) at 6–12 months with deficient/unknown Hib or pneumococcal immunization, and after antibiotic pretreatment.',
                'Observe until back to baseline; most children go home.',
              ]}
            />
          </Callout>
          <Callout tone="pitfall" title="Don’t (for the seizure itself)">
            <Bullets items={['EEG', 'CT or MRI', 'Electrolytes, calcium, phosphorus, magnesium, glucose or CBC', 'Admission solely because of the seizure']} />
          </Callout>
        </div>
        <Callout tone="evidence" title="Outdated advice to unlearn">
          The 1996 AAP parameter advised strongly considering LP in all infants &lt;12 months and considering it at 12–18 months. With Hib and pneumococcal vaccines, bacterial meningitis presenting as a simple febrile seizure in a well-appearing, immunized child is very rare, so the 2011 guideline dropped routine LP.
        </Callout>
        <QuickCheck question={getQuestion('fs-simple-workup')} />
        <QuickCheck question={getQuestion('fs-lp-option')} />
      </Section>

      <Section id="manage" title="Acute management" refs={['aes-se-2016']}>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel title="During the seizure (teach caregivers)">
            <Bullets items={['Time it. Place on the side on a safe surface; loosen clothing.', 'Nothing in the mouth; do not restrain; no bath to cool.', 'Call emergency services if it lasts ≥5 minutes, breathing is impaired, or it is the first seizure and they are unsure.', 'Give prescribed rescue medicine at 5 minutes.']} />
          </Panel>
          <Panel title="Clinician">
            <Bullets
              items={[
                'Seizing ≥5 min: benzodiazepine (IN/IM midazolam 0.2 mg/kg, max 10 mg; IV lorazepam 0.1 mg/kg, max 4 mg). Follow the status epilepticus pathway (Module 9).',
                'Check glucose if seizure prolonged or slow recovery.',
                'After recovery: full exam for focal deficits and meningeal signs; treat the fever for comfort.',
              ]}
            />
          </Panel>
        </div>
        <QuickCheck question={getQuestion('fs-rescue')} />
        <QuickCheck question={getQuestion('fs-status')} />
      </Section>

      <Section id="counsel" title="Counseling with real numbers" refs={['aap-fs-2008']}>
        <RecurrenceTool />
        <div className="grid gap-4 md:grid-cols-2">
          <Panel title="What families need to hear">
            <Bullets
              items={[
                'Simple febrile seizures do not cause brain damage, lower intelligence, or meaningfully raise epilepsy risk (≈1–2%, close to the general population).',
                'Epilepsy risk is higher (several-fold) with complex features, febrile status, abnormal development, or family history of epilepsy.',
                'They are outgrown — rare after age 5–6.',
                'Keep vaccinating on schedule; fever after vaccines can trigger a seizure as any fever can (MMRV as a first dose carries a small extra risk).',
              ]}
            />
          </Panel>
          <Panel title="What doesn’t help">
            <Bullets
              items={[
                'Antipyretics do not prevent recurrence — use them for comfort.',
                'Daily or intermittent anticonvulsant prophylaxis is not recommended for simple febrile seizures (harms outweigh benefits).',
                'Rescue benzodiazepine (intranasal midazolam, rectal or nasal diazepam) is reasonable for prior prolonged seizures or limited access to emergency care.',
              ]}
            />
          </Panel>
        </div>
        <QuickCheck question={getQuestion('fs-antipyretics')} />
        <QuickCheck question={getQuestion('fs-recurrence')} />
        <QuickCheck question={getQuestion('fs-epilepsy-risk')} />
      </Section>

      <Section id="mimics" title="Mimics and look-alikes">
        <DataTable
          head={['Condition', 'Clue']}
          rows={[
            ['Rigors / febrile myoclonus', 'Shivering, no loss of consciousness, stops when touched or held'],
            ['Meningitis / encephalitis', 'Meningeal signs, toxic appearance, prolonged altered consciousness, focal deficits, petechiae'],
            ['Dravet syndrome (SCN1A)', 'Prolonged, often hemiclonic febrile seizures in the first year (often 5–8 months) → genetic testing; avoid sodium-channel blockers'],
            ['Breath-holding spell', 'Provoked by crying or minor injury, cyanosis or pallor before loss of tone'],
            ['Electrolyte disturbance / hypoglycemia', 'Vomiting, diarrhea, diluted formula, prolonged postictal state'],
            ['Abusive head trauma', 'Infant, unexplained vomiting/irritability, bruising, inconsistent history'],
          ]}
        />
      </Section>

      <ModuleFooter module={mod} />
    </div>
  )
}
