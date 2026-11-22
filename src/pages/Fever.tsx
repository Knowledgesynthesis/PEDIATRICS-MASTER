import { useState } from 'react'
import { moduleById } from '@/content/modules'
import { getQuestion } from '@/content/questions'
import { Bullets, DataTable, ModuleFooter, OnThisPage, PageHeader, Panel, Section, ToolFrame } from '@/components/learn/Blocks'
import { Callout } from '@/components/learn/Callout'
import { NumberField, Result, Segmented, Toggle } from '@/components/learn/Controls'
import { QuickCheck } from '@/components/learn/QuestionCard'
import { UtiLab } from '@/components/learn/UtiLab'
import { febrileInfantPathway, type Eligibility, type PathwayInput } from '@/lib/clinical/febrileInfant'
import { num } from '@/lib/utils'

const mod = moduleById.fever

const lpLabel: Record<string, string> = {
  required: 'Lumbar puncture: required',
  consider: 'Lumbar puncture: strongly consider',
  optional: 'Lumbar puncture: optional (shared decision)',
  'not-needed': 'Lumbar puncture: not needed',
  pending: 'Lumbar puncture: decide after inflammatory markers',
}

function FebrileInfantTool() {
  const [age, setAge] = useState('35')
  const [elig, setElig] = useState<Eligibility>({
    wellAppearing: true,
    term: true,
    focalBacterialInfection: false,
    clinicalBronchiolitis: false,
    complexMedicalCondition: false,
    vaccinatedLast48h: false,
  })
  const [ua, setUa] = useState<PathwayInput['ua']>('negative')
  const [temp, setTemp] = useState('38.4')
  const [pct, setPct] = useState('')
  const [anc, setAnc] = useState('')
  const [crp, setCrp] = useState('')
  const [crpUnit, setCrpUnit] = useState<'mg/L' | 'mg/dL'>('mg/L')
  const [csf, setCsf] = useState<PathwayInput['csf']>('not-obtained')

  const ageDays = num(age)
  const crpVal = num(crp)
  const input: PathwayInput | null =
    ageDays !== null && ageDays >= 0
      ? {
          ageDays,
          eligibility: elig,
          ua,
          im: { tempC: num(temp), pct: num(pct), anc: num(anc), crpMgL: crpVal === null ? null : crpUnit === 'mg/dL' ? crpVal * 10 : crpVal },
          csf,
        }
      : null
  const r = input ? febrileInfantPathway(input) : null
  const setE = (k: keyof Eligibility, v: boolean) => setElig((s) => ({ ...s, [k]: v }))
  const tempNum = num(temp)

  return (
    <ToolFrame id="tool-febrile-infant" title="Febrile infant 8–60 days (AAP 2021)" description="Fever = ≥38.0 °C (rectal) at home or in clinic. Enter what you know; the plan updates as results arrive." refs={['aap-febrile-infant-2021']}>
      <div className="grid gap-4 md:grid-cols-3">
        <NumberField label="Age" value={age} onChange={setAge} unit="days" min={0} max={120} />
        <NumberField label="Highest temperature" value={temp} onChange={setTemp} unit="°C" min={34} max={43} />
        <Segmented label="Urinalysis" value={ua} onChange={setUa} options={[{ value: 'pending', label: 'Pending' }, { value: 'negative', label: 'Negative' }, { value: 'positive', label: 'Positive' }]} />
      </div>
      {tempNum !== null && tempNum < 38 && <p className="text-sm text-amber-600 dark:text-amber-400">Below 38.0 °C — the pathway applies to documented fever.</p>}
      <div>
        <p className="mb-2 text-sm font-semibold">Eligibility (all must fit for the guideline to apply)</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <Toggle label="Well-appearing" checked={elig.wellAppearing} onChange={(v) => setE('wellAppearing', v)} />
          <Toggle label="Born ≥37 weeks" checked={elig.term} onChange={(v) => setE('term', v)} />
          <Toggle label="Focal bacterial infection (cellulitis, omphalitis, septic joint)" checked={elig.focalBacterialInfection} onChange={(v) => setE('focalBacterialInfection', v)} />
          <Toggle label="Clinical bronchiolitis" checked={elig.clinicalBronchiolitis} onChange={(v) => setE('clinicalBronchiolitis', v)} />
          <Toggle label="Complex chronic condition" checked={elig.complexMedicalCondition} onChange={(v) => setE('complexMedicalCondition', v)} />
          <Toggle label="Vaccinated in the prior 48 h" checked={elig.vaccinatedLast48h} onChange={(v) => setE('vaccinatedLast48h', v)} />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <NumberField label="Procalcitonin" value={pct} onChange={setPct} unit="ng/mL" min={0} max={200} hint="Abnormal >0.5" />
        <NumberField label="ANC" value={anc} onChange={setAnc} unit="/mm³" min={0} max={60000} hint="Abnormal >4,000 (4,000–5,200)" />
        <NumberField label="CRP" value={crp} onChange={setCrp} unit={crpUnit} min={0} max={500} hint={crpUnit === 'mg/L' ? 'Abnormal >20 mg/L' : 'Abnormal >2.0 mg/dL'} />
        <Segmented label="CRP units" value={crpUnit} onChange={setCrpUnit} options={[{ value: 'mg/L', label: 'mg/L' }, { value: 'mg/dL', label: 'mg/dL' }]} />
      </div>
      <Segmented label="CSF (if obtained)" value={csf} onChange={setCsf} options={[{ value: 'not-obtained', label: 'Not obtained' }, { value: 'normal', label: 'Normal' }, { value: 'pleocytosis', label: 'Pleocytosis' }]} />
      {r && (
        <Result tone={!r.inScope ? 'bad' : r.lumbarPuncture === 'not-needed' ? 'good' : r.lumbarPuncture === 'pending' ? 'info' : 'warn'} title={r.inScope ? `${r.group} days pathway` : 'Outside the guideline'}>
          {r.scopeNote && <p className="font-medium">{r.scopeNote}</p>}
          {r.imAssessment && (r.imAssessment.abnormal || r.imAssessment.complete) && (
            <p>
              <strong>Inflammatory markers:</strong> {r.imAssessment.abnormal ? `abnormal — ${r.imAssessment.reasons.join('; ')}` : 'all normal'}
            </p>
          )}
          <p>
            <strong>Tests:</strong> {r.tests.join(' · ')}
          </p>
          <p>
            <strong>{lpLabel[r.lumbarPuncture]}</strong>
          </p>
          <p>
            <strong>Antimicrobials:</strong> {r.antibiotics}
          </p>
          <p>
            <strong>Disposition:</strong> {r.disposition}
          </p>
        </Result>
      )}
    </ToolFrame>
  )
}

export default function Fever() {
  return (
    <div className="space-y-10">
      <PageHeader module={mod} refs={['aap-febrile-infant-2021', 'aap-uti-2026', 'phoenix-2024', 'ssc-peds-2026', 'aha-kd-2024']} />
      <OnThisPage
        items={[
          { id: 'basics', label: 'Fever basics' },
          { id: 'infant', label: 'Febrile infant' },
          { id: 'uti', label: 'UTI' },
          { id: 'meningitis', label: 'Meningitis' },
          { id: 'sepsis', label: 'Sepsis' },
          { id: 'kawasaki', label: 'Kawasaki' },
          { id: 'measles', label: 'Measles' },
        ]}
      />

      <Section id="basics" title="Fever basics that change management" refs={['aap-fever-2011']}>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel title="Facts for families">
            <Bullets
              items={[
                'Fever is a physiologic response; it does not cause brain damage. Treat discomfort, not the number.',
                'Antipyretics do not prevent febrile seizures. Routine alternating of acetaminophen and ibuprofen is not recommended (dosing errors).',
                'No aspirin in children (Reye syndrome) except specific indications such as Kawasaki disease.',
                'Return for: poor feeding/fewer wet diapers, breathing difficulty, non-blanching rash, unusual sleepiness, fever >5 days, or any fever in an infant <3 months.',
              ]}
            />
          </Panel>
          <Panel title="Fever without a source">
            <Bullets
              items={[
                '<8 days or ill-appearing at any age: full sepsis evaluation and empiric antibiotics.',
                '8–60 days, well: risk-stratify with the AAP 2021 pathway (below).',
                '2–24 months, immunized: occult bacteremia is now rare (<1%); UTI is the most common serious bacterial infection — test urine based on risk (e.g., UTICalc).',
                'Fever ≥5 days: think Kawasaki disease, UTI, occult abscess, malignancy, and MIS-C.',
              ]}
            />
          </Panel>
        </div>
      </Section>

      <Section id="infant" title="Well-appearing febrile infants 8–60 days" refs={['aap-febrile-infant-2021', 'pecarn-febrile-2019']}>
        <FebrileInfantTool />
        <Callout tone="pearl" title="Why age bands?">
          Invasive bacterial infection (bacteremia/meningitis) risk falls with each week of life, and inflammatory markers cannot safely identify low-risk infants in the first 3 weeks. Procalcitonin is the single best marker; urinary tract infection is the most common bacterial infection at every age band.
        </Callout>
        <QuickCheck question={getQuestion('fev-14d')} />
        <QuickCheck question={getQuestion('fev-25d-abn-pct')} />
        <QuickCheck question={getQuestion('fev-45d-low')} />
      </Section>

      <Section id="uti" title="Pediatric urinary tract infection: AAP 2026" refs={['aap-uti-2026', 'aap-uti-diagnosis-2026', 'aap-uti-figures-2026']}>
        <p>The 2026 guideline covers children from 8 days to 5 years; individual recommendations have specific age cutoffs. The lab anchors below are for children with low medical complexity and a compatible presentation.</p>
        <Panel title="Get a usable specimen before antibiotics">
          <Bullets items={[
            'Consider UTI in a young child with fever without a source or an older child with dysuria, frequency, or new urgency. Evaluate promptly; do not wait in a sick child or one at higher risk.',
            'Under 2 months: use catheter urine or suprapubic aspiration for culture. At 2–24 months, Figure 2 uses catheter urine for culture; if an initial bag or stimulated-void screen is positive, repeat UA and obtain culture by catheter. Beyond 24 months, Figure 3 uses clean catch when feasible or a catheter specimen. Never diagnose UTI from a bag culture.',
          ]} />
        </Panel>
        <p className="text-sm text-muted-foreground">UA = urinalysis; LE = leukocyte esterase; WBC/hpf = white blood cells per high-powered field.</p>
        <DataTable
          head={['Age', 'While culture is pending', 'With a qualifying culture', 'Single uropathogen']}
          rows={[
            ['8 days to <2 months', '≥5 WBC/hpf or trace LE or higher', '≥5 WBC/hpf or trace LE or higher', '≥10,000 CFU/mL by catheter or suprapubic aspiration'],
            ['2 months to 5 years', '≥10 WBC/hpf or 2+ LE or higher', '≥5 WBC/hpf or 1+ LE or higher', '≥10,000 CFU/mL by catheter; ≥100,000 CFU/mL by clean catch'],
          ]}
        />
        <Callout tone="pearl" title="Collecting culture is not the same decision as starting antibiotics">
          At age ≥2 months, 5–9 WBC/hpf or 1+ LE can warrant a properly collected culture without automatic empiric antibiotics. These are decision anchors, not rule-outs. Review clinical risk, specimen quality and antibiotic exposure; mixed growth usually suggests contamination, and growth alone without inflammation is not proof of UTI.
        </Callout>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel title="Treat: age, severity, and response">
            <Bullets items={[
              'Days 8–28 inclusive with diagnosed UTI: start parenteral treatment; consider early oral transition after improvement. Over 28 days and under 5 years: favor oral therapy when tolerated and there is no other reason for admission. For infants 8–60 days, follow the separate febrile-infant pathway for invasive infection risk and disposition; UTI does not replace it.',
              'KAS 2 conditionally suggests 5–7 days for low-risk febrile UTI at 2–24 months or older children with suspected pyelonephritis and no known urinary tract anomaly; 3–5 days for low-risk afebrile cystitis at age ≥2 years within guideline scope. Individualize for age <2 months, bacteremia, urinary tract anomalies or poor response.',
              'Use local susceptibility data, then narrow or stop therapy when results and clinical reassessment support it. Nitrofurantoin is not appropriate for pyelonephritis.',
            ]} />
          </Panel>
          <Panel title="Image after a confirmed febrile UTI">
            <Bullets items={[
              'First febrile UTI before age 5: obtain renal and bladder ultrasound (RBUS) for structural abnormalities, typically after symptoms resolve, but sooner if urgent (e.g., suspected obstruction or severe/atypical illness). A normal RBUS does not rule out reflux.',
              'Normal RBUS: no routine voiding cystourethrography (VCUG). Selected exceptions include age <1 month, non–E. coli, circumcised males, a complicated course, or unreliable follow-up.',
              'Offer VCUG for clinically relevant RBUS abnormalities or a second febrile UTI at age <2 years; at age ≥2 years, offer after a second febrile UTI when no alternative risk factor explains it. Ask about constipation and bladder–bowel dysfunction in recurrent cases.',
            ]} />
          </Panel>
        </div>
        <UtiLab id="tool-uti-2026" />
        <QuickCheck question={getQuestion('fev-bag-urine')} />
        <QuickCheck question={getQuestion('fev-uti-imaging')} />
      </Section>

      <Section id="meningitis" title="Bacterial meningitis" refs={['red-book']}>
        <DataTable
          head={['Age', 'Likely organisms', 'Empiric therapy']}
          rows={[
            ['≤28 days', 'GBS, E. coli, Listeria (rare); HSV encephalitis', 'Ampicillin + gentamicin, or ampicillin + ceftazidime/cefepime (meningitic doses); + acyclovir if HSV possible. Cefotaxime is no longer marketed in the U.S.; avoid ceftriaxone with hyperbilirubinemia or IV calcium'],
            ['29 days–3 months', 'GBS, E. coli, S. pneumoniae, N. meningitidis', 'Vancomycin + ceftriaxone 100 mg/kg/day; some pathways add ampicillin in young infants'],
            ['>3 months', 'S. pneumoniae, N. meningitidis (Hib if unimmunized)', 'Vancomycin + ceftriaxone 100 mg/kg/day (÷ q12h, max 4 g/day)'],
          ]}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Panel title="Sequence">
            <Bullets
              items={[
                'Blood culture → antibiotics immediately → LP when safe. Never delay antibiotics for imaging or LP in an unstable child.',
                'CT before LP only for focal deficits, papilledema, altered consciousness with herniation signs, or immunocompromise.',
                'Dexamethasone 0.15 mg/kg IV q6h × 2–4 days: indicated for Hib; consider for pneumococcal meningitis in children ≥6 weeks. Give before or with the first antibiotic dose. Not for neonates.',
                'All survivors of bacterial meningitis need audiology testing.',
              ]}
            />
          </Panel>
          <Panel title="CSF patterns">
            <Bullets
              items={[
                'Bacterial: WBC often >1,000/µL, neutrophils; glucose low (<40 mg/dL or CSF:serum <0.4); protein high.',
                'Viral (enterovirus): WBC tens–hundreds, lymphocytes (neutrophils early); normal glucose.',
                'HSV: lymphocytes, RBCs; PCR confirms. Normal CSF WBC upper limits: ≈19/µL at 0–28 days, ≈9/µL at 29–56 days.',
                'Antibiotic pretreatment lowers Gram stain/culture yield but rarely normalizes cell count or glucose.',
              ]}
            />
          </Panel>
        </div>
        <QuickCheck question={getQuestion('fev-mening-empiric')} />
        <QuickCheck question={getQuestion('fev-mening-ppx')} />
      </Section>

      <Section id="sepsis" title="Sepsis and septic shock" refs={['phoenix-2024', 'ssc-peds-2026', 'ssc-peds-2020', 'feast-2011']}>
        <DataTable
          caption="Phoenix Sepsis Score (worst values in the first 24 h; sepsis = suspected infection + score ≥2; septic shock = sepsis + ≥1 cardiovascular point)"
          head={['Organ system', 'Points', 'What earns points']}
          rows={[
            ['Respiratory', '0–3', 'Any respiratory support with PaO₂:FiO₂ <400 (or SpO₂:FiO₂ <292); more points for lower ratios on invasive ventilation'],
            ['Cardiovascular', '0–6', 'Vasoactive drugs (1 drug = 1, ≥2 = 2), lactate (5–10.9 = 1, ≥11 mmol/L = 2), age-based low mean arterial pressure (1–2)'],
            ['Coagulation', '0–2', '1 point each (max 2): platelets <100,000, INR >1.3, D-dimer >2 mg/L FEU, fibrinogen <100 mg/dL'],
            ['Neurologic', '0–2', 'GCS ≤10 = 1; bilaterally fixed pupils = 2'],
          ]}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Callout tone="action" title="First hour (septic shock)">
            <Bullets
              items={[
                'Recognize; IV/IO access; blood culture (do not delay antibiotics); lactate, glucose, ionized calcium.',
                'Broad-spectrum antibiotics within 1 hour of recognizing shock (within 3 h for sepsis without shock).',
                'With intensive care available: 10–20 mL/kg balanced crystalloid boluses, up to 40–60 mL/kg in the first hour, reassessing after each (stop for hepatomegaly, crackles, rising work of breathing).',
                'Fluid-refractory shock: epinephrine or norepinephrine — peripheral infusion is acceptable while central access is arranged. Hydrocortisone for catecholamine-refractory shock.',
              ]}
            />
          </Callout>
          <Callout tone="pitfall" title="Context matters">
            <Bullets
              items={[
                'Without intensive care, in children without hypotension: no boluses — maintenance fluids only (strong recommendation; FEAST trial harm).',
                'Without intensive care, with hypotension: up to 40 mL/kg in 10–20 mL/kg boluses in the first hour.',
                'Hypotension is late: tachycardia, prolonged capillary refill and altered mental status come first.',
                'Empiric choice: ceftriaxone ± vancomycin for community sepsis; add clindamycin for toxic shock; anti-pseudomonal coverage if immunocompromised or hospital-acquired.',
              ]}
            />
          </Callout>
        </div>
        <QuickCheck question={getQuestion('fev-phoenix')} />
        <QuickCheck question={getQuestion('fev-sepsis-fluids')} />
      </Section>

      <Section id="kawasaki" title="Kawasaki disease" refs={['aha-kd-2017', 'aha-kd-2024']}>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel title="Complete KD: fever ≥5 days + ≥4 of">
            <Bullets
              items={[
                'Bilateral bulbar conjunctival injection without exudate (limbal sparing)',
                'Oral changes: red cracked lips, strawberry tongue, diffuse erythema',
                'Polymorphous rash (not vesicular)',
                'Extremities: erythema/edema of hands and feet (acute); periungual peeling (weeks 2–3)',
                'Cervical lymphadenopathy ≥1.5 cm, usually unilateral',
              ]}
            />
          </Panel>
          <Panel title="Incomplete KD">
            <Bullets
              items={[
                'Fever ≥5 days with 2–3 criteria, or infants with ≥7 days of unexplained fever → CRP and ESR.',
                'CRP ≥3.0 mg/dL and/or ESR ≥40 → ≥3 supplemental findings (albumin ≤3.0 g/dL, anemia for age, raised ALT, platelets ≥450,000 after day 7, WBC ≥15,000, urine ≥10 WBC/hpf) OR a positive echocardiogram → treat.',
                'Infants <6 months are most likely to be incomplete and to develop aneurysms.',
              ]}
            />
          </Panel>
        </div>
        <Callout tone="action" title="Treat">
          <Bullets
            items={[
              'IVIG 2 g/kg as a single infusion, ideally within 10 days of fever onset (still give later if fever or inflammation persist) + aspirin (moderate or high dose until afebrile, then 3–5 mg/kg/day until a normal echo at 4–6 weeks).',
              'High risk (age <6 months, coronary Z ≥2.5 at diagnosis): consider adding corticosteroids or infliximab to initial IVIG (AHA 2024).',
              'Echocardiogram at diagnosis, 1–2 weeks and 4–6 weeks. Persistent fever ≥36 h after IVIG = resistance → second IVIG, infliximab or steroids.',
              'Defer MMR/varicella 11 months after IVIG. Avoid ibuprofen with aspirin; give inactivated influenza vaccine.',
              'MIS-C overlaps: older children, GI symptoms, shock/myocardial dysfunction, lymphopenia, very high BNP/troponin, SARS-CoV-2 exposure.',
            ]}
          />
        </Callout>
        <QuickCheck question={getQuestion('fev-kd')} />
      </Section>

      <Section id="measles" title="Measles — recognize it in 60 seconds" refs={['red-book', 'measles-2026']}>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel title="Clinical course">
            <Bullets
              items={[
                'Incubation ~11–12 days (7–21) to prodrome.',
                'Prodrome 2–4 days: high fever + cough, coryza, conjunctivitis; Koplik spots (white specks on buccal mucosa) 1–2 days before the rash.',
                'Rash: maculopapular, starts at the hairline/face and spreads downward over 3 days; fades in the same order.',
                'Infectious from 4 days before to 4 days after rash onset; airborne (room stays infectious up to 2 h).',
              ]}
            />
          </Panel>
          <Panel title="Complications">
            <Bullets
              items={[
                'Otitis media and diarrhea (common); pneumonia (most common cause of death).',
                'Encephalitis ≈1 per 1,000; subacute sclerosing panencephalitis years later (higher risk if infected <2 y).',
                'Death ≈1–3 per 1,000 in the U.S.; “immune amnesia” raises infection risk for months to years.',
                'Highest risk: <5 y, malnourished, immunocompromised, pregnant.',
              ]}
            />
          </Panel>
        </div>
        <Callout tone="action" title="Suspected measles">
          Mask the patient and use airborne isolation immediately; call public health before results; send throat/NP swab PCR (± urine) and serum IgM; give vitamin A to every child (≥12 mo 200,000 IU; 6–11 mo 100,000 IU; &lt;6 mo 50,000 IU; once daily × 2 days); identify exposed contacts for prophylaxis.
        </Callout>
        <QuickCheck question={getQuestion('fev-measles')} />
        <QuickCheck question={getQuestion('fev-vitA')} />
      </Section>

      <ModuleFooter module={mod} />
    </div>
  )
}
