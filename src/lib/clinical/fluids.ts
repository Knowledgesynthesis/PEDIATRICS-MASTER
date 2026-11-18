/**
 * Holliday–Segar maintenance fluids and rehydration arithmetic.
 * Sources: Holliday & Segar 1957; AAP maintenance IVF CPG 2018 (isotonic fluids);
 * CDC gastroenteritis 2003 (ORT volumes, ongoing losses); WHO 2005 (Plan B/C).
 */

export const ADULT_MAINTENANCE_CAP_ML_PER_H = 100
export const ADULT_MAINTENANCE_CAP_ML_PER_DAY = 2400

export interface MaintenanceResult {
  mlPerHour: number
  mlPerDay: number
  capped: boolean
}

/** 4-2-1 rule (mL/h): 4 mL/kg for first 10 kg, 2 mL/kg next 10 kg, 1 mL/kg thereafter. */
export function maintenanceHourly(weightKg: number): number {
  if (!(weightKg > 0)) return 0
  const first = Math.min(weightKg, 10) * 4
  const second = Math.min(Math.max(weightKg - 10, 0), 10) * 2
  const rest = Math.max(weightKg - 20, 0) * 1
  return first + second + rest
}

/** 100-50-20 rule (mL/day). */
export function maintenanceDaily(weightKg: number): number {
  if (!(weightKg > 0)) return 0
  const first = Math.min(weightKg, 10) * 100
  const second = Math.min(Math.max(weightKg - 10, 0), 10) * 50
  const rest = Math.max(weightKg - 20, 0) * 20
  return first + second + rest
}

export function maintenance(weightKg: number): MaintenanceResult {
  const rawHour = maintenanceHourly(weightKg)
  const rawDay = maintenanceDaily(weightKg)
  const capped = rawHour > ADULT_MAINTENANCE_CAP_ML_PER_H || rawDay > ADULT_MAINTENANCE_CAP_ML_PER_DAY
  return {
    mlPerHour: Math.min(rawHour, ADULT_MAINTENANCE_CAP_ML_PER_H),
    mlPerDay: Math.min(rawDay, ADULT_MAINTENANCE_CAP_ML_PER_DAY),
    capped,
  }
}

/** Fluid deficit in mL: 1% dehydration = 10 mL/kg. */
export function deficitMl(weightKg: number, percentDehydration: number): number {
  if (!(weightKg > 0) || !(percentDehydration > 0)) return 0
  return Math.round(weightKg * percentDehydration * 10)
}

export interface OrtPlan {
  totalMl: number
  perHourMl: number
  /** Volume to give every 5 minutes if spoon/syringe-feeding over 4 h (48 aliquots). */
  per5MinMl: number
}

/** ORT replacement over 4 hours at a chosen mL/kg (CDC: 50 mL/kg mild, 100 mL/kg moderate; WHO Plan B: 75 mL/kg). */
export function ortPlan(weightKg: number, mlPerKg: number, hours = 4): OrtPlan {
  if (!(weightKg > 0) || !(mlPerKg > 0)) return { totalMl: 0, perHourMl: 0, per5MinMl: 0 }
  const totalMl = Math.round(weightKg * mlPerKg)
  return {
    totalMl,
    perHourMl: Math.round(totalMl / hours),
    per5MinMl: Math.round((totalMl / (hours * 12)) * 10) / 10,
  }
}

/** Ongoing-loss replacement (CDC 2003): 10 mL/kg per diarrheal stool, 2 mL/kg per emesis. */
export function ongoingLossesMl(weightKg: number, stools: number, emeses: number): number {
  if (!(weightKg > 0)) return 0
  return Math.round(weightKg * (10 * Math.max(stools, 0) + 2 * Math.max(emeses, 0)))
}

export const MAX_BOLUS_ML = 1000

/** Isotonic bolus volume, capped at an adult 1 L bolus. */
export function bolusMl(weightKg: number, mlPerKg = 20): { ml: number; capped: boolean } {
  if (!(weightKg > 0)) return { ml: 0, capped: false }
  const raw = Math.round(weightKg * mlPerKg)
  return { ml: Math.min(raw, MAX_BOLUS_ML), capped: raw > MAX_BOLUS_ML }
}

export interface WhoPlanC {
  firstMl: number
  firstOver: string
  thenMl: number
  thenOver: string
}

/**
 * WHO Plan C (severe dehydration, no severe acute malnutrition): Ringer's lactate 100 mL/kg.
 * <12 months: 30 mL/kg over 1 h then 70 mL/kg over 5 h. ≥12 months: 30 mL/kg over 30 min then 70 mL/kg over 2.5 h.
 */
export function whoPlanC(weightKg: number, ageMonths: number): WhoPlanC {
  const infant = ageMonths < 12
  return {
    firstMl: Math.round(weightKg * 30),
    firstOver: infant ? '1 hour' : '30 minutes',
    thenMl: Math.round(weightKg * 70),
    thenOver: infant ? '5 hours' : '2.5 hours',
  }
}
