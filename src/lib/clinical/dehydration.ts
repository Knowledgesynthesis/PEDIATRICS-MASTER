/**
 * Clinical Dehydration Scale (Friedman 2004; validated Goldman 2008, Bailey 2010) for
 * children 1–36 months with gastroenteritis, and WHO/IMCI dehydration classification.
 */

export interface ScaleOption {
  score: number
  label: string
}

export interface ScaleItem<K extends string> {
  key: K
  label: string
  options: ScaleOption[]
}

export type CdsKey = 'appearance' | 'eyes' | 'mucous' | 'tears'

export const cdsItems: ScaleItem<CdsKey>[] = [
  {
    key: 'appearance',
    label: 'General appearance',
    options: [
      { score: 0, label: 'Normal' },
      { score: 1, label: 'Thirsty, restless, or lethargic but irritable when touched' },
      { score: 2, label: 'Drowsy, limp, cold, or sweaty ± comatose' },
    ],
  },
  {
    key: 'eyes',
    label: 'Eyes',
    options: [
      { score: 0, label: 'Normal' },
      { score: 1, label: 'Slightly sunken' },
      { score: 2, label: 'Very sunken' },
    ],
  },
  {
    key: 'mucous',
    label: 'Mucous membranes (tongue)',
    options: [
      { score: 0, label: 'Moist' },
      { score: 1, label: 'Sticky' },
      { score: 2, label: 'Dry' },
    ],
  },
  {
    key: 'tears',
    label: 'Tears',
    options: [
      { score: 0, label: 'Tears' },
      { score: 1, label: 'Decreased tears' },
      { score: 2, label: 'Absent tears' },
    ],
  },
]

export type CdsValues = Record<CdsKey, number>

export type CdsCategory = 'none' | 'some' | 'moderate-severe'

export function cdsScore(values: CdsValues): number {
  return values.appearance + values.eyes + values.mucous + values.tears
}

/** 0 = no dehydration (<3%); 1–4 = some (3 to <6%); 5–8 = moderate/severe (≥6%). */
export function cdsCategory(score: number): CdsCategory {
  if (score <= 0) return 'none'
  if (score <= 4) return 'some'
  return 'moderate-severe'
}

// ── WHO / IMCI ───────────────────────────────────────────────────────────────

export interface WhoInput {
  condition: 'well' | 'restless' | 'lethargic'
  eyes: 'normal' | 'sunken'
  drinking: 'normally' | 'eagerly' | 'poorly'
  skinPinch: 'immediate' | 'slow' | 'very-slow'
}

export type WhoCategory = 'none' | 'some' | 'severe'

/**
 * Severe: ≥2 of lethargic/unconscious, sunken eyes, not able to drink or drinking poorly, skin pinch very slow (≥2 s).
 * Some: ≥2 of restless/irritable, sunken eyes, drinks eagerly/thirsty, skin pinch slow.
 * A sign present at the severe level also counts toward "some".
 */
export function whoClassify(input: WhoInput): { category: WhoCategory; severeSigns: number; someSigns: number } {
  const severeSigns =
    Number(input.condition === 'lethargic') +
    Number(input.eyes === 'sunken') +
    Number(input.drinking === 'poorly') +
    Number(input.skinPinch === 'very-slow')
  const someSigns =
    Number(input.condition !== 'well') +
    Number(input.eyes === 'sunken') +
    Number(input.drinking !== 'normally') +
    Number(input.skinPinch !== 'immediate')
  const category: WhoCategory = severeSigns >= 2 ? 'severe' : someSigns >= 2 ? 'some' : 'none'
  return { category, severeSigns, someSigns }
}
