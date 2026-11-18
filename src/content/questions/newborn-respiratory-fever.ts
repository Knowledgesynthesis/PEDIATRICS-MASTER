import type { Question } from '@/types'

export const newbornQuestions: Question[] = [
  {
    id: 'nb-cchd-repeat',
    module: 'newborn',
    stem: 'At 26 hours of age, a well newborn’s pulse oximetry is 97% in the right hand and 93% in the foot. Next step?',
    options: ['Repeat the screen in 1 hour', 'Pass — no further action', 'Fail — order an echocardiogram now', 'Repeat at the 2-week visit'],
    answer: 0,
    explanation:
      'The difference is 4% (>3%), so the screen is neither pass nor fail: repeat once in 1 hour (updated 2020 algorithm uses a single repeat). Pass requires ≥95% in the right hand or foot AND a difference ≤3%. Any value <90% is an immediate fail.',
    refs: ['cchd-2020'],
  },
  {
    id: 'nb-cchd-fail',
    module: 'newborn',
    stem: 'A screened newborn fails CCHD pulse oximetry. Lungs are clear and there is no sign of sepsis. Next step?',
    options: ['Diagnostic echocardiogram (with cardiology input) before discharge', 'Repeat screening daily for 3 days', 'Chest radiograph and discharge if normal', 'Discharge with outpatient follow-up in 1 week'],
    answer: 0,
    explanation:
      'A failed screen requires evaluation for causes of hypoxemia; if none explains it, an echocardiogram is required before discharge. Critical lesions can deteriorate as the ductus closes.',
    refs: ['cchd-2020'],
  },
  {
    id: 'nb-jaundice-24h',
    module: 'newborn',
    stem: 'A newborn appears jaundiced at 18 hours of life. Next step?',
    options: ['Measure TSB or TcB now', 'Recheck visually at 24 hours', 'Increase breastfeeding and reassess at discharge', 'Start phototherapy without a level'],
    answer: 0,
    explanation:
      'Jaundice in the first 24 hours is pathologic until proven otherwise (often hemolysis). AAP 2022: measure TSB/TcB as soon as possible and interpret against hour-specific thresholds; check DAT if the mother’s antibody screen is positive or unknown.',
    refs: ['aap-bili-2022'],
  },
  {
    id: 'nb-rate-of-rise',
    module: 'newborn',
    stem: 'A 40-hour-old’s TSB rose from 9.0 to 12.0 mg/dL over 12 hours. What does this rate suggest?',
    options: ['Hemolysis — rate ≥0.2 mg/dL/h after 24 h', 'Normal physiologic rise', 'Breast-milk jaundice', 'Cholestasis'],
    answer: 0,
    explanation:
      '3.0 ÷ 12 = 0.25 mg/dL/h. AAP 2022: ≥0.3 mg/dL/h in the first 24 h or ≥0.2 mg/dL/h thereafter suggests hemolysis — check DAT, CBC/smear and consider G6PD.',
    refs: ['aap-bili-2022'],
  },
  {
    id: 'nb-cholestasis',
    module: 'newborn',
    stem: 'A 3-week-old breastfed infant is still jaundiced and has pale stools and dark urine. Next step?',
    options: [
      'Total and direct (conjugated) bilirubin now',
      'Reassure — breast-milk jaundice',
      'Stop breastfeeding for 48 hours',
      'Phototherapy',
    ],
    answer: 0,
    explanation:
      'Jaundice beyond 2 weeks (3 weeks if preterm) requires fractionated bilirubin. Direct/conjugated bilirubin ≥1.0 mg/dL is abnormal. Pale stools suggest biliary atresia, where Kasai portoenterostomy outcomes are best before ~60 days.',
    refs: ['aap-bili-2022'],
  },
  {
    id: 'nb-stills',
    module: 'newborn',
    stem: 'A healthy 4-year-old has a grade 2/6 vibratory, musical systolic murmur at the left lower sternal border that is louder supine and softer when standing. Normal S2 and pulses. Management?',
    options: ['Reassure — Still’s murmur', 'Echocardiogram', 'ECG and chest radiograph', 'Cardiology referral'],
    answer: 0,
    explanation:
      'Classic innocent Still’s murmur: low-grade, vibratory/musical, LLSB–apex, louder supine, softer with standing/Valsalva, normal S2. Pathologic clues: holosystolic or diastolic, grade ≥3 (thrill), fixed split or loud S2, clicks, abnormal pulses, or symptoms. A murmur louder on standing suggests hypertrophic cardiomyopathy.',
    refs: [],
  },
  {
    id: 'nb-duct',
    module: 'newborn',
    stem: 'A 4-day-old presents with poor feeding, gray color, weak femoral pulses and metabolic acidosis. Immediate step besides resuscitation?',
    options: ['Start prostaglandin E1 infusion', 'Give indomethacin', 'Give 60 mL/kg of fluid', 'Wait for echocardiogram before any cardiac drug'],
    answer: 0,
    explanation:
      'Shock with weak femoral pulses in the first week = ductal-dependent systemic flow (critical coarctation, HLHS, critical aortic stenosis) until proven otherwise. PGE1 reopens the ductus — start empirically; watch for apnea. Indomethacin would close the duct.',
    refs: ['cchd-2020'],
  },
  {
    id: 'nb-ie',
    module: 'newborn',
    stem: 'Which child needs antibiotic prophylaxis before a dental extraction (AHA)?',
    options: ['Unrepaired cyanotic congenital heart disease', 'Small muscular VSD', 'Secundum ASD repaired 2 years ago without residual defect', 'Mitral valve prolapse with regurgitation'],
    answer: 0,
    explanation:
      'Prophylaxis is limited to the highest-risk conditions: prosthetic valve or material, prior endocarditis, unrepaired cyanotic CHD (including palliative shunts), CHD repaired with prosthetic material in the last 6 months or with residual defects at the repair site, and cardiac transplant with valvulopathy.',
    refs: ['aha-ie-2021'],
  },
  {
    id: 'nb-down',
    module: 'newborn',
    stem: 'Which newborn evaluations are recommended for every infant with Down syndrome (AAP 2022)?',
    options: [
      'Echocardiogram, CBC with differential, TSH (thyroid), and hearing screen',
      'Cervical spine radiographs, celiac serology and brain MRI',
      'Echocardiogram only',
      'Karyotype of both parents only',
    ],
    answer: 0,
    explanation:
      '~40–50% have CHD (AVSD most characteristic) — echo regardless of prenatal findings. CBC for transient abnormal myelopoiesis and polycythemia; TSH; hearing. Routine cervical radiographs are not recommended; celiac testing only if symptomatic. Karyotype the infant (translocation affects recurrence counseling).',
    refs: ['aap-down-2022'],
  },
  {
    id: 'nb-ccmv',
    module: 'newborn',
    stem: 'A 10-day-old failed the newborn hearing screen twice. How do you diagnose congenital CMV?',
    options: ['Urine or saliva CMV PCR now (before 21 days of life)', 'CMV IgG at 2 months', 'CMV IgM in the mother', 'Head ultrasound alone'],
    answer: 0,
    explanation:
      'Congenital CMV is diagnosed by CMV PCR on urine or saliva within the first 21 days; after that, positivity may reflect postnatal infection (confirm a positive saliva test with urine, since breast milk can contaminate saliva). CMV is the leading non-genetic cause of sensorineural hearing loss.',
    refs: ['cmv-consensus-2017'],
  },
  {
    id: 'nb-ch',
    module: 'newborn',
    stem: 'A 7-day-old has an elevated newborn-screen TSH. Confirmatory serum shows high TSH and low free T4. Next step?',
    options: [
      'Start levothyroxine 10–15 mcg/kg/day now',
      'Thyroid ultrasound and scan before treatment',
      'Repeat TSH in 4 weeks',
      'Start liquid levothyroxine mixed into soy formula',
    ],
    answer: 0,
    explanation:
      'Treat as soon as confirmed — ideally by 2 weeks of age — to protect neurodevelopment. Imaging is optional and must not delay treatment. Give crushed tablets in a little breast milk/water; avoid simultaneous soy, iron or calcium.',
    refs: ['aap-ch-2023'],
  },
]

export const respiratoryQuestions: Question[] = [
  {
    id: 'resp-bronch-feed',
    module: 'respiratory',
    stem: 'A 3-month-old with bronchiolitis (day 4) has RR 58, mild retractions, SpO₂ 92% in room air, and is taking 40% of usual feeds. Which intervention is indicated?',
    options: ['Nasogastric or IV isotonic fluids to support hydration', 'Supplemental oxygen to keep SpO₂ ≥95%', 'Trial of nebulized albuterol', 'Chest radiograph'],
    answer: 0,
    explanation:
      'Hydration support (NG is as effective as IV) is indicated when intake is inadequate. AAP: oxygen only if SpO₂ persistently <90% (BIDS trial showed 90% targets are safe). Albuterol, epinephrine, steroids and routine radiographs are not recommended.',
    refs: ['aap-bronch-2014', 'bids-2015'],
  },
  {
    id: 'resp-bronch-hfnc',
    module: 'respiratory',
    stem: 'Which bronchiolitis intervention is supported by RCT evidence?',
    options: [
      'High-flow nasal cannula as rescue for hypoxemia not responding to standard oxygen',
      'Systemic corticosteroids',
      'Nebulized hypertonic saline in the ED',
      'Chest physiotherapy',
    ],
    answer: 0,
    explanation:
      'PARIS (NEJM 2018): high-flow used early reduced escalation of care vs standard oxygen in hypoxemic infants; it is best used as rescue rather than first line. Steroids, ED hypertonic saline and chest physiotherapy do not improve outcomes.',
    refs: ['paris-2018', 'aap-bronch-2014'],
  },
  {
    id: 'resp-croup-moderate',
    module: 'respiratory',
    stem: 'A 2-year-old with croup has stridor at rest, moderate retractions, decreased air entry and normal color and mentation (Westley 5). Best management?',
    options: [
      'Oral dexamethasone and nebulized epinephrine; observe ≥2 h after epinephrine',
      'Cool mist and discharge',
      'Dexamethasone only and discharge immediately',
      'Lateral neck radiograph before treatment',
    ],
    answer: 0,
    explanation:
      'Moderate croup with stridor at rest and retractions: steroid plus nebulized epinephrine (effect lasts ~2 h, so observe ≥2 h before discharge). Humidified air does not help (Cochrane). Imaging is not needed for typical croup.',
    refs: ['westley-1978', 'croup-cochrane-2023', 'croup-humid-2006'],
  },
  {
    id: 'resp-croup-dex',
    module: 'respiratory',
    stem: 'Which statement about corticosteroids for croup is supported by trial evidence?',
    options: [
      'Oral dexamethasone works as well as IM, and doses as low as 0.15 mg/kg appear similarly effective to 0.6 mg/kg',
      'Steroids benefit only moderate–severe croup',
      'Nebulized budesonide is superior to oral dexamethasone',
      'Steroids take 24 hours to have any effect',
    ],
    answer: 0,
    explanation:
      'Steroids benefit all severities, reducing return visits and admissions; onset within hours. Oral is equivalent to IM. Parker & Cooper (2019) found 0.15 mg/kg dexamethasone and prednisolone 1 mg/kg non-inferior to 0.6 mg/kg.',
    refs: ['croup-dex-dose-2019', 'croup-cochrane-2023'],
  },
  {
    id: 'resp-epiglottitis',
    module: 'respiratory',
    stem: 'An unimmunized 3-year-old is toxic, febrile, drooling and sitting forward; no barky cough. Next step?',
    options: [
      'Keep calm with caregiver; summon anesthesia/ENT for airway control in a controlled setting',
      'Examine the pharynx with a tongue depressor',
      'Lateral neck radiograph in radiology',
      'Nebulized epinephrine and discharge if improved',
    ],
    answer: 0,
    explanation:
      'Suspected epiglottitis (Hib in the unimmunized): avoid agitating procedures that can precipitate obstruction; secure the airway in a controlled setting, then give IV ceftriaxone. Bacterial tracheitis is the main alternative in a toxic child with poor response to epinephrine.',
    refs: ['red-book'],
  },
  {
    id: 'resp-aom-observe',
    module: 'respiratory',
    stem: 'A 15-month-old has unilateral AOM with a bulging TM, ear-tugging for 1 day and T 38.4 °C. No otorrhea. Per AAP 2013?',
    options: [
      'Antibiotics or observation with close follow-up, by shared decision',
      'Antibiotics are mandatory under 2 years',
      'Tympanocentesis',
      'Antibiotic ear drops',
    ],
    answer: 0,
    explanation:
      'At 6–23 months, unilateral non-severe AOM allows initial observation (with a reliable plan to start antibiotics if no improvement in 48–72 h). Antibiotics are required for bilateral AOM at this age, otorrhea, or severe signs (moderate–severe otalgia, otalgia ≥48 h, T ≥39 °C).',
    refs: ['aap-aom-2013'],
  },
  {
    id: 'resp-aom-conj',
    module: 'respiratory',
    stem: 'A 3-year-old has bilateral AOM and purulent conjunctivitis. No antibiotics in the past month. Best antibiotic?',
    options: ['Amoxicillin–clavulanate', 'High-dose amoxicillin', 'Azithromycin', 'Topical ciprofloxacin–dexamethasone'],
    answer: 0,
    explanation:
      'Otitis–conjunctivitis syndrome is usually nontypeable H. influenzae, which often produces β-lactamase → amoxicillin–clavulanate (90/6.4 mg/kg/day). Also use it after amoxicillin in the past 30 days or recurrent AOM unresponsive to amoxicillin.',
    refs: ['aap-aom-2013'],
  },
  {
    id: 'resp-aom-dx',
    module: 'respiratory',
    stem: 'Which finding is sufficient to diagnose acute otitis media?',
    options: ['Moderate–severe bulging of the tympanic membrane', 'Red tympanic membrane in a crying child', 'Air–fluid level behind a non-bulging TM', 'Decreased light reflex'],
    answer: 0,
    explanation:
      'AAP 2013: moderate–severe bulging, OR new otorrhea not from otitis externa, OR mild bulging with recent (<48 h) ear pain or intense TM erythema. Effusion without bulging is otitis media with effusion — no antibiotics. Crying alone reddens the TM.',
    refs: ['aap-aom-2013'],
  },
  {
    id: 'resp-gas-viral',
    module: 'respiratory',
    stem: 'An 8-year-old has sore throat, cough, rhinorrhea, hoarseness and T 38.1 °C. Plan?',
    options: ['No strep testing; symptomatic care', 'Rapid antigen test', 'Empiric amoxicillin', 'Throat culture only'],
    answer: 0,
    explanation:
      'Overt viral features (cough, rhinorrhea, hoarseness, oral ulcers, conjunctivitis) make GAS unlikely. IDSA 2025 endorses clinical scores (Centor/McIsaac) to identify low-probability patients who need no test. Testing also detects carriers (~12% of children), leading to unnecessary antibiotics.',
    refs: ['idsa-gas-2025', 'gas-carriage-2010'],
  },
  {
    id: 'resp-gas-backup',
    module: 'respiratory',
    stem: 'A 10-year-old with fever, tonsillar exudate, tender anterior nodes and no cough has a negative rapid antigen test. Next step?',
    options: ['Throat culture', 'Treat with amoxicillin anyway', 'Reassure — strep excluded', 'Monospot test'],
    answer: 0,
    explanation:
      'In children and adolescents, back up a negative rapid antigen test (sensitivity ~70–90%) with a throat culture; a high-sensitivity molecular test generally does not need backup. Adults do not need routine backup.',
    refs: ['idsa-gas-2012', 'idsa-gas-2025'],
  },
  {
    id: 'resp-gas-allergy',
    module: 'respiratory',
    stem: 'A 9-year-old with culture-proven GAS pharyngitis had anaphylaxis to amoxicillin. Best treatment?',
    options: ['Azithromycin 12 mg/kg daily × 5 days (or clindamycin × 10 days)', 'Cephalexin × 10 days', 'Amoxicillin with premedication', 'No treatment — GAS is self-limited'],
    answer: 0,
    explanation:
      'After immediate-type reaction to amoxicillin, avoid cephalexin/cefadroxil (they share amoxicillin’s side chain). IDSA alternatives: azithromycin, clarithromycin or clindamycin. Treatment within 9 days of onset prevents rheumatic fever.',
    refs: ['idsa-gas-2012', 'drug-allergy-2022'],
  },
  {
    id: 'resp-cap',
    module: 'respiratory',
    stem: 'A fully immunized, well-appearing 4-year-old has fever, tachypnea and focal crackles; SpO₂ 95%. Outpatient treatment?',
    options: ['Amoxicillin 90 mg/kg/day ÷ BID for 5 days', 'Azithromycin for 5 days', 'Amoxicillin–clavulanate for 10 days', 'Ceftriaxone IM then cefdinir'],
    answer: 0,
    explanation:
      'S. pneumoniae is the key bacterial target; high-dose amoxicillin is first-line. SCOUT-CAP, SAFER and CAP-IT show 5 days is as effective as 10. Macrolides are for suspected atypical infection in school-age children; amoxicillin–clavulanate adds nothing for pneumococcus and does not cover atypicals.',
    refs: ['pids-cap-2011', 'scout-cap-2022', 'cap-it-2021'],
  },
  {
    id: 'resp-flu',
    module: 'respiratory',
    stem: 'A 6-year-old is admitted on day 4 of influenza with hypoxemia. Antiviral plan?',
    options: ['Start oseltamivir now', 'No antiviral — more than 48 h from onset', 'Oseltamivir only if vaccinated this season', 'Amantadine'],
    answer: 0,
    explanation:
      'Treat as soon as possible any child who is hospitalized, has severe/progressive illness, or is at high risk — regardless of vaccination status or symptom duration. The 48-hour window applies to otherwise healthy outpatients.',
    refs: ['aap-flu-2026', 'cdc-flu-antivirals'],
  },
  {
    id: 'resp-pertussis',
    module: 'respiratory',
    stem: 'A 5-week-old has paroxysmal cough with post-tussive cyanosis and an apneic spell. WBC 28,000 with lymphocytosis. Treatment?',
    options: ['Azithromycin 10 mg/kg daily × 5 days and admit', 'Erythromycin × 14 days at home', 'Amoxicillin × 10 days', 'Supportive care only'],
    answer: 0,
    explanation:
      'Young infants with pertussis may not whoop; apnea and cyanosis dominate and marked lymphocytosis signals risk of severe disease. Azithromycin is preferred under 1 month (erythromycin is linked to pyloric stenosis). Admit for monitoring; treat close contacts; maternal Tdap each pregnancy is the best prevention.',
    refs: ['red-book'],
  },
]

export const feverQuestions: Question[] = [
  {
    id: 'fev-25d-abn-pct',
    module: 'fever',
    stem: 'A well-appearing 25-day-old (term) has T 38.4 °C. UA is negative; procalcitonin 0.9 ng/mL; ANC 3,800. Next step?',
    options: ['Lumbar puncture, parenteral antibiotics and admission', 'Home with follow-up in 24 h', 'Repeat procalcitonin in 6 h', 'Oral amoxicillin and discharge'],
    answer: 0,
    explanation:
      'AAP 2021, 22–28 days: any abnormal inflammatory marker (PCT >0.5 ng/mL, ANC >4,000–5,200, CRP >20 mg/L; temperature >38.5 °C if PCT unavailable) mandates CSF, parenteral antibiotics and hospitalization.',
    refs: ['aap-febrile-infant-2021'],
  },
  {
    id: 'fev-45d-low',
    module: 'fever',
    stem: 'A well-appearing 45-day-old (term) has T 38.2 °C. UA negative; PCT 0.2 ng/mL; ANC 2,900. Family has a car and phone. Plan?',
    options: ['No LP, no antibiotics; home with re-evaluation in 24–36 h', 'LP and ceftriaxone, then home', 'Admit for 48 h of IV antibiotics', 'LP without antibiotics, then admit'],
    answer: 0,
    explanation:
      'At 29–60 days with normal UA and inflammatory markers, the risk of bacteremia/meningitis is very low: no LP, no antibiotics, close outpatient follow-up (hospitalize if follow-up cannot be assured).',
    refs: ['aap-febrile-infant-2021', 'pecarn-febrile-2019'],
  },
  {
    id: 'fev-14d',
    module: 'fever',
    stem: 'A well-appearing 14-day-old has T 38.3 °C. Management?',
    options: [
      'UA + urine culture, blood culture, LP; parenteral ampicillin plus ceftazidime or gentamicin; admit',
      'UA and blood culture; home if normal',
      'Inflammatory markers; LP only if abnormal',
      'Observe in ED for 4 h',
    ],
    answer: 0,
    explanation:
      'At 8–21 days, inflammatory markers do not identify a safe low-risk group: full evaluation including CSF, empiric antibiotics and admission for all. Add acyclovir if HSV risk factors.',
    refs: ['aap-febrile-infant-2021'],
  },
  {
    id: 'fev-bag-urine',
    module: 'fever',
    stem: 'A febrile 10-month-old has positive leukocyte esterase on a bag urine sample. Next step?',
    options: ['Obtain a catheterized specimen for culture before antibiotics', 'Send the bag specimen for culture', 'Treat without culture', 'Repeat the bag sample'],
    answer: 0,
    explanation:
      'Bag specimens are acceptable for screening UA but not for culture (high contamination). Diagnose UTI with pyuria/bacteriuria AND ≥50,000 CFU/mL of a single uropathogen from a catheter or suprapubic specimen.',
    refs: ['aap-uti-2011'],
  },
  {
    id: 'fev-uti-imaging',
    module: 'fever',
    stem: 'A 9-month-old recovered well from a first febrile UTI. Imaging?',
    options: ['Renal and bladder ultrasound; VCUG only if ultrasound abnormal or UTI recurs', 'VCUG for all', 'DMSA scan for all', 'No imaging'],
    answer: 0,
    explanation:
      'AAP 2011 (reaffirmed 2016): renal–bladder ultrasound after the first febrile UTI at 2–24 months; VCUG is reserved for abnormal ultrasound, atypical/complex features, or recurrence.',
    refs: ['aap-uti-2011'],
  },
  {
    id: 'fev-mening-empiric',
    module: 'fever',
    stem: 'Empiric therapy for suspected bacterial meningitis in a 4-month-old?',
    options: ['Vancomycin + ceftriaxone (meningitic dosing)', 'Ampicillin + gentamicin', 'Ceftriaxone alone', 'Ampicillin + ceftriaxone + acyclovir always'],
    answer: 0,
    explanation:
      'Beyond the neonatal period: vancomycin plus a third-generation cephalosporin (ceftriaxone 100 mg/kg/day) to cover resistant pneumococcus and meningococcus. Neonates: ampicillin plus gentamicin or an anti-pseudomonal cephalosporin (cefotaxime is no longer marketed in the U.S.). Dexamethasone, if used (Hib; consider pneumococcal), goes before or with the first antibiotic dose.',
    refs: ['red-book'],
  },
  {
    id: 'fev-mening-ppx',
    module: 'fever',
    stem: 'A 6-year-old has meningococcal meningitis. Who needs chemoprophylaxis?',
    options: [
      'Household members and child-care contacts in the prior 7 days',
      'Every student in the school',
      'Only symptomatic contacts',
      'Health-care workers who entered the room',
    ],
    answer: 0,
    explanation:
      'Prophylaxis (rifampin, single-dose ceftriaxone, or ciprofloxacin) for close contacts: household, child care, direct exposure to oral secretions, and clinicians with unprotected airway exposure (e.g., intubation) — not routine room entry or classmates.',
    refs: ['red-book'],
  },
  {
    id: 'fev-sepsis-fluids',
    module: 'fever',
    stem: 'A 4-year-old in an ED with PICU access has septic shock: HR 170, cap refill 4 s, BP 78/40. Fluid strategy per SSC 2026?',
    options: [
      '10–20 mL/kg balanced crystalloid boluses, up to 40–60 mL/kg in the first hour, reassessing after each',
      'No bolus; maintenance fluids only',
      'Single 60 mL/kg bolus of 0.9% saline over 15 min',
      'Albumin 5% as first fluid',
    ],
    answer: 0,
    explanation:
      'With intensive care available: titrated 10–20 mL/kg boluses up to 40–60 mL/kg, stopping for signs of overload (hepatomegaly, crackles). Balanced crystalloids are suggested over saline. Withholding boluses applies to settings without intensive care in children without hypotension.',
    refs: ['ssc-peds-2026'],
  },
  {
    id: 'fev-phoenix',
    module: 'fever',
    stem: 'Under the 2024 Phoenix criteria, how is pediatric sepsis defined?',
    options: [
      'Suspected infection with a Phoenix Sepsis Score ≥2 (respiratory, cardiovascular, coagulation, neurologic dysfunction)',
      'Suspected infection plus ≥2 SIRS criteria',
      'Positive blood culture with fever',
      'Lactate ≥2 mmol/L with fever',
    ],
    answer: 0,
    explanation:
      'Phoenix replaces SIRS-based definitions: sepsis = suspected infection with life-threatening organ dysfunction (score ≥2). Septic shock = sepsis with ≥1 cardiovascular point. SIRS criteria lacked specificity for poor outcomes.',
    refs: ['phoenix-2024'],
  },
  {
    id: 'fev-kd',
    module: 'fever',
    stem: 'A 3-year-old has had fever for 6 days with bilateral non-exudative conjunctival injection, cracked red lips, a polymorphous rash and swollen hands. Management?',
    options: ['IVIG 2 g/kg with aspirin, and echocardiogram', 'Wait for desquamation to confirm', 'Oral steroids alone', 'Antibiotics and recheck in 48 h'],
    answer: 0,
    explanation:
      'Fever ≥5 days + ≥4 of 5 principal features = Kawasaki disease. Give IVIG 2 g/kg (ideally within 10 days of fever onset) with aspirin; echocardiogram at diagnosis, 1–2 and 4–6 weeks. Add steroids for high-risk patients (e.g., infants <6 months, coronary Z ≥2.5). Defer live vaccines 11 months after IVIG.',
    refs: ['aha-kd-2017', 'aha-kd-2024'],
  },
  {
    id: 'fev-measles',
    module: 'fever',
    stem: 'An unvaccinated 2-year-old has 4 days of fever, cough, coryza and conjunctivitis, now a maculopapular rash spreading from the hairline downward. Immediate actions?',
    options: [
      'Airborne isolation, notify public health now, measles PCR/IgM, and vitamin A',
      'Droplet precautions and amoxicillin',
      'Discharge home — viral exanthem',
      'Give MMR now as treatment',
    ],
    answer: 0,
    explanation:
      'Classic measles (prodrome of the “3 Cs”, Koplik spots, cephalocaudal rash). Airborne isolation (negative-pressure room, N95), report immediately so contacts can receive post-exposure prophylaxis, and give vitamin A to all children with measles. Infectious from 4 days before to 4 days after rash onset. The U.S. lost measles elimination status in November 2026.',
    refs: ['red-book', 'measles-2026'],
  },
  {
    id: 'fev-vitA',
    module: 'fever',
    stem: 'Vitamin A dose for an 18-month-old with measles?',
    options: ['200,000 IU orally once daily for 2 days', '50,000 IU once', '100,000 IU once weekly for 4 weeks', 'Vitamin A is only for malnourished children'],
    answer: 0,
    explanation:
      'All children with measles: 200,000 IU (≥12 months), 100,000 IU (6–11 months), 50,000 IU (<6 months), once daily for 2 days; a third dose 2–6 weeks later if there are signs of vitamin A deficiency. It reduces morbidity and mortality.',
    refs: ['red-book'],
  },
]
