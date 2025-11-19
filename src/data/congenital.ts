import { CongenitalCondition } from '@/store/useStore'

export const congenitalConditions: CongenitalCondition[] = [
  // Cardiac
  {
    id: 'vsd',
    name: 'Ventricular Septal Defect (VSD)',
    category: 'cardiac',
    features: [
      'Holosystolic murmur at left lower sternal border',
      'Most common congenital heart defect',
      'May be asymptomatic if small',
      'Large VSDs: CHF symptoms (poor feeding, tachypnea, FTT)',
    ],
    diagnosis: [
      'Echocardiography (definitive)',
      'CXR: cardiomegaly, increased pulmonary vascular markings (if large)',
      'ECG: LVH, RVH (if large)',
    ],
    management: [
      'Small VSDs: often close spontaneously, observe',
      'Medical management: diuretics, ACE inhibitors for CHF',
      'Surgical closure if large, symptomatic, or pulmonary hypertension',
      'Endocarditis prophylaxis (if applicable)',
    ],
  },
  {
    id: 'asd',
    name: 'Atrial Septal Defect (ASD)',
    category: 'cardiac',
    features: [
      'Fixed split S2',
      'Systolic ejection murmur at upper left sternal border',
      'Often asymptomatic in childhood',
      'May present with exercise intolerance, frequent respiratory infections',
    ],
    diagnosis: [
      'Echocardiography',
      'CXR: cardiomegaly, increased pulmonary vascular markings',
      'ECG: right axis deviation, RVH',
    ],
    management: [
      'Small ASDs may close spontaneously',
      'Surgical or catheter-based closure if significant shunt',
      'Monitor for arrhythmias and pulmonary hypertension',
    ],
  },
  {
    id: 'pda',
    name: 'Patent Ductus Arteriosus (PDA)',
    category: 'cardiac',
    features: [
      'Continuous "machinery" murmur at left upper sternal border',
      'Bounding pulses, wide pulse pressure',
      'Common in premature infants',
      'May cause CHF if large',
    ],
    diagnosis: [
      'Echocardiography',
      'CXR: cardiomegaly, increased pulmonary markings',
    ],
    management: [
      'Premature infants: indomethacin or ibuprofen to close',
      'Term infants: observation vs. surgical/catheter closure',
      'Closure recommended to prevent endocarditis and pulmonary hypertension',
    ],
  },
  {
    id: 'coarctation',
    name: 'Coarctation of the Aorta',
    category: 'cardiac',
    features: [
      'Upper extremity hypertension',
      'Weak or absent femoral pulses',
      'Differential BP (arms > legs)',
      'Systolic murmur over left back',
      'Associated with Turner syndrome',
    ],
    diagnosis: [
      'Echocardiography',
      '4-extremity blood pressures',
      'CXR: rib notching (older children), "3 sign"',
    ],
    management: [
      'Severe neonatal presentation: prostaglandin E1 (PGE1) to maintain PDA',
      'Surgical repair or balloon angioplasty',
      'Long-term monitoring for recoarctation and hypertension',
    ],
  },
  {
    id: 'tetralogy-fallot',
    name: 'Tetralogy of Fallot (TOF)',
    category: 'cardiac',
    features: [
      'Four components: VSD, pulmonary stenosis, RVH, overriding aorta',
      'Cyanosis (tet spells)',
      'Squatting to relieve cyanosis',
      'Harsh systolic murmur at left upper sternal border',
      'Boot-shaped heart on CXR',
    ],
    diagnosis: [
      'Echocardiography',
      'CXR: boot-shaped heart, decreased pulmonary markings',
      'ECG: RVH',
    ],
    management: [
      'Tet spells: knee-chest position, oxygen, morphine, beta-blockers',
      'Surgical repair typically in first year of life',
      'Lifelong cardiology follow-up',
    ],
  },

  // Genetic Syndromes
  {
    id: 'down-syndrome',
    name: 'Down Syndrome (Trisomy 21)',
    category: 'genetic',
    features: [
      'Flat facial profile, upslanting palpebral fissures',
      'Single palmar crease, clinodactyly',
      'Hypotonia',
      'Intellectual disability',
      'Increased risk: AV canal defects, duodenal atresia, hypothyroidism, leukemia',
    ],
    diagnosis: [
      'Karyotype analysis',
      'Prenatal screening: increased nuchal translucency, abnormal quad screen',
    ],
    management: [
      'Echocardiogram in newborn period',
      'Thyroid screening',
      'Audiology and ophthalmology evaluations',
      'Early intervention programs',
      'Regular developmental assessments',
    ],
  },
  {
    id: 'turner-syndrome',
    name: 'Turner Syndrome (45,X)',
    category: 'genetic',
    features: [
      'Short stature',
      'Webbed neck, low posterior hairline',
      'Shield chest with widely spaced nipples',
      'Lymphedema of hands and feet (newborn)',
      'Ovarian dysgenesis (infertility)',
      'Coarctation of aorta, bicuspid aortic valve',
    ],
    diagnosis: [
      'Karyotype analysis',
      'Diagnosis often delayed to adolescence (short stature, delayed puberty)',
    ],
    management: [
      'Growth hormone therapy',
      'Estrogen replacement at puberty',
      'Cardiac evaluation (echo)',
      'Renal ultrasound',
      'Regular monitoring for thyroid disease, diabetes',
    ],
  },
  {
    id: 'klinefelter-syndrome',
    name: 'Klinefelter Syndrome (47,XXY)',
    category: 'genetic',
    features: [
      'Tall stature, long limbs',
      'Gynecomastia',
      'Small testes, infertility',
      'Developmental delays possible',
      'Typically diagnosed in adolescence or adulthood',
    ],
    diagnosis: [
      'Karyotype analysis',
      'Elevated FSH and LH, low testosterone',
    ],
    management: [
      'Testosterone replacement therapy',
      'Fertility counseling',
      'Educational support if needed',
    ],
  },

  // Metabolic
  {
    id: 'pku',
    name: 'Phenylketonuria (PKU)',
    category: 'metabolic',
    features: [
      'Deficiency of phenylalanine hydroxylase',
      'Intellectual disability if untreated',
      'Musty odor, light pigmentation, eczema',
      'Detected on newborn screening',
    ],
    diagnosis: [
      'Elevated phenylalanine on newborn screen',
      'Confirmatory testing',
    ],
    management: [
      'Phenylalanine-restricted diet for life',
      'Regular monitoring of blood Phe levels',
      'Special formulas and low-protein foods',
    ],
  },
  {
    id: 'hypothyroidism',
    name: 'Congenital Hypothyroidism',
    category: 'metabolic',
    features: [
      'Prolonged jaundice, umbilical hernia',
      'Large fontanelles, macroglossia',
      'Hypotonia, constipation',
      'Poor feeding, lethargy',
      'Intellectual disability if untreated',
    ],
    diagnosis: [
      'Newborn screening: elevated TSH, low T4',
      'Thyroid scan/ultrasound',
    ],
    management: [
      'Levothyroxine replacement immediately',
      'Monitor TSH and T4 levels regularly',
      'Excellent prognosis if treated early',
    ],
  },

  // Congenital Infections (TORCH)
  {
    id: 'toxoplasmosis',
    name: 'Congenital Toxoplasmosis',
    category: 'infection',
    features: [
      'Classic triad: chorioretinitis, hydrocephalus, intracranial calcifications',
      'Hepatosplenomegaly, jaundice',
      'Seizures, microcephaly',
      'Most infected infants asymptomatic at birth',
    ],
    diagnosis: [
      'Serologic testing (IgM, IgG)',
      'PCR testing',
      'Head CT: intracranial calcifications',
    ],
    management: [
      'Pyrimethamine + sulfadiazine + leucovorin for 1 year',
      'Ophthalmology and neurology follow-up',
    ],
  },
  {
    id: 'cmv',
    name: 'Congenital Cytomegalovirus (CMV)',
    category: 'infection',
    features: [
      'Most common congenital infection',
      'Petechiae, jaundice, hepatosplenomegaly',
      'Microcephaly, intracranial calcifications (periventricular)',
      'Sensorineural hearing loss (most common sequela)',
      '90% asymptomatic at birth',
    ],
    diagnosis: [
      'Urine or saliva PCR in first 3 weeks of life',
      'Hearing screening',
      'Head imaging',
    ],
    management: [
      'Valganciclovir for symptomatic infants',
      'Regular hearing assessments',
      'Developmental monitoring',
    ],
  },
  {
    id: 'rubella',
    name: 'Congenital Rubella Syndrome',
    category: 'infection',
    features: [
      'Classic triad: cataracts, cardiac defects (PDA, pulmonary stenosis), sensorineural deafness',
      'Blueberry muffin rash',
      'Growth restriction, microcephaly',
      'Rare in vaccinated populations',
    ],
    diagnosis: [
      'Serologic testing',
      'Virus isolation',
    ],
    management: [
      'No specific treatment',
      'Supportive care',
      'Prevention through maternal vaccination',
    ],
  },
]

export const congenitalCategories = {
  cardiac: 'Congenital Heart Defects',
  genetic: 'Genetic Syndromes',
  metabolic: 'Metabolic Disorders',
  infection: 'Congenital Infections (TORCH)',
}
