/** Date helpers in UTC so day counts never shift with DST/time zones. */

const MS_PER_DAY = 86_400_000

export function parseISODate(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim())
  if (!m) return null
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])]
  const date = new Date(Date.UTC(y, mo - 1, d))
  if (date.getUTCFullYear() !== y || date.getUTCMonth() !== mo - 1 || date.getUTCDate() !== d) return null
  return date
}

export function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

export function todayUTC(): Date {
  const now = new Date()
  return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()))
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * MS_PER_DAY)
}

/** Calendar-month addition; day-of-month is clamped (Jan 31 + 1 mo → Feb 28/29). */
export function addMonths(date: Date, months: number): Date {
  const y = date.getUTCFullYear()
  const m = date.getUTCMonth() + months
  const target = new Date(Date.UTC(y, m, 1))
  const lastDay = new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0)).getUTCDate()
  target.setUTCDate(Math.min(date.getUTCDate(), lastDay))
  return target
}

export function addYears(date: Date, years: number): Date {
  return addMonths(date, years * 12)
}

/** Whole days from a to b (b − a). */
export function diffDays(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / MS_PER_DAY)
}

/** Completed calendar months from a to b. */
export function diffMonths(a: Date, b: Date): number {
  let months = (b.getUTCFullYear() - a.getUTCFullYear()) * 12 + (b.getUTCMonth() - a.getUTCMonth())
  if (b.getUTCDate() < a.getUTCDate()) months -= 1
  return months
}

export interface Span {
  days?: number
  weeks?: number
  months?: number
  years?: number
}

export function addSpan(date: Date, span: Span): Date {
  let d = date
  if (span.years) d = addYears(d, span.years)
  if (span.months) d = addMonths(d, span.months)
  if (span.weeks) d = addDays(d, span.weeks * 7)
  if (span.days) d = addDays(d, span.days)
  return d
}

export function spanLabel(span: Span): string {
  const parts: string[] = []
  if (span.years) parts.push(`${span.years} yr`)
  if (span.months) parts.push(`${span.months} mo`)
  if (span.weeks) parts.push(`${span.weeks} wk`)
  if (span.days) parts.push(`${span.days} d`)
  return parts.join(' ') || '0 d'
}

/** Human age label, e.g. "6 wk 2 d", "7 mo", "4 yr 3 mo". */
export function ageLabel(dob: Date, at: Date): string {
  const days = diffDays(dob, at)
  if (days < 0) return 'before birth'
  if (days < 7 * 13) {
    const w = Math.floor(days / 7)
    const d = days % 7
    return d ? `${w} wk ${d} d` : `${w} wk`
  }
  const months = diffMonths(dob, at)
  if (months < 24) return `${months} mo`
  const y = Math.floor(months / 12)
  const m = months % 12
  return m ? `${y} yr ${m} mo` : `${y} yr`
}
