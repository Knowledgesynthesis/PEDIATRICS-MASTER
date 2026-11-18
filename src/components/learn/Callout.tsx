import type { ReactNode } from 'react'
import { AlertTriangle, CheckCircle2, FlaskConical, Landmark, Lightbulb, OctagonAlert } from 'lucide-react'
import { cn } from '@/lib/utils'

const tones = {
  pearl: { icon: Lightbulb, label: 'Pearl', cls: 'border-sky-500/40 bg-sky-500/[0.07] [&_.callout-icon]:text-sky-600 dark:[&_.callout-icon]:text-sky-400' },
  pitfall: { icon: AlertTriangle, label: 'Pitfall', cls: 'border-amber-500/50 bg-amber-500/[0.08] [&_.callout-icon]:text-amber-600 dark:[&_.callout-icon]:text-amber-400' },
  redflag: { icon: OctagonAlert, label: 'Red flags', cls: 'border-rose-500/50 bg-rose-500/[0.07] [&_.callout-icon]:text-rose-600 dark:[&_.callout-icon]:text-rose-400' },
  evidence: { icon: FlaskConical, label: 'Evidence', cls: 'border-violet-500/40 bg-violet-500/[0.07] [&_.callout-icon]:text-violet-600 dark:[&_.callout-icon]:text-violet-400' },
  action: { icon: CheckCircle2, label: 'Do this', cls: 'border-emerald-500/40 bg-emerald-500/[0.07] [&_.callout-icon]:text-emerald-600 dark:[&_.callout-icon]:text-emerald-400' },
  policy: { icon: Landmark, label: 'Policy status', cls: 'border-slate-500/40 bg-slate-500/[0.07] [&_.callout-icon]:text-slate-600 dark:[&_.callout-icon]:text-slate-300' },
} as const

export type CalloutTone = keyof typeof tones

export function Callout({ tone, title, children, className }: { tone: CalloutTone; title?: string; children: ReactNode; className?: string }) {
  const t = tones[tone]
  const Icon = t.icon
  return (
    <aside className={cn('rounded-lg border p-4', t.cls, className)}>
      <div className="flex items-start gap-3">
        <Icon className="callout-icon mt-0.5 h-5 w-5 flex-shrink-0" aria-hidden />
        <div className="min-w-0 flex-1 text-sm leading-relaxed">
          <p className="mb-1 font-semibold">{title ?? t.label}</p>
          <div className="space-y-2 [&_ul]:mt-1">{children}</div>
        </div>
      </div>
    </aside>
  )
}
