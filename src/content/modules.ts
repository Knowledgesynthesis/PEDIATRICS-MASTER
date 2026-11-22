import type { LucideIcon } from 'lucide-react'
import { Activity, Baby, Bug, Droplets, HeartPulse, Ruler, Siren, Syringe, Thermometer, Zap } from 'lucide-react'
import type { ModuleId } from '@/types'

export interface ModuleMeta {
  id: ModuleId
  number: number
  path: string
  title: string
  summary: string
  icon: LucideIcon
  /** Interactive tools inside the module (anchor ids within the page). */
  tools: { id: string; label: string }[]
  objectives: string[]
}

export const modules: ModuleMeta[] = [
  {
    id: 'growth',
    number: 1,
    path: '/growth',
    title: 'Growth & Well-Child Care',
    summary: 'Read growth charts correctly, recognize faltering growth and obesity, and run the preventive-care schedule.',
    icon: Ruler,
    tools: [
      { id: 'tool-mph', label: 'Mid-parental height' },
      { id: 'tool-corrected-age', label: 'Corrected age' },
      { id: 'tool-velocity', label: 'Weight-gain velocity' },
      { id: 'tool-newborn-weight', label: 'Newborn weight loss' },
    ],
    objectives: [
      'Choose the right chart (WHO 0–2 y, CDC 2–20 y, extended BMI) and correct for prematurity.',
      'Distinguish normal percentile shifts from faltering growth, and endocrine from nutritional short stature.',
      'Apply AAP 2023 obesity definitions and treatment ladder.',
      'State the key Bright Futures screening ages.',
    ],
  },
  {
    id: 'development',
    number: 2,
    path: '/development',
    title: 'Development & Milestones',
    summary: 'Surveillance at every visit, screening at 9-18-30 months, autism screening at 18-24 months, and when to act.',
    icon: Baby,
    tools: [
      { id: 'tool-milestones', label: 'Milestone explorer' },
      { id: 'tool-motor-windows', label: 'WHO motor windows' },
    ],
    objectives: [
      'Use CDC/AAP 2022 milestones (≥75% achieve) and know what a missed milestone means.',
      'Recall classic median milestones by domain for exams and counseling.',
      'Recognize absolute red flags, including autism red flags and regression.',
      'Order the right first steps: hearing test, early-intervention referral, CK in motor delay.',
    ],
  },
  {
    id: 'vaccines',
    number: 3,
    path: '/vaccines',
    title: 'Immunizations',
    summary: 'The AAP 2026 schedule, RSV protection, true vs false contraindications, catch-up rules, and measles response.',
    icon: Syringe,
    tools: [
      { id: 'tool-schedule', label: 'Schedule by age' },
      { id: 'tool-validity', label: 'Dose-validity checker' },
    ],
    objectives: [
      'Lay out the routine schedule from birth to 18 years.',
      'Decide RSV protection for any infant (maternal vaccine vs nirsevimab/clesrovimab).',
      'Separate true contraindications from the common false ones.',
      'Validate doses with minimum ages, intervals and the 4-day grace period.',
    ],
  },
  {
    id: 'newborn',
    number: 4,
    path: '/congenital',
    title: 'Newborn & Congenital',
    summary: 'CCHD screening, jaundice (AAP 2022), murmurs and heart lesions, newborn screening, syndromes and congenital infections.',
    icon: HeartPulse,
    tools: [
      { id: 'tool-cchd', label: 'CCHD pulse-ox screen' },
      { id: 'tool-bili', label: 'Bilirubin rate of rise' },
    ],
    objectives: [
      'Run and interpret the AAP 2025 CCHD pulse-oximetry algorithm.',
      'Apply the AAP 2022 jaundice approach: risk factors, rate of rise, escalation of care.',
      'Tell innocent from pathologic murmurs; recognize duct-dependent lesions.',
      'Know health-supervision essentials for Down, Turner and 22q11.2 deletion syndromes.',
    ],
  },
  {
    id: 'respiratory',
    number: 5,
    path: '/infections',
    title: 'Respiratory & ENT Infections',
    summary: 'Bronchiolitis, croup, otitis media, strep pharyngitis, pneumonia, influenza and pertussis — with antibiotic stewardship.',
    icon: Bug,
    tools: [
      { id: 'tool-westley', label: 'Westley croup score' },
      { id: 'tool-aom', label: 'AOM treatment decision' },
      { id: 'tool-mcisaac', label: 'McIsaac (strep) score' },
    ],
    objectives: [
      'Manage bronchiolitis with supportive care and avoid low-value interventions.',
      'Grade croup and dose dexamethasone/epinephrine.',
      'Diagnose AOM strictly and choose antibiotics vs observation by age and severity.',
      'Test and treat GAS pharyngitis per IDSA 2025; treat CAP with 5 days of amoxicillin.',
    ],
  },
  {
    id: 'fever',
    number: 6,
    path: '/fever',
    title: 'Fever & Serious Infection',
    summary: 'Febrile infants 8–60 days, UTI, meningitis, sepsis (Phoenix/SSC 2026), Kawasaki disease and measles.',
    icon: Thermometer,
    tools: [
      { id: 'tool-febrile-infant', label: 'Febrile infant pathway' },
      { id: 'tool-uti-2026', label: 'UTI case lab' },
    ],
    objectives: [
      'Risk-stratify well-appearing febrile infants with the AAP 2021 pathway.',
      'Interpret pediatric UTI tests by age and specimen; choose treatment and imaging using AAP 2026.',
      'Choose empiric meningitis therapy by age; time dexamethasone correctly.',
      'Recognize sepsis by Phoenix criteria and resuscitate per SSC 2026; diagnose Kawasaki and measles.',
    ],
  },
  {
    id: 'fluids',
    number: 7,
    path: '/dehydration',
    title: 'Fluids & Dehydration',
    summary: 'Assess dehydration with validated scales, rehydrate orally first, and prescribe isotonic maintenance fluids.',
    icon: Droplets,
    tools: [
      { id: 'tool-cds', label: 'Clinical Dehydration Scale' },
      { id: 'tool-who', label: 'WHO dehydration plans' },
      { id: 'tool-ort', label: 'ORT volume planner' },
      { id: 'tool-maintenance', label: 'Maintenance fluids' },
    ],
    objectives: [
      'Classify dehydration with the CDS or WHO scheme and the most predictive signs.',
      'Write an ORT plan with ondansetron; know when IV is needed.',
      'Calculate Holliday–Segar maintenance and choose isotonic fluid (AAP 2018).',
      'Correct sodium safely; start DKA fluids correctly.',
    ],
  },
  {
    id: 'seizures',
    number: 8,
    path: '/febrile-seizure',
    title: 'Febrile Seizures',
    summary: 'Classify simple vs complex, decide on LP using AAP 2011, manage acutely, and counsel families with real numbers.',
    icon: Zap,
    tools: [
      { id: 'tool-fs', label: 'Febrile seizure classifier' },
      { id: 'tool-recurrence', label: 'Recurrence risk' },
    ],
    objectives: [
      'Apply the definition and simple/complex criteria.',
      'Use the AAP 2011 LP indications (and know the outdated ones).',
      'Avoid low-value testing after a simple febrile seizure.',
      'Counsel on recurrence, epilepsy risk, antipyretics and rescue medication.',
    ],
  },
  {
    id: 'emergencies',
    number: 9,
    path: '/acute-care',
    title: 'Emergencies & Dosing',
    summary: 'Pediatric assessment triangle, vital signs, weight-based dosing, anaphylaxis, status epilepticus and abuse recognition.',
    icon: Siren,
    tools: [
      { id: 'tool-pat', label: 'Assessment triangle' },
      { id: 'tool-vitals', label: 'Vitals & resus numbers' },
      { id: 'tool-dose', label: 'Dose calculator' },
      { id: 'tool-se-timer', label: 'Status epilepticus timer' },
    ],
    objectives: [
      'Form a general impression in 30 seconds with the PAT.',
      'Know age-based vital signs and hypotension thresholds; estimate weight.',
      'Calculate doses safely with maximums and concentrations.',
      'Treat anaphylaxis and status epilepticus on time; recognize sentinel injuries.',
    ],
  },
]

export const moduleById = Object.fromEntries(modules.map((m) => [m.id, m])) as Record<ModuleId, ModuleMeta>

export const practiceIcon = Activity
