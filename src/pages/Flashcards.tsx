import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, RotateCcw, Undo2 } from 'lucide-react'
import { flashcards } from '@/content/flashcards'
import { moduleById, modules } from '@/content/modules'
import { PageHeader } from '@/components/learn/Blocks'
import { Segmented } from '@/components/learn/Controls'
import { Button } from '@/components/ui/button'
import type { Flashcard, ModuleId } from '@/types'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Session-only Leitner-style drill: "Again" puts the card back a few places in the queue,
 * "Got it" retires it. Nothing is stored.
 */
function Deck({ cards, onReset }: { cards: Flashcard[]; onReset: () => void }) {
  const [queue, setQueue] = useState<Flashcard[]>(() => shuffle(cards))
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState(0)
  const [again, setAgain] = useState(0)
  const card = queue[0]

  const answer = useCallback(
    (gotIt: boolean) => {
      if (!card || !flipped) return
      setFlipped(false)
      setQueue((q) => {
        const [first, ...rest] = q
        if (gotIt) return rest
        const pos = Math.min(3, rest.length)
        return [...rest.slice(0, pos), first, ...rest.slice(pos)]
      })
      if (gotIt) setKnown((k) => k + 1)
      else setAgain((a) => a + 1)
    },
    [card, flipped],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'INPUT') return
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        setFlipped(true)
      } else if (e.key === '1') answer(false)
      else if (e.key === '2') answer(true)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [answer])

  if (!card) {
    return (
      <div className="rounded-xl border-2 border-emerald-500 bg-emerald-500/10 p-6 text-center">
        <p className="text-xl font-semibold">Deck cleared</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {known} cards · {again} repeats. Spaced, repeated retrieval is what makes facts stick — come back tomorrow.
        </p>
        <Button onClick={onReset} className="mt-4 gap-1">
          <RotateCcw className="h-4 w-4" aria-hidden /> Start again
        </Button>
      </div>
    )
  }

  const mod = moduleById[card.module]
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{queue.length} left</span>
        <span className="tabular-nums">
          {known} known · {again} again
        </span>
      </div>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="flex min-h-[14rem] w-full flex-col items-center justify-center rounded-2xl border-2 bg-card p-6 text-center shadow-sm transition-colors hover:border-primary"
        aria-label={flipped ? 'Hide answer' : 'Show answer'}
      >
        <span className="mb-3 text-xs font-medium uppercase tracking-wider text-primary">{mod.title}</span>
        <span className="text-xl font-semibold leading-snug">{card.front}</span>
        {flipped ? (
          <span className="mt-4 block border-t pt-4 text-lg leading-relaxed" role="status">
            {card.back}
          </span>
        ) : (
          <span className="mt-4 text-sm text-muted-foreground">Recall the answer, then tap (or press Space)</span>
        )}
      </button>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" disabled={!flipped} onClick={() => answer(false)} className="h-12 gap-1">
          <Undo2 className="h-4 w-4" aria-hidden /> Again <kbd className="ml-1 text-xs opacity-60">1</kbd>
        </Button>
        <Button disabled={!flipped} onClick={() => answer(true)} className="h-12 gap-1">
          <Check className="h-4 w-4" aria-hidden /> Got it <kbd className="ml-1 text-xs opacity-60">2</kbd>
        </Button>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        Card from <Link to={mod.path} className="text-primary hover:underline">Module {mod.number}</Link>
      </p>
    </div>
  )
}

export default function Flashcards() {
  const [filter, setFilter] = useState<ModuleId | 'all'>('all')
  const [run, setRun] = useState(0)
  const cards = flashcards.filter((c) => filter === 'all' || c.module === filter)
  return (
    <div className="space-y-8">
      <PageHeader title="Rapid review cards" summary={`${flashcards.length} high-yield numbers and rules. Say the answer before you flip — effortful recall is the point.`} />
      <Segmented
        label="Deck"
        value={filter}
        onChange={(v) => {
          setFilter(v)
          setRun((r) => r + 1)
        }}
        options={[{ value: 'all' as const, label: `All (${flashcards.length})` }, ...modules.map((m) => ({ value: m.id, label: `${m.number}. ${m.title}` }))]}
      />
      <div className="mx-auto max-w-2xl">
        <Deck key={`${filter}-${run}`} cards={cards} onReset={() => setRun((r) => r + 1)} />
      </div>
    </div>
  )
}
