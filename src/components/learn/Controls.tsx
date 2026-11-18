import { useId, type ReactNode } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SegOption<T extends string | number> {
  value: T
  label: ReactNode
  hint?: string
}

/** Accessible single-choice group (radio semantics) rendered as buttons; wraps on small screens. */
export function Segmented<T extends string | number>({
  label,
  value,
  options,
  onChange,
  hint,
  columns,
}: {
  label: ReactNode
  value: T
  options: SegOption<T>[]
  onChange: (v: T) => void
  hint?: string
  columns?: 1 | 2 | 3 | 4
}) {
  const id = useId()
  const grid =
    columns === 1 ? 'grid grid-cols-1' : columns === 2 ? 'grid grid-cols-1 sm:grid-cols-2' : columns === 3 ? 'grid grid-cols-1 sm:grid-cols-3' : columns === 4 ? 'grid grid-cols-2 sm:grid-cols-4' : 'flex flex-wrap'
  return (
    <fieldset className="space-y-2">
      <legend id={id} className="text-sm font-semibold">
        {label}
      </legend>
      {hint && <p className="-mt-1 text-xs text-muted-foreground">{hint}</p>}
      <div role="radiogroup" aria-labelledby={id} className={cn('gap-2', grid)}>
        {options.map((o) => {
          const selected = o.value === value
          return (
            <button
              key={String(o.value)}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(o.value)}
              className={cn(
                'min-h-10 rounded-md border px-3 py-2 text-left text-sm transition-colors',
                selected ? 'border-primary bg-primary text-primary-foreground' : 'border-input bg-background hover:border-primary/60 hover:bg-accent',
              )}
            >
              <span className="block font-medium leading-snug">{o.label}</span>
              {o.hint && <span className={cn('block text-xs', selected ? 'opacity-90' : 'text-muted-foreground')}>{o.hint}</span>}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

export function NumberField({
  label,
  value,
  onChange,
  unit,
  min,
  max,
  step = 'any',
  placeholder,
  hint,
}: {
  label: ReactNode
  value: string
  onChange: (v: string) => void
  unit?: string
  min?: number
  max?: number
  step?: number | 'any'
  placeholder?: string
  hint?: string
}) {
  const id = useId()
  const n = Number(value)
  const outOfRange = value !== '' && (Number.isNaN(n) || (min !== undefined && n < min) || (max !== undefined && n > max))
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-semibold">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={value}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={outOfRange || undefined}
          aria-describedby={hint || outOfRange ? `${id}-hint` : undefined}
          className={cn(
            'h-10 w-full min-w-0 rounded-md border bg-background px-3 text-base tabular-nums sm:max-w-[10rem]',
            outOfRange ? 'border-destructive' : 'border-input',
          )}
        />
        {unit && <span className="whitespace-nowrap text-sm text-muted-foreground">{unit}</span>}
      </div>
      {(hint || outOfRange) && (
        <p id={`${id}-hint`} className={cn('text-xs', outOfRange ? 'text-destructive' : 'text-muted-foreground')}>
          {outOfRange ? `Enter a value${min !== undefined ? ` ≥ ${min}` : ''}${max !== undefined ? ` and ≤ ${max}` : ''}.` : hint}
        </p>
      )}
    </div>
  )
}

export function DateField({ label, value, onChange, hint }: { label: ReactNode; value: string; onChange: (v: string) => void; hint?: string }) {
  const id = useId()
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-semibold">
        {label}
      </label>
      <input
        id={id}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-md border border-input bg-background px-3 text-base sm:max-w-[12rem]"
      />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

export function Toggle({ label, checked, onChange, hint }: { label: ReactNode; checked: boolean; onChange: (v: boolean) => void; hint?: string }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        'flex w-full items-start gap-3 rounded-md border px-3 py-2 text-left text-sm transition-colors',
        checked ? 'border-primary bg-primary/10' : 'border-input bg-background hover:bg-accent',
      )}
    >
      <span
        className={cn(
          'mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border',
          checked ? 'border-primary bg-primary text-primary-foreground' : 'border-input',
        )}
        aria-hidden
      >
        {checked && <Check className="h-3 w-3" />}
      </span>
      <span>
        <span className="block font-medium leading-snug">{label}</span>
        {hint && <span className="block text-xs text-muted-foreground">{hint}</span>}
      </span>
    </button>
  )
}

const resultTones = {
  good: 'border-emerald-500/60 bg-emerald-500/10',
  warn: 'border-amber-500/60 bg-amber-500/10',
  bad: 'border-rose-500/60 bg-rose-500/10',
  info: 'border-primary/50 bg-primary/5',
} as const

export function Result({ tone, title, children }: { tone: keyof typeof resultTones; title: ReactNode; children?: ReactNode }) {
  return (
    <div role="status" aria-live="polite" className={cn('rounded-lg border-2 p-4', resultTones[tone])}>
      <p className="text-base font-semibold">{title}</p>
      {children && <div className="mt-2 space-y-2 text-sm leading-relaxed">{children}</div>}
    </div>
  )
}
