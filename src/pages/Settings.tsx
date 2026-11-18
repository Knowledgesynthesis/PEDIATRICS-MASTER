import { Link } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import { CONTENT_REVIEWED } from '@/content/meta'
import { questions } from '@/content/questions'
import { clinicalCases } from '@/content/cases'
import { flashcards } from '@/content/flashcards'
import { references } from '@/content/references'
import { modules } from '@/content/modules'
import { PageHeader, Panel } from '@/components/learn/Blocks'
import { Button } from '@/components/ui/button'
import { useSession, useStore } from '@/store/useStore'

export default function Settings() {
  const { darkMode, toggleDarkMode } = useStore()
  const reset = useSession((s) => s.reset)
  const answered = useSession((s) => Object.keys(s.answers).length)
  const tools = modules.reduce((n, m) => n + m.tools.length, 0)

  return (
    <div className="space-y-6">
      <PageHeader title="Settings & about" />
      <Panel title="Appearance">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="flex items-center gap-2">
            {darkMode ? <Moon className="h-5 w-5" aria-hidden /> : <Sun className="h-5 w-5" aria-hidden />}
            {darkMode ? 'Dark theme' : 'Light theme'}
          </span>
          <Button variant="outline" onClick={toggleDarkMode}>
            Switch to {darkMode ? 'light' : 'dark'}
          </Button>
        </div>
      </Panel>
      <Panel title="This session">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span>{answered} questions answered (kept in memory only; cleared on reload).</span>
          <Button variant="outline" onClick={reset} disabled={answered === 0}>
            Clear session answers
          </Button>
        </div>
      </Panel>
      <Panel title="About">
        <div className="space-y-3">
          <p>
            Pediatrics Master teaches core pediatrics as nine modules — each with objectives, concise evidence-graded content, interactive tools, and retrieval practice — followed by cases, a question bank and rapid-review cards.
          </p>
          <ul className="list-clinical">
            <li>
              {modules.length} modules · {tools} interactive tools · {questions.length} questions · {clinicalCases.length} cases · {flashcards.length} cards
            </li>
            <li>
              {references.length} cited sources (<Link to="/references" className="text-primary hover:underline">see all</Link>); content checked against current guidance in {CONTENT_REVIEWED}.
            </li>
            <li>Works offline once loaded (installable PWA). Only your theme choice is stored on this device.</li>
          </ul>
          <p className="text-muted-foreground">
            For education. All cases are synthetic. Guidelines change and local protocols vary — confirm doses and recommendations before clinical use.
          </p>
        </div>
      </Panel>
      <Panel title="How to use it well">
        <ul className="list-clinical">
          <li>Work through a module, answering each quick check before reading on.</li>
          <li>Finish with the module quiz; retry missed questions the same day.</li>
          <li>Apply it in the cases, then use mixed exams and rapid-review cards on later days — spacing and interleaving are what make knowledge last.</li>
        </ul>
      </Panel>
    </div>
  )
}
