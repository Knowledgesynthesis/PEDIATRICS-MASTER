/**
 * AAP 2025 CCHD pulse-oximetry screening algorithm (Oster et al., Fig. 1).
 * Measurements come from the right hand (preductal) and either foot (postductal).
 */
export type CchdResult = 'pass' | 'repeat' | 'fail'

export type CchdOutcome =
  | { result: CchdResult; difference: number; explanation: string }
  | { result: 'invalid'; difference: null; explanation: string }

function validSaturation(value: number | null): value is number {
  return value !== null && Number.isFinite(value) && value >= 0 && value <= 100
}

export function cchdScreen(rightHand: number | null, foot: number | null, attempt: 1 | 2): CchdOutcome {
  if (!validSaturation(rightHand) || !validSaturation(foot)) {
    return { result: 'invalid', difference: null, explanation: 'Enter both saturations from 0 to 100%.' }
  }

  const difference = Math.abs(rightHand - foot)
  if (rightHand < 90 || foot < 90) {
    return { result: 'fail', difference, explanation: 'SpO₂ below 90% at either site is an immediate fail. Do not repeat the screen.' }
  }
  if (rightHand >= 95 && foot >= 95 && difference <= 3) {
    return { result: 'pass', difference, explanation: 'Both sites are at least 95%, and the absolute difference is no more than 3 percentage points.' }
  }

  const reasons: string[] = []
  if (rightHand < 95 || foot < 95) reasons.push('at least one site is below 95%')
  if (difference > 3) reasons.push('the absolute difference exceeds 3 percentage points')
  const why = reasons.join(' and ')
  if (attempt === 1) {
    return { result: 'repeat', difference, explanation: `Repeat both measurements once in 1 hour because ${why}.` }
  }
  return { result: 'fail', difference, explanation: `The repeat does not meet the pass criteria because ${why}. Do not perform a third screen.` }
}
