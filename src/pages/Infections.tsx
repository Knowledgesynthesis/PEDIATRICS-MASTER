import { useState } from 'react'
import { moduleById } from '@/content/modules'
import { getQuestion } from '@/content/questions'
import { Bullets, DataTable, ModuleFooter, OnThisPage, PageHeader, Panel, Section, ToolFrame } from '@/components/learn/Blocks'
import { Callout } from '@/components/learn/Callout'
import { NumberField, Result, Segmented, Toggle } from '@/components/learn/Controls'
import { QuickCheck } from '@/components/learn/QuestionCard'
import { croupPlans, croupSeverity, westleyItems, westleyScore, type WestleyInput } from '@/lib/clinical/croup'
import { aomRecommendation, type AomInput } from '@/lib/clinical/aom'
import { num } from '@/lib/utils'

const mod = moduleById.respiratory

function WestleyTool() {
  const [v, setV] = useState<WestleyInput>({ consciousness: 0, cyanosis: 0, stridor: 2, airEntry: 1, retractions: 1 })
  const score = westleyScore(v)
  const sev = croupSeverity(score)
  const plan = croupPlans[sev]
  return (
    <ToolFrame id="tool-westley" title="Westley croup score" description="Score the calm child. Reassess after every intervention." refs={['westley-1978', 'croup-cochrane-2023']}>
      <div className="grid gap-4 md:grid-cols-2">
        {westleyItems.map((item) => (
          <Segmented
            key={item.key}
            label={item.label}
            value={v[item.key]}
            onChange={(score) => setV((s) => ({ ...s, [item.key]: score }))}
            options={item.options.map((o) => ({ value: o.score, label: o.label, hint: `${o.score} pt` }))}
          />
        ))}
      </div>
      <Result tone={sev === 'mild' ? 'good' : sev === 'moderate' ? 'warn' : 'bad'} title={`Score ${score} — ${plan.label}`}>
        <Bullets items={plan.actions} />
      </Result>
    </ToolFrame>
  )
}

function AomTool() {
  const [i, setI] = useState<AomInput>({
    ageMonths: 15,
    otorrhea: false,
    severe: false,
    bilateral: false,
    amoxicillinLast30Days: false,
    purulentConjunctivitis: false,
    recurrentAmoxicillinFailure: false,
    penicillinAllergy: 'none',
  })
  const [age, setAge] = useState('15')
  const a = num(age)
  const input = { ...i, ageMonths: a ?? i.ageMonths }
  const r = aomRecommendation(input)
  const set = <K extends keyof AomInput>(k: K, val: AomInput[K]) => setI((s) => ({ ...s, [k]: val }))
  return (
    <ToolFrame id="tool-aom" title="AOM: antibiotics or observation?" description="Only after a certain diagnosis (bulging TM or new otorrhea). AAP 2013 covers 6 months–12 years." refs={['aap-aom-2013']}>
      <div className="grid gap-4 md:grid-cols-2">
        <NumberField label="Age" value={age} onChange={setAge} unit="months" min={0} max={216} />
        <Segmented
          label="Penicillin allergy"
          value={i.penicillinAllergy}
          onChange={(v) => set('penicillinAllergy', v)}
          options={[
            { value: 'none', label: 'None' },
            { value: 'non-severe', label: 'Non-severe' },
            { value: 'severe', label: 'Immediate / anaphylaxis' },
          ]}
        />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <Toggle label="Otorrhea" checked={i.otorrhea} onChange={(v) => set('otorrhea', v)} />
        <Toggle label="Severe signs" hint="Moderate–severe otalgia, otalgia ≥48 h, or T ≥39 °C" checked={i.severe} onChange={(v) => set('severe', v)} />
        <Toggle label="Bilateral AOM" checked={i.bilateral} onChange={(v) => set('bilateral', v)} />
        <Toggle label="Amoxicillin in the past 30 days" checked={i.amoxicillinLast30Days} onChange={(v) => set('amoxicillinLast30Days', v)} />
        <Toggle label="Purulent conjunctivitis" checked={i.purulentConjunctivitis} onChange={(v) => set('purulentConjunctivitis', v)} />
        <Toggle label="Recurrent AOM unresponsive to amoxicillin" checked={i.recurrentAmoxicillinFailure} onChange={(v) => set('recurrentAmoxicillinFailure', v)} />
      </div>
      <Result tone={r.decision === 'antibiotics' ? 'warn' : 'info'} title={r.decision === 'antibiotics' ? 'Treat with antibiotics' : 'Antibiotics OR observation (shared decision)'}>
        <p>{r.why}</p>
        <p>
          <strong>Regimen:</strong> {r.regimen}
        </p>
        <p>
          <strong>Duration:</strong> {r.duration}
        </p>
        <p>{r.followUp}</p>
        <p>Treat pain in every child (ibuprofen or acetaminophen). Avoid benzocaine drops under 2 years.</p>
        {!r.inGuidelineScope && <p className="text-xs text-muted-foreground">Outside the 6 mo–12 y guideline range — apply with judgment.</p>}
      </Result>
    </ToolFrame>
  )
}

function McIsaacTool() {
  const [fever, setFever] = useState(true)
  const [noCough, setNoCough] = useState(true)
  const [nodes, setNodes] = useState(true)
  const [tonsils, setTonsils] = useState(false)
  const [age, setAge] = useState<'lt3' | '3to14' | '15to44' | 'ge45'>('3to14')
  const ageScore = age === '3to14' ? 1 : age === 'ge45' ? -1 : 0
  const score = Number(fever) + Number(noCough) + Number(nodes) + Number(tonsils) + ageScore
  const low = score <= 1
  return (
    <ToolFrame id="tool-mcisaac" title="McIsaac (modified Centor) score" description="IDSA 2025: use a clinical score to decide who needs testing. Never treat a child without a positive test." refs={['idsa-gas-2025', 'idsa-gas-2012']}>
      <div className="grid gap-2 sm:grid-cols-2">
        <Toggle label="Temperature >38 °C" checked={fever} onChange={setFever} />
        <Toggle label="Absence of cough" checked={noCough} onChange={setNoCough} />
        <Toggle label="Tender/swollen anterior cervical nodes" checked={nodes} onChange={setNodes} />
        <Toggle label="Tonsillar swelling or exudate" checked={tonsils} onChange={setTonsils} />
      </div>
      <Segmented
        label="Age"
        value={age}
        onChange={setAge}
        options={[
          { value: 'lt3', label: '<3 y' },
          { value: '3to14', label: '3–14 y (+1)' },
          { value: '15to44', label: '15–44 y (0)' },
          { value: 'ge45', label: '≥45 y (−1)' },
        ]}
      />
      {age === 'lt3' ? (
        <Result tone="good" title="Generally do not test under 3 years">
          <p>GAS pharyngitis and rheumatic fever are rare under 3. Test only with a clear exposure (e.g., GAS-positive sibling) and compatible illness.</p>
        </Result>
      ) : (
        <Result tone={low ? 'good' : 'warn'} title={`Score ${score} — ${low ? 'low probability: no test, no antibiotics' : 'test (rapid antigen or molecular)'}`}>
          {low ? (
            <p>Symptomatic care. Overt viral features (cough, rhinorrhea, hoarseness, oral ulcers, conjunctivitis) further lower the probability.</p>
          ) : (
            <p>Positive → treat. Negative rapid antigen test in a child/adolescent → back-up throat culture (high-sensitivity molecular tests generally need no back-up).</p>
          )}
        </Result>
      )}
    </ToolFrame>
  )
}

export default function Infections() {
  return (
    <div className="space-y-10">
      <PageHeader module={mod} refs={['aap-bronch-2014', 'aap-aom-2013', 'idsa-gas-2025', 'pids-cap-2011']} />
      <OnThisPage
        items={[
          { id: 'bronchiolitis', label: 'Bronchiolitis' },
          { id: 'croup', label: 'Croup' },
          { id: 'aom', label: 'Otitis media' },
          { id: 'sinusitis', label: 'Sinusitis' },
          { id: 'pharyngitis', label: 'Strep throat' },
          { id: 'pneumonia', label: 'Pneumonia' },
          { id: 'influenza', label: 'Influenza' },
          { id: 'pertussis', label: 'Pertussis' },
          { id: 'stewardship', label: 'Antibiotic summary' },
        ]}
      />

      <Section id="bronchiolitis" title="Bronchiolitis (1–23 months)" refs={['aap-bronch-2014', 'bronch-anz-2025', 'bids-2015', 'paris-2018']}>
        <p className="prose-clinical">
          Viral lower respiratory infection (RSV most often; also rhinovirus, hMPV): coryza → cough, tachypnea, retractions, crackles and/or wheeze, peaking on days 3–5. It is a <strong>clinical diagnosis</strong>, and management is supportive.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <Callout tone="action" title="Do">
            <Bullets
              items={[
                'Oxygen only if SpO₂ persistently <90% (90% targets are safe — BIDS trial); spot-check oximetry when off oxygen.',
                'NG or IV isotonic fluids when the infant cannot maintain hydration (NG is as effective as IV).',
                'Superficial nasal suction before feeds; avoid routine deep suctioning.',
                'High-flow nasal cannula as rescue for hypoxemia not responding to standard oxygen.',
                'Counsel: cough commonly lasts 2–3 weeks; return for apnea, cyanosis, poor feeding, few wet diapers, or worsening work of breathing.',
              ]}
            />
          </Callout>
          <Callout tone="pitfall" title="Don’t (no benefit, real harms or costs)">
            <Bullets
              items={['Albuterol or nebulized epinephrine', 'Systemic or inhaled corticosteroids', 'Hypertonic saline in the ED', 'Antibiotics without a bacterial focus', 'Routine chest radiograph, viral testing or blood tests', 'Chest physiotherapy']}
            />
          </Callout>
        </div>
        <Callout tone="redflag" title="Higher risk of severe disease or apnea">
          Age &lt;12 weeks (apnea risk highest &lt;2 months corrected), prematurity, hemodynamically significant heart disease, chronic lung disease, immunodeficiency, neuromuscular disease. Apnea can be the presenting sign in young infants.
        </Callout>
        <QuickCheck question={getQuestion('resp-bronch-feed')} />
        <QuickCheck question={getQuestion('resp-bronch-hfnc')} />
      </Section>

      <Section id="croup" title="Croup (laryngotracheobronchitis)" refs={['croup-cochrane-2023', 'croup-dex-dose-2019', 'croup-humid-2006']}>
        <p className="prose-clinical">
          Parainfluenza most often; peak age 6 months–3 years; sudden barky cough, hoarseness and inspiratory stridor, worse at night. Diagnosis is clinical — the “steeple sign” is neither sensitive nor needed.
        </p>
        <WestleyTool />
        <div className="grid gap-4 md:grid-cols-2">
          <Panel title="Evidence-based treatment">
            <Bullets
              items={[
                'Dexamethasone for every severity: 0.6 mg/kg PO once (0.15–0.3 mg/kg appears similarly effective); oral = IM. Prednisolone 1 mg/kg is an alternative.',
                'Nebulized epinephrine for stridor at rest with distress: L-epinephrine 1 mg/mL 0.5 mL/kg (max 5 mL) or racemic 2.25% 0.5 mL; effect lasts ~2 h — observe ≥2 h.',
                'Humidified air and mist do not help. Antibiotics are not indicated.',
                'Keep the child calm on the caregiver’s lap; agitation worsens obstruction.',
              ]}
            />
          </Panel>
          <Callout tone="redflag" title="Not croup? Think of these">
            <Bullets
              items={[
                'Epiglottitis: toxic, drooling, tripod, no bark (unimmunized) — do not examine the throat; airway in a controlled setting.',
                'Bacterial tracheitis: toxic, high fever, poor response to epinephrine.',
                'Retropharyngeal abscess: fever, neck stiffness/torticollis, drooling (<5 y).',
                'Foreign body: sudden onset, no fever. Anaphylaxis: rapid onset, urticaria.',
                'Recurrent or <6 months: consider subglottic stenosis or hemangioma.',
              ]}
            />
          </Callout>
        </div>
        <QuickCheck question={getQuestion('resp-croup-moderate')} />
        <QuickCheck question={getQuestion('resp-croup-dex')} />
        <QuickCheck question={getQuestion('resp-epiglottitis')} />
      </Section>

      <Section id="aom" title="Acute otitis media" refs={['aap-aom-2013', 'tubes-2022']}>
        <Panel title="Diagnose strictly (AAP 2013)">
          <Bullets
            items={[
              'Moderate–severe bulging of the TM, OR new otorrhea not due to otitis externa, OR mild bulging + ear pain <48 h (holding/tugging in non-verbal children) or intense TM erythema.',
              'No middle-ear effusion (pneumatic otoscopy/tympanometry) = no AOM. Effusion without bulging = otitis media with effusion → no antibiotics.',
              'AOM is usually bacterial (S. pneumoniae, nontypeable H. influenzae, M. catarrhalis), but most uncomplicated cases resolve without antibiotics.',
            ]}
          />
        </Panel>
        <AomTool />
        <div className="grid gap-4 md:grid-cols-2">
          <Panel title="After AOM">
            <Bullets
              items={[
                'Effusion persists after treatment in ~60–70% at 2 weeks, ~40% at 1 month, 10–25% at 3 months — not treatment failure.',
                'OME: no antibiotics, steroids or antihistamines; recheck at 3 months; hearing test if persistent.',
              ]}
            />
          </Panel>
          <Panel title="Prevent">
            <Bullets
              items={[
                'PCV and annual influenza vaccine; avoid tobacco smoke; breastfeeding.',
                'Tympanostomy tubes for recurrent AOM (≥3 in 6 months or ≥4 in 12 months with ≥1 in the last 6) only if effusion is present at assessment; also for chronic bilateral OME with hearing difficulty.',
                'No prophylactic antibiotics for recurrent AOM.',
              ]}
            />
          </Panel>
        </div>
        <QuickCheck question={getQuestion('resp-aom-dx')} />
        <QuickCheck question={getQuestion('resp-aom-observe')} />
        <QuickCheck question={getQuestion('resp-aom-conj')} />
      </Section>

      <Section id="sinusitis" title="Acute bacterial sinusitis" refs={['aap-sinusitis-2013']}>
        <DataTable
          head={['Presentation (diagnosis is clinical)', 'Management']}
          rows={[
            ['Persistent: nasal discharge or daytime cough >10 days without improvement', 'Antibiotics, or observe 3 more days (shared decision)'],
            ['Worsening: new fever or worse discharge/cough after initial improvement (“double sickening”)', 'Antibiotics'],
            ['Severe onset: T ≥39 °C with purulent discharge for ≥3 consecutive days', 'Antibiotics'],
          ]}
        />
        <Bullets
          items={[
            'Amoxicillin 45 or 90 mg/kg/day ÷ BID (high dose if <2 y, daycare, or recent antibiotics), or amoxicillin–clavulanate.',
            'No imaging for uncomplicated sinusitis. Contrast CT/MRI if orbital (proptosis, painful eye movement) or intracranial complications are suspected.',
          ]}
        />
      </Section>

      <Section id="pharyngitis" title="Group A strep pharyngitis" refs={['idsa-gas-2025', 'idsa-gas-2012', 'gas-carriage-2010']}>
        <McIsaacTool />
        <DataTable
          head={['Situation', 'Treatment (10 days unless stated)']}
          rows={[
            ['First-line', 'Amoxicillin 50 mg/kg once daily (max 1,000 mg) — or penicillin V 250 mg (≤27 kg) / 500 mg (>27 kg) BID–TID'],
            ['Adherence concern', 'Benzathine penicillin G IM once: 600,000 U (<27 kg) or 1.2 million U (≥27 kg)'],
            ['Non-anaphylactic penicillin allergy', 'Cephalexin 20 mg/kg BID (max 500 mg/dose) or cefadroxil 30 mg/kg daily (max 1 g)'],
            ['Immediate-type penicillin allergy', 'Azithromycin 12 mg/kg daily × 5 days (max 500 mg), clarithromycin, or clindamycin 7 mg/kg TID (max 300 mg)'],
          ]}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Panel title="Facts that prevent over-treatment">
            <Bullets
              items={['GAS causes ~37% of sore throats in children; ~12% of healthy children are carriers.', 'No test of cure; do not test asymptomatic contacts.', 'Antibiotics within 9 days of onset prevent rheumatic fever (not post-streptococcal glomerulonephritis).', 'Steroids are not recommended for GAS pharyngitis.']}
            />
          </Panel>
          <Callout tone="redflag" title="Complications to catch">
            <Bullets items={['Peritonsillar abscess: trismus, uvular deviation, “hot-potato” voice', 'Retropharyngeal abscess: neck pain/stiffness, drooling, young child', 'Lemierre syndrome: severe sore throat → neck swelling, septic emboli (Fusobacterium)']} />
          </Callout>
        </div>
        <QuickCheck question={getQuestion('resp-gas-viral')} />
        <QuickCheck question={getQuestion('resp-gas-backup')} />
        <QuickCheck question={getQuestion('resp-gas-allergy')} />
      </Section>

      <Section id="pneumonia" title="Community-acquired pneumonia (>3 months)" refs={['pids-cap-2011', 'scout-cap-2022', 'cap-it-2021', 'cap-effusion-2026']}>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel title="Diagnosis">
            <Bullets
              items={[
                'Fever + tachypnea (WHO: ≥50/min at 2–12 mo, ≥40/min at 1–5 y) + focal findings or hypoxemia.',
                'Viruses cause most CAP under 5; S. pneumoniae is the key bacterial target at all ages; M. pneumoniae in school-age children (and in preschoolers during outbreaks).',
                'Chest radiograph is not needed for well-appearing outpatients; obtain for hypoxemia, significant distress, failed therapy, or admission.',
                'Blood culture not needed for fully immunized outpatients; obtain for moderate–severe disease.',
              ]}
            />
          </Panel>
          <Panel title="Treatment">
            <Bullets
              items={[
                'Outpatient: amoxicillin 90 mg/kg/day ÷ BID (max 4 g/day) for 5 days total (SCOUT-CAP, SAFER, CAP-IT).',
                'Suspected atypical (school age, gradual onset, headache, normal-appearing): azithromycin. Do not add routinely.',
                'Inpatient, fully immunized: IV ampicillin; not fully immunized or life-threatening: ceftriaxone; add vancomycin or clindamycin for suspected MRSA (necrotizing pneumonia, empyema, post-influenza).',
                'Reassess at 48–72 h if not improving: effusion, empyema, abscess, resistance, or a different diagnosis.',
              ]}
            />
          </Panel>
        </div>
        <Callout tone="redflag" title="Admit">
          SpO₂ &lt;90% in room air, infants &lt;3–6 months with suspected bacterial CAP, moderate–severe distress (grunting, apnea, RR &gt;70 in infants or &gt;50 in older children), dehydration or unable to take oral medicine, toxic appearance, complicated pneumonia, or no outpatient follow-up.
        </Callout>
        <QuickCheck question={getQuestion('resp-cap')} />
      </Section>

      <Section id="influenza" title="Influenza" refs={['aap-flu-2026', 'cdc-flu-antivirals']}>
        <Bullets
          items={[
            'The 2025–26 season was severe for children (at least 190 pediatric deaths). Vaccinate everyone ≥6 months each season.',
            'Treat with oseltamivir as soon as possible — regardless of vaccination or symptom duration — if hospitalized, severe/progressive, or high risk (age <5 y, especially <2 y; chronic heart, lung, renal, metabolic, neurologic or immunocompromising conditions; long-term aspirin; pregnancy).',
            'Healthy outpatients: consider treatment within 48 h of onset; baloxavir (single dose) is an option for eligible older children.',
            'Oseltamivir: 3 mg/kg BID (<1 y); ≥1 y by weight — ≤15 kg 30 mg, >15–23 kg 45 mg, >23–40 kg 60 mg, >40 kg 75 mg BID × 5 days.',
            'Seek care urgently for altered mental status or seizures (influenza-associated encephalopathy).',
          ]}
        />
        <QuickCheck question={getQuestion('resp-flu')} />
      </Section>

      <Section id="pertussis" title="Pertussis" refs={['red-book']}>
        <Bullets
          items={[
            'Young infants may never whoop: apnea, cyanosis, gagging and post-tussive emesis dominate; afebrile; marked lymphocytosis signals severe disease.',
            'Diagnose with nasopharyngeal PCR. Treat on suspicion: azithromycin 10 mg/kg daily × 5 days (<6 months); ≥6 months 10 mg/kg day 1 then 5 mg/kg days 2–5. Azithromycin is preferred under 1 month (erythromycin → pyloric stenosis).',
            'Admit most infants <4 months and any child with apnea, cyanosis or hypoxemia.',
            'Prophylaxis for household and high-risk contacts regardless of vaccination status. Prevention: Tdap in every pregnancy (27–36 weeks) and on-time DTaP.',
          ]}
        />
        <QuickCheck question={getQuestion('resp-pertussis')} />
      </Section>

      <Section id="stewardship" title="Antibiotic summary">
        <DataTable
          head={['Condition', 'First-line', 'Duration']}
          rows={[
            ['AOM', 'Amoxicillin 80–90 mg/kg/day ÷ BID', '10 d (<2 y or severe) · 7 d (2–5 y) · 5–7 d (≥6 y)'],
            ['Sinusitis', 'Amoxicillin (± clavulanate)', 'Commonly 10 d; continue 7 d after symptoms resolve'],
            ['GAS pharyngitis', 'Amoxicillin 50 mg/kg once daily', '10 d (azithromycin 5 d)'],
            ['CAP (outpatient)', 'Amoxicillin 90 mg/kg/day ÷ BID', '5 d'],
            ['Bronchiolitis, croup, colds, viral pharyngitis', 'No antibiotics', '—'],
          ]}
        />
      </Section>

      <ModuleFooter module={mod} />
    </div>
  )
}
