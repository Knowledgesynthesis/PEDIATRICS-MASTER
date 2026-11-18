import { describe, expect, it } from 'vitest'
import { addMonths, ageLabel, diffMonths, parseISODate } from './dates'
import { bolusMl, deficitMl, maintenance, maintenanceDaily, maintenanceHourly, ongoingLossesMl, ortPlan, whoPlanC } from './fluids'
import { cdsCategory, cdsScore, whoClassify } from './dehydration'
import { croupSeverity, westleyScore } from './croup'
import { aomRecommendation, type AomInput } from './aom'
import { assessInflammatoryMarkers, febrileInfantAgeGroup, febrileInfantPathway, type PathwayInput } from './febrileInfant'
import { classifyFebrileSeizure, recurrenceRiskLabel, type FsInput } from './febrileSeizure'
import { cchdScreen } from './cchd'
import { bilirubinRateOfRise, escalationThreshold } from './bilirubin'
import { estimateWeightKg, ettSize, hypotensionThreshold, vitalBandForAge } from './vitals'
import { computeDose, drugs } from './dosing'
import { correctedAge, midParentalHeight, newbornWeightChangePct, weightVelocity, bmi } from './growth'

const d = (s: string) => {
  const v = parseISODate(s)
  if (!v) throw new Error(`bad date ${s}`)
  return v
}

describe('dates', () => {
  it('rejects impossible dates', () => {
    expect(parseISODate('2026-02-30')).toBeNull()
    expect(parseISODate('nonsense')).toBeNull()
  })
  it('clamps month-end when adding months', () => {
    expect(addMonths(d('2025-01-31'), 1).toISOString().slice(0, 10)).toBe('2025-02-28')
    expect(addMonths(d('2024-01-31'), 1).toISOString().slice(0, 10)).toBe('2024-02-29')
  })
  it('counts completed months', () => {
    expect(diffMonths(d('2025-01-15'), d('2025-03-14'))).toBe(1)
    expect(diffMonths(d('2025-01-15'), d('2025-03-15'))).toBe(2)
  })
  it('labels ages', () => {
    expect(ageLabel(d('2026-01-01'), d('2026-02-12'))).toBe('6 wk')
    expect(ageLabel(d('2020-01-01'), d('2024-04-01'))).toBe('4 yr 3 mo')
  })
})

describe('fluids', () => {
  it('Holliday–Segar 4-2-1 matches worked examples', () => {
    expect(maintenanceHourly(8)).toBe(32)
    expect(maintenanceHourly(10)).toBe(40)
    expect(maintenanceHourly(15)).toBe(50)
    expect(maintenanceHourly(25)).toBe(65)
    expect(maintenanceDaily(25)).toBe(1600)
  })
  it('caps at adult maintenance', () => {
    const r = maintenance(90)
    expect(r.mlPerHour).toBe(100)
    expect(r.mlPerDay).toBe(2400)
    expect(r.capped).toBe(true)
  })
  it('returns 0 for invalid weights', () => {
    expect(maintenanceHourly(0)).toBe(0)
    expect(maintenanceHourly(Number.NaN)).toBe(0)
    expect(maintenanceDaily(-5)).toBe(0)
  })
  it('deficit = 10 mL/kg per % dehydration', () => {
    expect(deficitMl(10, 7)).toBe(700)
  })
  it('ORT plan over 4 h', () => {
    const p = ortPlan(12, 75)
    expect(p.totalMl).toBe(900)
    expect(p.perHourMl).toBe(225)
    expect(p.per5MinMl).toBe(18.8)
  })
  it('ongoing losses', () => {
    expect(ongoingLossesMl(10, 2, 1)).toBe(220)
  })
  it('bolus caps at 1 L', () => {
    expect(bolusMl(30)).toEqual({ ml: 600, capped: false })
    expect(bolusMl(70)).toEqual({ ml: 1000, capped: true })
  })
  it('WHO Plan C timing differs by age', () => {
    expect(whoPlanC(8, 6)).toMatchObject({ firstMl: 240, firstOver: '1 hour', thenMl: 560, thenOver: '5 hours' })
    expect(whoPlanC(12, 24)).toMatchObject({ firstOver: '30 minutes', thenOver: '2.5 hours' })
  })
})

describe('dehydration', () => {
  it('CDS bands 0 / 1–4 / 5–8', () => {
    expect(cdsCategory(cdsScore({ appearance: 0, eyes: 0, mucous: 0, tears: 0 }))).toBe('none')
    expect(cdsCategory(4)).toBe('some')
    expect(cdsCategory(5)).toBe('moderate-severe')
    expect(cdsCategory(8)).toBe('moderate-severe')
  })
  it('WHO: 2 severe signs = severe', () => {
    expect(whoClassify({ condition: 'lethargic', eyes: 'sunken', drinking: 'normally', skinPinch: 'immediate' }).category).toBe('severe')
  })
  it('WHO: 2 some signs = some', () => {
    expect(whoClassify({ condition: 'restless', eyes: 'normal', drinking: 'eagerly', skinPinch: 'immediate' }).category).toBe('some')
  })
  it('WHO: 1 sign = none', () => {
    expect(whoClassify({ condition: 'well', eyes: 'sunken', drinking: 'normally', skinPinch: 'immediate' }).category).toBe('none')
  })
  it('WHO: single severe-level sign plus one some-level sign = some', () => {
    expect(whoClassify({ condition: 'lethargic', eyes: 'normal', drinking: 'eagerly', skinPinch: 'immediate' }).category).toBe('some')
  })
})

describe('croup', () => {
  it('Westley bands', () => {
    expect(croupSeverity(westleyScore({ consciousness: 0, cyanosis: 0, stridor: 2, airEntry: 0, retractions: 0 }))).toBe('mild')
    expect(croupSeverity(3)).toBe('moderate')
    expect(croupSeverity(5)).toBe('moderate')
    expect(croupSeverity(6)).toBe('severe')
    expect(croupSeverity(11)).toBe('severe')
    expect(croupSeverity(12)).toBe('impending-failure')
    expect(westleyScore({ consciousness: 5, cyanosis: 5, stridor: 2, airEntry: 2, retractions: 3 })).toBe(17)
  })
})

describe('AOM (AAP 2013)', () => {
  const base: AomInput = {
    ageMonths: 18,
    otorrhea: false,
    severe: false,
    bilateral: false,
    amoxicillinLast30Days: false,
    purulentConjunctivitis: false,
    recurrentAmoxicillinFailure: false,
    penicillinAllergy: 'none',
  }
  it('6–23 mo unilateral non-severe → observation option', () => {
    expect(aomRecommendation(base).decision).toBe('antibiotics-or-observation')
  })
  it('6–23 mo bilateral → antibiotics', () => {
    expect(aomRecommendation({ ...base, bilateral: true }).decision).toBe('antibiotics')
  })
  it('≥24 mo bilateral non-severe → observation option', () => {
    expect(aomRecommendation({ ...base, ageMonths: 30, bilateral: true }).decision).toBe('antibiotics-or-observation')
  })
  it('otorrhea or severe → antibiotics at any age', () => {
    expect(aomRecommendation({ ...base, ageMonths: 60, otorrhea: true }).decision).toBe('antibiotics')
    expect(aomRecommendation({ ...base, ageMonths: 60, severe: true }).decision).toBe('antibiotics')
  })
  it('<6 months → antibiotics, outside scope', () => {
    const r = aomRecommendation({ ...base, ageMonths: 4 })
    expect(r.decision).toBe('antibiotics')
    expect(r.inGuidelineScope).toBe(false)
  })
  it('picks amoxicillin–clavulanate for β-lactamase risks', () => {
    expect(aomRecommendation({ ...base, purulentConjunctivitis: true }).regimen).toMatch(/clavulanate/)
    expect(aomRecommendation({ ...base, amoxicillinLast30Days: true }).regimen).toMatch(/clavulanate/)
  })
  it('durations by age', () => {
    expect(aomRecommendation(base).duration).toMatch(/^10 days/)
    expect(aomRecommendation({ ...base, ageMonths: 48 }).duration).toMatch(/^7 days/)
    expect(aomRecommendation({ ...base, ageMonths: 96 }).duration).toMatch(/^5–7 days/)
    expect(aomRecommendation({ ...base, ageMonths: 96, severe: true }).duration).toMatch(/^10 days/)
  })
})

describe('febrile infant (AAP 2021)', () => {
  const eligible = {
    wellAppearing: true,
    term: true,
    focalBacterialInfection: false,
    clinicalBronchiolitis: false,
    complexMedicalCondition: false,
    vaccinatedLast48h: false,
  }
  const normalIm = { tempC: 38.3, pct: 0.1, anc: 2500, crpMgL: 5 }
  const make = (over: Partial<PathwayInput>): PathwayInput => ({
    ageDays: 40,
    eligibility: eligible,
    ua: 'negative',
    im: normalIm,
    csf: 'not-obtained',
    ...over,
  })

  it('age groups', () => {
    expect(febrileInfantAgeGroup(7)).toBe('under-8')
    expect(febrileInfantAgeGroup(8)).toBe('8-21')
    expect(febrileInfantAgeGroup(21)).toBe('8-21')
    expect(febrileInfantAgeGroup(22)).toBe('22-28')
    expect(febrileInfantAgeGroup(28)).toBe('22-28')
    expect(febrileInfantAgeGroup(29)).toBe('29-60')
    expect(febrileInfantAgeGroup(60)).toBe('29-60')
    expect(febrileInfantAgeGroup(61)).toBe('over-60')
  })
  it('IM thresholds are strict (> not ≥)', () => {
    expect(assessInflammatoryMarkers({ tempC: 38.5, pct: 0.5, anc: 4000, crpMgL: 20 }).abnormal).toBe(false)
    expect(assessInflammatoryMarkers({ tempC: 38.2, pct: 0.51, anc: 3000, crpMgL: 5 }).abnormal).toBe(true)
  })
  it('temperature counts only when PCT is unavailable', () => {
    expect(assessInflammatoryMarkers({ tempC: 39, pct: 0.2, anc: 3000, crpMgL: 5 }).abnormal).toBe(false)
    expect(assessInflammatoryMarkers({ tempC: 39, pct: null, anc: 3000, crpMgL: 5 }).abnormal).toBe(true)
  })
  it('8–21 d: always LP, antibiotics, admit', () => {
    const r = febrileInfantPathway(make({ ageDays: 14 }))
    expect(r.lumbarPuncture).toBe('required')
    expect(r.disposition).toMatch(/^Admit/)
  })
  it('22–28 d abnormal IM → LP required', () => {
    expect(febrileInfantPathway(make({ ageDays: 25, im: { ...normalIm, pct: 1.2 } })).lumbarPuncture).toBe('required')
  })
  it('22–28 d normal IM → LP optional', () => {
    expect(febrileInfantPathway(make({ ageDays: 25 })).lumbarPuncture).toBe('optional')
  })
  it('29–60 d normal IM + negative UA → no LP, no antibiotics, home', () => {
    const r = febrileInfantPathway(make({}))
    expect(r.lumbarPuncture).toBe('not-needed')
    expect(r.antibiotics).toBe('No antibiotics.')
    expect(r.disposition).toMatch(/^Home/)
  })
  it('29–60 d normal IM + positive UA → no LP, treat UTI', () => {
    const r = febrileInfantPathway(make({ ua: 'positive' }))
    expect(r.lumbarPuncture).toBe('not-needed')
    expect(r.antibiotics).toMatch(/UTI/)
  })
  it('29–60 d abnormal IM → consider LP', () => {
    expect(febrileInfantPathway(make({ im: { ...normalIm, anc: 6000 } })).lumbarPuncture).toBe('consider')
  })
  it('ill-appearing is out of scope with full workup', () => {
    const r = febrileInfantPathway(make({ eligibility: { ...eligible, wellAppearing: false } }))
    expect(r.inScope).toBe(false)
    expect(r.lumbarPuncture).toBe('required')
  })
  it('missing IMs → pending', () => {
    expect(febrileInfantPathway(make({ im: { tempC: null, pct: null, anc: null, crpMgL: null } })).lumbarPuncture).toBe('pending')
  })
})

describe('febrile seizure (AAP 2011/2008)', () => {
  const base: FsInput = {
    ageMonths: 18,
    tempC: 39.2,
    durationMin: 2,
    focal: false,
    recurredWithin24h: false,
    meningealSignsOrCnsInfectionConcern: false,
    priorAfebrileSeizure: false,
    hibOrPcvIncompleteOrUnknown: false,
    pretreatedWithAntibiotics: false,
    backToBaselineWithin1h: true,
  }
  it('simple', () => {
    const r = classifyFebrileSeizure(base)
    expect(r.classification).toBe('simple')
    expect(r.lumbarPuncture).toBe('not-routine')
  })
  it('complex by duration / focality / recurrence', () => {
    expect(classifyFebrileSeizure({ ...base, durationMin: 15 }).classification).toBe('complex')
    expect(classifyFebrileSeizure({ ...base, focal: true }).classification).toBe('complex')
    expect(classifyFebrileSeizure({ ...base, recurredWithin24h: true }).classification).toBe('complex')
    expect(classifyFebrileSeizure({ ...base, durationMin: 30 }).classification).toBe('febrile-status')
  })
  it('LP is an option at 6–12 mo with incomplete Hib/PCV', () => {
    expect(classifyFebrileSeizure({ ...base, ageMonths: 9, hibOrPcvIncompleteOrUnknown: true }).lumbarPuncture).toBe('option')
    expect(classifyFebrileSeizure({ ...base, ageMonths: 15, hibOrPcvIncompleteOrUnknown: true }).lumbarPuncture).toBe('not-routine')
  })
  it('LP should be performed with meningeal signs', () => {
    expect(classifyFebrileSeizure({ ...base, meningealSignsOrCnsInfectionConcern: true }).lumbarPuncture).toBe('perform')
  })
  it('outside definition', () => {
    expect(classifyFebrileSeizure({ ...base, ageMonths: 4 }).classification).toBe('not-febrile-seizure')
    expect(classifyFebrileSeizure({ ...base, ageMonths: 72 }).classification).toBe('not-febrile-seizure')
    expect(classifyFebrileSeizure({ ...base, tempC: 37.8 }).classification).toBe('not-febrile-seizure')
    expect(classifyFebrileSeizure({ ...base, priorAfebrileSeizure: true }).classification).toBe('not-febrile-seizure')
  })
  it('recurrence risk labels', () => {
    const none = { firstSeizureUnder18Months: false, firstDegreeRelativeWithFs: false, lowTempAtSeizure: false, shortFeverDuration: false }
    expect(recurrenceRiskLabel(none).label).toMatch(/<20%/)
    expect(recurrenceRiskLabel({ firstSeizureUnder18Months: true, firstDegreeRelativeWithFs: true, lowTempAtSeizure: true, shortFeverDuration: true }).label).toMatch(/>70%/)
  })
})

describe('CCHD screen (2020 algorithm)', () => {
  it('pass', () => expect(cchdScreen(97, 96, 1).result).toBe('pass'))
  it('pass when only foot ≥95 and difference ≤3', () => expect(cchdScreen(94, 95, 1).result).toBe('pass'))
  it('fail <90', () => expect(cchdScreen(89, 96, 1).result).toBe('fail'))
  it('repeat when difference >3', () => expect(cchdScreen(98, 94, 1).result).toBe('repeat'))
  it('repeat when 90–94 in both', () => expect(cchdScreen(93, 92, 1).result).toBe('repeat'))
  it('fail on second abnormal screen', () => expect(cchdScreen(98, 94, 2).result).toBe('fail'))
  it('difference of exactly 3 passes', () => expect(cchdScreen(98, 95, 1).result).toBe('pass'))
})

describe('bilirubin', () => {
  it('flags rapid rise in first 24 h at ≥0.3 mg/dL/h', () => {
    const r = bilirubinRateOfRise(4, 6, 8, 18)
    expect(r?.mgPerDlPerHour).toBe(0.33)
    expect(r?.suggestsHemolysis).toBe(true)
  })
  it('uses 0.2 mg/dL/h after 24 h', () => {
    expect(bilirubinRateOfRise(10, 30, 13, 42)?.suggestsHemolysis).toBe(true)
    expect(bilirubinRateOfRise(10, 30, 11, 42)?.suggestsHemolysis).toBe(false)
  })
  it('rejects non-increasing time', () => {
    expect(bilirubinRateOfRise(10, 30, 12, 30)).toBeNull()
  })
  it('escalation = exchange − 2', () => {
    expect(escalationThreshold(22.5)).toBe(20.5)
  })
})

describe('vitals', () => {
  it('hypotension thresholds', () => {
    expect(hypotensionThreshold(0)).toBe(60)
    expect(hypotensionThreshold(6)).toBe(70)
    expect(hypotensionThreshold(12)).toBe(72)
    expect(hypotensionThreshold(60)).toBe(80)
    expect(hypotensionThreshold(120)).toBe(90)
    expect(hypotensionThreshold(156)).toBe(90)
  })
  it('APLS weight estimates', () => {
    expect(estimateWeightKg(6)).toBe(7)
    expect(estimateWeightKg(12)).toBe(10)
    expect(estimateWeightKg(36)).toBe(14)
    expect(estimateWeightKg(96)).toBe(31)
    expect(estimateWeightKg(180)).toBeNull()
  })
  it('vital bands by age', () => {
    expect(vitalBandForAge(0).id).toBe('neonate')
    expect(vitalBandForAge(11).id).toBe('infant')
    expect(vitalBandForAge(24).id).toBe('toddler')
    expect(vitalBandForAge(200).id).toBe('adolescent')
  })
  it('ETT sizes', () => {
    expect(ettSize(4)).toEqual({ cuffed: 4.5, uncuffed: 5 })
    expect(ettSize(1)).toBeNull()
  })
})

describe('dosing', () => {
  const get = (id: string) => {
    const drug = drugs.find((x) => x.id === id)
    if (!drug) throw new Error(id)
    return drug
  }
  it('every drug has an id, refs and a valid shape', () => {
    const ids = new Set<string>()
    for (const drug of drugs) {
      expect(ids.has(drug.id)).toBe(false)
      ids.add(drug.id)
      expect(drug.refs.length).toBeGreaterThan(0)
      if (drug.kind === 'band') expect(drug.bands.at(-1)?.maxKg).toBe(Infinity)
    }
  })
  it('acetaminophen 15 mg/kg with volume', () => {
    expect(computeDose(get('acetaminophen'), 12)).toEqual({ doseText: '180 mg', volumeText: '5.6 mL of 160 mg/5 mL', capped: false })
  })
  it('caps at max dose', () => {
    const r = computeDose(get('acetaminophen'), 80)
    expect(r?.doseText).toBe('1,000 mg')
    expect(r?.capped).toBe(true)
  })
  it('epinephrine IM rounds small volumes to 0.01 mL', () => {
    expect(computeDose(get('epi-im'), 9)).toEqual({ doseText: '0.09 mg', volumeText: '0.09 mL of 1 mg/mL', capped: false })
    expect(computeDose(get('epi-im'), 60)?.doseText).toBe('0.5 mg')
  })
  it('ranges', () => {
    expect(computeDose(get('bolus'), 15)?.doseText).toBe('150–300 mL')
    expect(computeDose(get('bolus'), 80)?.doseText).toBe('800–1,000 mL')
  })
  it('band boundaries follow sources', () => {
    expect(computeDose(get('ondansetron'), 15)?.doseText).toBe('2 mg')
    expect(computeDose(get('ondansetron'), 15.1)?.doseText).toBe('4 mg')
    expect(computeDose(get('ondansetron'), 8)?.doseText).toBe('2 mg')
    expect(computeDose(get('ondansetron'), 7.9)?.doseText).toMatch(/0.15 mg\/kg/)
    expect(computeDose(get('epi-autoinjector'), 15)?.doseText).toMatch(/^0.15 mg/)
    expect(computeDose(get('epi-autoinjector'), 30)?.doseText).toMatch(/^0.3 mg/)
    expect(computeDose(get('oseltamivir'), 15)?.doseText).toMatch(/^30 mg/)
    expect(computeDose(get('oseltamivir'), 23)?.doseText).toBe('45 mg BID')
    expect(computeDose(get('oseltamivir'), 41)?.doseText).toBe('75 mg BID')
    expect(computeDose(get('pen-v'), 27)?.doseText).toMatch(/^250/)
    expect(computeDose(get('bpg'), 27)?.doseText).toMatch(/^1,200,000/)
  })
  it('rejects nonsense weights', () => {
    expect(computeDose(get('ibuprofen'), 0)).toBeNull()
    expect(computeDose(get('ibuprofen'), 500)).toBeNull()
  })
  it('levetiracetam caps at 4,500 mg', () => {
    expect(computeDose(get('levetiracetam'), 90)?.doseText).toBe('4,500 mg')
  })
})

describe('growth', () => {
  it('mid-parental height', () => {
    expect(midParentalHeight(180, 165, 'male')).toEqual({ targetCm: 179, lowCm: 170.5, highCm: 187.5 })
    expect(midParentalHeight(180, 165, 'female')).toEqual({ targetCm: 166, lowCm: 157.5, highCm: 174.5 })
  })
  it('corrected age for a 30-week infant', () => {
    const r = correctedAge(d('2026-01-01'), 30, d('2026-05-01'))
    expect(r.weeksPremature).toBe(10)
    expect(r.correctedDays).toBe(120 - 70)
    expect(r.shouldCorrect).toBe(true)
  })
  it('no correction for term infants', () => {
    expect(correctedAge(d('2026-01-01'), 39, d('2026-05-01')).shouldCorrect).toBe(false)
  })
  it('weight velocity vs band', () => {
    const r = weightVelocity(4.0, d('2026-02-01'), 4.6, d('2026-03-03'), d('2026-01-01'))
    expect(r?.gPerDay).toBe(20)
    expect(r?.status).toBe('below')
  })
  it('newborn weight change', () => {
    expect(newbornWeightChangePct(3500, 3150)).toBe(-10)
  })
  it('BMI', () => {
    expect(bmi(20, 110)).toBe(16.5)
  })
})
