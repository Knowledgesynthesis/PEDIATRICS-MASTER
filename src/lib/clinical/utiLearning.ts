/** Decision anchors for the fixed teaching scenarios, not a clinical triage tool.
 *  AAP 2026 UTI CPG Table 1, Figures 1–4, and KAS 4/5. */
export type UtiAgeBand = '8d-to-under-2mo' | '2mo-to-5y'
export type UtiCollection = 'catheter' | 'clean-catch' | 'suprapubic' | 'bag'
export type UtiLe = 'negative' | 'trace' | '1+' | '2+' | '3+'
export type UtiUrinalysis = { wbcPerHpf: number | null; le: UtiLe | null }
export type UtiCulture = { cfu: number; growth: 'single-uropathogen' | 'mixed' | 'none'; preAntibiotic: boolean }

const leScores: Record<UtiLe, number> = { negative: 0, trace: 1, '1+': 2, '2+': 3, '3+': 4 }

export function utiUrinalysisAnchors(age: UtiAgeBand, { wbcPerHpf, le }: UtiUrinalysis) {
  const young = age === '8d-to-under-2mo'
  const wbc = wbcPerHpf !== null && Number.isFinite(wbcPerHpf) && wbcPerHpf >= 0 ? wbcPerHpf : -1
  const dip = le === null ? -1 : leScores[le]
  const inflammation = wbc >= 5 || dip >= (young ? leScores.trace : leScores['1+'])
  return {
    inflammation,
    pendingHighProbability: wbc >= (young ? 5 : 10) || dip >= (young ? leScores.trace : leScores['2+']),
  }
}

export function utiCultureThreshold(age: UtiAgeBand, method: UtiCollection): number | null {
  if (method === 'catheter' || (age === '8d-to-under-2mo' && method === 'suprapubic')) return 10_000
  if (age === '2mo-to-5y' && method === 'clean-catch') return 100_000
  return null
}

export function assessUtiCulture(age: UtiAgeBand, method: UtiCollection, ua: UtiUrinalysis, culture: UtiCulture) {
  const threshold = utiCultureThreshold(age, method)
  if (threshold === null) return 'unsupported-specimen'
  if (!Number.isInteger(culture.cfu) || culture.cfu < 0) return 'uncertain'
  if (utiUrinalysisAnchors(age, ua).inflammation && culture.growth === 'single-uropathogen' && culture.cfu >= threshold) {
    return 'high-probability'
  }
  return culture.preAntibiotic ? 'anchor-not-met' : 'uncertain'
}

/** Only the low-complexity first febrile UTI illustration, age <5 years, no KAS 5A exceptions. */
export function firstFebrileUtiImaging(rbus: 'not-yet-done' | 'normal' | 'clinically-relevant-abnormality') {
  if (rbus === 'not-yet-done') return 'obtain-rbus'
  return rbus === 'normal' ? 'no-routine-vcug' : 'offer-vcug'
}

/** Same synthetic clinical facts used by the ID Master pediatric UTI case. */
export const idMasterUtiFixture = {
  ageMonths: 15,
  age: '2mo-to-5y',
  method: 'catheter',
  ua: { wbcPerHpf: 18, le: null },
  culture: { cfu: 20_000, growth: 'single-uropathogen', preAntibiotic: true },
} as const
