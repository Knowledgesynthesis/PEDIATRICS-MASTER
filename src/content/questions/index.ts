import type { Question } from '@/types'
import { developmentQuestions, growthQuestions, vaccineQuestions } from './growth-development-vaccines'
import { feverQuestions, newbornQuestions, respiratoryQuestions } from './newborn-respiratory-fever'
import { emergencyQuestions, fluidsQuestions, seizureQuestions } from './fluids-seizures-emergencies'

export const questions: Question[] = [
  ...growthQuestions,
  ...developmentQuestions,
  ...vaccineQuestions,
  ...newbornQuestions,
  ...respiratoryQuestions,
  ...feverQuestions,
  ...fluidsQuestions,
  ...seizureQuestions,
  ...emergencyQuestions,
]

const byId = new Map(questions.map((q) => [q.id, q]))

export function getQuestion(id: string): Question {
  const q = byId.get(id)
  if (!q) throw new Error(`Unknown question id: ${id}`)
  return q
}
