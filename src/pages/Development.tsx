import { useMemo, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { moduleById } from '@/content/modules'
import { getQuestion } from '@/content/questions'
import { cdcMilestones, classicMilestones, domainLabels, whoMotorWindows, type Domain } from '@/content/milestones'
import { Bullets, DataTable, ModuleFooter, OnThisPage, PageHeader, Panel, Section, ToolFrame } from '@/components/learn/Blocks'
import { Callout } from '@/components/learn/Callout'
import { Segmented } from '@/components/learn/Controls'
import { QuickCheck } from '@/components/learn/QuestionCard'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const mod = moduleById.development
const domains: Domain[] = ['social', 'language', 'cognitive', 'movement']
const domainTone: Record<Domain, string> = {
  social: 'border-pink-500/40',
  language: 'border-violet-500/40',
  cognitive: 'border-amber-500/40',
  movement: 'border-sky-500/40',
}

function screeningDue(months: number): string[] {
  const due: string[] = []
  if ([9, 18, 30].includes(months)) due.push('Standardized developmental screen (e.g., ASQ-3) due at this visit')
  if ([18, 24].includes(months)) due.push('Autism-specific screen (M-CHAT-R/F) due at this visit')
  return due
}

function MilestoneExplorer() {
  const [months, setMonths] = useState(12)
  const age = cdcMilestones.find((a) => a.months === months) ?? cdcMilestones[0]
  const due = screeningDue(months)
  return (
    <ToolFrame id="tool-milestones" title="Milestone explorer (CDC/AAP 2022)" description="Skills ≥75% of children show by this age. Missing any → screen with a validated tool now." refs={['cdc-milestones-2022']}>
      <Segmented
        label="Age"
        value={months}
        onChange={setMonths}
        options={cdcMilestones.map((a) => ({ value: a.months, label: a.label }))}
      />
      <div className="grid gap-3 md:grid-cols-2">
        {domains.map((d) => (
          <div key={d} className={cn('rounded-lg border-l-4 bg-muted/40 p-3', domainTone[d])}>
            <p className="mb-2 text-sm font-semibold">{domainLabels[d]}</p>
            <Bullets items={age.items[d]} />
          </div>
        ))}
      </div>
      {due.length > 0 && (
        <Callout tone="action" title="Screening due">
          <Bullets items={due} />
        </Callout>
      )}
    </ToolFrame>
  )
}

interface DrillItem {
  text: string
  answer: number
  options: number[]
}

function makeDrill(seed: number): DrillItem {
  const all = cdcMilestones.flatMap((a) => domains.flatMap((d) => a.items[d].map((text) => ({ text, months: a.months }))))
  const pick = all[seed % all.length]
  const ages = cdcMilestones.map((a) => a.months)
  const idx = ages.indexOf(pick.months)
  const neighbors = [ages[idx - 2], ages[idx - 1], ages[idx + 1], ages[idx + 2]].filter((x): x is number => x !== undefined)
  const distractors = neighbors.sort((a, b) => Math.abs(a - pick.months) - Math.abs(b - pick.months)).slice(0, 3)
  const options = [pick.months, ...distractors].sort((a, b) => a - b)
  return { text: pick.text, answer: pick.months, options }
}

function MilestoneDrill() {
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 10_000))
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState({ right: 0, total: 0 })
  const item = useMemo(() => makeDrill(seed), [seed])
  const label = (m: number) => cdcMilestones.find((a) => a.months === m)?.label ?? `${m} mo`
  const choose = (m: number) => {
    if (picked !== null) return
    setPicked(m)
    setScore((s) => ({ right: s.right + Number(m === item.answer), total: s.total + 1 }))
  }
  const next = () => {
    setPicked(null)
    setSeed((s) => s + 7919)
  }
  return (
    <div className="rounded-lg border bg-muted/30 p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-sm font-semibold">Drill: by which checkup do most children show this?</p>
        <span className="text-xs tabular-nums text-muted-foreground">
          {score.right}/{score.total} correct
        </span>
      </div>
      <p className="mb-3 text-base font-medium">“{item.text}”</p>
      <div className="flex flex-wrap gap-2">
        {item.options.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => choose(m)}
            disabled={picked !== null}
            className={cn(
              'rounded-md border-2 px-3 py-2 text-sm font-medium',
              picked === null && 'hover:border-primary',
              picked !== null && m === item.answer && 'border-emerald-500 bg-emerald-500/10',
              picked === m && m !== item.answer && 'border-rose-500 bg-rose-500/10',
            )}
          >
            {label(m)}
          </button>
        ))}
      </div>
      {picked !== null && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2" role="status">
          <p className="text-sm">{picked === item.answer ? 'Correct.' : `It’s on the ${label(item.answer)} checklist.`}</p>
          <Button size="sm" variant="outline" onClick={next} className="gap-1">
            <RefreshCw className="h-3.5 w-3.5" aria-hidden /> Next
          </Button>
        </div>
      )}
    </div>
  )
}

function MotorWindows() {
  const [age, setAge] = useState(14)
  const max = 18
  const x = (m: number) => (m / max) * 100
  const overdue = whoMotorWindows.filter((w) => w.p99 < age)
  return (
    <ToolFrame id="tool-motor-windows" title="WHO windows of motor achievement" description="Bars span the 1st–99th percentile; the tick is the median. Drag the age marker." refs={['who-motor-2006']}>
      <div className="space-y-2">
        <label htmlFor="motor-age" className="text-sm font-semibold">
          Child’s age: <span className="tabular-nums text-primary">{age} months</span>
        </label>
        <input id="motor-age" type="range" min={3} max={18} step={0.5} value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
      </div>
      <div className="space-y-3" role="img" aria-label="Chart of WHO motor milestone windows">
        {whoMotorWindows.map((w) => {
          const done = w.p99 < age
          return (
            <div key={w.label} className="grid grid-cols-[8.5rem_1fr] items-center gap-2 text-xs sm:grid-cols-[11rem_1fr] sm:text-sm">
              <span className={cn('leading-tight', done && 'font-semibold')}>{w.label}</span>
              <div className="relative h-6 rounded bg-muted">
                <div className={cn('absolute inset-y-1 rounded', done ? 'bg-rose-500/50' : 'bg-primary/40')} style={{ left: `${x(w.p1)}%`, width: `${x(w.p99) - x(w.p1)}%` }} />
                <div className="absolute inset-y-0 w-0.5 bg-foreground" style={{ left: `${x(w.median)}%` }} title={`Median ${w.median} mo`} />
                <div className="absolute -inset-y-1 w-0.5 bg-rose-600" style={{ left: `${x(age)}%` }} aria-hidden />
              </div>
            </div>
          )
        })}
        <div className="grid grid-cols-[8.5rem_1fr] gap-2 text-[0.7rem] text-muted-foreground sm:grid-cols-[11rem_1fr]">
          <span />
          <div className="flex justify-between tabular-nums">
            {[0, 3, 6, 9, 12, 15, 18].map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>
      </div>
      <p className="text-sm" role="status">
        {overdue.length === 0
          ? `At ${age} months, every milestone shown is still within the normal window.`
          : `At ${age} months, a child who cannot yet ${overdue.map((w) => w.label.toLowerCase()).join(', ')} is beyond the 99th percentile → refer for evaluation.`}
        {' '}Note that ≈4% of healthy children never crawl on hands and knees.
      </p>
    </ToolFrame>
  )
}

export default function Development() {
  return (
    <div className="space-y-10">
      <PageHeader module={mod} refs={['cdc-milestones-2022', 'aap-dev-screening-2020', 'aap-asd-2020']} />
      <OnThisPage
        items={[
          { id: 'surveillance', label: 'Surveillance & screening' },
          { id: 'explorer', label: 'Milestones' },
          { id: 'classic', label: 'Classic ages' },
          { id: 'motor', label: 'Motor windows' },
          { id: 'red-flags', label: 'Red flags' },
          { id: 'evaluate', label: 'Evaluating delay' },
        ]}
      />

      <Section id="surveillance" title="Surveillance at every visit, screening at set ages" refs={['aap-dev-screening-2020']}>
        <div className="grid gap-4 md:grid-cols-3">
          <Panel title="Surveillance (every visit)">
            <Bullets
              items={['Ask about and act on parent concerns — they are valid signals', 'Take a developmental history; observe the child', 'Note risk factors (prematurity, toxic stress, lead) and protective factors', 'Use CDC milestone checklists to structure the talk']}
            />
          </Panel>
          <Panel title="Screening (validated tools)">
            <Bullets
              items={['General: 9, 18 and 30 months (ASQ-3, PEDS, SWYC)', 'Autism: 18 and 24 months (M-CHAT-R/F, with follow-up interview)', 'Any visit when surveillance raises concern', 'Denver II is not recommended as a screen (poor accuracy)']}
            />
          </Panel>
          <Panel title="Act on a positive result">
            <Bullets
              items={['Refer to early intervention (IDEA Part C, birth–3) and start the medical work-up at the same time', 'Age ≥3: refer to the local school district (Part B)', 'Formal audiology for any speech or language concern', 'Do not “wait and see” for a positive screen']}
            />
          </Panel>
        </div>
        <QuickCheck question={getQuestion('dev-screen-ages')} />
      </Section>

      <Section id="explorer" title="Milestones by age" refs={['cdc-milestones-2022']}>
        <Callout tone="evidence" title="What the 2022 revision changed">
          Milestones now reflect what <strong>≥75%</strong> of children achieve (older checklists used ~50%), so a missed milestone is a reason to screen, not a reason to reassure. Checklists were added for 15 and 30 months, and crawling was removed because many healthy children skip it.
        </Callout>
        <MilestoneExplorer />
        <MilestoneDrill />
      </Section>

      <Section id="classic" title="Classic median milestones (≈50% achieve)">
        <p className="text-sm text-muted-foreground">Use these for counseling and exams. Do not confuse median ages with the outer limits at which you act.</p>
        <DataTable head={['Age', 'Gross motor', 'Fine motor', 'Language', 'Social']} rows={classicMilestones.map((m) => [m.age, m.gross, m.fine, m.language, m.social])} />
        <Panel title="Rules of thumb">
          <Bullets
            items={[
              'Speech intelligibility to strangers ≈ 50% at 2 y, 75% at 3 y, ~100% at 4 y.',
              'Cube towers ≈ age (y) × 3 up to age 3 (2 at 15 mo, 6 at 2 y, 9 at 3 y).',
              'Shapes: circle 3 y → cross 4 y → square ~4½ y → triangle 5 y → diamond ~7 y.',
              'Bilingual children reach milestones on time when both languages are counted; bilingualism does not cause delay.',
            ]}
          />
        </Panel>
        <QuickCheck question={getQuestion('dev-age-3')} />
      </Section>

      <Section id="motor" title="Motor milestones: the normal window is wide" refs={['who-motor-2006']}>
        <MotorWindows />
        <QuickCheck question={getQuestion('dev-no-crawl')} />
      </Section>

      <Section id="red-flags" title="Red flags — act now at any visit" refs={['aap-asd-2020', 'noritz-motor-2013']}>
        <div className="grid gap-4 md:grid-cols-2">
          <Callout tone="redflag" title="Any age">
            <Bullets
              items={['Loss of previously acquired skills (regression)', 'Persistent parental concern', 'Hand preference before ~18 months (suggests weakness of the other side)', 'Abnormal tone, persistent primitive reflexes beyond ~6 months, or asymmetry', 'Head circumference crossing percentiles']}
            />
          </Callout>
          <Callout tone="redflag" title="Autism red flags (AAP)">
            <Bullets
              items={['No babbling, pointing or other gestures by 12 months', 'No single words by 16 months', 'No spontaneous (non-echoed) 2-word phrases by 24 months', 'Any loss of language or social skills at any age', 'Poor response to name, limited eye contact or shared attention']}
            />
          </Callout>
        </div>
        <QuickCheck question={getQuestion('dev-16mo-words')} />
        <QuickCheck question={getQuestion('dev-hand-pref')} />
      </Section>

      <Section id="evaluate" title="Evaluating a child with delay" refs={['noritz-motor-2013', 'acmg-exome-2021', 'cdc-addm-2025']}>
        <DataTable
          head={['Situation', 'First steps']}
          rows={[
            ['Any language delay', 'Formal audiology (a normal newborn screen does not exclude later hearing loss); early-intervention referral'],
            ['Motor delay', 'Neuro exam for tone, reflexes and weakness; CK (especially boys) to detect Duchenne early; refer to EI/PT; MRI if upper-motor-neuron signs'],
            ['Global developmental delay (≥2 domains, <5 y)', 'Exome sequencing first- or second-tier (ACMG 2021), or chromosomal microarray + fragile X; MRI if abnormal exam/head size; TSH if not screened; lead if risk'],
            ['Suspected autism', 'Refer for diagnostic evaluation and start services (early intensive behavioral and speech therapy) without waiting for the diagnosis; audiology; genetic testing'],
            ['Regression', 'Urgent evaluation: hearing, autism, EEG for epileptic aphasia/seizures, metabolic and genetic testing (e.g., Rett syndrome in girls)'],
          ]}
        />
        <Callout tone="pearl">
          Autism now affects about <strong>1 in 31</strong> U.S. 8-year-olds (2022 surveillance data). Earlier identification means earlier therapy — screen every child at 18 and 24 months.
        </Callout>
        <QuickCheck question={getQuestion('dev-not-walking')} />
        <QuickCheck question={getQuestion('dev-gdd-genetics')} />
      </Section>

      <ModuleFooter module={mod} />
    </div>
  )
}
