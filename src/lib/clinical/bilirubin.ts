/**
 * Bilirubin helpers aligned with the AAP 2022 hyperbilirubinemia guideline.
 * Thresholds themselves depend on gestational age, age in hours and neurotoxicity risk —
 * use the guideline figures or BiliTool for the threshold values.
 */

export interface RateOfRise {
  mgPerDlPerHour: number
  suggestsHemolysis: boolean
  rule: string
}

/** ≥0.3 mg/dL/h in the first 24 h or ≥0.2 mg/dL/h thereafter suggests hemolysis (AAP 2022). */
export function bilirubinRateOfRise(tsb1: number, hours1: number, tsb2: number, hours2: number): RateOfRise | null {
  const dt = hours2 - hours1
  if (!(dt > 0)) return null
  const rate = Math.round(((tsb2 - tsb1) / dt) * 100) / 100
  const inFirstDay = hours2 <= 24
  const threshold = inFirstDay ? 0.3 : 0.2
  return {
    mgPerDlPerHour: rate,
    suggestsHemolysis: rate >= threshold,
    rule: inFirstDay ? '≥0.3 mg/dL/h in the first 24 h' : '≥0.2 mg/dL/h after 24 h',
  }
}

/** Escalation of care begins when TSB reaches (exchange threshold − 2 mg/dL). */
export function escalationThreshold(exchangeThreshold: number): number {
  return Math.round((exchangeThreshold - 2) * 10) / 10
}

/** Phototherapy may be stopped once TSB is ≥2 mg/dL below the threshold at which it was started. */
export function phototherapyStopLevel(thresholdAtInitiation: number): number {
  return Math.round((thresholdAtInitiation - 2) * 10) / 10
}
