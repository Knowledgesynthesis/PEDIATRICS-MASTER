/**
 * Critical congenital heart disease pulse-oximetry screening — updated AAP-endorsed algorithm
 * (Martin et al., Pediatrics 2020). Screen at ≥24 h of age; right hand (pre-ductal) and either foot.
 */

export type CchdResult = 'pass' | 'repeat' | 'fail'

export interface CchdOutcome {
  result: CchdResult
  difference: number
  explanation: string
}

export function cchdScreen(rightHand: number, foot: number, attempt: 1 | 2): CchdOutcome {
  const difference = Math.abs(rightHand - foot)
  if (rightHand < 90 || foot < 90) {
    return { result: 'fail', difference, explanation: 'SpO₂ <90% in the right hand or foot is an immediate fail.' }
  }
  if ((rightHand >= 95 || foot >= 95) && difference <= 3) {
    return { result: 'pass', difference, explanation: 'SpO₂ ≥95% in the right hand or foot with a difference ≤3% → pass.' }
  }
  const why = difference > 3 ? `Difference ${difference}% (>3%)` : 'SpO₂ 90–94% in both right hand and foot'
  if (attempt === 1) {
    return { result: 'repeat', difference, explanation: `${why} → repeat once in 1 hour.` }
  }
  return { result: 'fail', difference, explanation: `${why} on the repeat screen → fail.` }
}
