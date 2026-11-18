import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, RotateCcw, Shuffle, Target } from 'lucide-react'
import { moduleById, modules } from '@/content/modules'
import { questions } from '@/content/questions'
import { PageHeader } from '@/components/learn/Blocks'
import { Cite } from '@/components/learn/Cite'
import { QuestionCard } from '@/components/learn/QuestionCard'
import { Button } from '@/components/ui/button'
import { useSession } from '@/store/useStore'
import { cn } from '@/lib/utils'
import type { ModuleId, Question } from '@/types'

type Mode = { kind: 'module'; module: ModuleId } | { kind: 'mixed' } | { kind: 'all' } | { kind: 'missed'; ids: string[] }

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildSet(mode: Mode): Question[] {
  switch (mode.kind) {
    case 'module':
      return questions.filter((q) => q.module === mode.module)
    case 'mixed':
      return shuffle(questions).slice(0, 20)
    case 'all':
      return shuffle(questions)
    case 'missed':
      return questions.filter((q) => mode.ids.includes(q.id))
  }
}

function modeLabel(mode: Mode): string {
  if (mode.kind === 'module') return moduleById[mode.module].title
  if (mode.kind === 'mixed') return 'Mixed exam (20 questions)'
  if (mode.kind === 'all') return `Full bank (${questions.length} questions)`
  return 'Review: questions missed this session'
}

function Runner({ mode, onExit, onRestart }: { mode: Mode; onExit: () => void; onRestart: (m: Mode) => void }) {
  const set = useMemo(() => buildSet(mode), [mode])
  const [idx, setIdx] = useState(0)
  const [results, setResults] = useState<Record<string, boolean>>({})
  const [finished, setFinished] = useState(false)
  const q = set[idx]
  const answered = q ? results[q.id] !== undefined : false
  const correct = Object.values(results).filter(Boolean).length
  const done = Object.keys(results).length

  if (set.length === 0) {
    return (
      <div className="space-y-4">
        <p>No questions to show.</p>
        <Button onClick={onExit}>Back</Button>
      </div>
    )
  }

  if (finished) {
    const pct = Math.round((correct / set.length) * 100)
    const missed = set.filter((x) => results[x.id] === false)
    const byModule = modules
      .map((m) => {
        const qs = set.filter((x) => x.module === m.id)
        const ok = qs.filter((x) => results[x.id]).length
        return { m, total: qs.length, ok }
      })
      .filter((x) => x.total > 0)
    return (
      <div className="space-y-6">
        <div className="rounded-xl border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground">{modeLabel(mode)}</p>
          <p className={cn('text-6xl font-bold', pct >= 80 ? 'text-emerald-600 dark:text-emerald-400' : pct >= 60 ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400')}>{pct}%</p>
          <p className="text-muted-foreground">
            {correct} of {set.length} correct
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm">{pct >= 80 ? 'Strong. Use mixed exams to keep it fresh.' : 'Review the explanations below, revisit the module sections, then retry the missed questions.'}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {missed.length > 0 && (
              <Button onClick={() => onRestart({ kind: 'missed', ids: missed.map((x) => x.id) })} className="gap-1">
                <Target className="h-4 w-4" aria-hidden /> Retry {missed.length} missed
              </Button>
            )}
            <Button variant="outline" onClick={() => onRestart(mode)} className="gap-1">
              <RotateCcw className="h-4 w-4" aria-hidden /> Retake
            </Button>
            <Button variant="outline" onClick={onExit}>
              Choose another set
            </Button>
          </div>
        </div>
        {byModule.length > 1 && (
          <div className="rounded-xl border bg-card p-4">
            <p className="mb-3 font-semibold">By module</p>
            <div className="space-y-2">
              {byModule.map(({ m, total, ok }) => (
                <div key={m.id} className="flex items-center gap-3 text-sm">
                  <Link to={m.path} className="w-48 truncate hover:text-primary sm:w-64">
                    {m.number}. {m.title}
                  </Link>
                  <div className="h-2 flex-1 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: `${(ok / total) * 100}%` }} />
                  </div>
                  <span className="w-12 text-right tabular-nums">
                    {ok}/{total}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        {missed.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Review what you missed</h2>
            {missed.map((x) => (
              <div key={x.id} className="rounded-lg border bg-card p-4 text-sm">
                <p className="font-medium">{x.stem}</p>
                <p className="mt-2">
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">Answer:</span> {x.options[x.answer]}
                </p>
                <p className="mt-1 text-muted-foreground">{x.explanation}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Cite ids={x.refs} />
                  <Link to={moduleById[x.module].path} className="text-xs font-medium text-primary hover:underline">
                    Open module →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-semibold">{modeLabel(mode)}</p>
        <Button variant="ghost" size="sm" onClick={onExit}>
          Exit
        </Button>
      </div>
      <div>
        <div className="mb-1 flex justify-between text-xs text-muted-foreground">
          <span>
            Question {idx + 1} of {set.length}
          </span>
          <span className="tabular-nums">
            {correct}/{done} correct
          </span>
        </div>
        <div className="h-2 rounded-full bg-muted" role="progressbar" aria-valuemin={0} aria-valuemax={set.length} aria-valuenow={idx + 1} aria-label="Progress">
          <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${((idx + 1) / set.length) * 100}%` }} />
        </div>
      </div>
      <QuestionCard key={q.id} question={q} heading={moduleById[q.module].title} onAnswered={(ok) => setResults((r) => ({ ...r, [q.id]: ok }))} />
      {answered && (
        <Button onClick={() => (idx < set.length - 1 ? setIdx(idx + 1) : setFinished(true))} className="w-full gap-1 sm:w-auto">
          {idx < set.length - 1 ? 'Next question' : 'See results'} <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      )}
    </div>
  )
}

export default function Assessment() {
  const [params, setParams] = useSearchParams()
  const [mode, setMode] = useState<Mode | null>(null)
  const [runKey, setRunKey] = useState(0)
  const answers = useSession((s) => s.answers)
  const missedIds = questions.filter((q) => answers[q.id] === false).map((q) => q.id)
  const answeredCount = questions.filter((q) => answers[q.id] !== undefined).length

  useEffect(() => {
    const m = params.get('module') as ModuleId | null
    if (m && moduleById[m]) setMode({ kind: 'module', module: m })
  }, [params])

  const start = (m: Mode) => {
    setMode(m)
    setRunKey((k) => k + 1)
  }
  const exit = () => {
    setMode(null)
    if (params.has('module')) setParams({}, { replace: true })
  }

  if (mode) return <Runner key={runKey} mode={mode} onExit={exit} onRestart={start} />

  return (
    <div className="space-y-8">
      <PageHeader
        title="Question bank"
        summary={`${questions.length} board-style questions. Every explanation says why the answer is right and why the tempting options are wrong, with the source. Answer order is shuffled.`}
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <button type="button" onClick={() => start({ kind: 'mixed' })} className="rounded-xl border-2 border-primary bg-primary/10 p-5 text-left hover:bg-primary/15">
          <Shuffle className="mb-2 h-6 w-6 text-primary" aria-hidden />
          <span className="block font-semibold">Mixed exam</span>
          <span className="block text-sm text-muted-foreground">20 random questions across all modules — interleaving builds durable recall.</span>
        </button>
        <button type="button" onClick={() => start({ kind: 'all' })} className="rounded-xl border bg-card p-5 text-left hover:border-primary">
          <span className="block font-semibold">Full bank</span>
          <span className="block text-sm text-muted-foreground">All {questions.length} questions, shuffled.</span>
        </button>
        <button
          type="button"
          disabled={missedIds.length === 0}
          onClick={() => start({ kind: 'missed', ids: missedIds })}
          className="rounded-xl border bg-card p-5 text-left enabled:hover:border-primary disabled:opacity-50"
        >
          <Target className="mb-2 h-6 w-6 text-rose-500" aria-hidden />
          <span className="block font-semibold">Review missed ({missedIds.length})</span>
          <span className="block text-sm text-muted-foreground">
            {answeredCount ? `${answeredCount} answered this session (including quick checks).` : 'Questions you miss this session collect here.'}
          </span>
        </button>
      </div>
      <div>
        <h2 className="mb-3 text-lg font-semibold">By module</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => {
            const qs = questions.filter((q) => q.module === m.id)
            const done = qs.filter((q) => answers[q.id] !== undefined).length
            const Icon = m.icon
            return (
              <button key={m.id} type="button" onClick={() => start({ kind: 'module', module: m.id })} className="flex items-start gap-3 rounded-xl border bg-card p-4 text-left hover:border-primary">
                <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden />
                <span>
                  <span className="block font-semibold">
                    {m.number}. {m.title}
                  </span>
                  <span className="block text-sm text-muted-foreground">
                    {qs.length} questions{done ? ` · ${done} answered this session` : ''}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">Answers are kept only for this browser session and are not saved.</p>
    </div>
  )
}
