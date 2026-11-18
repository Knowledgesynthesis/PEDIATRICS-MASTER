import { Link } from 'react-router-dom'
import { ArrowRight, Calculator, ClipboardList, Layers, ListChecks, Sparkles } from 'lucide-react'
import { modules } from '@/content/modules'
import { questions } from '@/content/questions'
import { clinicalCases } from '@/content/cases'
import { flashcards } from '@/content/flashcards'
import { references } from '@/content/references'
import { CONTENT_REVIEWED } from '@/content/meta'

const updates: { text: string; to: string }[] = [
  { text: 'U.S. measles elimination lost (Nov 2026): recognition, isolation, vitamin A and post-exposure prophylaxis.', to: '/vaccines#measles' },
  { text: 'AAP 2026 immunization schedule vs. contested federal changes — what to follow and why.', to: '/vaccines' },
  { text: 'RSV 2026–27: nirsevimab or clesrovimab for every unprotected infant; palivizumab retired.', to: '/vaccines#rsv' },
  { text: 'IDSA 2025: use Centor/McIsaac scores to decide who gets a strep test.', to: '/infections#pharyngitis' },
  { text: 'Surviving Sepsis Campaign 2026 + Phoenix criteria for pediatric sepsis.', to: '/fever#sepsis' },
  { text: 'Five days of amoxicillin for uncomplicated pneumonia (SCOUT-CAP, CAP-IT).', to: '/infections#pneumonia' },
]

const framework = [
  ['Sick or not sick?', 'Pediatric Assessment Triangle from the doorway, before you touch the child.'],
  ['How old — really?', 'Age (corrected for prematurity) sets the differential, normal vitals and decision thresholds (e.g., febrile infant bands).'],
  ['Vitals against age norms', 'Tachycardia and slow capillary refill come long before hypotension.'],
  ['Immunization status', 'Missing Hib/PCV/MMR changes the risk of meningitis, epiglottitis and measles.'],
  ['Hydration and feeding', 'Intake, output and weight trajectory are vital signs in infants.'],
  ['Test only what changes management', 'Bronchiolitis, croup and simple febrile seizures need no routine tests.'],
  ['Weight-based treatment, capped', 'mg/kg → mg → mL, never above the adult dose.'],
  ['Safety-net and look again', 'Clear return precautions; if the story doesn’t fit the injury, consider abuse.'],
]

export default function Home() {
  const tools = modules.reduce((n, m) => n + m.tools.length, 0)
  return (
    <div className="space-y-12">
      <section className="space-y-5">
        <p className="text-sm font-medium text-primary">Content checked against current guidance · {CONTENT_REVIEWED}</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Learn pediatrics the way you’ll <span className="text-primary">practice it</span>.
        </h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          Nine evidence-based modules, each with objectives, concise guideline-backed content, interactive bedside tools and built-in retrieval practice — then cases, a question bank and rapid-review cards to lock it in.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/growth" className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-6 font-medium text-primary-foreground hover:bg-primary/90">
            Start Module 1 <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link to="/assessment" className="inline-flex h-11 items-center rounded-md border px-6 font-medium hover:bg-accent">
            Test yourself first
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          {tools} tools · {questions.length} questions · {clinicalCases.length} cases · {flashcards.length} cards · {references.length} cited sources
        </p>
      </section>

      <section className="rounded-xl border-2 border-primary/40 bg-primary/[0.04] p-5" aria-labelledby="updates-h">
        <h2 id="updates-h" className="mb-3 flex items-center gap-2 text-lg font-semibold">
          <Sparkles className="h-5 w-5 text-primary" aria-hidden /> What changed recently
        </h2>
        <ul className="grid gap-2 md:grid-cols-2">
          {updates.map((u) => (
            <li key={u.to + u.text}>
              <Link to={u.to} className="flex items-start gap-2 rounded-md p-2 text-sm hover:bg-primary/10">
                <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden />
                <span>{u.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="path-h" className="space-y-4">
        <h2 id="path-h" className="text-2xl font-semibold tracking-tight">
          Learning path
        </h2>
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => {
            const Icon = m.icon
            const count = questions.filter((q) => q.module === m.id).length
            return (
              <li key={m.id}>
                <Link to={m.path} className="flex h-full flex-col rounded-xl border bg-card p-5 transition-colors hover:border-primary">
                  <span className="mb-3 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Module {m.number}</span>
                  </span>
                  <span className="text-lg font-semibold leading-snug">{m.title}</span>
                  <span className="mt-2 flex-1 text-sm text-muted-foreground">{m.summary}</span>
                  <span className="mt-4 text-xs text-muted-foreground">
                    {m.tools.length} tools · {count} questions
                  </span>
                </Link>
              </li>
            )
          })}
        </ol>
      </section>

      <section aria-labelledby="practice-h" className="space-y-4">
        <h2 id="practice-h" className="text-2xl font-semibold tracking-tight">
          Practice and apply
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { to: '/cases', icon: ClipboardList, title: 'Clinical cases', text: `${clinicalCases.length} stepwise synthetic patients` },
            { to: '/assessment', icon: ListChecks, title: 'Question bank', text: 'By module, mixed exam, or review missed' },
            { to: '/flashcards', icon: Layers, title: 'Rapid review', text: 'Numbers and rules for spaced recall' },
            { to: '/tools', icon: Calculator, title: 'All tools', text: 'Every calculator in one place' },
          ].map((x) => (
            <Link key={x.to} to={x.to} className="rounded-xl border bg-card p-5 hover:border-primary">
              <x.icon className="mb-2 h-6 w-6 text-primary" aria-hidden />
              <span className="block font-semibold">{x.title}</span>
              <span className="block text-sm text-muted-foreground">{x.text}</span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="framework-h" className="space-y-4">
        <h2 id="framework-h" className="text-2xl font-semibold tracking-tight">
          An 8-step approach to any sick child
        </h2>
        <ol className="grid gap-3 md:grid-cols-2">
          {framework.map(([title, text], i) => (
            <li key={title} className="flex gap-3 rounded-lg border bg-card p-4">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{i + 1}</span>
              <span>
                <span className="block font-semibold">{title}</span>
                <span className="block text-sm text-muted-foreground">{text}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
