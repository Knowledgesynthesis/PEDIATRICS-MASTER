import type { Question } from '@/types'

export const fluidsQuestions: Question[] = [
  {
    id: 'fl-cds',
    module: 'fluids',
    stem: 'An 18-month-old with gastroenteritis is restless and irritable when touched, has slightly sunken eyes, sticky mucous membranes and decreased tears. Clinical Dehydration Scale score and category?',
    options: ['4 — some dehydration', '2 — no dehydration', '6 — moderate/severe dehydration', '8 — severe dehydration'],
    answer: 0,
    explanation:
      'CDS: 1 point each for appearance (thirsty/restless/irritable), slightly sunken eyes, sticky mucosa and decreased tears = 4. Bands: 0 none, 1–4 some (3 to <6%), 5–8 moderate/severe (≥6%). Plan: oral rehydration (± ondansetron).',
    refs: ['cds-2004'],
  },
  {
    id: 'fl-best-sign',
    module: 'fluids',
    stem: 'Which single physical sign best predicts ≥5% dehydration in children (systematic review)?',
    options: ['Prolonged capillary refill', 'Absent tears', 'Sunken fontanelle', 'Tachycardia'],
    answer: 0,
    explanation:
      'Steiner (JAMA 2004): the most useful individual signs are prolonged capillary refill, abnormal skin turgor and abnormal (deep, acidotic) respiratory pattern. Combinations of signs outperform any single sign; percent weight loss is the reference standard.',
    refs: ['steiner-2004'],
  },
  {
    id: 'fl-ort-plan',
    module: 'fluids',
    stem: 'A 10-kg toddler with gastroenteritis has some dehydration and vomited twice in the ED. Best plan?',
    options: [
      'Ondansetron ODT 2 mg, then ORS ~50–100 mL/kg over 4 h in small frequent sips, plus replacement of ongoing losses',
      'IV 0.9% saline 20 mL/kg and admit',
      'Nothing by mouth for 4 h to rest the gut',
      'Undiluted apple juice ad lib',
    ],
    answer: 0,
    explanation:
      'ORT is first-line for mild–moderate dehydration and as effective as IV. A single ondansetron dose (Freedman 2006 bands: 8–15 kg → 2 mg) reduces vomiting and IV use. Replace losses: 10 mL/kg per stool, 2 mL/kg per emesis. Diluted apple juice suits only minimal dehydration in children >6 months.',
    refs: ['cdc-age-2003', 'ondansetron-2006', 'apple-juice-2016'],
  },
  {
    id: 'fl-maint',
    module: 'fluids',
    stem: 'Hourly maintenance fluid rate for a 25-kg child (Holliday–Segar)?',
    options: ['65 mL/h', '45 mL/h', '85 mL/h', '100 mL/h'],
    answer: 0,
    explanation: '4-2-1: (10 × 4) + (10 × 2) + (5 × 1) = 40 + 20 + 5 = 65 mL/h. Daily: 1,000 + 500 + 100 = 1,600 mL/day.',
    refs: ['aap-ivf-2018'],
  },
  {
    id: 'fl-isotonic',
    module: 'fluids',
    stem: 'Best maintenance IV fluid for a hospitalized 5-year-old with pneumonia who cannot drink (AAP 2018)?',
    options: [
      'Isotonic fluid with dextrose and potassium (e.g., D5 0.9% NaCl + 20 mEq/L KCl, or balanced crystalloid with dextrose)',
      'D5 0.2% NaCl + 20 mEq/L KCl',
      'D5W',
      '0.45% NaCl without dextrose',
    ],
    answer: 0,
    explanation:
      'Hypotonic maintenance fluids cause hospital-acquired hyponatremia (illness drives ADH). AAP 2018 recommends isotonic fluids with appropriate KCl and dextrose for patients 28 days–18 years (exclusions include neurosurgical, cardiac, renal and liver disease, DI, and neonates).',
    refs: ['aap-ivf-2018'],
  },
  {
    id: 'fl-probiotics',
    module: 'fluids',
    stem: 'Parents ask whether probiotics will shorten their 2-year-old’s acute gastroenteritis. Evidence-based answer?',
    options: [
      'Large 2018 RCTs (LGG and a combination probiotic) showed no benefit; not recommended',
      'Yes — they halve diarrhea duration',
      'Only Saccharomyces boulardii is effective in all children',
      'Probiotics replace the need for oral rehydration',
    ],
    answer: 0,
    explanation:
      'Two large, rigorous North American RCTs (NEJM 2018) found no reduction in moderate-to-severe gastroenteritis or diarrhea duration. Focus on ORT, early refeeding and ondansetron when vomiting.',
    refs: ['probiotics-2018'],
  },
  {
    id: 'fl-hypernatremia',
    module: 'fluids',
    stem: 'A 6-month-old has hypernatremic dehydration (Na 162 mEq/L) after perfusion is restored. Key principle of correction?',
    options: [
      'Lower sodium no faster than ~10–12 mEq/L per 24 h; rehydrate over ~48 h',
      'Correct to normal within 6 h with D5W',
      'Avoid all sodium-containing fluids',
      'Free water bolus 20 mL/kg',
    ],
    answer: 0,
    explanation:
      'Brain cells adapt with idiogenic osmoles; rapid correction shifts water into cells → cerebral edema and seizures. Treat shock with isotonic boluses first, then correct slowly (≈0.5 mEq/L/h) with frequent sodium checks.',
    refs: ['aap-ivf-2018'],
  },
  {
    id: 'fl-hyponat-seizure',
    module: 'fluids',
    stem: 'A 9-month-old fed diluted formula is seizing with Na 118 mEq/L. Immediate treatment?',
    options: ['3% saline 2 mL/kg IV over 10 min (repeat if seizing)', '0.9% saline 20 mL/kg', 'Fluid restriction only', 'Correct to 135 mEq/L within 2 h'],
    answer: 0,
    explanation:
      'Symptomatic hyponatremia: hypertonic saline bolus raises Na by ~2 mEq/L per dose; aim for a 4–6 mEq/L rise to stop seizures, then limit total correction to ≤8–10 mEq/L in 24 h to avoid osmotic demyelination.',
    refs: ['aap-ivf-2018'],
  },
  {
    id: 'fl-who-c',
    module: 'fluids',
    stem: 'An 8-kg, 8-month-old has severe dehydration (no malnutrition). WHO Plan C volumes?',
    options: [
      'Ringer’s lactate 240 mL over 1 h, then 560 mL over 5 h',
      '240 mL over 30 min, then 560 mL over 2.5 h',
      '160 mL bolus only',
      '800 mL over 24 h',
    ],
    answer: 0,
    explanation:
      'WHO Plan C = 100 mL/kg: infants <12 months 30 mL/kg over 1 h then 70 mL/kg over 5 h; ≥12 months over 30 min then 2.5 h. Repeat the first portion if radial pulse remains weak; start ORS (~5 mL/kg/h) as soon as the child can drink. Severe malnutrition requires a different protocol.',
    refs: ['who-diarrhoea-2005'],
  },
  {
    id: 'fl-dka',
    module: 'fluids',
    stem: 'Which statement about pediatric DKA management is correct?',
    options: [
      'Start insulin infusion 0.05–0.1 U/kg/h after initial fluids, without an insulin bolus',
      'Give bicarbonate for pH <7.1',
      'Restrict fluids to minimize cerebral edema',
      'Give a 0.1 U/kg insulin bolus first',
    ],
    answer: 0,
    explanation:
      'ISPAD 2022: insulin infusion (no bolus) starting ≥1 h after fluids begin. PECARN FLUID (NEJM 2018) found rate and sodium content of fluids did not change neurologic outcomes — do not under-resuscitate. Bicarbonate is not routinely used. Cerebral edema: mannitol 0.5–1 g/kg or 3% saline 2.5–5 mL/kg.',
    refs: ['ispad-dka-2022', 'pecarn-fluid-2018'],
  },
]

export const seizureQuestions: Question[] = [
  {
    id: 'fs-simple-workup',
    module: 'seizures',
    stem: 'A fully immunized 15-month-old had a 2-minute generalized seizure with fever 39.4 °C and is now back to baseline with a normal exam and an obvious viral illness. Evaluation?',
    options: [
      'No LP, EEG, neuroimaging or routine labs; identify the fever source and counsel',
      'LP, CBC and electrolytes',
      'EEG within 24 h',
      'MRI brain',
    ],
    answer: 0,
    explanation:
      'AAP 2011: after a simple febrile seizure in a well, immunized child without meningeal signs, LP is not routinely indicated and EEG, neuroimaging and blood tests (electrolytes, calcium, glucose, CBC) should not be done for the seizure itself.',
    refs: ['aap-fs-2011'],
  },
  {
    id: 'fs-lp-option',
    module: 'seizures',
    stem: 'A 9-month-old with a simple febrile seizure has received no Hib or pneumococcal vaccines. Per AAP 2011, lumbar puncture is:',
    options: ['An option', 'Mandatory', 'Contraindicated', 'Indicated only if seizure recurs'],
    answer: 0,
    explanation:
      'AAP 2011: LP should be performed with meningeal signs or suspicion of intracranial infection; LP is an option at 6–12 months when Hib/pneumococcal immunization is deficient or unknown, and an option after antibiotic pretreatment. The old “LP for all <12 months” advice (1996) is outdated.',
    refs: ['aap-fs-2011'],
  },
  {
    id: 'fs-complex',
    module: 'seizures',
    stem: 'Which feature makes a febrile seizure complex?',
    options: ['A second seizure within the same 24 hours', 'Temperature of 40.5 °C', 'Family history of febrile seizures', 'Age 14 months'],
    answer: 0,
    explanation:
      'Complex = focal features, duration ≥15 minutes, or recurrence within 24 h. Height of fever, family history and young age affect recurrence risk but do not define complexity.',
    refs: ['aap-fs-2011'],
  },
  {
    id: 'fs-antipyretics',
    module: 'seizures',
    stem: 'Parents ask whether giving acetaminophen or ibuprofen at the first sign of fever will prevent another febrile seizure. Answer?',
    options: [
      'No — antipyretics do not reduce recurrence; use them for comfort only',
      'Yes — alternating both prevents recurrence',
      'Yes, but only ibuprofen',
      'Only if started before the temperature exceeds 38.5 °C',
    ],
    answer: 0,
    explanation:
      'Trials and the AAP 2008 guideline show antipyretics do not prevent febrile seizures. Continuous or intermittent anticonvulsant prophylaxis is not recommended for simple febrile seizures (harms outweigh benefits).',
    refs: ['aap-fs-2008', 'aap-fever-2011'],
  },
  {
    id: 'fs-recurrence',
    module: 'seizures',
    stem: 'Which factor increases the risk of febrile-seizure recurrence?',
    options: ['Seizure occurred at a relatively low temperature (e.g., 38.4 °C)', 'Seizure at 40.6 °C', 'First seizure at age 3 years', 'Fever present for 2 days before the seizure'],
    answer: 0,
    explanation:
      'Recurrence risk factors (AAP 2008): age <18 months at first seizure, febrile seizures in a first-degree relative, lower temperature at seizure, and short interval (<1 h) from fever onset to seizure. None → <20%; all four → >70%. Overall ~30% recur (~50% if first seizure <12 months).',
    refs: ['aap-fs-2008'],
  },
  {
    id: 'fs-epilepsy-risk',
    module: 'seizures',
    stem: 'Risk of later epilepsy after a single simple febrile seizure is approximately:',
    options: ['≈1–2% — close to the general population', '10%', '25%', '50%'],
    answer: 0,
    explanation:
      'Simple febrile seizures do not cause brain damage, lower IQ or meaningfully raise epilepsy risk. Risk rises with complex features, febrile status epilepticus, abnormal development and family history of epilepsy.',
    refs: ['aap-fs-2008'],
  },
  {
    id: 'fs-rescue',
    module: 'seizures',
    stem: 'When should caregivers give a prescribed rescue benzodiazepine (e.g., intranasal midazolam) for a febrile seizure?',
    options: ['If the seizure lasts ≥5 minutes (and call EMS)', 'At the onset of every seizure', 'Only after 15 minutes', 'At the first sign of fever'],
    answer: 0,
    explanation:
      'Seizures lasting ≥5 minutes are unlikely to stop spontaneously and define status epilepticus for treatment purposes. Rescue medication is reasonable for children with prolonged seizures or limited access to emergency care.',
    refs: ['aes-se-2016', 'aap-fs-2008'],
  },
  {
    id: 'fs-status',
    module: 'seizures',
    stem: 'A 20-month-old had a 40-minute febrile seizure (febrile status epilepticus) and is now recovering. Recommended follow-up?',
    options: ['Neurology follow-up, with MRI and EEG commonly obtained', 'No follow-up — febrile seizures are benign', 'Start daily phenobarbital', 'Repeat LP in 48 h'],
    answer: 0,
    explanation:
      'Febrile status epilepticus is associated with acute hippocampal injury (FEBSTAT) and the highest risk of later epilepsy among febrile seizures. Prophylactic daily anticonvulsants are not indicated; arrange a rescue plan.',
    refs: ['aap-fs-2011'],
  },
]

export const emergencyQuestions: Question[] = [
  {
    id: 'em-pat-resp-failure',
    module: 'emergencies',
    stem: 'A 2-year-old is listless with poor eye contact, has severe retractions and grunting, and has pink skin with brisk capillary refill. PAT impression?',
    options: ['Respiratory failure', 'Respiratory distress', 'Compensated shock', 'Primary CNS dysfunction'],
    answer: 0,
    explanation:
      'Abnormal appearance + abnormal work of breathing with normal circulation = respiratory failure (hypoxia/hypercarbia affecting the brain). Abnormal breathing with normal appearance = distress. Intervene immediately: oxygen, airway support.',
    refs: ['pat-2010'],
  },
  {
    id: 'em-pat-shock',
    module: 'emergencies',
    stem: 'A 9-month-old with diarrhea is alert and interactive, breathing comfortably, but mottled with cool extremities. PAT impression?',
    options: ['Compensated shock', 'Decompensated shock', 'Respiratory distress', 'Stable'],
    answer: 0,
    explanation:
      'Abnormal circulation with normal appearance = compensated shock; once appearance becomes abnormal (or hypotension appears), shock is decompensated. Hypotension is a late sign in children.',
    refs: ['pat-2010', 'pals-2020'],
  },
  {
    id: 'em-hypotension',
    module: 'emergencies',
    stem: 'Below what systolic blood pressure is a 4-year-old hypotensive (PALS)?',
    options: ['78 mmHg', '70 mmHg', '90 mmHg', '60 mmHg'],
    answer: 0,
    explanation: 'For ages 1–10 years: 70 + (2 × age in years) = 70 + 8 = 78 mmHg. Under 1 month: <60; 1–12 months: <70; >10 years: <90.',
    refs: ['pals-2020'],
  },
  {
    id: 'em-anaphylaxis',
    module: 'emergencies',
    stem: 'A 24-kg 7-year-old develops hives, lip swelling and wheeze minutes after eating peanut. First drug?',
    options: ['IM epinephrine 0.24 mg (0.24 mL of 1 mg/mL) in the anterolateral thigh', 'Oral diphenhydramine', 'Nebulized albuterol', 'IV epinephrine 1 mg'],
    answer: 0,
    explanation:
      'Epinephrine 0.01 mg/kg IM (max 0.3 mg prepubertal / 0.5 mg) without delay; repeat every 5–15 minutes as needed. Antihistamines and steroids are adjuncts that do not treat airway obstruction or shock. IV bolus epinephrine at arrest doses can cause fatal arrhythmias in a patient with a pulse.',
    refs: ['anaphylaxis-2023', 'aap-epi-2017'],
  },
  {
    id: 'em-anaph-discharge',
    module: 'emergencies',
    stem: 'After full recovery from anaphylaxis treated with one dose of IM epinephrine, what must happen before discharge?',
    options: [
      'Prescribe two epinephrine devices, teach their use, give a written action plan, and refer to allergy',
      'Prescribe a 5-day steroid course to prevent biphasic reactions',
      'Prescribe antihistamines only',
      'Admit everyone for 24 h of observation',
    ],
    answer: 0,
    explanation:
      'Steroids do not reliably prevent biphasic reactions. Observation length is individualized (longer for severe reactions or >1 epinephrine dose). Every patient leaves with two devices (auto-injector or, for ≥15 kg, nasal epinephrine), training, an action plan and allergist follow-up.',
    refs: ['anaphylaxis-2023', 'neffy-2025'],
  },
  {
    id: 'em-se-benzo',
    module: 'emergencies',
    stem: 'A 15-kg 3-year-old has been seizing for 6 minutes; no IV access. Treatment?',
    options: ['Intranasal or IM midazolam 3 mg (0.2 mg/kg)', 'Wait until 15 minutes before treating', 'Rectal acetaminophen', 'IV levetiracetam'],
    answer: 0,
    explanation:
      'At ≥5 minutes treat with a benzodiazepine: IM/IN midazolam 0.2 mg/kg (max 10 mg), IV lorazepam 0.1 mg/kg (max 4 mg), or rectal diazepam. Delay increases refractoriness.',
    refs: ['aes-se-2016'],
  },
  {
    id: 'em-se-second',
    module: 'emergencies',
    stem: 'Seizure continues 5 minutes after a second benzodiazepine dose. Next step?',
    options: [
      'Levetiracetam 60 mg/kg (max 4,500 mg), fosphenytoin 20 mg PE/kg, or valproate 40 mg/kg',
      'Third dose of lorazepam',
      'Propofol bolus on the ward',
      'Wait for EEG',
    ],
    answer: 0,
    explanation:
      'Limit benzodiazepines to two doses (including pre-hospital) — more adds respiratory depression without benefit. ESETT found levetiracetam, fosphenytoin and valproate equally effective (~50%); ConSEPT/EcLiPSE showed levetiracetam comparable to phenytoin in children.',
    refs: ['esett-2019', 'consept-eclipse-2019', 'aes-se-2016'],
  },
  {
    id: 'em-dose-amox',
    module: 'emergencies',
    stem: 'A 12-kg child needs amoxicillin 90 mg/kg/day divided BID. Volume per dose of 400 mg/5 mL suspension?',
    options: ['6.8 mL twice daily', '3.4 mL twice daily', '13.5 mL twice daily', '5.4 mL twice daily'],
    answer: 0,
    explanation: '90 × 12 = 1,080 mg/day → 540 mg/dose. 400 mg/5 mL = 80 mg/mL → 540 ÷ 80 = 6.75 ≈ 6.8 mL BID. Always state mg AND mL, and confirm the concentration on the bottle.',
    refs: ['aap-aom-2013'],
  },
  {
    id: 'em-acetaminophen',
    module: 'emergencies',
    stem: 'Correct acetaminophen dose for a 20-kg child using 160 mg/5 mL suspension?',
    options: ['300 mg = 9.4 mL', '200 mg = 6.25 mL', '480 mg = 15 mL', '1,000 mg = 31 mL'],
    answer: 0,
    explanation: '15 mg/kg × 20 kg = 300 mg; 300 ÷ 32 mg/mL = 9.4 mL, every 6 h as needed (max 75 mg/kg/day and ≤4 g/day).',
    refs: ['aap-fever-2011'],
  },
  {
    id: 'em-ten4',
    module: 'emergencies',
    stem: 'A 3-month-old has a small bruise on the cheek. Parents say she rolled against the crib rail. Next step?',
    options: [
      'Evaluate for physical abuse (skeletal survey, labs, consider head imaging) and report to child protective services',
      'Reassure — infants bruise easily',
      'Check platelet count only',
      'Document and follow up in 1 week',
    ],
    answer: 0,
    explanation:
      'TEN-4-FACESp: any bruise in an infant ≤4.99 months, or bruising to Torso, Ears, Neck, Frenulum, Angle of jaw, Cheek (fleshy), Eyelids, Subconjunctivae, or patterned bruising in children <4 years, warrants abuse evaluation. “Those who don’t cruise rarely bruise.” Sentinel injuries often precede severe abuse.',
    refs: ['ten4-2021'],
  },
  {
    id: 'em-weight',
    module: 'emergencies',
    stem: 'Estimated weight of a 3-year-old when no scale or length tape is available (APLS)?',
    options: ['14 kg', '10 kg', '20 kg', '24 kg'],
    answer: 0,
    explanation: '1–5 years: (2 × age) + 8 = 14 kg. Infants: (0.5 × months) + 4; 6–12 years: (3 × age) + 7. Prefer measured weight, then length-based tape, then parent estimate.',
    refs: ['pals-2020'],
  },
  {
    id: 'em-autoinjector',
    module: 'emergencies',
    stem: 'Which epinephrine auto-injector dose should be prescribed for an 18-kg child?',
    options: ['0.15 mg', '0.1 mg', '0.3 mg', '0.5 mg'],
    answer: 0,
    explanation:
      'Labeled bands: 0.1 mg for 7.5–<15 kg, 0.15 mg for 15–<30 kg, 0.3 mg for ≥30 kg (AAP suggests moving to 0.3 mg around 25 kg). A 1 mg epinephrine nasal spray is approved for 15–<30 kg (age ≥4 years).',
    refs: ['aap-epi-2017', 'neffy-2025'],
  },
]
