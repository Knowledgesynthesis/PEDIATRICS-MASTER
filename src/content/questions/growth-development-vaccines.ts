import type { Question } from '@/types'

export const growthQuestions: Question[] = [
  {
    id: 'gr-corrected-age',
    module: 'growth',
    stem: 'A 9-month-old (chronological age) born at 28 weeks’ gestation comes for a well visit. Which ages do you use?',
    options: [
      'Corrected age (≈6 months) for growth and development; chronological age (9 months) for vaccines',
      'Corrected age for growth, development, and vaccines',
      'Chronological age for growth, development, and vaccines',
      'Chronological age for development; corrected age for vaccines',
    ],
    answer: 0,
    explanation:
      '40 − 28 = 12 weeks premature, so corrected age ≈ 9 − 3 = 6 months. Correct for prematurity when plotting growth and judging milestones until ~24 months. Vaccines are given by chronological age regardless of gestational age (the one nuance is timing of the hepatitis B birth dose in infants <2,000 g).',
    refs: ['who-cdc-charts', 'acip-best-practices'],
  },
  {
    id: 'gr-chart-choice',
    module: 'growth',
    stem: 'Which growth reference should be used for a healthy 18-month-old in the United States?',
    options: ['WHO growth standards', 'CDC 2000 growth charts', 'Fenton preterm charts', 'CDC extended BMI-for-age charts'],
    answer: 0,
    explanation:
      'CDC recommends WHO standards from birth to 24 months — they describe how healthy breastfed infants should grow — and CDC 2000 charts from 2 to 20 years. Fenton charts are for preterm infants until ~50 weeks’ postmenstrual age; extended BMI charts are for children 2–19 years with BMI above the 97th percentile.',
    refs: ['who-cdc-charts'],
  },
  {
    id: 'gr-endocrine-pattern',
    module: 'growth',
    stem: 'A 7-year-old’s height has fallen from the 50th to the 10th percentile over 2 years while weight has risen from the 50th to the 75th percentile. Which category of cause is most likely?',
    options: ['Endocrine (e.g., hypothyroidism, GH deficiency, glucocorticoid excess)', 'Inadequate caloric intake', 'Inflammatory bowel disease', 'Familial short stature'],
    answer: 0,
    explanation:
      'Slowing linear growth with preserved or rising weight points to an endocrine cause. Nutritional and systemic causes (inadequate intake, IBD, celiac) typically drop weight first, then height. Familial short stature tracks a low percentile at a normal velocity — it does not cross percentiles after age 2–3.',
    refs: ['who-cdc-charts'],
  },
  {
    id: 'gr-cdgp',
    module: 'growth',
    stem: 'A 13-year-old boy has tracked along the 3rd percentile for height since age 3 at a normal velocity. He is Tanner 1. His father entered puberty late. Bone age is 11 years. Most likely diagnosis?',
    options: ['Constitutional delay of growth and puberty', 'Familial short stature', 'Growth hormone deficiency', 'Klinefelter syndrome'],
    answer: 0,
    explanation:
      'Delayed bone age, normal velocity, delayed puberty and a family history of late puberty = constitutional delay; adult height is usually normal. In familial short stature, bone age equals chronological age and puberty is on time. GH deficiency causes subnormal velocity (crossing percentiles). Klinefelter boys tend to be tall.',
    refs: ['who-cdc-charts'],
  },
  {
    id: 'gr-mph',
    module: 'growth',
    stem: 'Father is 175 cm and mother 160 cm. What is the mid-parental (target) height for their son?',
    options: ['174 cm', '167.5 cm', '180.5 cm', '161 cm'],
    answer: 0,
    explanation: 'Boys: (175 + 160 + 13) ÷ 2 = 174 cm, with a target range of roughly ±8.5 cm (≈±2 SD). Girls: subtract 13 instead (161 cm here).',
    refs: ['who-cdc-charts'],
  },
  {
    id: 'gr-obesity-2023',
    module: 'growth',
    stem: 'A 14-year-old has a BMI of 142% of the 95th percentile with no comorbidities yet. Per the AAP 2023 guideline, what is appropriate?',
    options: [
      'Intensive health behavior and lifestyle treatment, offer pharmacotherapy, and refer for metabolic and bariatric surgery evaluation',
      'Watchful waiting with BMI recheck in 12 months',
      'Dietary counseling only; defer medication until age 18',
      'Metformin as primary weight-loss therapy',
    ],
    answer: 0,
    explanation:
      'BMI ≥140% of the 95th percentile is class 3 obesity. AAP 2023 explicitly rejects watchful waiting, recommends IHBLT (≥26 contact hours over 3–12 months), recommends offering pharmacotherapy from age 12, and offers referral for metabolic and bariatric surgery evaluation from age 13 with severe obesity. Metformin is not an approved anti-obesity drug.',
    refs: ['aap-obesity-2023'],
  },
  {
    id: 'gr-ftt-history',
    module: 'growth',
    stem: 'A 10-month-old’s weight fell from the 50th to the 5th percentile over 3 months. Length and head circumference are on track and the exam is normal. Best next step?',
    options: [
      'Detailed feeding history, 3-day food record and observed feeding',
      'CBC, CMP, TSH, celiac serology, sweat chloride and stool studies',
      'Upper GI series',
      'Admit for calorie counts',
    ],
    answer: 0,
    explanation:
      'Most faltering growth is due to inadequate intake. Labs ordered without clinical clues rarely help (classic data: ~1% of tests contributed to diagnosis). Start with feeding history, intake record and observed feeding; admission is for severe malnutrition, safety concerns, or failed outpatient management.',
    refs: ['who-cdc-charts'],
  },
  {
    id: 'gr-newborn-loss',
    module: 'growth',
    stem: 'A 3-day-old exclusively breastfed term infant has lost 11% of birth weight. She is mildly jaundiced and has had 2 wet diapers today. Best management?',
    options: [
      'Same-day breastfeeding evaluation (latch, milk transfer), check bilirubin, supplement expressed milk or formula as needed, recheck in 24–48 h',
      'Reassure — losses up to 15% are normal in the first week',
      'Stop breastfeeding and switch to formula',
      'Give glucose water between feeds',
    ],
    answer: 0,
    explanation:
      'Loss ≥10% exceeds the expected range on newborn weight-loss nomograms (NEWT) and, with few voids and jaundice, signals inadequate intake. Fix feeding and supplement while protecting breastfeeding; assess bilirubin. Water or glucose water is not recommended (hyponatremia; does not lower bilirubin).',
    refs: ['newt', 'aap-bili-2022'],
  },
  {
    id: 'gr-lipids',
    module: 'growth',
    stem: 'Which universal screening test is recommended for a healthy 10-year-old?',
    options: ['Non-fasting lipid panel (once between 9 and 11 years)', 'Urinalysis', 'CBC', 'TSH'],
    answer: 0,
    explanation:
      'Bright Futures recommends universal lipid screening once at 9–11 years and again at 17–21 years. Routine screening urinalysis was removed from the schedule; CBC and TSH are not universal screens at this age (hemoglobin screening is at 12 months).',
    refs: ['bright-futures'],
  },
]

export const developmentQuestions: Question[] = [
  {
    id: 'dev-no-crawl',
    module: 'development',
    stem: 'A 12-month-old has never crawled. She pulls to stand, cruises, uses a pincer grasp, waves bye-bye and says “mama” to her mother. Next step?',
    options: ['Reassure — crawling is not a required milestone', 'Refer to physical therapy', 'Order an MRI of the brain', 'Check creatine kinase'],
    answer: 0,
    explanation:
      'Crawling is skipped by a meaningful minority of typically developing children (≈4% never hand-and-knee crawl in the WHO Motor Study), so the 2022 CDC/AAP milestones removed it. Her other motor, fine motor, language and social skills are on track.',
    refs: ['who-motor-2006', 'cdc-milestones-2022'],
  },
  {
    id: 'dev-not-walking',
    module: 'development',
    stem: 'An 18-month-old boy cannot walk independently. He pulls to stand and cruises. Speech and social skills are normal. Most appropriate next step?',
    options: [
      'Refer to early intervention and check creatine kinase',
      'Reassure and recheck at 24 months',
      'MRI brain before any referral',
      'Order orthopedic hip films only',
    ],
    answer: 0,
    explanation:
      'Not walking by 18 months is beyond the WHO 99th-percentile window (17.6 months) — refer now; do not wait for a diagnosis. AAP recommends CK in children with motor delay (especially boys) to detect Duchenne muscular dystrophy early.',
    refs: ['noritz-motor-2013', 'who-motor-2006', 'aap-dev-screening-2020'],
  },
  {
    id: 'dev-16mo-words',
    module: 'development',
    stem: 'A 16-month-old has no words. He does not point to show interest and rarely responds to his name. Best next step?',
    options: [
      'Audiology evaluation and referral for autism evaluation and early intervention now',
      'Recheck at the 18-month visit with M-CHAT',
      'Reassure — boys speak later',
      'Speech therapy only, once he turns 2',
    ],
    answer: 0,
    explanation:
      'No single words by 16 months and absent pointing are autism red flags. Any language concern needs a formal hearing test. Refer to early intervention in parallel with diagnostic evaluation — waiting for a scheduled screen delays services.',
    refs: ['aap-asd-2020', 'aap-dev-screening-2020'],
  },
  {
    id: 'dev-screen-ages',
    module: 'development',
    stem: 'At which well visits does AAP recommend a standardized general developmental screening tool?',
    options: ['9, 18 and 30 months', '6, 12 and 24 months', '12, 24 and 36 months', 'Every visit until age 3'],
    answer: 0,
    explanation:
      'Surveillance happens at every visit; standardized general screening at 9, 18 and 30 months; autism-specific screening (M-CHAT-R/F) at 18 and 24 months. Screen at any other visit when surveillance raises concern.',
    refs: ['aap-dev-screening-2020', 'aap-asd-2020'],
  },
  {
    id: 'dev-hand-pref',
    module: 'development',
    stem: 'Which finding at a 10-month visit is most concerning?',
    options: ['Strong hand preference', 'Stranger anxiety', 'Not yet walking', 'Says “mama” and “dada” nonspecifically'],
    answer: 0,
    explanation:
      'Hand dominance before ~18 months suggests weakness of the other side (e.g., hemiparetic cerebral palsy) and needs a neurologic exam. Stranger anxiety, not walking at 10 months and nonspecific babbling are all typical.',
    refs: ['noritz-motor-2013'],
  },
  {
    id: 'dev-age-3',
    module: 'development',
    stem: 'A child copies a circle, pedals a tricycle and speaks in 3-word sentences that strangers understand about 75% of the time. Typical age?',
    options: ['3 years', '2 years', '4 years', '5 years'],
    answer: 0,
    explanation:
      'Classic 3-year skills: circle, tricycle, 3-word sentences, ~75% intelligible to strangers. At 4: cross, hops on one foot, ~100% intelligible. At 5: triangle, skips. At 2: 2-word phrases, ~50% intelligible.',
    refs: ['cdc-milestones-2022'],
  },
  {
    id: 'dev-regression',
    module: 'development',
    stem: 'A 20-month-old who used 10 words now uses none and makes less eye contact. Hearing screen at birth was normal. Next step?',
    options: [
      'Prompt comprehensive evaluation (hearing, autism, neurology/genetics as indicated) and early-intervention referral',
      'Reassure — regression is common during toddler tantrums',
      'Recheck in 6 months',
      'Increase screen-time reduction and observe',
    ],
    answer: 0,
    explanation:
      'Loss of language or social skills at any age is an absolute red flag. A normal newborn hearing screen does not exclude later hearing loss. Evaluate promptly (autism, hearing, and — guided by findings — EEG for epileptic aphasia or genetic causes such as Rett syndrome in girls).',
    refs: ['aap-asd-2020', 'aap-dev-screening-2020'],
  },
  {
    id: 'dev-tool',
    module: 'development',
    stem: 'Which is an appropriate validated general developmental screening instrument at the 18-month visit?',
    options: ['Ages & Stages Questionnaire (ASQ-3)', 'M-CHAT-R/F alone', 'Denver II', 'Clinician’s overall impression'],
    answer: 0,
    explanation:
      'ASQ-3, PEDS and SWYC are validated parent-report general screens. M-CHAT-R/F is autism-specific (use it in addition at 18 and 24 months). Denver II has poor accuracy as a screen, and unaided clinical impression misses most children with delays.',
    refs: ['aap-dev-screening-2020'],
  },
  {
    id: 'dev-gdd-genetics',
    module: 'development',
    stem: 'A 3-year-old has global developmental delay with no clear etiology after history, exam, hearing and vision testing. Which is an appropriate first-tier genetic test?',
    options: ['Exome sequencing (or chromosomal microarray where ES is unavailable)', 'Karyotype', 'Brain MRI in all children', 'Metabolic screen in all children'],
    answer: 0,
    explanation:
      'ACMG (2021) recommends exome/genome sequencing as a first- or second-tier test for unexplained developmental delay/intellectual disability; microarray (plus fragile X testing) remains an option. Karyotype has low yield. MRI and metabolic testing are guided by exam findings (e.g., abnormal head size, focal signs, regression).',
    refs: ['acmg-exome-2021'],
  },
]

export const vaccineQuestions: Question[] = [
  {
    id: 'vax-mild-illness',
    module: 'vaccines',
    stem: 'A 4-month-old due for vaccines has a runny nose, temperature 38.0 °C and is on day 3 of amoxicillin for otitis media. Plan?',
    options: ['Give all due vaccines today', 'Defer until antibiotics are finished', 'Defer until afebrile for 48 h', 'Give only inactivated vaccines'],
    answer: 0,
    explanation:
      'Mild acute illness with or without fever and current antibiotic therapy are NOT contraindications. Only moderate or severe acute illness is a precaution. Deferring creates missed opportunities.',
    refs: ['acip-best-practices'],
  },
  {
    id: 'vax-rsv-14d',
    module: 'vaccines',
    stem: 'An infant is born in November at 39 weeks. The mother received the RSV prefusion F vaccine 9 days before delivery. RSV protection plan?',
    options: [
      'Give nirsevimab or clesrovimab before discharge',
      'No infant product needed — the mother was vaccinated',
      'Give palivizumab monthly through March',
      'Revaccinate the mother',
    ],
    answer: 0,
    explanation:
      'Maternal vaccination protects the infant only if given ≥14 days before birth. With <14 days, the infant should receive a long-acting monoclonal antibody (nirsevimab or clesrovimab), ideally in the first week of life. Palivizumab is no longer recommended.',
    refs: ['aap-rsv-2026', 'aap-schedule-2026'],
  },
  {
    id: 'vax-rota-age',
    module: 'vaccines',
    stem: 'A 16-week-old has received no vaccines. Which statement about rotavirus vaccine is correct?',
    options: [
      'Do not start the rotavirus series — the maximum age for dose 1 is 14 weeks 6 days',
      'Give dose 1 now and complete a 3-dose series by 12 months',
      'Give a single catch-up dose now',
      'Give rotavirus vaccine only if she attends daycare',
    ],
    answer: 0,
    explanation:
      'Rotavirus dose 1 must be given by 14 weeks 6 days, and no dose after 8 months 0 days (intussusception risk is age-related). Start the other due vaccines today on an accelerated schedule.',
    refs: ['cdc-catchup', 'acip-best-practices'],
  },
  {
    id: 'vax-egg',
    module: 'vaccines',
    stem: 'A 2-year-old with a history of anaphylaxis to egg is due for influenza vaccine. Plan?',
    options: [
      'Give any age-appropriate influenza vaccine with routine observation',
      'Avoid influenza vaccine',
      'Give only in an allergist’s office with a 30-minute observation',
      'Skin-test with the vaccine first',
    ],
    answer: 0,
    explanation:
      'Egg allergy — including anaphylaxis — requires no special precautions beyond those for any vaccine. All U.S. influenza vaccines for 2026–27 are trivalent and AAP prefers no age-appropriate product over another.',
    refs: ['aap-flu-2026', 'acip-best-practices'],
  },
  {
    id: 'vax-mmrv',
    module: 'vaccines',
    stem: 'For the first dose of measles and varicella vaccines at 12–47 months, why are separate MMR and VAR injections preferred over combined MMRV?',
    options: [
      'MMRV roughly doubles the risk of febrile seizure 5–12 days after vaccination',
      'MMRV is less immunogenic for measles',
      'MMRV cannot be given with other vaccines',
      'MMRV causes more injection-site reactions',
    ],
    answer: 0,
    explanation:
      'As a first dose at 12–23 months, MMRV causes about 1 additional febrile seizure per ~2,300–2,600 children vaccinated compared with separate injections. For the second dose (4–6 years), MMRV is acceptable.',
    refs: ['aap-schedule-2026', 'mmr-acip-2013'],
  },
  {
    id: 'vax-measles-pep',
    module: 'vaccines',
    stem: 'An 8-month-old was in the same clinic waiting room as a child with measles 2 days ago. Best post-exposure plan?',
    options: [
      'MMR now; the dose does not count — give 2 more doses starting at ≥12 months',
      'MMR now, counted as dose 1',
      'No action — infants are protected by maternal antibody until 12 months',
      'Wait 21 days and vaccinate if no rash',
    ],
    answer: 0,
    explanation:
      'MMR within 72 h of exposure (or intramuscular immune globulin 0.5 mL/kg, max 15 mL, within 6 days) prevents or modifies disease in infants ≥6 months. Doses before the first birthday do not count toward the series. Maternal antibody wanes well before 12 months.',
    refs: ['mmr-acip-2013', 'red-book'],
  },
  {
    id: 'vax-hbsag-pos',
    module: 'vaccines',
    stem: 'A term infant is born to a mother who is HBsAg-positive. Management?',
    options: [
      'Hepatitis B vaccine and HBIG within 12 hours of birth, complete the series, and test HBsAg/anti-HBs at 9–12 months',
      'Hepatitis B vaccine at 2 months',
      'HBIG alone at birth',
      'Avoid breastfeeding and vaccinate at 1 month',
    ],
    answer: 0,
    explanation:
      'Vaccine plus HBIG within 12 h prevents >90% of perinatal transmission. Post-vaccination serology at 9–12 months confirms protection. Breastfeeding is not contraindicated.',
    refs: ['red-book', 'aap-schedule-2026'],
  },
  {
    id: 'vax-hepb-birth',
    module: 'vaccines',
    stem: 'Per the AAP 2026 schedule, when should a medically stable newborn ≥2,000 g born to an HBsAg-negative mother receive hepatitis B vaccine dose 1?',
    options: ['Within 24 hours of birth', 'At 2 months, by individual decision', 'At 1 month', 'Only if a household member has hepatitis B'],
    answer: 0,
    explanation:
      'AAP (and the long-standing evidence base) recommends a universal birth dose within 24 h: it backstops maternal screening errors and household exposures. A December 2025 federal ACIP vote proposed individual decision-making for HBsAg-negative mothers; that action is among those stayed by a federal court in March 2026, and AAP did not adopt it.',
    refs: ['aap-schedule-2026', 'aap-v-kennedy'],
  },
  {
    id: 'vax-live-spacing',
    module: 'vaccines',
    stem: 'A 4-year-old received MMR 21 days ago. She now needs varicella vaccine. Plan?',
    options: ['Give varicella on or after day 28 after MMR', 'Give varicella today', 'Wait 3 months', 'Varicella is contraindicated after MMR'],
    answer: 0,
    explanation:
      'Two injectable live vaccines not given on the same day must be ≥28 days apart; the 4-day grace period does not apply to this live-vaccine interval. Same-day administration would have been ideal.',
    refs: ['acip-best-practices'],
  },
  {
    id: 'vax-dtap-ci',
    module: 'vaccines',
    stem: 'Which is a contraindication to further pertussis-containing vaccine?',
    options: [
      'Encephalopathy within 7 days of a prior dose not attributable to another cause',
      'Fever of 39 °C after the last dose',
      'Family history of SIDS',
      'Family history of seizures',
    ],
    answer: 0,
    explanation:
      'Encephalopathy within 7 days is the pertussis-specific contraindication (give DT instead). Fever after a prior dose, family history of SIDS and family history of seizures are not contraindications.',
    refs: ['acip-best-practices'],
  },
  {
    id: 'vax-hpv',
    module: 'vaccines',
    stem: 'A healthy 11-year-old receives HPV dose 1 today. How many doses are recommended?',
    options: ['2 doses, 6–12 months apart', '1 dose', '3 doses at 0, 1–2 and 6 months', '2 doses, 1 month apart'],
    answer: 0,
    explanation:
      'Starting before the 15th birthday: 2 doses 6–12 months apart (minimum 5 months). Starting at ≥15 years or immunocompromised: 3 doses. AAP 2026 recommends starting at 9–12 years and keeps 2 doses while single-dose evidence (endorsed by WHO) is reviewed.',
    refs: ['aap-schedule-2026'],
  },
  {
    id: 'vax-grace',
    module: 'vaccines',
    stem: 'DTaP dose 2 was given 25 days after dose 1 (minimum interval 4 weeks). Is it valid?',
    options: ['Yes — within the 4-day grace period', 'No — repeat it 4 weeks after dose 1', 'No — restart the series', 'Only if the child is older than 6 months'],
    answer: 0,
    explanation:
      '28 − 25 = 3 days early. Doses given ≤4 days before the minimum age or interval are valid (local mandates may differ). A dose given ≥5 days early is invalid and is repeated after the minimum interval from the invalid dose. Never restart a series.',
    refs: ['acip-best-practices'],
  },
]
