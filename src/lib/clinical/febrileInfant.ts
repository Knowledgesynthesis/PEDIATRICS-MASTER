/**
 * Well-appearing febrile infants 8–60 days (AAP 2021, Pantell et al.).
 * Fever = ≥38.0 °C. Inflammatory markers (IMs) abnormal: PCT >0.5 ng/mL, ANC >4000/mm³
 * (guideline accepts 4000–5200; the conservative 4000 is used), CRP >20 mg/L, and — when
 * procalcitonin is unavailable — temperature >38.5 °C.
 */

export interface InflammatoryMarkers {
  tempC: number | null
  pct: number | null
  anc: number | null
  crpMgL: number | null
}

export interface ImAssessment {
  abnormal: boolean
  complete: boolean
  reasons: string[]
}

export function assessInflammatoryMarkers(im: InflammatoryMarkers): ImAssessment {
  const reasons: string[] = []
  const pctAvailable = im.pct !== null
  if (im.pct !== null && im.pct > 0.5) reasons.push(`Procalcitonin ${im.pct} ng/mL (>0.5)`)
  if (im.anc !== null && im.anc > 4000) reasons.push(`ANC ${im.anc}/mm³ (>4000)`)
  if (im.crpMgL !== null && im.crpMgL > 20) reasons.push(`CRP ${im.crpMgL} mg/L (>20)`)
  if (!pctAvailable && im.tempC !== null && im.tempC > 38.5) reasons.push(`Temperature ${im.tempC} °C (>38.5, used when PCT unavailable)`)
  // Complete = PCT + ANC, or (no PCT) ANC + CRP + temperature.
  const complete = pctAvailable ? im.anc !== null : im.anc !== null && im.crpMgL !== null && im.tempC !== null
  return { abnormal: reasons.length > 0, complete, reasons }
}

export type AgeGroup = 'under-8' | '8-21' | '22-28' | '29-60' | 'over-60'

export function febrileInfantAgeGroup(ageDays: number): AgeGroup {
  if (ageDays < 8) return 'under-8'
  if (ageDays <= 21) return '8-21'
  if (ageDays <= 28) return '22-28'
  if (ageDays <= 60) return '29-60'
  return 'over-60'
}

export interface Eligibility {
  wellAppearing: boolean
  term: boolean // ≥37 weeks
  focalBacterialInfection: boolean
  clinicalBronchiolitis: boolean
  complexMedicalCondition: boolean
  vaccinatedLast48h: boolean
}

export interface PathwayInput {
  ageDays: number
  eligibility: Eligibility
  ua: 'pending' | 'negative' | 'positive'
  im: InflammatoryMarkers
  csf: 'not-obtained' | 'normal' | 'pleocytosis'
}

export interface PathwayResult {
  group: AgeGroup
  inScope: boolean
  scopeNote?: string
  tests: string[]
  lumbarPuncture: 'required' | 'consider' | 'optional' | 'not-needed' | 'pending'
  antibiotics: string
  disposition: string
  imAssessment?: ImAssessment
}

const HSV_NOTE =
  'Add acyclovir 20 mg/kg IV q8h if HSV risk: maternal genital HSV/lesions, vesicles, seizures, hypothermia, ill appearance, CSF pleocytosis with negative Gram stain, thrombocytopenia, or elevated ALT (highest risk in the first 3 weeks).'

export function febrileInfantPathway(input: PathwayInput): PathwayResult {
  const group = febrileInfantAgeGroup(input.ageDays)
  const e = input.eligibility
  const exclusions = [
    !e.wellAppearing && 'ill-appearing',
    !e.term && 'born <37 weeks',
    e.focalBacterialInfection && 'focal bacterial infection',
    e.clinicalBronchiolitis && 'clinical bronchiolitis',
    e.complexMedicalCondition && 'complex medical condition',
    e.vaccinatedLast48h && 'vaccinated in prior 48 h',
  ].filter(Boolean) as string[]

  if (group === 'under-8' || group === 'over-60' || exclusions.length > 0) {
    const why =
      group === 'under-8'
        ? 'Age ≤7 days'
        : group === 'over-60'
          ? 'Age >60 days'
          : `Excluded: ${exclusions.join(', ')}`
    const ill = !e.wellAppearing
    return {
      group,
      inScope: false,
      scopeNote: `${why} — outside the AAP 2021 guideline.`,
      tests: ill || group === 'under-8'
        ? ['Blood culture, urinalysis + urine culture (catheter), CSF studies', 'CBC, inflammatory markers; HSV PCR studies if risk factors']
        : ['Evaluate per clinical findings and local pathway'],
      lumbarPuncture: ill || group === 'under-8' ? 'required' : 'consider',
      antibiotics:
        ill || group === 'under-8'
          ? `Empiric parenteral antibiotics now (do not delay for LP if unstable). ${HSV_NOTE}`
          : 'Per clinical findings.',
      disposition: ill || group === 'under-8' ? 'Admit.' : 'Per clinical findings.',
    }
  }

  if (group === '8-21') {
    return {
      group,
      inScope: true,
      tests: ['Urinalysis + urine culture (catheter)', 'Blood culture', 'CSF: cell count, glucose, protein, Gram stain, culture (± enterovirus/HSV PCR)', 'Inflammatory markers optional (do not change management at this age)'],
      lumbarPuncture: 'required',
      antibiotics: `Parenteral: ampicillin + ceftazidime, or ampicillin + gentamicin. ${HSV_NOTE}`,
      disposition: 'Admit. Stop antibiotics and discharge if cultures are negative at 24–36 h and the infant remains well.',
    }
  }

  const ima = assessInflammatoryMarkers(input.im)
  const imsKnown = ima.complete || ima.abnormal

  if (group === '22-28') {
    if (!imsKnown) {
      return {
        group,
        inScope: true,
        tests: ['Urinalysis + urine culture', 'Blood culture', 'Inflammatory markers: procalcitonin + ANC (if no PCT: ANC + CRP + temperature)'],
        lumbarPuncture: 'pending',
        antibiotics: 'Decide after inflammatory markers result.',
        disposition: 'Pending results.',
        imAssessment: ima,
      }
    }
    if (ima.abnormal) {
      return {
        group,
        inScope: true,
        tests: ['Urinalysis + urine culture', 'Blood culture', 'CSF studies'],
        lumbarPuncture: 'required',
        antibiotics:
          input.csf === 'pleocytosis'
            ? `Parenteral antibiotics at meningitic doses (e.g., ampicillin + ceftazidime or cefepime). ${HSV_NOTE}`
            : 'Parenteral antibiotics (e.g., ceftriaxone 50 mg/kg; meningitic dosing if CSF abnormal or not obtained).',
        disposition: 'Admit.',
        imAssessment: ima,
      }
    }
    return {
      group,
      inScope: true,
      tests: ['Urinalysis + urine culture', 'Blood culture', 'Inflammatory markers (normal)'],
      lumbarPuncture: 'optional',
      antibiotics:
        input.ua === 'positive'
          ? 'Treat UTI with parenteral antibiotics initially (e.g., ceftriaxone 50 mg/kg if CSF normal or not indicated).'
          : 'Not required if CSF is normal or infant is observed in hospital pending cultures. If CSF is not obtained and home observation is chosen, follow the guideline’s antimicrobial algorithm.',
      disposition:
        'Hospitalization is the usual choice. Home observation is an option only with normal UA, normal IMs, normal CSF (if obtained), and assured re-evaluation within 24 h — a shared decision with the family.',
      imAssessment: ima,
    }
  }

  // 29–60 days
  if (!imsKnown) {
    return {
      group,
      inScope: true,
      tests: ['Urinalysis + urine culture', 'Blood culture', 'Inflammatory markers: procalcitonin + ANC (if no PCT: ANC + CRP + temperature)'],
      lumbarPuncture: 'pending',
      antibiotics: 'Decide after inflammatory markers result.',
      disposition: 'Pending results.',
      imAssessment: ima,
    }
  }
  if (ima.abnormal) {
    return {
      group,
      inScope: true,
      tests: ['Urinalysis + urine culture', 'Blood culture', 'CSF studies (strongly consider)'],
      lumbarPuncture: 'consider',
      antibiotics:
        input.csf === 'pleocytosis'
          ? 'Meningitic dosing: ceftriaxone 100 mg/kg/day (÷ q12h) + vancomycin.'
          : input.csf === 'normal'
            ? 'Ceftriaxone 50 mg/kg IV/IM.'
            : 'If CSF not obtained and antibiotics are given, use meningitic dosing (CSF results will be uninterpretable later).',
      disposition:
        input.csf === 'normal'
          ? 'Hospitalize, or home after parenteral ceftriaxone with re-evaluation in 24 h if follow-up is assured.'
          : 'Hospitalize.',
      imAssessment: ima,
    }
  }
  return {
    group,
    inScope: true,
    tests: ['Urinalysis + urine culture', 'Blood culture', 'Inflammatory markers (normal)'],
    lumbarPuncture: 'not-needed',
    antibiotics:
      input.ua === 'positive'
        ? 'Treat UTI: oral antibiotic per local antibiogram (e.g., cephalexin or cefixime) or parenteral if not tolerating PO.'
        : 'No antibiotics.',
    disposition: 'Home with re-evaluation in 24–36 h (hospitalize if follow-up cannot be assured).',
    imAssessment: ima,
  }
}
