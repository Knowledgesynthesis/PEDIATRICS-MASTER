import { useState } from 'react'
import { Search } from 'lucide-react'
import { glossary, type GlossaryTerm } from '@/content/glossary'
import { PageHeader } from '@/components/learn/Blocks'
import { Segmented } from '@/components/learn/Controls'

const categories: (GlossaryTerm['category'] | 'All')[] = ['All', 'Abbreviation', 'Clinical', 'Development', 'Immunization']

export default function Glossary() {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState<(typeof categories)[number]>('All')
  const q = query.trim().toLowerCase()
  const items = glossary
    .filter((t) => cat === 'All' || t.category === cat)
    .filter((t) => !q || t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q))
    .sort((a, b) => a.term.localeCompare(b.term))

  return (
    <div className="space-y-6">
      <PageHeader title="Glossary" summary={`${glossary.length} terms and abbreviations used across the modules.`} />
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <label htmlFor="glossary-search" className="sr-only">
          Search terms
        </label>
        <input
          id="glossary-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search terms or definitions…"
          className="h-11 w-full rounded-md border border-input bg-background pl-9 pr-3 text-base"
        />
      </div>
      <Segmented label="Category" value={cat} onChange={setCat} options={categories.map((c) => ({ value: c, label: c }))} />
      <p className="text-sm text-muted-foreground" role="status">
        {items.length} {items.length === 1 ? 'term' : 'terms'}
      </p>
      <dl className="divide-y rounded-xl border bg-card">
        {items.map((t) => (
          <div key={t.term} className="grid gap-1 p-4 sm:grid-cols-[12rem_1fr] sm:gap-4">
            <dt className="font-semibold text-primary">{t.term}</dt>
            <dd className="text-sm leading-relaxed">{t.definition}</dd>
          </div>
        ))}
        {items.length === 0 && <p className="p-6 text-center text-muted-foreground">No matching terms.</p>}
      </dl>
    </div>
  )
}
