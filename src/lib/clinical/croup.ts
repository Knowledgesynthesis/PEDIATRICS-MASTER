/** Westley croup score (Westley 1978) with commonly used severity bands (Alberta/TREKK pathways). */

export interface WestleyInput {
  consciousness: 0 | 5
  cyanosis: 0 | 4 | 5
  stridor: 0 | 1 | 2
  airEntry: 0 | 1 | 2
  retractions: 0 | 1 | 2 | 3
}

export const westleyItems = [
  {
    key: 'consciousness',
    label: 'Level of consciousness',
    options: [
      { score: 0, label: 'Normal (incl. asleep)' },
      { score: 5, label: 'Disoriented' },
    ],
  },
  {
    key: 'cyanosis',
    label: 'Cyanosis',
    options: [
      { score: 0, label: 'None' },
      { score: 4, label: 'With agitation' },
      { score: 5, label: 'At rest' },
    ],
  },
  {
    key: 'stridor',
    label: 'Stridor',
    options: [
      { score: 0, label: 'None' },
      { score: 1, label: 'With agitation' },
      { score: 2, label: 'At rest' },
    ],
  },
  {
    key: 'airEntry',
    label: 'Air entry',
    options: [
      { score: 0, label: 'Normal' },
      { score: 1, label: 'Decreased' },
      { score: 2, label: 'Markedly decreased' },
    ],
  },
  {
    key: 'retractions',
    label: 'Retractions',
    options: [
      { score: 0, label: 'None' },
      { score: 1, label: 'Mild' },
      { score: 2, label: 'Moderate' },
      { score: 3, label: 'Severe' },
    ],
  },
] as const

export type CroupSeverity = 'mild' | 'moderate' | 'severe' | 'impending-failure'

export function westleyScore(i: WestleyInput): number {
  return i.consciousness + i.cyanosis + i.stridor + i.airEntry + i.retractions
}

/** ≤2 mild · 3–5 moderate · 6–11 severe · ≥12 impending respiratory failure. */
export function croupSeverity(score: number): CroupSeverity {
  if (score <= 2) return 'mild'
  if (score <= 5) return 'moderate'
  if (score <= 11) return 'severe'
  return 'impending-failure'
}

export const croupPlans: Record<CroupSeverity, { label: string; actions: string[] }> = {
  mild: {
    label: 'Mild (≤2)',
    actions: [
      'Single dose oral dexamethasone 0.6 mg/kg (lower doses of 0.15–0.3 mg/kg appear similarly effective).',
      'No nebulized epinephrine needed.',
      'Discharge when comfortable; return if stridor at rest, retractions, drooling, or difficulty swallowing.',
    ],
  },
  moderate: {
    label: 'Moderate (3–5)',
    actions: [
      'Oral dexamethasone 0.6 mg/kg now; keep the child calm on the caregiver’s lap.',
      'Nebulized epinephrine if stridor at rest with retractions or distress.',
      'Observe ≥2 h after the last epinephrine dose; discharge if no stridor at rest and no retractions.',
    ],
  },
  severe: {
    label: 'Severe (6–11)',
    actions: [
      'Nebulized epinephrine immediately; repeat as needed (each dose lasts ~2 h).',
      'Dexamethasone 0.6 mg/kg (IM/IV if unable to take PO).',
      'Oxygen if hypoxemic; minimal handling. Admit if ≥2 epinephrine doses are needed or distress persists.',
    ],
  },
  'impending-failure': {
    label: 'Impending respiratory failure (≥12)',
    actions: [
      'Call the most experienced airway clinician and PICU now.',
      'Nebulized epinephrine and parenteral dexamethasone while preparing for a controlled airway.',
      'Prepare an endotracheal tube 0.5–1 mm smaller than predicted for age.',
    ],
  },
}
