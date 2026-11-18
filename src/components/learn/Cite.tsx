import { Link } from 'react-router-dom'
import { getReference } from '@/content/references'
import { cn } from '@/lib/utils'

/** Inline citation chips that link to the reference list. */
export function Cite({ ids, className }: { ids: string[]; className?: string }) {
  return (
    <span className={cn('inline-flex flex-wrap gap-1 align-middle', className)}>
      {ids.map((id) => {
        const ref = getReference(id)
        if (!ref) return null
        return (
          <Link
            key={id}
            to={`/references#${id}`}
            title={ref.citation}
            className="inline-flex items-center rounded border border-primary/30 bg-primary/5 px-1.5 py-px text-[0.7rem] font-medium leading-4 text-primary no-underline hover:bg-primary/15"
          >
            {ref.short}
          </Link>
        )
      })}
    </span>
  )
}
