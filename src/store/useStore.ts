import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Milestone {
  id: string
  age: number // in months
  domain: 'gross-motor' | 'fine-motor' | 'language' | 'social'
  description: string
  redFlag?: boolean
}

export interface Vaccine {
  id: string
  name: string
  ages: number[] // in months
  contraindications?: string[]
  notes?: string
}

export interface Infection {
  id: string
  name: string
  ageGroup: string
  diagnosis: string[]
  management: string[]
  redFlags: string[]
  notes?: string
}

export interface CongenitalCondition {
  id: string
  name: string
  category: 'cardiac' | 'genetic' | 'metabolic' | 'infection'
  features: string[]
  diagnosis: string[]
  management: string[]
}

export interface AssessmentQuestion {
  id: string
  type: 'mcq' | 'matching' | 'case'
  question: string
  options?: string[]
  correctAnswer: string | number
  rationale: string
  category: string
}

interface AppState {
  darkMode: boolean
  toggleDarkMode: () => void
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      darkMode: true,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: 'pediatrics-master-storage',
    }
  )
)
