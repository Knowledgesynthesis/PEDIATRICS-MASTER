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

export interface UserProgress {
  completedModules: string[]
  assessmentScores: Record<string, number>
  bookmarks: string[]
}

interface AppState {
  darkMode: boolean
  toggleDarkMode: () => void
  userProgress: UserProgress
  updateProgress: (progress: Partial<UserProgress>) => void
  bookmarkItem: (itemId: string) => void
  removeBookmark: (itemId: string) => void
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      darkMode: true,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      userProgress: {
        completedModules: [],
        assessmentScores: {},
        bookmarks: [],
      },
      updateProgress: (progress) =>
        set((state) => ({
          userProgress: { ...state.userProgress, ...progress },
        })),
      bookmarkItem: (itemId) =>
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            bookmarks: [...state.userProgress.bookmarks, itemId],
          },
        })),
      removeBookmark: (itemId) =>
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            bookmarks: state.userProgress.bookmarks.filter((id) => id !== itemId),
          },
        })),
    }),
    {
      name: 'pediatrics-master-storage',
    }
  )
)
