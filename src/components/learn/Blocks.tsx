import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ClipboardCheck, Target } from 'lucide-react'
import { modules, type ModuleMeta } from '@/content/modules'
import { questions } from '@/content/questions'
import { cn } from '@/lib/utils'
import { Cite } from './Cite'

export function PageHeader({
  module,
  title,
  summary,
  refs,
}: {
  module?: ModuleMeta
  title?: string
  summary?: string
  refs?: string[]
}) {
  const Icon = module?.icon
  return (
    <header className="space-y-4">
      {module && (
        <p className="flex items-center gap-2 text-sm font-medium text-primary">
          {Icon && <Icon className="h-4 w-4" aria-hidden />}
          Module {module.number} of {modules.length}
        </p>
      )}
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title ?? module?.title}</h1>
      {(summary ?? module?.summary) && <p className="max-w-3xl text-lg text-muted-foreground">{summary ?? module?.summary}</p>}
      {refs && refs.length > 0 && (
        <p className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span>Built on:</span>
          <Cite ids={refs} />
        </p>
      )}
      {module && (
        <div className="rounded-lg border bg-card p-4">
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <Target className="h-4 w-4 text-primary" aria-hidden /> After this module you can
          </p>
          <ul className="list-clinical text-sm">
            {module.objectives.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}

export function OnThisPage({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav aria-label="On this page" className="-mx-1 flex flex-wrap gap-1.5">
      {items.map((i) => (
        <a
          key={i.id}
          href={`#${i.id}`}
          className="rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground hover:border-primary hover:text-primary"
        >
          {i.label}
        </a>
      ))}
    </nav>
  )
}

export function Section({
  id,
  title,
  children,
  refs,
  className,
}: {
  id: string
  title: string
  children: ReactNode
  refs?: string[]
  className?: string
}) {
  return (
    <section id={id} className={cn('scroll-mt-20 space-y-4', className)} aria-labelledby={`${id}-h`}>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b pb-2">
        <h2 id={`${id}-h`} className="text-xl font-semibold tracking-tight sm:text-2xl">
          {title}
        </h2>
        {refs && <Cite ids={refs} />}
      </div>
      {children}
    </section>
  )
}

export function Panel({ title, children, className, refs }: { title?: string; children: ReactNode; className?: string; refs?: string[] }) {
  return (
    <div className={cn('rounded-lg border bg-card p-4 sm:p-5', className)}>
      {(title || refs) && (
        <div className="mb-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          {title && <h3 className="font-semibold">{title}</h3>}
          {refs && <Cite ids={refs} />}
        </div>
      )}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  )
}

export function Bullets({ items, className }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={cn('list-clinical text-sm', className)}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}

export function DataTable({
  head,
  rows,
  caption,
  className,
}: {
  head: ReactNode[]
  rows: ReactNode[][]
  caption?: string
  className?: string
}) {
  return (
    <div className={cn('overflow-x-auto rounded-lg border bg-card', className)}>
      <table className="table-clinical">
        {caption && <caption className="px-3 pt-3 text-left text-xs text-muted-foreground">{caption}</caption>}
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={i} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) =>
                j === 0 ? (
                  <th key={j} scope="row" className="!bg-transparent !font-medium">
                    {c}
                  </th>
                ) : (
                  <td key={j}>{c}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function ToolFrame({ id, title, description, children, refs }: { id: string; title: string; description?: string; children: ReactNode; refs?: string[] }) {
  return (
    <div id={id} className="scroll-mt-20 rounded-xl border-2 border-primary/30 bg-card shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-primary/20 bg-primary/[0.04] px-4 py-3 sm:px-5">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-primary">Interactive tool</p>
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
        </div>
        {refs && <Cite ids={refs} />}
      </div>
      <div className="space-y-5 p-4 sm:p-5">{children}</div>
    </div>
  )
}

export function ModuleFooter({ module }: { module: ModuleMeta }) {
  const idx = modules.findIndex((m) => m.id === module.id)
  const prev = modules[idx - 1]
  const next = modules[idx + 1]
  const count = questions.filter((q) => q.module === module.id).length
  return (
    <footer className="space-y-4 border-t pt-6">
      <Link
        to={`/assessment?module=${module.id}`}
        className="flex items-center justify-between gap-4 rounded-xl border-2 border-primary bg-primary/10 p-4 transition-colors hover:bg-primary/15"
      >
        <span className="flex items-center gap-3">
          <ClipboardCheck className="h-6 w-6 flex-shrink-0 text-primary" aria-hidden />
          <span>
            <span className="block font-semibold">Test yourself: {module.title}</span>
            <span className="block text-sm text-muted-foreground">{count} board-style questions with explanations</span>
          </span>
        </span>
        <ArrowRight className="h-5 w-5 flex-shrink-0 text-primary" aria-hidden />
      </Link>
      <div className="grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Link to={prev.path} className="rounded-lg border bg-card p-3 text-sm hover:border-primary">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowLeft className="h-3 w-3" aria-hidden /> Previous
            </span>
            <span className="font-medium">
              {prev.number}. {prev.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={next.path} className="rounded-lg border bg-card p-3 text-right text-sm hover:border-primary">
            <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
              Next <ArrowRight className="h-3 w-3" aria-hidden />
            </span>
            <span className="font-medium">
              {next.number}. {next.title}
            </span>
          </Link>
        ) : (
          <Link to="/cases" className="rounded-lg border bg-card p-3 text-right text-sm hover:border-primary">
            <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
              Next <ArrowRight className="h-3 w-3" aria-hidden />
            </span>
            <span className="font-medium">Apply it: clinical cases</span>
          </Link>
        )}
      </div>
    </footer>
  )
}
