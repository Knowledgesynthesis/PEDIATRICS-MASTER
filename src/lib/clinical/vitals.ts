/**
 * Pediatric reference vital signs (AHA PALS 2020 provider tables), hypotension thresholds,
 * emergency weight estimation (APLS) and common resuscitation numbers.
 */

export interface VitalBand {
  id: string
  label: string
  /** Inclusive lower age bound in months, exclusive upper bound. */
  minMonths: number
  maxMonths: number
  hrAwake: [number, number]
  hrAsleep: [number, number]
  rr: [number, number]
}

export const vitalBands: VitalBand[] = [
  { id: 'neonate', label: 'Neonate (0–28 d)', minMonths: 0, maxMonths: 1, hrAwake: [100, 205], hrAsleep: [90, 160], rr: [30, 53] },
  { id: 'infant', label: 'Infant (1–12 mo)', minMonths: 1, maxMonths: 12, hrAwake: [100, 180], hrAsleep: [90, 160], rr: [30, 53] },
  { id: 'toddler', label: 'Toddler (1–2 y)', minMonths: 12, maxMonths: 36, hrAwake: [98, 140], hrAsleep: [80, 120], rr: [22, 37] },
  { id: 'preschool', label: 'Preschool (3–5 y)', minMonths: 36, maxMonths: 72, hrAwake: [80, 120], hrAsleep: [65, 100], rr: [20, 28] },
  { id: 'school', label: 'School age (6–11 y)', minMonths: 72, maxMonths: 144, hrAwake: [75, 118], hrAsleep: [58, 90], rr: [18, 25] },
  { id: 'adolescent', label: 'Adolescent (≥12 y)', minMonths: 144, maxMonths: 12 * 19, hrAwake: [60, 100], hrAsleep: [50, 90], rr: [12, 20] },
]

export const bpBands = [
  { label: 'Neonate (96 h)', sbp: [67, 84], dbp: [35, 53] },
  { label: 'Infant (1–12 mo)', sbp: [72, 104], dbp: [37, 56] },
  { label: 'Toddler (1–2 y)', sbp: [86, 106], dbp: [42, 63] },
  { label: 'Preschool (3–5 y)', sbp: [89, 112], dbp: [46, 72] },
  { label: 'School age (6–9 y)', sbp: [97, 115], dbp: [57, 76] },
  { label: 'Preadolescent (10–12 y)', sbp: [102, 120], dbp: [61, 80] },
  { label: 'Adolescent (12–15 y)', sbp: [110, 131], dbp: [64, 83] },
] as const

export function vitalBandForAge(ageMonths: number): VitalBand {
  return vitalBands.find((b) => ageMonths >= b.minMonths && ageMonths < b.maxMonths) ?? vitalBands[vitalBands.length - 1]
}

/**
 * PALS hypotension (systolic, mmHg): term neonate 0–28 d <60; 1–12 mo <70;
 * 1–10 y <70 + 2 × age (y); >10 y <90.
 */
export function hypotensionThreshold(ageMonths: number): number {
  if (ageMonths < 1) return 60
  if (ageMonths < 12) return 70
  const years = Math.floor(ageMonths / 12)
  if (years <= 10) return 70 + 2 * years
  return 90
}

/** APLS weight estimation: 0–12 mo (0.5 × months) + 4; 1–5 y (2 × years) + 8; 6–12 y (3 × years) + 7. */
export function estimateWeightKg(ageMonths: number): number | null {
  if (ageMonths < 0) return null
  if (ageMonths <= 12) return Math.round((0.5 * ageMonths + 4) * 10) / 10
  const years = Math.floor(ageMonths / 12)
  if (years <= 5) return 2 * years + 8
  if (years <= 12) return 3 * years + 7
  return null
}

/** PALS endotracheal tube size (internal diameter, mm) for age ≥2 y. */
export function ettSize(ageYears: number): { cuffed: number; uncuffed: number } | null {
  if (ageYears < 2) return null
  return { cuffed: Math.round((ageYears / 4 + 3.5) * 2) / 2, uncuffed: Math.round((ageYears / 4 + 4) * 2) / 2 }
}
