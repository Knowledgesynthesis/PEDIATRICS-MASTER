import { useEffect, useMemo, useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import type { Question } from '@/types'
import { useSession } from '@/store/useStore'
import { cn } from '@/lib/utils'
import { Cite } from './Cite'

/** Deterministic shuffle so options don't always sit in authoring order (seeded by question id). */
function shuffledOrder(id: string, n: number): number[] {
  let seed = 0
  for (const ch of id) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0
  const order = Array.from({ length: n }, (_, i) => i)
  for (let i = n - 1; i > 0; i--) {
    seed = (seed * 1664525 + 1013904223) >>> 0
    const j = seed % (i + 1)
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  return order
}

const LETTERS = 'ABCDEFG'

export function QuestionCard({
  question,
  onAnswered,
  compact,
  heading,
}: {
  question: Question
  onAnswered?: (correct: boolean) => void
  compact?: boolean
  heading?: string
}) {
  const record = useSession((s) => s.record)
  const [picked, setPicked] = useState<number | null>(null)
  const order = useMemo(() => shuffledOrder(question.id, question.options.length), [question.id, question.options.length])

  useEffect(() => setPicked(null), [question.id])

  const answered = picked !== null
  const correct = picked === question.answer

  const choose = (original: number) => {
    if (answered) return
    setPicked(original)
    const ok = original === question.answer
    record(question.id, ok)
    onAnswered?.(ok)
  }

  return (
    <div className={cn('space-y-4', !compact && 'rounded-xl border bg-card p-4 sm:p-6')}>
      {heading && <p className="text-xs font-semibold uppercase tracking-wider text-primary">{heading}</p>}
      <p className="whitespace-pre-line text-base font-medium leading-relaxed">{question.stem}</p>
      <div className="space-y-2" role="group" aria-label="Answer options">
        {order.map((original, pos) => {
          const isAnswer = original === question.answer
          const isPicked = original === picked
          return (
            <button
              key={original}
              type="button"
              onClick={() => choose(original)}
              disabled={answered}
              aria-pressed={isPicked}
              className={cn(
                'flex w-full items-start gap-3 rounded-lg border-2 p-3 text-left text-sm transition-colors disabled:cursor-default',
                !answered && 'border-border hover:border-primary/60 hover:bg-accent',
                answered && isAnswer && 'border-emerald-500 bg-emerald-500/10',
                answered && isPicked && !isAnswer && 'border-rose-500 bg-rose-500/10',
                answered && !isAnswer && !isPicked && 'border-border opacity-70',
              )}
            >
              <span
                className={cn(
                  'flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-xs font-semibold',
                  answered && isAnswer && 'border-emerald-600 bg-emerald-600 text-white',
                  answered && isPicked && !isAnswer && 'border-rose-600 bg-rose-600 text-white',
                )}
                aria-hidden
              >
                {LETTERS[pos]}
              </span>
              <span className="flex-1 leading-relaxed">{question.options[original]}</span>
              {answered && isAnswer && <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-600" aria-label="Correct answer" />}
              {answered && isPicked && !isAnswer && <XCircle className="h-5 w-5 flex-shrink-0 text-rose-600" aria-label="Your answer" />}
            </button>
          )
        })}
      </div>
      {answered && (
        <div role="status" aria-live="polite" className={cn('rounded-lg border p-4 text-sm leading-relaxed', correct ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-rose-500/50 bg-rose-500/5')}>
          <p className="mb-1 font-semibold">{correct ? 'Correct.' : 'Not quite.'}</p>
          <p className="whitespace-pre-line">{question.explanation}</p>
          {question.refs.length > 0 && <Cite ids={question.refs} className="mt-2" />}
        </div>
      )}
    </div>
  )
}

/** Inline retrieval-practice check embedded in lessons. */
export function QuickCheck({ question }: { question: Question }) {
  return (
    <div className="rounded-xl border-2 border-dashed border-primary/40 bg-primary/[0.03] p-4 sm:p-5">
      <QuestionCard question={question} compact heading="Quick check" />
    </div>
  )
}
