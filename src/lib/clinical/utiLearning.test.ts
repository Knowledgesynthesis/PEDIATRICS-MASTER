import { describe, expect, it } from 'vitest'
import { assessUtiCulture, firstFebrileUtiImaging, idMasterUtiFixture, utiCultureThreshold, utiUrinalysisAnchors } from './utiLearning'

const older = '2mo-to-5y'
const young = '8d-to-under-2mo'
const { ua, culture } = idMasterUtiFixture

describe('AAP 2026 UTI learning anchors', () => {
  it('agrees with ID Master for the same 15-month-old: 18 WBC/hpf and 20,000 CFU/mL single E. coli by catheter before antibiotics', () => {
    const f = idMasterUtiFixture
    expect(utiUrinalysisAnchors(f.age, f.ua).pendingHighProbability).toBe(true)
    expect(assessUtiCulture(f.age, f.method, f.ua, f.culture)).toBe('high-probability')
  })

  it('distinguishes lower inflammation anchors from the presumptive threshold while culture is pending', () => {
    for (const low of [{ wbcPerHpf: 5, le: null }, { wbcPerHpf: 9, le: '1+' }] as const) {
      expect(utiUrinalysisAnchors(older, low)).toEqual({ inflammation: true, pendingHighProbability: false })
      expect(assessUtiCulture(older, 'catheter', low, { ...culture, cfu: 10_000 })).toBe('high-probability')
    }
    for (const high of [{ wbcPerHpf: 10, le: null }, { wbcPerHpf: null, le: '2+' }] as const) {
      expect(utiUrinalysisAnchors(older, high)).toEqual({ inflammation: true, pendingHighProbability: true })
    }
    expect(utiUrinalysisAnchors(older, { wbcPerHpf: 4, le: 'trace' })).toEqual({ inflammation: false, pendingHighProbability: false })
  })

  it('uses the lower young-infant UA anchors and catheter/SPA collection, not older-child rules', () => {
    for (const high of [{ wbcPerHpf: 5, le: null }, { wbcPerHpf: null, le: 'trace' }] as const) {
      expect(utiUrinalysisAnchors(young, high)).toEqual({ inflammation: true, pendingHighProbability: true })
      expect(assessUtiCulture(young, 'suprapubic', high, { ...culture, cfu: 10_000 })).toBe('high-probability')
    }
    expect(utiCultureThreshold(young, 'clean-catch')).toBeNull()
  })

  it.each([
    ['catheter', 9_999, 'anchor-not-met'],
    ['catheter', 10_000, 'high-probability'],
    ['catheter', 20_000, 'high-probability'],
    ['clean-catch', 20_000, 'anchor-not-met'],
    ['clean-catch', 99_999, 'anchor-not-met'],
    ['clean-catch', 100_000, 'high-probability'],
    ['bag', 150_000, 'unsupported-specimen'],
  ] as const)('distinguishes %s collection at %s CFU/mL', (method, cfu, outcome) => {
    expect(assessUtiCulture(older, method, ua, { ...culture, cfu })).toBe(outcome)
  })

  it('does not treat growth alone, mixed growth, or a negative post-antibiotic culture as a verdict', () => {
    expect(assessUtiCulture(older, 'catheter', { wbcPerHpf: 1, le: 'negative' }, culture)).toBe('anchor-not-met')
    expect(assessUtiCulture(older, 'catheter', ua, { ...culture, growth: 'mixed' })).toBe('anchor-not-met')
    expect(assessUtiCulture(older, 'catheter', ua, { cfu: 0, growth: 'none', preAntibiotic: false })).toBe('uncertain')
    expect(assessUtiCulture(older, 'catheter', ua, { ...culture, cfu: Number.NaN })).toBe('uncertain')
  })

  it('changes first febrile UTI imaging in a 3-year-old with a relevant versus normal RBUS', () => {
    expect(firstFebrileUtiImaging('not-yet-done')).toBe('obtain-rbus')
    expect(firstFebrileUtiImaging('normal')).toBe('no-routine-vcug')
    expect(firstFebrileUtiImaging('clinically-relevant-abnormality')).toBe('offer-vcug')
  })
})
