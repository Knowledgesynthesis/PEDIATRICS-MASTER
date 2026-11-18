/** Growth arithmetic used in well-child care. */
import { diffDays } from './dates'

/** Mid-parental (target) height: boys (father + mother + 13)/2, girls (father + mother − 13)/2; ±8.5 cm ≈ ±2 SD. */
export function midParentalHeight(fatherCm: number, motherCm: number, sex: 'male' | 'female') {
  const target = (fatherCm + motherCm + (sex === 'male' ? 13 : -13)) / 2
  return { targetCm: round1(target), lowCm: round1(target - 8.5), highCm: round1(target + 8.5) }
}

export interface CorrectedAge {
  chronologicalDays: number
  correctedDays: number
  weeksPremature: number
  /** Correct for prematurity (growth & development) until 24 months chronological age. */
  shouldCorrect: boolean
}

export function correctedAge(dob: Date, gestationalWeeks: number, on: Date): CorrectedAge {
  const chronologicalDays = diffDays(dob, on)
  const weeksPremature = Math.max(0, 40 - gestationalWeeks)
  const correctedDays = chronologicalDays - Math.round(weeksPremature * 7)
  return {
    chronologicalDays,
    correctedDays,
    weeksPremature,
    shouldCorrect: gestationalWeeks < 37 && chronologicalDays < 730,
  }
}

/** Typical average weight-gain velocity bands (g/day) by age, for orientation — always plot on WHO/CDC charts. */
export const weightGainBands = [
  { maxAgeDays: 91, label: '0–3 months', low: 25, high: 35 },
  { maxAgeDays: 182, label: '3–6 months', low: 15, high: 21 },
  { maxAgeDays: 365, label: '6–12 months', low: 10, high: 13 },
  { maxAgeDays: 730, label: '12–24 months', low: 5, high: 8 },
] as const

export function weightVelocity(w1Kg: number, d1: Date, w2Kg: number, d2: Date, dob: Date) {
  const days = diffDays(d1, d2)
  if (days <= 0) return null
  const gPerDay = ((w2Kg - w1Kg) * 1000) / days
  const midAge = (diffDays(dob, d1) + diffDays(dob, d2)) / 2
  const band = weightGainBands.find((b) => midAge <= b.maxAgeDays) ?? null
  const status = !band ? 'no-band' : gPerDay < band.low ? 'below' : gPerDay > band.high ? 'above' : 'typical'
  return { days, gPerDay: round1(gPerDay), band, status }
}

/** Newborn weight change from birth weight (%), negative = loss. */
export function newbornWeightChangePct(birthWeightG: number, currentWeightG: number): number {
  return round1(((currentWeightG - birthWeightG) / birthWeightG) * 100)
}

export function bmi(weightKg: number, heightCm: number): number {
  const m = heightCm / 100
  return round1(weightKg / (m * m))
}

function round1(n: number): number {
  return Math.round(n * 10) / 10
}
