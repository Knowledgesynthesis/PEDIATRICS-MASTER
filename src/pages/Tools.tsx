import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { modules } from '@/content/modules'
import { PageHeader } from '@/components/learn/Blocks'

export default function Tools() {
  const total = modules.reduce((n, m) => n + m.tools.length, 0)
  return (
    <div className="space-y-8">
      <PageHeader
        title="All interactive tools"
        summary={`${total} calculators and decision tools, each placed inside the lesson that explains it. All work offline; nothing you enter leaves your device.`}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {modules.map((m) => {
          const Icon = m.icon
          return (
            <div key={m.id} className="rounded-xl border bg-card p-4">
              <p className="mb-3 flex items-center gap-2 font-semibold">
                <Icon className="h-5 w-5 text-primary" aria-hidden />
                {m.number}. {m.title}
              </p>
              <ul className="space-y-1">
                {m.tools.map((t) => (
                  <li key={t.id}>
                    <Link to={`${m.path}#${t.id}`} className="group flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-accent">
                      <span>{t.label}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
