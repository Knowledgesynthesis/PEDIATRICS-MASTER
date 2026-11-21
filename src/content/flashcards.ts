import type { Flashcard } from '@/types'

/** High-yield facts for rapid retrieval practice. Each card mirrors content taught in its module. */
export const flashcards: Flashcard[] = [
  // Growth
  { id: 'fc-gr-1', module: 'growth', front: 'Which growth charts: 0–2 years vs 2–20 years?', back: 'WHO standards 0–24 months; CDC 2000 charts 2–20 years (extended BMI charts above the 97th percentile).' },
  { id: 'fc-gr-2', module: 'growth', front: 'Regain birth weight by…', back: '10–14 days.' },
  { id: 'fc-gr-3', module: 'growth', front: 'Typical weight gain 0–3 / 3–6 / 6–12 months', back: '≈25–35 / 15–21 / 10–13 g per day.' },
  { id: 'fc-gr-4', module: 'growth', front: 'Mid-parental height formula', back: '(Father + mother ± 13 cm) ÷ 2 (+ for boys, − for girls); target range ±8.5 cm.' },
  { id: 'fc-gr-5', module: 'growth', front: 'Correct for prematurity until…', back: '24 months chronological age (growth and development). Vaccines use chronological age.' },
  { id: 'fc-gr-6', module: 'growth', front: 'Height falls, weight preserved → think…', back: 'Endocrine: hypothyroidism, GH deficiency, glucocorticoid excess (and Turner syndrome in girls).' },
  { id: 'fc-gr-7', module: 'growth', front: 'Obesity classes (AAP 2023)', back: 'Obesity ≥95th percentile; class 2 ≥120% of the 95th (or BMI ≥35); class 3 ≥140% (or BMI ≥40).' },
  { id: 'fc-gr-8', module: 'growth', front: 'Universal lipid screening ages', back: 'Once at 9–11 years and once at 17–21 years.' },

  // Development
  { id: 'fc-dev-1', module: 'development', front: 'Standardized developmental screening ages', back: '9, 18 and 30 months; autism-specific (M-CHAT-R/F) at 18 and 24 months.' },
  { id: 'fc-dev-2', module: 'development', front: 'What do the 2022 CDC/AAP milestones represent?', back: 'Skills ≥75% of children achieve by that age — missing one = screen now.' },
  { id: 'fc-dev-3', module: 'development', front: 'WHO 99th percentile for walking alone', back: '17.6 months (median 12.0). Not walking at 18 months → refer, check CK in boys.' },
  { id: 'fc-dev-4', module: 'development', front: 'Autism red flags', back: 'No babble/point/gesture by 12 mo; no words by 16 mo; no 2-word phrases by 24 mo; any regression.' },
  { id: 'fc-dev-5', module: 'development', front: 'Speech intelligibility to strangers at 2, 3, 4 years', back: '≈50%, 75%, ~100%.' },
  { id: 'fc-dev-6', module: 'development', front: 'Shapes: circle, cross, square, triangle, diamond', back: '3 y, 4 y, ~4½ y, 5 y, ~7 y.' },
  { id: 'fc-dev-7', module: 'development', front: 'Hand preference before 18 months suggests…', back: 'Weakness of the other side (e.g., hemiparetic cerebral palsy).' },
  { id: 'fc-dev-8', module: 'development', front: 'First-tier genetic test for unexplained global delay', back: 'Exome/genome sequencing (ACMG 2021) or chromosomal microarray + fragile X.' },

  // Vaccines
  { id: 'fc-vax-1', module: 'vaccines', front: 'Rotavirus age limits', back: 'Dose 1 by 14 weeks 6 days; no dose after 8 months 0 days.' },
  { id: 'fc-vax-2', module: 'vaccines', front: 'HepB dose 3 minimums', back: 'Age ≥24 weeks, ≥8 weeks after dose 2, ≥16 weeks after dose 1.' },
  { id: 'fc-vax-3', module: 'vaccines', front: 'Grace period', back: 'Doses ≤4 days early are valid — not for the 28-day interval between different live vaccines.' },
  { id: 'fc-vax-4', module: 'vaccines', front: 'Two live injectable vaccines not given the same day', back: 'Separate by ≥28 days.' },
  { id: 'fc-vax-5', module: 'vaccines', front: 'RSV: when is an infant antibody not needed?', back: 'Mother got RSVpreF ≥14 days before birth (most infants).' },
  { id: 'fc-vax-6', module: 'vaccines', front: 'Nirsevimab doses', back: 'First season: 50 mg (<5 kg) or 100 mg (≥5 kg); high-risk second season: 200 mg.' },
  { id: 'fc-vax-7', module: 'vaccines', front: 'Measles post-exposure prophylaxis', back: 'MMR within 72 h, or immune globulin within 6 days (IGIM 0.5 mL/kg; IGIV 400 mg/kg if pregnant/immunocompromised).' },
  { id: 'fc-vax-8', module: 'vaccines', front: 'Why separate MMR + V for dose 1 at 12–47 months?', back: 'MMRV doubles febrile-seizure risk (≈1 extra per 2,300–2,600 doses).' },
  { id: 'fc-vax-9', module: 'vaccines', front: 'Infant of HBsAg-positive mother', back: 'HepB vaccine + HBIG within 12 h; serology at 9–12 months.' },
  { id: 'fc-vax-10', module: 'vaccines', front: 'Pertussis-vaccine contraindication', back: 'Encephalopathy within 7 days of a prior dose (give DT).' },

  // Newborn
  { id: 'fc-nb-1', module: 'newborn', front: 'CCHD screen: pass, repeat, and fail (AAP 2025)', back: 'Pass: ≥95% in BOTH right hand and either foot plus absolute difference ≤3 percentage points. Either site <90%: immediate fail. Otherwise repeat both sites once in 1 h; a repeat that does not pass is a fail.' },
  { id: 'fc-nb-2', module: 'newborn', front: 'Bilirubin rate of rise suggesting hemolysis', back: '≥0.3 mg/dL/h in the first 24 h; ≥0.2 mg/dL/h thereafter.' },
  { id: 'fc-nb-3', module: 'newborn', front: 'Escalation-of-care threshold (AAP 2022)', back: 'Exchange threshold − 2 mg/dL.' },
  { id: 'fc-nb-4', module: 'newborn', front: 'Neurotoxicity risk factors', back: 'GA <38 wk, albumin <3.0, isoimmune hemolysis/G6PD/other hemolysis, sepsis, instability in 24 h.' },
  { id: 'fc-nb-5', module: 'newborn', front: 'Abnormal direct bilirubin', back: '≥1.0 mg/dL → evaluate for cholestasis/biliary atresia.' },
  { id: 'fc-nb-6', module: 'newborn', front: 'Congenital CMV diagnosis', back: 'Urine or saliva PCR within 21 days of birth.' },
  { id: 'fc-nb-7', module: 'newborn', front: 'Congenital hypothyroidism treatment', back: 'Levothyroxine 10–15 mcg/kg/day, ideally started by 2 weeks of age.' },
  { id: 'fc-nb-8', module: 'newborn', front: 'Shock + weak femorals in week 1', back: 'Duct-dependent systemic lesion → start PGE1 (watch for apnea).' },
  { id: 'fc-nb-9', module: 'newborn', front: 'Down syndrome newborn checks', back: 'Echo, CBC, TSH, hearing; eye exam by 6 months; sleep study by 4 years.' },

  // Respiratory
  { id: 'fc-resp-1', module: 'respiratory', front: 'Bronchiolitis oxygen threshold', back: 'Give O₂ if SpO₂ persistently <90%.' },
  { id: 'fc-resp-2', module: 'respiratory', front: 'Bronchiolitis: what not to give', back: 'Albuterol, epinephrine, steroids, ED hypertonic saline, antibiotics, chest physiotherapy.' },
  { id: 'fc-resp-3', module: 'respiratory', front: 'Westley bands', back: '≤2 mild, 3–5 moderate, 6–11 severe, ≥12 impending failure.' },
  { id: 'fc-resp-4', module: 'respiratory', front: 'Croup dexamethasone', back: '0.6 mg/kg PO once (0.15 mg/kg appears similar); all severities.' },
  { id: 'fc-resp-5', module: 'respiratory', front: 'AOM: when is observation an option?', back: 'Non-severe, no otorrhea: unilateral at 6–23 mo; unilateral or bilateral at ≥24 mo.' },
  { id: 'fc-resp-6', module: 'respiratory', front: 'AOM: when amoxicillin–clavulanate?', back: 'Amoxicillin in past 30 days, purulent conjunctivitis, or recurrent AOM unresponsive to amoxicillin.' },
  { id: 'fc-resp-7', module: 'respiratory', front: 'GAS: negative rapid test in a child', back: 'Back-up throat culture.' },
  { id: 'fc-resp-8', module: 'respiratory', front: 'Outpatient CAP', back: 'Amoxicillin 90 mg/kg/day ÷ BID for 5 days.' },
  { id: 'fc-resp-9', module: 'respiratory', front: 'Pertussis in infants <1 month', back: 'Azithromycin 10 mg/kg daily × 5 days (erythromycin → pyloric stenosis).' },

  // Fever
  { id: 'fc-fev-1', module: 'fever', front: 'Abnormal inflammatory markers (AAP 2021)', back: 'PCT >0.5 ng/mL, ANC >4,000–5,200, CRP >20 mg/L, temp >38.5 °C (if no PCT).' },
  { id: 'fc-fev-2', module: 'fever', front: '8–21 days febrile, well', back: 'UA, blood culture, CSF; parenteral antibiotics; admit.' },
  { id: 'fc-fev-3', module: 'fever', front: '29–60 days, normal UA and IMs', back: 'No LP, no antibiotics, home with re-check in 24–36 h.' },
  { id: 'fc-fev-4', module: 'fever', front: 'UTI culture threshold (catheter)', back: '≥50,000 CFU/mL single uropathogen + pyuria/bacteriuria.' },
  { id: 'fc-fev-5', module: 'fever', front: 'Empiric meningitis therapy >1 month', back: 'Vancomycin + ceftriaxone 100 mg/kg/day.' },
  { id: 'fc-fev-6', module: 'fever', front: 'Phoenix sepsis definition', back: 'Suspected infection + Phoenix score ≥2; shock = ≥1 cardiovascular point.' },
  { id: 'fc-fev-7', module: 'fever', front: 'Kawasaki criteria', back: 'Fever ≥5 days + ≥4 of: conjunctivitis, oral changes, rash, extremity changes, cervical node ≥1.5 cm.' },
  { id: 'fc-fev-8', module: 'fever', front: 'Vitamin A for measles', back: '≥12 mo 200,000 IU; 6–11 mo 100,000 IU; <6 mo 50,000 IU — daily × 2 days.' },

  // Fluids
  { id: 'fc-fl-1', module: 'fluids', front: '4-2-1 rule', back: '4 mL/kg/h first 10 kg, 2 mL/kg/h next 10 kg, 1 mL/kg/h each kg above 20.' },
  { id: 'fc-fl-2', module: 'fluids', front: 'Maintenance fluid choice (AAP 2018)', back: 'Isotonic with dextrose and KCl (e.g., D5 0.9% NaCl + 20 mEq/L KCl).' },
  { id: 'fc-fl-3', module: 'fluids', front: 'Clinical Dehydration Scale bands', back: '0 none, 1–4 some, 5–8 moderate/severe.' },
  { id: 'fc-fl-4', module: 'fluids', front: 'Ongoing-loss replacement', back: '10 mL/kg per diarrheal stool; 2 mL/kg per emesis.' },
  { id: 'fc-fl-5', module: 'fluids', front: 'Ondansetron ODT bands', back: '8–15 kg 2 mg; >15–30 kg 4 mg; >30 kg 6 mg.' },
  { id: 'fc-fl-6', module: 'fluids', front: 'Hyponatremic seizure', back: '3% saline 2 mL/kg (max 100 mL) over 10 min; repeat up to 2×.' },
  { id: 'fc-fl-7', module: 'fluids', front: 'Sodium correction limits', back: 'Hyponatremia ≤8–10 mEq/L per 24 h; hypernatremia ≤10–12 mEq/L per 24 h.' },
  { id: 'fc-fl-8', module: 'fluids', front: 'DKA insulin', back: '0.05–0.1 U/kg/h, no bolus, starting ≥1 h after fluids.' },

  // Seizures
  { id: 'fc-fs-1', module: 'seizures', front: 'Complex febrile seizure', back: 'Focal, ≥15 min, or recurs within 24 h.' },
  { id: 'fc-fs-2', module: 'seizures', front: 'LP after simple febrile seizure (AAP 2011)', back: 'Meningeal signs → perform. Option: 6–12 mo with deficient Hib/PCV, or antibiotic pretreatment.' },
  { id: 'fc-fs-3', module: 'seizures', front: 'Recurrence risk factors', back: 'Age <18 mo, family history, low temperature at seizure, <1 h fever before seizure.' },
  { id: 'fc-fs-4', module: 'seizures', front: 'Epilepsy risk after simple FS', back: '≈1–2%, close to the general population.' },

  // Emergencies
  { id: 'fc-em-1', module: 'emergencies', front: 'Hypotension 1–10 years', back: 'SBP <70 + (2 × age in years).' },
  { id: 'fc-em-2', module: 'emergencies', front: 'APLS weight estimates', back: 'Infant (0.5 × mo) + 4; 1–5 y (2 × age) + 8; 6–12 y (3 × age) + 7.' },
  { id: 'fc-em-3', module: 'emergencies', front: 'IM epinephrine for anaphylaxis', back: '0.01 mg/kg of 1 mg/mL (max 0.3 mg prepubertal, 0.5 mg); repeat q5–15 min.' },
  { id: 'fc-em-4', module: 'emergencies', front: 'Auto-injector bands', back: '0.1 mg 7.5–<15 kg; 0.15 mg 15–<30 kg; 0.3 mg ≥30 kg (AAP: 0.3 from ~25 kg).' },
  { id: 'fc-em-5', module: 'emergencies', front: 'Status epilepticus second line', back: 'Levetiracetam 60 mg/kg (max 4.5 g), fosphenytoin 20 mg PE/kg, or valproate 40 mg/kg.' },
  { id: 'fc-em-6', module: 'emergencies', front: 'PAT: abnormal appearance + abnormal breathing', back: 'Respiratory failure.' },
  { id: 'fc-em-7', module: 'emergencies', front: 'TEN-4-FACESp', back: 'Any bruise ≤4.99 mo; in <4 y: Torso, Ears, Neck, Frenulum, Angle of jaw, Cheek, Eyelid, Subconjunctiva, patterned.' },
  { id: 'fc-em-8', module: 'emergencies', front: 'Defibrillation dose', back: '2 J/kg, then 4 J/kg (max 10 J/kg or adult dose).' },
]
