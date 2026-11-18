/**
 * Febrile seizure classification and neurodiagnostic evaluation.
 * AAP 2011 (simple FS evaluation) and AAP 2008 (long-term management).
 * Definition: seizure with fever ≥38.0 °C in a child 6–60 months without CNS infection,
 * metabolic disturbance, or history of afebrile seizures.
 */

export interface FsInput {
  ageMonths: number
  tempC: number
  durationMin: number
  focal: boolean
  recurredWithin24h: boolean
  meningealSignsOrCnsInfectionConcern: boolean
  priorAfebrileSeizure: boolean
  hibOrPcvIncompleteOrUnknown: boolean
  pretreatedWithAntibiotics: boolean
  backToBaselineWithin1h: boolean
}

export type FsClass = 'simple' | 'complex' | 'febrile-status' | 'not-febrile-seizure'

export interface FsResult {
  classification: FsClass
  label: string
  reasons: string[]
  lumbarPuncture: 'perform' | 'option' | 'individualize' | 'not-routine'
  lpReason: string
  workup: string[]
  warnings: string[]
}

export function classifyFebrileSeizure(i: FsInput): FsResult {
  const warnings: string[] = []
  const reasons: string[] = []

  if (!i.backToBaselineWithin1h) {
    warnings.push('Not back to baseline within ~1 h: evaluate for CNS infection, ongoing (non-convulsive) seizure, toxins, or structural cause.')
  }

  // Exclusions from the definition
  let excluded: string | null = null
  if (i.priorAfebrileSeizure) excluded = 'Prior afebrile seizure → evaluate as a seizure disorder, not a febrile seizure.'
  else if (i.ageMonths < 6) excluded = 'Age <6 months is outside the definition → think CNS infection, electrolyte/glucose disorder, or early-onset epilepsy.'
  else if (i.ageMonths > 60) excluded = 'Age >60 months is outside the definition → evaluate for epilepsy or CNS infection.'
  else if (i.tempC < 38.0) excluded = 'Temperature <38.0 °C does not meet the fever criterion.'

  let lumbarPuncture: FsResult['lumbarPuncture']
  let lpReason: string
  if (i.meningealSignsOrCnsInfectionConcern) {
    lumbarPuncture = 'perform'
    lpReason = 'Meningeal signs or history/exam suggesting intracranial infection → LP should be performed (AAP 2011).'
  } else if (excluded) {
    lumbarPuncture = 'individualize'
    lpReason = 'Outside febrile-seizure definition: evaluate based on age and findings.'
  } else {
    lumbarPuncture = 'not-routine'
    lpReason = 'Well-appearing, immunized child without meningeal signs → LP not routinely indicated.'
  }

  if (excluded) {
    return {
      classification: 'not-febrile-seizure',
      label: 'Does not meet febrile seizure definition',
      reasons: [excluded],
      lumbarPuncture,
      lpReason,
      workup: ['Evaluation guided by age and findings; this is not a febrile seizure until proven otherwise.'],
      warnings,
    }
  }

  if (i.durationMin >= 15) reasons.push(`Duration ${i.durationMin} min (≥15)`)
  if (i.focal) reasons.push('Focal features (including postictal Todd paresis)')
  if (i.recurredWithin24h) reasons.push('Recurred within 24 h')

  const complex = reasons.length > 0
  const classification: FsClass = i.durationMin >= 30 ? 'febrile-status' : complex ? 'complex' : 'simple'

  if (!i.meningealSignsOrCnsInfectionConcern) {
    if (classification === 'simple') {
      if (i.ageMonths <= 12 && i.hibOrPcvIncompleteOrUnknown) {
        lumbarPuncture = 'option'
        lpReason = 'Age 6–12 months with Hib or pneumococcal immunization incomplete/unknown → LP is an option (AAP 2011).'
      } else if (i.pretreatedWithAntibiotics) {
        lumbarPuncture = 'option'
        lpReason = 'Antibiotic pretreatment can mask meningitis → LP is an option (AAP 2011).'
      }
    } else {
      lumbarPuncture = 'individualize'
      lpReason =
        'AAP 2011 does not cover complex seizures. Lower threshold for LP with young age, incomplete immunization, antibiotic pretreatment, or slow return to baseline.'
    }
  }

  const workup =
    classification === 'simple'
      ? [
          'Identify the fever source; no routine EEG, neuroimaging, electrolytes, calcium, glucose, or CBC for the seizure itself.',
          'Glucose only if prolonged postictal state; other labs only as the febrile illness warrants.',
        ]
      : [
          'Individualize: urgent CT/MRI if focal deficits persist, signs of raised ICP, or trauma concern; otherwise non-urgent MRI if focal seizure or abnormal neuro exam.',
          'EEG (non-urgent) has higher yield after focal or prolonged seizures.',
          classification === 'febrile-status'
            ? 'Febrile status epilepticus (≥30 min) carries the highest risk of later epilepsy; neurology follow-up with MRI and EEG is commonly recommended.'
            : 'Arrange neurology follow-up if recurrent complex features or abnormal development.',
        ]

  const label =
    classification === 'simple'
      ? 'Simple febrile seizure'
      : classification === 'febrile-status'
        ? 'Complex febrile seizure — febrile status epilepticus'
        : 'Complex febrile seizure'

  return {
    classification,
    label,
    reasons: complex ? reasons : ['Generalized, <15 min, single episode in 24 h, age 6–60 months, fever ≥38 °C'],
    lumbarPuncture,
    lpReason,
    workup,
    warnings,
  }
}

/** AAP 2008 recurrence risk factors. */
export interface RecurrenceFactors {
  firstSeizureUnder18Months: boolean
  firstDegreeRelativeWithFs: boolean
  lowTempAtSeizure: boolean // < 40 °C
  shortFeverDuration: boolean // seizure < 1 h after fever onset
}

export function recurrenceRiskLabel(f: RecurrenceFactors): { count: number; label: string } {
  const count = Object.values(f).filter(Boolean).length
  const label =
    count === 0
      ? '<20% (no risk factors)'
      : count === 4
        ? '>70% (all four risk factors)'
        : `Intermediate — rises with each factor (${count} of 4 present)`
  return { count, label }
}
