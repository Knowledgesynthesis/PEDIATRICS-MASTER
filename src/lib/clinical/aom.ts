/**
 * Acute otitis media treatment decision per AAP 2013 (applies to 6 months–12 years with a
 * certain diagnosis). "Severe" = moderate–severe otalgia, otalgia ≥48 h, or temperature ≥39 °C.
 */

export interface AomInput {
  ageMonths: number
  otorrhea: boolean
  severe: boolean
  bilateral: boolean
  amoxicillinLast30Days: boolean
  purulentConjunctivitis: boolean
  recurrentAmoxicillinFailure: boolean
  penicillinAllergy: 'none' | 'non-severe' | 'severe'
}

export type AomDecision = 'antibiotics' | 'antibiotics-or-observation'

export interface AomResult {
  decision: AomDecision
  inGuidelineScope: boolean
  why: string
  regimen: string
  duration: string
  followUp: string
}

export function aomRecommendation(i: AomInput): AomResult {
  const inGuidelineScope = i.ageMonths >= 6 && i.ageMonths <= 144

  let decision: AomDecision
  let why: string
  if (i.ageMonths < 6) {
    decision = 'antibiotics'
    why = 'Under 6 months is outside the AAP 2013 guideline; observation has not been studied, so treat (and assess for systemic illness in young febrile infants).'
  } else if (i.otorrhea) {
    decision = 'antibiotics'
    why = 'Otorrhea from AOM → antibiotics at any age.'
  } else if (i.severe) {
    decision = 'antibiotics'
    why = 'Severe signs (moderate–severe otalgia, otalgia ≥48 h, or T ≥39 °C) → antibiotics at any age.'
  } else if (i.ageMonths < 24 && i.bilateral) {
    decision = 'antibiotics'
    why = 'Bilateral non-severe AOM at 6–23 months → antibiotics.'
  } else if (i.ageMonths < 24) {
    decision = 'antibiotics-or-observation'
    why = 'Unilateral non-severe AOM at 6–23 months → antibiotics OR observation with shared decision-making.'
  } else {
    decision = 'antibiotics-or-observation'
    why = 'Non-severe AOM (unilateral or bilateral) at ≥24 months → antibiotics OR observation with shared decision-making.'
  }

  let regimen: string
  if (i.penicillinAllergy === 'severe') {
    regimen =
      'Immediate-type penicillin allergy: a cephalosporin with a dissimilar side chain (cefdinir 14 mg/kg/day, cefpodoxime 10 mg/kg/day ÷ BID, cefuroxime 30 mg/kg/day ÷ BID, or ceftriaxone 50 mg/kg IM) is acceptable per current drug-allergy guidance after risk assessment. Macrolides are not recommended (poor efficacy). Refer for penicillin-allergy evaluation; most labels are not true allergy.'
  } else if (i.penicillinAllergy === 'non-severe') {
    regimen =
      'Non-severe penicillin allergy: cefdinir 14 mg/kg/day in 1–2 doses, cefuroxime 30 mg/kg/day ÷ BID, cefpodoxime 10 mg/kg/day ÷ BID, or ceftriaxone 50 mg/kg IM/IV × 1–3 days.'
  } else if (i.amoxicillinLast30Days || i.purulentConjunctivitis || i.recurrentAmoxicillinFailure) {
    regimen =
      'Amoxicillin–clavulanate 90 mg/kg/day amoxicillin + 6.4 mg/kg/day clavulanate ÷ BID (β-lactamase coverage: amoxicillin in past 30 days, otitis–conjunctivitis syndrome, or recurrent AOM unresponsive to amoxicillin).'
  } else {
    regimen = 'High-dose amoxicillin 80–90 mg/kg/day ÷ BID (max 2 g/dose).'
  }

  let duration: string
  if (i.ageMonths < 24 || i.severe) duration = '10 days (age <2 years or severe symptoms).'
  else if (i.ageMonths < 72) duration = '7 days (age 2–5 years, mild–moderate).'
  else duration = '5–7 days (age ≥6 years, mild–moderate).'

  const followUp =
    decision === 'antibiotics-or-observation'
      ? 'If observing: give analgesia, ensure a follow-up mechanism, and start antibiotics if the child worsens or fails to improve within 48–72 h.'
      : 'Reassess if no improvement in 48–72 h: switch amoxicillin → amoxicillin–clavulanate → ceftriaxone 50 mg/kg IM/IV × 3 days.'

  return { decision, inGuidelineScope, why, regimen, duration, followUp }
}
