import { Vaccine } from '@/store/useStore'

export const vaccines: Vaccine[] = [
  {
    id: 'hep-b',
    name: 'Hepatitis B (HepB)',
    ages: [0, 1, 6], // Birth, 1-2 months, 6-18 months
    notes: 'First dose within 24 hours of birth',
  },
  {
    id: 'rv',
    name: 'Rotavirus (RV)',
    ages: [2, 4, 6],
    notes: 'Maximum age for first dose: 14 weeks 6 days. Do not start series at 15 weeks or older.',
    contraindications: ['History of intussusception', 'Severe combined immunodeficiency (SCID)'],
  },
  {
    id: 'dtap',
    name: 'DTaP (Diphtheria, Tetanus, Pertussis)',
    ages: [2, 4, 6, 15, 48], // 2, 4, 6, 15-18 months, 4-6 years
    notes: 'Tdap booster at age 11-12 years',
  },
  {
    id: 'hib',
    name: 'Haemophilus influenzae type b (Hib)',
    ages: [2, 4, 6, 12],
    notes: 'Final dose at 12-15 months. Some brands require only 3 doses (no dose at 6 months).',
  },
  {
    id: 'pcv',
    name: 'Pneumococcal Conjugate (PCV13/PCV15)',
    ages: [2, 4, 6, 12],
    notes: 'Final dose at 12-15 months',
  },
  {
    id: 'ipv',
    name: 'Inactivated Poliovirus (IPV)',
    ages: [2, 4, 6, 48], // 2, 4, 6-18 months, 4-6 years
    notes: 'Final dose at 4-6 years',
  },
  {
    id: 'influenza',
    name: 'Influenza (Flu)',
    ages: [6], // Start at 6 months, then annually
    notes: 'Annually starting at 6 months. Two doses 4 weeks apart for first-time recipients <9 years.',
  },
  {
    id: 'mmr',
    name: 'MMR (Measles, Mumps, Rubella)',
    ages: [12, 48], // 12-15 months, 4-6 years
    contraindications: ['Pregnancy', 'Severe immunodeficiency', 'Recent immunoglobulin'],
    notes: 'Live vaccine',
  },
  {
    id: 'varicella',
    name: 'Varicella (Chickenpox)',
    ages: [12, 48], // 12-15 months, 4-6 years
    contraindications: ['Pregnancy', 'Severe immunodeficiency'],
    notes: 'Live vaccine',
  },
  {
    id: 'hep-a',
    name: 'Hepatitis A (HepA)',
    ages: [12, 18], // 12-23 months, 2 doses 6 months apart
    notes: '2-dose series, 6-18 months apart, starting at 12 months',
  },
  {
    id: 'menacwy',
    name: 'Meningococcal ACWY (MenACWY)',
    ages: [132, 192], // 11-12 years, booster at 16 years
    notes: 'First dose at 11-12 years, booster at 16 years',
  },
  {
    id: 'hpv',
    name: 'HPV (Human Papillomavirus)',
    ages: [132, 138], // 11-12 years, 2-3 dose series
    notes: '2-dose series if started before 15th birthday (0, 6-12 months). 3-dose series if started at 15 years or older.',
  },
  {
    id: 'menb',
    name: 'Meningococcal B (MenB)',
    ages: [192], // 16-18 years (preferred)
    notes: '2-dose series. May be given as early as 10 years in high-risk individuals.',
  },
  {
    id: 'covid',
    name: 'COVID-19',
    ages: [6], // Starting at 6 months
    notes: 'Schedule varies by product and age. Stay updated per current CDC recommendations.',
  },
]

export const vaccineSchedule = {
  birth: ['hep-b'],
  1: ['hep-b'],
  2: ['rv', 'dtap', 'hib', 'pcv', 'ipv'],
  4: ['rv', 'dtap', 'hib', 'pcv', 'ipv'],
  6: ['rv', 'dtap', 'hib', 'pcv', 'ipv', 'influenza', 'hep-b', 'covid'],
  12: ['hib', 'pcv', 'mmr', 'varicella', 'hep-a'],
  15: ['dtap'],
  18: ['hep-a'],
  48: ['dtap', 'ipv', 'mmr', 'varicella'],
  132: ['menacwy', 'hpv'], // 11 years
  138: ['hpv'], // 11.5 years (second dose)
  192: ['menacwy', 'menb'], // 16 years
}

export const catchUpGuidelines = [
  {
    vaccine: 'DTaP',
    guidance: 'Minimum interval between doses: 4 weeks for doses 1-3, 6 months for dose 4',
  },
  {
    vaccine: 'Hib',
    guidance: 'Not needed if first dose given at 15 months or older',
  },
  {
    vaccine: 'MMR',
    guidance: 'Minimum interval between doses: 4 weeks',
  },
  {
    vaccine: 'Varicella',
    guidance: 'Minimum interval between doses: 3 months (or 4 weeks if second dose given inadvertently)',
  },
  {
    vaccine: 'Hepatitis A',
    guidance: 'Minimum interval: 6 months between doses',
  },
]
