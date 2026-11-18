export type ModuleId =
  | 'growth'
  | 'development'
  | 'vaccines'
  | 'newborn'
  | 'respiratory'
  | 'fever'
  | 'fluids'
  | 'seizures'
  | 'emergencies'

export interface Reference {
  id: string
  /** Short label shown in citation chips, e.g. "AAP 2014". */
  short: string
  /** Full citation in AMA-like style. */
  citation: string
  /** Direct link when stable (DOI / official page). Otherwise a PubMed search link is generated. */
  url?: string
  kind: 'guideline' | 'trial' | 'review' | 'policy' | 'resource'
}

export interface Question {
  id: string
  module: ModuleId
  stem: string
  options: string[]
  /** Index into `options` of the single best answer. */
  answer: number
  /** Why the answer is right and why the tempting distractors are wrong. */
  explanation: string
  refs: string[]
}

export interface CaseStep {
  /** New information revealed at this step (vignette continues). */
  info: string
  question: string
  options: string[]
  answer: number
  explanation: string
}

export interface ClinicalCase {
  id: string
  title: string
  module: ModuleId
  difficulty: 'Core' | 'Advanced'
  setting: string
  presentation: string
  steps: CaseStep[]
  takeaways: string[]
  refs: string[]
}

export interface Flashcard {
  id: string
  module: ModuleId
  front: string
  back: string
}
