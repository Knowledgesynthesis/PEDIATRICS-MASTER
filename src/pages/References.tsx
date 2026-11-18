import { useLocation } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { references, refUrl } from '@/content/references'
import { CONTENT_REVIEWED } from '@/content/meta'
import { PageHeader } from '@/components/learn/Blocks'
import { cn } from '@/lib/utils'
import type { Reference } from '@/types'

const groups: { kind: Reference['kind']; title: string }[] = [
  { kind: 'guideline', title: 'Guidelines and consensus statements' },
  { kind: 'trial', title: 'Trials and primary studies' },
  { kind: 'review', title: 'Systematic reviews and surveillance' },
  { kind: 'policy', title: 'Policy, regulatory and epidemiologic updates' },
  { kind: 'resource', title: 'Clinical resources' },
]

export default function References() {
  const { hash } = useLocation()
  const target = decodeURIComponent(hash.slice(1))
  return (
    <div className="space-y-8">
      <PageHeader
        title="References"
        summary={`Every recommendation in the app is tied to one of these ${references.length} sources. Content last checked against current guidance: ${CONTENT_REVIEWED}. Links without a stable DOI open a PubMed search for the title.`}
      />
      {groups.map((g) => {
        const items = references.filter((r) => r.kind === g.kind).sort((a, b) => a.short.localeCompare(b.short))
        if (!items.length) return null
        return (
          <section key={g.kind} className="space-y-3" aria-labelledby={`h-${g.kind}`}>
            <h2 id={`h-${g.kind}`} className="text-xl font-semibold">
              {g.title}
            </h2>
            <ol className="space-y-2">
              {items.map((r) => (
                <li
                  key={r.id}
                  id={r.id}
                  className={cn('scroll-mt-20 rounded-lg border bg-card p-3 text-sm', target === r.id && 'border-2 border-primary bg-primary/5')}
                >
                  <p className="font-semibold">{r.short}</p>
                  <p className="mt-0.5 text-muted-foreground">{r.citation}</p>
                  <a href={refUrl(r)} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                    {r.url ? 'Open source' : 'Find on PubMed'} <ExternalLink className="h-3 w-3" aria-hidden />
                  </a>
                </li>
              ))}
            </ol>
          </section>
        )
      })}
    </div>
  )
}
