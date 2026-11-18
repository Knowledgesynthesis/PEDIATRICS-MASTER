import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/** Persisted UI preference only (theme). Learning progress is intentionally not stored. */
interface PreferencesState {
  darkMode: boolean
  toggleDarkMode: () => void
}

export const useStore = create<PreferencesState>()(
  persist(
    (set) => ({
      darkMode: true,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    { name: 'pediatrics-master-storage' },
  ),
)

/** In-memory answers for the current session (cleared on reload). Drives "review missed". */
interface SessionState {
  answers: Record<string, boolean>
  record: (questionId: string, correct: boolean) => void
  reset: () => void
}

export const useSession = create<SessionState>()((set) => ({
  answers: {},
  record: (questionId, correct) => set((s) => ({ answers: { ...s.answers, [questionId]: correct } })),
  reset: () => set({ answers: {} }),
}))
