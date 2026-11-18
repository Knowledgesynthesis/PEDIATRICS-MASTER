import { describe, expect, it } from 'vitest'
import { parseISODate } from './dates'
import { evaluateSeries } from './vaccineValidity'

const d = (s: string) => {
  const v = parseISODate(s)
  if (!v) throw new Error(s)
  return v
}
const dob = d('2025-01-01')

describe('vaccine dose validity (ACIP minimum ages/intervals)', () => {
  it('routine DTaP 2-4-6-15 mo-4 y is complete', () => {
    const r = evaluateSeries('DTaP', dob, ['2025-03-01', '2025-05-01', '2025-07-01', '2026-04-01', '2029-01-15'].map(d))
    expect(r.validCount).toBe(5)
    expect(r.complete).toBe(true)
  })

  it('DTaP dose 1 before 6 weeks is invalid; grace period allows 4 days early', () => {
    const early = evaluateSeries('DTaP', dob, [d('2025-02-05')]) // 5 wk
    expect(early.doses[0].status).toBe('invalid')
    const grace = evaluateSeries('DTaP', dob, [d('2025-02-08')]) // 6 wk − 4 d
    expect(grace.doses[0].countsAs).toBe(1)
    expect(grace.doses[0].status).toBe('valid-with-note')
  })

  it('DTaP dose 4 accepted at ≥4 months after dose 3 (footnote), but not at 3 months', () => {
    const ok = evaluateSeries('DTaP', dob, ['2025-03-01', '2025-04-01', '2025-09-01', '2026-01-02'].map(d))
    expect(ok.doses[3].countsAs).toBe(4)
    expect(ok.doses[3].status).toBe('valid-with-note')
    const bad = evaluateSeries('DTaP', dob, ['2025-03-01', '2025-04-01', '2025-10-01', '2026-01-02'].map(d))
    expect(bad.doses[3].status).toBe('invalid')
  })

  it('DTaP dose 4 before 12 months is invalid even with a long interval', () => {
    const r = evaluateSeries('DTaP', dob, ['2025-02-15', '2025-03-20', '2025-04-25', '2025-11-01'].map(d))
    expect(r.doses[3].status).toBe('invalid')
  })

  it('DTaP dose 5 not needed if dose 4 given at ≥4 years', () => {
    const r = evaluateSeries('DTaP', dob, ['2025-03-01', '2025-05-01', '2025-07-01', '2029-02-01'].map(d))
    expect(r.validCount).toBe(4)
    expect(r.complete).toBe(true)
  })

  it('HepB dose 3 requires age ≥24 weeks and 16 weeks after dose 1', () => {
    const tooYoung = evaluateSeries('HepB', dob, ['2025-01-01', '2025-02-01', '2025-04-01'].map(d))
    expect(tooYoung.doses[2].status).toBe('invalid')
    const ok = evaluateSeries('HepB', dob, ['2025-01-01', '2025-02-01', '2025-07-01'].map(d))
    expect(ok.complete).toBe(true)
  })

  it('MMR before 12 months does not count; repeat spaced ≥28 days from it', () => {
    const r = evaluateSeries('MMR', dob, [d('2025-10-01')])
    expect(r.doses[0].status).toBe('invalid')
    expect(r.nextEarliest).toBe('2026-01-01')
    const r2 = evaluateSeries('MMR', dob, [d('2025-12-20')])
    expect(r2.nextEarliest).toBe('2026-01-17') // 28 d after the invalid dose (later than 12-mo birthday)
  })

  it('MMR dose 2 at 28 days is valid', () => {
    const r = evaluateSeries('MMR', dob, ['2026-01-05', '2026-02-02'].map(d))
    expect(r.complete).toBe(true)
  })

  it('Varicella dose 2 at 5 weeks accepted with note; at 3 weeks invalid', () => {
    const ok = evaluateSeries('VAR', dob, ['2026-01-05', '2026-02-09'].map(d))
    expect(ok.complete).toBe(true)
    expect(ok.doses[1].status).toBe('valid-with-note')
    const bad = evaluateSeries('VAR', dob, ['2026-01-05', '2026-01-26'].map(d))
    expect(bad.doses[1].status).toBe('invalid')
  })

  it('IPV: dose 4 not needed when dose 3 is at ≥4 y and ≥6 mo after dose 2', () => {
    const r = evaluateSeries('IPV', dob, ['2025-03-01', '2025-05-01', '2029-03-01'].map(d))
    expect(r.complete).toBe(true)
  })

  it('IPV: 4 doses all before age 4 still need a dose at ≥4 y', () => {
    const r = evaluateSeries('IPV', dob, ['2025-03-01', '2025-05-01', '2025-07-01', '2026-01-15'].map(d))
    expect(r.validCount).toBe(4)
    expect(r.complete).toBe(false)
    expect(r.nextEarliest).toBe('2029-01-01')
  })

  it('Rotavirus: dose after 8 months is not recommended; late start flagged', () => {
    const r = evaluateSeries('RV5', dob, ['2025-03-01', '2025-05-01', '2025-09-15'].map(d))
    expect(r.doses[2].status).toBe('not-recommended')
    const late = evaluateSeries('RV1', dob, [d('2025-04-20')]) // 15 wk 4 d
    expect(late.doses[0].notes.join(' ')).toMatch(/≥15 weeks/)
  })

  it('Rotavirus: no dose 1 recommended once infant is ≥15 weeks', () => {
    const r = evaluateSeries('RV1', d('2025-01-01'), [])
    expect(r.nextEarliest).toBe('2025-02-12')
    expect(r.nextNote).toMatch(/2025-04-15/)
  })

  it('HepA 6-month interval', () => {
    const bad = evaluateSeries('HepA', dob, ['2026-01-05', '2026-05-05'].map(d))
    expect(bad.doses[1].status).toBe('invalid')
    const ok = evaluateSeries('HepA', dob, ['2026-01-05', '2026-07-05'].map(d))
    expect(ok.complete).toBe(true)
  })

  it('handles unsorted input and dates before DOB', () => {
    const r = evaluateSeries('HepA', dob, ['2026-07-05', '2024-12-01', '2026-01-05'].map(d))
    expect(r.doses[0].status).toBe('invalid')
    expect(r.complete).toBe(true)
  })

  it('extra doses after completion are noted, not counted', () => {
    const r = evaluateSeries('HepA', dob, ['2026-01-05', '2026-07-05', '2027-01-05'].map(d))
    expect(r.validCount).toBe(2)
    expect(r.doses[2].countsAs).toBeNull()
  })
})
