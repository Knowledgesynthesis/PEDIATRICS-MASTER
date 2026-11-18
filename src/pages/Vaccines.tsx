import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { moduleById } from '@/content/modules'
import { getQuestion } from '@/content/questions'
import { Bullets, DataTable, ModuleFooter, OnThisPage, PageHeader, Panel, Section, ToolFrame } from '@/components/learn/Blocks'
import { Callout } from '@/components/learn/Callout'
import { DateField, Result, Segmented, Toggle } from '@/components/learn/Controls'
import { QuickCheck } from '@/components/learn/QuestionCard'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { evaluateSeries, vaccineNames, type VaccineCode } from '@/lib/clinical/vaccineValidity'
import { parseISODate } from '@/lib/clinical/dates'

const mod = moduleById.vaccines

const visits: { id: string; label: string; due: string[]; note?: string }[] = [
  { id: 'birth', label: 'Birth', due: ['Hepatitis B #1 (within 24 h; ≥2,000 g and stable)', 'RSV monoclonal antibody if born during season without maternal protection (first week of life)'] },
  { id: '2m', label: '2 mo', due: ['Hepatitis B #2 (1–2 mo)', 'Rotavirus #1 (by 14 wk 6 d)', 'DTaP #1', 'Hib #1', 'PCV #1 (PCV15 or PCV20)', 'IPV #1'] },
  { id: '4m', label: '4 mo', due: ['Rotavirus #2', 'DTaP #2', 'Hib #2', 'PCV #2', 'IPV #2'] },
  {
    id: '6m',
    label: '6 mo',
    due: ['Hepatitis B #3 (6–18 mo)', 'Rotavirus #3 (RV5 only)', 'DTaP #3', 'Hib #3 (not needed with PRP-OMP products)', 'PCV #3', 'IPV #3 (6–18 mo)', 'Influenza (2 doses ≥4 wk apart in the first season)', 'COVID-19 (AAP: routine for 6–23 mo)'],
  },
  { id: '12m', label: '12–15 mo', due: ['Hib booster', 'PCV #4', 'MMR #1', 'Varicella #1 (separate from MMR preferred for dose 1)', 'Hepatitis A #1 (12–23 mo)'] },
  { id: '15m', label: '15–18 mo', due: ['DTaP #4 (may give at ≥12 mo if ≥6 mo after #3)', 'Hepatitis A #2 (≥6 mo after #1)', 'Catch up anything missed'] },
  { id: '4y', label: '4–6 y', due: ['DTaP #5', 'IPV #4 (final dose must be ≥4 y)', 'MMR #2', 'Varicella #2 (MMRV acceptable)'] },
  { id: '9y', label: '9–12 y', due: ['HPV #1 (AAP: start at 9–12 y), #2 at 6–12 mo later'] },
  { id: '11y', label: '11–12 y', due: ['Tdap', 'MenACWY #1', 'HPV if not started'] },
  { id: '16y', label: '16 y', due: ['MenACWY booster', 'MenB (16–18 y preferred; shared decision for healthy teens)', 'MenABCWY may replace MenACWY + MenB when both are due'] },
  { id: 'annual', label: 'Every season', due: ['Influenza for everyone ≥6 months (all 2026–27 vaccines trivalent)', 'COVID-19: 6–23 mo routine; 2–18 y if at increased risk, or by family choice'] },
]

function ScheduleTool() {
  const [visit, setVisit] = useState('2m')
  const v = visits.find((x) => x.id === visit) ?? visits[0]
  return (
    <ToolFrame id="tool-schedule" title="What’s due at this visit? (AAP 2026)" description="Routine schedule for healthy children. Catch-up and high-risk indications differ." refs={['aap-schedule-2026', 'aap-rsv-2026', 'aap-flu-2026']}>
      <Segmented label="Visit" value={visit} onChange={setVisit} options={visits.map((x) => ({ value: x.id, label: x.label }))} />
      <Result tone="info" title={`Due at ${v.label}`}>
        <Bullets items={v.due} />
      </Result>
      <p className="text-xs text-muted-foreground">
        Combination vaccines reduce injections: DTaP-HepB-IPV, DTaP-IPV/Hib, DTaP-IPV-Hib-HepB, DTaP-IPV (4–6 y), MMRV. All vaccines can be given at the same visit in separate sites.
      </p>
    </ToolFrame>
  )
}

type Maternal = 'none' | 'lt14' | 'ge14'

function RsvTool() {
  const [age, setAge] = useState<'lt8' | '8to19' | 'ge20'>('lt8')
  const [maternal, setMaternal] = useState<Maternal>('none')
  const [highRisk, setHighRisk] = useState(false)
  const [lt5kg, setLt5kg] = useState(false)

  let tone: 'good' | 'info' | 'warn' = 'info'
  let title = ''
  let body: string[] = []
  if (age === 'lt8') {
    if (maternal === 'ge14') {
      tone = 'good'
      title = 'Infant antibody not needed for most infants'
      body = ['Mother received RSVpreF ≥14 days before birth — protection is transferred.', 'Consider the infant antibody only in specific situations where maternal protection may be inadequate (per AAP policy).']
    } else {
      tone = 'warn'
      title = 'Give one dose: nirsevimab or clesrovimab'
      body = [
        maternal === 'lt14' ? 'Maternal vaccine <14 days before birth does not count.' : 'No (or unknown) maternal RSV vaccine.',
        `Nirsevimab ${lt5kg ? '50 mg' : '100 mg'} IM (${lt5kg ? '<5 kg' : '≥5 kg'}), or clesrovimab 105 mg IM — the products are interchangeable for the first season.`,
        'Born during the season: give in the first week of life (birth hospital). Older infants: shortly before or early in the season.',
      ]
    }
  } else if (age === '8to19') {
    if (highRisk) {
      tone = 'warn'
      title = 'Second season: nirsevimab 200 mg (2 × 100 mg IM)'
      body = ['For children 8–19 months at increased risk entering their second season, regardless of maternal vaccination or first-season antibody.', 'Clesrovimab is not established for the second season — check the current AAP statement.']
    } else {
      tone = 'good'
      title = 'Not recommended'
      body = ['Healthy children entering their second season are not candidates.']
    }
  } else {
    tone = 'good'
    title = 'Not indicated'
    body = ['RSV monoclonal antibodies are for infants and young children up to 19 months.']
  }

  return (
    <ToolFrame id="tool-rsv" title="RSV protection decision" description="Every infant should be protected by either maternal vaccine or an infant monoclonal antibody — rarely both." refs={['aap-rsv-2026']}>
      <div className="grid gap-4 md:grid-cols-2">
        <Segmented
          label="Age entering (or during) RSV season"
          value={age}
          onChange={setAge}
          columns={1}
          options={[
            { value: 'lt8', label: '<8 months (first season)' },
            { value: '8to19', label: '8–19 months (second season)' },
            { value: 'ge20', label: '≥20 months' },
          ]}
        />
        {age === 'lt8' ? (
          <div className="space-y-3">
            <Segmented
              label="Maternal RSV vaccine (RSVpreF, 32–36 wk)"
              value={maternal}
              onChange={setMaternal}
              columns={1}
              options={[
                { value: 'none', label: 'None or unknown' },
                { value: 'lt14', label: 'Given <14 days before birth' },
                { value: 'ge14', label: 'Given ≥14 days before birth' },
              ]}
            />
            {maternal !== 'ge14' && <Toggle label="Infant weighs <5 kg" checked={lt5kg} onChange={setLt5kg} />}
          </div>
        ) : age === '8to19' ? (
          <Toggle
            label="Increased risk of severe RSV"
            hint="e.g., chronic lung disease of prematurity needing support in the prior 6 months, severe immunocompromise, severe cystic fibrosis, American Indian/Alaska Native child. AAP 2026–27 expanded this list."
            checked={highRisk}
            onChange={setHighRisk}
          />
        ) : null}
      </div>
      <Result tone={tone} title={title}>
        <Bullets items={body} />
      </Result>
    </ToolFrame>
  )
}

const codes: VaccineCode[] = ['HepB', 'RV1', 'RV5', 'DTaP', 'IPV', 'MMR', 'VAR', 'HepA']

function ValidityTool() {
  const [code, setCode] = useState<VaccineCode>('DTaP')
  const [dob, setDob] = useState('2025-01-15')
  const [doses, setDoses] = useState<string[]>(['2025-03-15', '2025-04-10', ''])

  const dobD = parseISODate(dob)
  const dates = doses.map(parseISODate).filter((d): d is Date => d !== null)
  const result = dobD ? evaluateSeries(code, dobD, dates) : null

  const statusBadge = (s: string) =>
    s === 'valid' ? <Badge variant="success">Valid</Badge> : s === 'valid-with-note' ? <Badge variant="warning">Valid — note</Badge> : s === 'not-recommended' ? <Badge variant="destructive">Not recommended</Badge> : <Badge variant="destructive">Invalid</Badge>

  return (
    <ToolFrame
      id="tool-validity"
      title="Dose-validity checker"
      description="Applies ACIP minimum ages, minimum intervals and the 4-day grace period. Enter real dates from the record."
      refs={['cdc-catchup', 'acip-best-practices']}
    >
      <Segmented label="Vaccine" value={code} onChange={setCode} columns={4} options={codes.map((c) => ({ value: c, label: c === 'RV1' ? 'RV1 (2-dose)' : c === 'RV5' ? 'RV5 (3-dose)' : c }))} />
      <div className="grid gap-4 sm:grid-cols-2">
        <DateField label="Date of birth" value={dob} onChange={setDob} />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-semibold">Dose dates</p>
        {doses.map((d, i) => (
          <div key={i} className="flex items-end gap-2">
            <div className="flex-1">
              <DateField label={`Dose ${i + 1}`} value={d} onChange={(v) => setDoses((arr) => arr.map((x, j) => (j === i ? v : x)))} />
            </div>
            <Button variant="ghost" size="icon" aria-label={`Remove dose ${i + 1}`} onClick={() => setDoses((arr) => arr.filter((_, j) => j !== i))}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        {doses.length < 6 && (
          <Button variant="outline" size="sm" onClick={() => setDoses((arr) => [...arr, ''])} className="gap-1">
            <Plus className="h-4 w-4" aria-hidden /> Add dose
          </Button>
        )}
      </div>
      {!dobD && <p className="text-sm text-destructive">Enter a valid date of birth.</p>}
      {result && (
        <div className="space-y-3">
          {result.doses.length > 0 && (
            <div className="overflow-x-auto rounded-lg border">
              <table className="table-clinical">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Age</th>
                    <th>Status</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {result.doses.map((d) => (
                    <tr key={`${d.index}-${d.date}`}>
                      <td>{d.countsAs ? `#${d.countsAs}` : '—'}</td>
                      <td className="whitespace-nowrap tabular-nums">{d.date}</td>
                      <td className="whitespace-nowrap">{d.age}</td>
                      <td>{statusBadge(d.status)}</td>
                      <td className="min-w-[14rem] text-xs">{d.notes.join(' ') || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <Result tone={result.complete ? 'good' : 'info'} title={`${vaccineNames[code]}: ${result.summary}`}>
            {result.nextEarliest && (
              <p>
                Next dose — earliest valid date: <strong className="tabular-nums">{result.nextEarliest}</strong>. {result.nextNote}
              </p>
            )}
            {!result.nextEarliest && result.nextNote && <p>{result.nextNote}</p>}
            <p className="text-xs text-muted-foreground">Earliest valid ≠ routinely recommended age. Brand-specific schedules (e.g., Hib PRP-OMP) and high-risk indications are not modeled.</p>
          </Result>
        </div>
      )}
    </ToolFrame>
  )
}

export default function Vaccines() {
  return (
    <div className="space-y-10">
      <PageHeader module={mod} refs={['aap-schedule-2026', 'acip-best-practices', 'red-book']} />
      <Callout tone="policy" title="U.S. policy status (November 2026)">
        <p>
          Federal and professional schedules diverge. A January 2026 CDC memo cut routinely recommended vaccines from 17 to 11 diseases; on March 16, 2026 a federal court (<em>AAP v. Kennedy</em>) stayed that memo and the votes of the reconstituted ACIP. An August 2026 executive order sought the same narrowing; litigation continues.
        </p>
        <p>
          This module teaches the <strong>AAP 2026 schedule</strong> (routine protection against 18 diseases; endorsed by AMA, ACOG, IDSA and others), which reflects the prior evidence reviews. Check which schedule your state, payer and institution apply.
        </p>
      </Callout>
      <OnThisPage
        items={[
          { id: 'schedule', label: 'Schedule' },
          { id: 'rsv', label: 'RSV' },
          { id: 'contra', label: 'Contraindications' },
          { id: 'catchup', label: 'Catch-up & validity' },
          { id: 'measles', label: 'Measles' },
          { id: 'counsel', label: 'Counseling' },
        ]}
      />

      <Section id="schedule" title="Routine schedule, birth to 18 years" refs={['aap-schedule-2026']}>
        <ScheduleTool />
        <DataTable
          head={['Vaccine', 'Routine doses', 'Rules that trip people up']}
          rows={[
            ['Hepatitis B', 'Birth, 1–2 mo, 6–18 mo', 'Dose 3 not before 24 wk of age. HBsAg+ mother: vaccine + HBIG ≤12 h, serology at 9–12 mo. <2,000 g with HBsAg− mother: dose 1 at 1 mo or discharge.'],
            ['Rotavirus (RV1 / RV5)', '2, 4 (, 6) mo', 'Dose 1 by 14 wk 6 d; nothing after 8 mo 0 d. Contraindicated: SCID, prior intussusception.'],
            ['DTaP', '2, 4, 6, 15–18 mo, 4–6 y', 'Dose 4 may be ≥12 mo if ≥6 mo after dose 3. Tdap at 11–12 y and in every pregnancy (27–36 wk).'],
            ['Hib', '2, 4, (6), 12–15 mo', 'PRP-OMP products need no 6-mo dose. Not routine for healthy children ≥5 y.'],
            ['Pneumococcal (PCV15 / PCV20)', '2, 4, 6, 12–15 mo', 'Risk-based PPSV23/PCV for chronic conditions after the series.'],
            ['Polio (IPV)', '2, 4, 6–18 mo, 4–6 y', 'Final dose at ≥4 y and ≥6 mo after the previous dose — even after 4 earlier doses.'],
            ['Influenza', 'Yearly from 6 mo', 'Age 6 mo–8 y: 2 doses ≥4 wk apart if <2 prior doses. Egg allergy needs no precautions.'],
            ['COVID-19 (AAP)', '6–23 mo routine; 2–18 y if increased risk or desired', 'Doses depend on product and history.'],
            ['MMR, varicella', '12–15 mo, 4–6 y', 'Live: separate injectables by ≥28 d if not same day. First dose: separate MMR + V preferred over MMRV.'],
            ['Hepatitis A', '2 doses at 12–23 mo, ≥6 mo apart', 'Catch up any unvaccinated child; 6–11 mo before international travel (doesn’t count).'],
            ['HPV', 'Start 9–12 y (AAP); 2 doses 6–12 mo apart', '3 doses if started ≥15 y or immunocompromised.'],
            ['MenACWY / MenB', '11–12 y + 16 y / 16–18 y', 'MenB for healthy teens by shared decision; routine for high risk from 10 y. MenABCWY when both due.'],
            ['RSV antibody', '1 dose <8 mo (first season)', 'Unless mother vaccinated ≥14 d before birth. High-risk 8–19 mo: nirsevimab in second season.'],
          ]}
        />
        <QuickCheck question={getQuestion('vax-hepb-birth')} />
      </Section>

      <Section id="rsv" title="RSV: protect every infant" refs={['aap-rsv-2026']}>
        <RsvTool />
        <Callout tone="pearl">
          Palivizumab is no longer recommended. Give the infant antibody even if the baby already had RSV this season, and defer it only during moderate–severe acute illness.
        </Callout>
        <QuickCheck question={getQuestion('vax-rsv-14d')} />
      </Section>

      <Section id="contra" title="True contraindications vs. common false ones" refs={['acip-best-practices']}>
        <div className="grid gap-4 md:grid-cols-2">
          <Callout tone="redflag" title="Contraindications & precautions">
            <Bullets
              items={[
                'Any vaccine: anaphylaxis to a prior dose or component → contraindication. Moderate/severe acute illness → precaution (defer).',
                'Live vaccines (MMR, varicella, LAIV): severe immunodeficiency; pregnancy.',
                'Pertussis vaccines: encephalopathy within 7 days of a prior dose.',
                'Rotavirus: SCID or history of intussusception (other immunocompromise is a precaution).',
                'MMR/VAR precautions: recent antibody-containing blood products (wait 3–11 mo), history of thrombocytopenia (MMR); MMRV: personal/family history of seizures.',
              ]}
            />
          </Callout>
          <Callout tone="action" title="NOT contraindications — vaccinate">
            <Bullets
              items={[
                'Mild illness ± fever; current antibiotics; recovering from illness',
                'Prematurity (use chronological age); breastfeeding',
                'Egg allergy (influenza, MMR); non-anaphylactic latex or penicillin allergy',
                'Pregnant or immunosuppressed household contact (avoid contact with a post-varicella rash)',
                'Family history of SIDS, adverse events or seizures (except MMRV precaution)',
                'Prior local reaction or fever after a vaccine; stable neurologic disease',
              ]}
            />
          </Callout>
        </div>
        <QuickCheck question={getQuestion('vax-mild-illness')} />
        <QuickCheck question={getQuestion('vax-mmrv')} />
      </Section>

      <Section id="catchup" title="Catch-up rules and dose validity" refs={['cdc-catchup', 'acip-best-practices']}>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel title="Principles">
            <Bullets
              items={[
                'Never restart a series — continue from where it stopped, regardless of time elapsed.',
                'A dose counts if minimum age and interval are met; the 4-day grace period applies (not to the 28-day spacing between different live vaccines).',
                'An invalid dose is repeated after the minimum interval from the invalid dose.',
                'Give every due vaccine at the same visit; use accelerated (minimum) intervals to catch up.',
                'No documentation = not vaccinated (except serology for selected antigens).',
              ]}
            />
          </Panel>
          <Panel title="Minimum ages & intervals to know">
            <Bullets
              items={[
                'DTaP/IPV/Hib/PCV/RV: minimum age 6 weeks; 4-week intervals for the early doses.',
                'HepB dose 3: ≥8 wk after dose 2, ≥16 wk after dose 1, age ≥24 wk.',
                'MMR and VAR: minimum age 12 mo; MMR doses ≥28 d apart; VAR 3 mo (<13 y), but ≥4 wk is accepted.',
                'Hib: first dose at 15–59 mo → 1 dose only. HepA doses ≥6 mo apart.',
              ]}
            />
          </Panel>
        </div>
        <ValidityTool />
        <QuickCheck question={getQuestion('vax-grace')} />
        <QuickCheck question={getQuestion('vax-live-spacing')} />
      </Section>

      <Section id="measles" title="Measles is back: what to do" refs={['measles-2026', 'mmr-acip-2013', 'red-book']}>
        <Callout tone="redflag" title="Status">
          The U.S. lost measles elimination status in November 2026 after more than a year of continuous transmission (≈2,250+ cases in 2025; &gt;5,400 by mid-November 2026). Kindergarten MMR coverage has fallen to ≈92%.
        </Callout>
        <div className="grid gap-4 md:grid-cols-3">
          <Panel title="Prevent">
            <Bullets items={['Two documented MMR doses for everyone ≥12 months', 'Infants 6–11 mo traveling internationally (or as public health advises in outbreaks): early dose — does not count', 'Health-care workers need evidence of immunity']} />
          </Panel>
          <Panel title="After exposure">
            <Bullets items={['MMR within 72 h (≥6 mo of age)', 'Or immune globulin within 6 days: IGIM 0.5 mL/kg (max 15 mL) for infants; IGIV 400 mg/kg if pregnant without immunity or severely immunocompromised', 'Exclude susceptible contacts days 5–21 after exposure']} />
          </Panel>
          <Panel title="Suspected case">
            <Bullets items={['Airborne isolation now (N95, negative pressure); mask the patient at triage', 'Call public health immediately — do not wait for results', 'Vitamin A to every child with measles', 'Infectious 4 days before to 4 days after rash onset']} />
          </Panel>
        </div>
        <QuickCheck question={getQuestion('vax-measles-pep')} />
      </Section>

      <Section id="counsel" title="Counseling that works" refs={['opel-2013', 'hviid-2019']}>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel title="Communication">
            <Bullets
              items={[
                'Use a presumptive opening (“Today she’s due for…”) — parents accept vaccines more often than with open-ended questions.',
                'If a parent hesitates, stay with your recommendation, elicit specific concerns, and use motivational interviewing.',
                'Address the concern raised, briefly, with a clear bottom line; offer to vaccinate at the next visit rather than closing the door.',
              ]}
            />
          </Panel>
          <Panel title="Evidence for common concerns">
            <Bullets
              items={[
                'MMR does not cause autism — e.g., a Danish cohort of 657,461 children found no association, including in high-risk subgroups.',
                'Spreading out vaccines adds visits and time unprotected without safety benefit.',
                'Fever after vaccination is expected and self-limited; febrile-seizure risk is small and mostly tied to MMRV as a first dose.',
              ]}
            />
          </Panel>
        </div>
        <QuickCheck question={getQuestion('vax-egg')} />
      </Section>

      <ModuleFooter module={mod} />
    </div>
  )
}
