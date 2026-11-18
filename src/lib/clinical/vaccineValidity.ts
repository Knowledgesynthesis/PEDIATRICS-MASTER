/**
 * Dose-validity checker based on ACIP minimum ages and minimum intervals
 * (CDC catch-up schedule; ACIP General Best Practice Guidelines).
 *
 * Rules implemented:
 *  - 4-day grace period: a dose given ≤4 days before the minimum age/interval is valid.
 *  - An invalid (too-early) dose is not counted; the next dose is spaced from the invalid dose.
 *  - Product/brand-specific schedules (e.g., Hib PRP-OMP, 2-dose adolescent HepB) are not modeled.
 */
import { addDays, addSpan, ageLabel, diffDays, toISODate, type Span, spanLabel } from './dates'

export type VaccineCode = 'HepB' | 'RV1' | 'RV5' | 'DTaP' | 'IPV' | 'MMR' | 'VAR' | 'HepA'

export const vaccineNames: Record<VaccineCode, string> = {
  HepB: 'Hepatitis B',
  RV1: 'Rotavirus — RV1 (Rotarix, 2 doses)',
  RV5: 'Rotavirus — RV5 (RotaTeq, 3 doses)',
  DTaP: 'DTaP',
  IPV: 'Polio (IPV)',
  MMR: 'MMR',
  VAR: 'Varicella',
  HepA: 'Hepatitis A',
}

export const GRACE_DAYS = 4

export type DoseStatus = 'valid' | 'invalid' | 'valid-with-note' | 'not-recommended'

export interface DoseEvaluation {
  index: number
  date: string
  age: string
  status: DoseStatus
  countsAs: number | null
  notes: string[]
}

export interface SeriesEvaluation {
  doses: DoseEvaluation[]
  validCount: number
  complete: boolean
  summary: string
  nextEarliest: string | null
  nextNote: string | null
}

interface Constraint {
  /** Earliest date this constraint allows. */
  date: Date
  label: string
}

const RV_MAX_DOSE1: Span = { weeks: 15 } // must be given ≤ 14 weeks 6 days
const RV_MAX_ANY: Span = { months: 8 } // no dose after 8 months 0 days

function earliest(constraints: Constraint[]): Constraint {
  return constraints.reduce((a, b) => (b.date > a.date ? b : a))
}

/** Constraints for the next VALID dose number `n` (1-based). */
function constraintsFor(
  code: VaccineCode,
  n: number,
  dob: Date,
  prevDoseDate: Date | null,
  validDates: Date[],
  /** Date of the dose being evaluated (omit when computing the next due dose). */
  doseDate?: Date,
): { constraints: Constraint[]; acceptIntervalSpan?: Span; acceptNote?: string; extraNote?: string } {
  const c: Constraint[] = []
  const age = (span: Span, label: string) => c.push({ date: addSpan(dob, span), label: `minimum age ${label}` })
  const afterPrev = (span: Span) => {
    if (prevDoseDate) c.push({ date: addSpan(prevDoseDate, span), label: `${spanLabel(span)} after previous dose` })
  }
  // A dose repeated after an invalid (too-early) first dose is spaced from that dose:
  // 28 days for live vaccines, 4 weeks otherwise.
  if (n === 1 && prevDoseDate) afterPrev(code === 'MMR' || code === 'VAR' ? { days: 28 } : { weeks: 4 })

  switch (code) {
    case 'HepB':
      if (n === 1) age({}, 'birth')
      if (n === 2) afterPrev({ weeks: 4 })
      if (n === 3) {
        afterPrev({ weeks: 8 })
        c.push({ date: addSpan(validDates[0], { weeks: 16 }), label: '16 wk after dose 1' })
        age({ weeks: 24 }, '24 wk')
      }
      break
    case 'RV1':
    case 'RV5':
      if (n === 1) age({ weeks: 6 }, '6 wk')
      else afterPrev({ weeks: 4 })
      break
    case 'DTaP':
      if (n === 1) age({ weeks: 6 }, '6 wk')
      if (n === 2 || n === 3) afterPrev({ weeks: 4 })
      if (n === 4) {
        age({ months: 12 }, '12 mo')
        afterPrev({ months: 6 })
        return { constraints: c, acceptIntervalSpan: { months: 4 }, acceptNote: 'Dose 4 given ≥4 months after dose 3 need not be repeated (ACIP).' }
      }
      if (n === 5) {
        age({ years: 4 }, '4 yr')
        afterPrev({ months: 6 })
      }
      break
    case 'IPV':
      if (n === 1) age({ weeks: 6 }, '6 wk')
      if (n === 2 || n === 3) afterPrev({ weeks: 4 })
      if (n >= 4) {
        // A 4th+ dose before age 4 (e.g., combination vaccines) is valid but not the final dose.
        if (doseDate && doseDate < addDays(addSpan(dob, { years: 4 }), -GRACE_DAYS)) {
          afterPrev({ weeks: 4 })
          return {
            constraints: c,
            extraNote: 'Valid, but given before age 4 years — a final IPV dose at ≥4 years (≥6 months after the previous dose) is still required.',
          }
        }
        age({ years: 4 }, '4 yr')
        afterPrev({ months: 6 })
      }
      break
    case 'MMR':
      if (n === 1) age({ months: 12 }, '12 mo')
      else afterPrev({ days: 28 })
      break
    case 'VAR':
      if (n === 1) age({ months: 12 }, '12 mo')
      else {
        afterPrev({ months: 3 })
        return {
          constraints: c,
          acceptIntervalSpan: { days: 28 },
          acceptNote: 'Routine minimum interval is 3 months (<13 yr); a second dose given ≥4 weeks after the first is accepted as valid.',
        }
      }
      break
    case 'HepA':
      if (n === 1) age({ months: 12 }, '12 mo')
      else afterPrev({ months: 6 })
      break
  }
  return { constraints: c }
}

function requiredDoses(code: VaccineCode): number {
  switch (code) {
    case 'HepB':
      return 3
    case 'RV1':
      return 2
    case 'RV5':
      return 3
    case 'DTaP':
      return 5
    case 'IPV':
      return 4
    case 'MMR':
    case 'VAR':
    case 'HepA':
      return 2
  }
}

function isComplete(code: VaccineCode, dob: Date, validDates: Date[]): boolean {
  const n = validDates.length
  if (code === 'DTaP') {
    if (n >= 5) return true
    // Dose 5 not needed if dose 4 given at ≥4 yr (and ≥6 mo after dose 3).
    if (n === 4) {
      const d4 = validDates[3]
      const d3 = validDates[2]
      return d4 >= addDays(addSpan(dob, { years: 4 }), -GRACE_DAYS) && d4 >= addDays(addSpan(d3, { months: 6 }), -GRACE_DAYS)
    }
    return false
  }
  if (code === 'IPV') {
    if (n < 3) return false
    const last = validDates[n - 1]
    const prev = validDates[n - 2]
    // Final dose must be at ≥4 yr and ≥6 mo after the previous dose.
    return last >= addDays(addSpan(dob, { years: 4 }), -GRACE_DAYS) && last >= addDays(addSpan(prev, { months: 6 }), -GRACE_DAYS)
  }
  return n >= requiredDoses(code)
}

export function evaluateSeries(code: VaccineCode, dob: Date, doseDates: Date[]): SeriesEvaluation {
  const sorted = [...doseDates].sort((a, b) => a.getTime() - b.getTime())
  const doses: DoseEvaluation[] = []
  const validDates: Date[] = []
  let prevDoseDate: Date | null = null
  const isRv = code === 'RV1' || code === 'RV5'

  for (const [i, date] of sorted.entries()) {
    const notes: string[] = []
    const ageText = ageLabel(dob, date)

    if (diffDays(dob, date) < 0) {
      doses.push({ index: i + 1, date: toISODate(date), age: 'before DOB', status: 'invalid', countsAs: null, notes: ['Date is before date of birth.'] })
      continue
    }

    if (isComplete(code, dob, validDates)) {
      doses.push({ index: i + 1, date: toISODate(date), age: ageText, status: 'valid-with-note', countsAs: null, notes: ['Series was already complete; extra dose (not harmful, not needed).'] })
      prevDoseDate = date
      continue
    }

    if (isRv && date >= addSpan(dob, RV_MAX_ANY)) {
      doses.push({ index: i + 1, date: toISODate(date), age: ageText, status: 'not-recommended', countsAs: null, notes: ['Rotavirus vaccine is not given after 8 months 0 days.'] })
      prevDoseDate = date
      continue
    }

    const n = validDates.length + 1
    const { constraints, acceptIntervalSpan, acceptNote, extraNote } = constraintsFor(code, n, dob, prevDoseDate, validDates, date)
    const binding = earliest(constraints)
    const graceDate = addDays(binding.date, -GRACE_DAYS)

    let valid = date >= graceDate
    let status: DoseStatus = 'valid'

    if (!valid && acceptIntervalSpan && prevDoseDate) {
      // Interval-acceptance footnote: valid if every NON-interval constraint is met and the shorter interval is met.
      const nonInterval = constraints.filter((k) => !k.label.includes('after previous dose'))
      const nonIntervalOk = nonInterval.every((k) => date >= addDays(k.date, -GRACE_DAYS))
      const acceptDate = addDays(addSpan(prevDoseDate, acceptIntervalSpan), -GRACE_DAYS)
      if (nonIntervalOk && date >= acceptDate) {
        valid = true
        status = 'valid-with-note'
        if (acceptNote) notes.push(acceptNote)
      }
    }

    if (valid) {
      if (date < binding.date && status === 'valid') {
        status = 'valid-with-note'
        notes.push(`Given ${diffDays(date, binding.date)} day(s) early — valid under the 4-day grace period.`)
      }
      if (isRv && n === 1 && date >= addSpan(dob, RV_MAX_DOSE1)) {
        status = 'valid-with-note'
        notes.push('Dose 1 given at ≥15 weeks (max age 14 wk 6 d). Do not start the series this late; if inadvertently started, complete the series on schedule.')
      }
      if (extraNote) {
        status = 'valid-with-note'
        notes.push(extraNote)
      }
      if (code === 'DTaP' && diffDays(addSpan(dob, { years: 7 }), date) >= 0) {
        notes.push('DTaP is not used at ≥7 years; use Tdap for catch-up.')
      }
      validDates.push(date)
      doses.push({ index: i + 1, date: toISODate(date), age: ageText, status, countsAs: n, notes })
    } else {
      notes.push(`Too early: needed ${binding.label} (on or after ${toISODate(graceDate)} with grace). Not counted — repeat after the minimum interval from this dose.`)
      doses.push({ index: i + 1, date: toISODate(date), age: ageText, status: 'invalid', countsAs: null, notes })
    }
    prevDoseDate = date
  }

  const complete = isComplete(code, dob, validDates)
  let nextEarliest: string | null = null
  let nextNote: string | null = null

  if (!complete) {
    const n = validDates.length + 1
    const { constraints } = constraintsFor(code, n, dob, prevDoseDate, validDates)
    const binding = earliest(constraints)
    const rvDose1Deadline = addDays(addSpan(dob, RV_MAX_DOSE1), -1) // 14 weeks 6 days
    if (isRv && binding.date >= addSpan(dob, RV_MAX_ANY)) {
      nextNote = 'No further rotavirus doses: the next dose would fall after the 8-month maximum age.'
    } else if (isRv && n === 1 && binding.date > rvDose1Deadline) {
      nextNote = 'Do not start rotavirus vaccine: the infant would be ≥15 weeks at dose 1.'
    } else if (isRv && n === 1) {
      nextEarliest = toISODate(binding.date)
      nextNote = `Dose 1 window closes ${toISODate(rvDose1Deadline)} (14 weeks 6 days).`
    } else {
      nextEarliest = toISODate(binding.date)
      nextNote = `Dose ${n}: earliest routine date (${binding.label}).`
      if (code === 'IPV' && validDates.length >= 3) nextNote = 'Final IPV dose: at ≥4 years and ≥6 months after the previous dose.'
      if (code === 'DTaP' && n === 5) nextNote = 'Dose 5 at 4–6 years (≥6 months after dose 4).'
    }
  }

  const required = requiredDoses(code)
  const summary = complete
    ? `Series complete (${validDates.length} valid dose${validDates.length === 1 ? '' : 's'}).`
    : `${validDates.length} valid of ${required} routine doses.`

  return { doses, validCount: validDates.length, complete, summary, nextEarliest, nextNote }
}
