import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react'
import { clinicalCases } from '@/content/cases'
import { moduleById, modules } from '@/content/modules'
import { PageHeader } from '@/components/learn/Blocks'
import { Cite } from '@/components/learn/Cite'
import { Segmented } from '@/components/learn/Controls'
import { QuestionCard } from '@/components/learn/QuestionCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { ClinicalCase, ModuleId, Question } from '@/types'

function stepQuestion(c: ClinicalCase, i: number): Question {
  const s = c.steps[i]
  return { id: `${c.id}#${i}`, module: c.module, stem: s.question, options: s.options, answer: s.answer, explanation: s.explanation, refs: [] }
}

function CaseRunner({ c, onExit }: { c: ClinicalCase; onExit: () => void }) {
  const [step, setStep] = useState(0)
  const [results, setResults] = useState<(boolean | undefined)[]>([])
  const answered = results[step] !== undefined
  const last = step === c.steps.length - 1
  const done = last && answered
  const correct = results.filter(Boolean).length
  const mod = moduleById[c.module]

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={onExit} className="gap-1">
        <ArrowLeft className="h-4 w-4" aria-hidden /> All cases
      </Button>
      <div className="rounded-xl border bg-card p-5">
        <div className="mb-2 flex flex-wrap gap-2">
          <Badge variant="secondary">{mod.title}</Badge>
          <Badge variant={c.difficulty === 'Core' ? 'success' : 'warning'}>{c.difficulty}</Badge>
          <Badge variant="outline">{c.setting}</Badge>
        </div>
        <h2 className="text-2xl font-semibold">{c.title}</h2>
        <p className="mt-3 leading-relaxed">{c.presentation}</p>
      </div>

      {c.steps.slice(0, step).map((s, i) =>
        s.info ? (
          <p key={i} className="rounded-lg border-l-4 border-muted-foreground/30 bg-muted/30 p-3 text-sm text-muted-foreground">
            Step {i + 1}: {s.info}
          </p>
        ) : null,
      )}

      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">
          Step {step + 1} of {c.steps.length}
        </p>
        {c.steps[step].info && <p className="rounded-lg border-l-4 border-primary bg-primary/5 p-3 font-medium">{c.steps[step].info}</p>}
        <QuestionCard key={`${c.id}-${step}`} question={stepQuestion(c, step)} onAnswered={(ok) => setResults((r) => Object.assign([...r], { [step]: ok }))} />
        {answered && !last && (
          <Button onClick={() => setStep((s) => s + 1)} className="w-full gap-1 sm:w-auto">
            Next step <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        )}
      </div>

      {done && (
        <div className="space-y-4 rounded-xl border-2 border-primary bg-primary/5 p-5">
          <p className="flex items-center gap-2 text-lg font-semibold">
            <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden /> Case complete — {correct}/{c.steps.length} decisions correct
          </p>
          <div>
            <p className="mb-1 text-sm font-semibold">Take-aways</p>
            <ul className="list-clinical text-sm">
              {c.takeaways.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <Cite ids={c.refs} />
          <div className="flex flex-wrap gap-2">
            <Button onClick={onExit}>Next case</Button>
            <Link to={mod.path} className="inline-flex h-10 items-center rounded-md border px-4 text-sm font-medium hover:bg-accent">
              Review module {mod.number}
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Cases() {
  const [filter, setFilter] = useState<ModuleId | 'all'>('all')
  const [active, setActive] = useState<string | null>(null)
  const c = clinicalCases.find((x) => x.id === active)

  if (c) return <CaseRunner c={c} onExit={() => setActive(null)} />

  const usedModules = modules.filter((m) => clinicalCases.some((x) => x.module === m.id))
  const list = clinicalCases.filter((x) => filter === 'all' || x.module === filter)

  return (
    <div className="space-y-8">
      <PageHeader title="Clinical cases" summary="Synthetic patients that unfold step by step. Commit to each decision before new information appears — that is how retrieval turns into clinical judgment." />
      <Segmented
        label="Filter by module"
        value={filter}
        onChange={setFilter}
        options={[{ value: 'all' as const, label: `All (${clinicalCases.length})` }, ...usedModules.map((m) => ({ value: m.id, label: `${m.number}. ${m.title}` }))]}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {list.map((x) => (
          <button key={x.id} type="button" onClick={() => setActive(x.id)} className="group rounded-xl border bg-card p-5 text-left transition-colors hover:border-primary">
            <div className="mb-2 flex flex-wrap gap-2">
              <Badge variant="secondary">{moduleById[x.module].title}</Badge>
              <Badge variant={x.difficulty === 'Core' ? 'success' : 'warning'}>{x.difficulty}</Badge>
            </div>
            <span className="flex items-start justify-between gap-2">
              <span className="text-lg font-semibold">{x.title}</span>
              <ChevronRight className="mt-1 h-5 w-5 flex-shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden />
            </span>
            <span className="mt-2 line-clamp-3 block text-sm text-muted-foreground">{x.presentation}</span>
            <span className="mt-3 block text-xs text-muted-foreground">
              {x.steps.length} decisions · {x.setting}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
