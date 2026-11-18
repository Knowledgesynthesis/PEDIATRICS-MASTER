/**
 * Content integrity: every question, case, card, citation, quick check and tool anchor
 * must resolve. A broken id would crash a page at runtime or show a dead citation.
 */
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { questions } from './questions'
import { clinicalCases } from './cases'
import { flashcards } from './flashcards'
import { glossary } from './glossary'
import { references, refUrl } from './references'
import { modules } from './modules'
import { cdcMilestones, whoMotorWindows } from './milestones'
import { drugs } from '@/lib/clinical/dosing'

const refIds = new Set(references.map((r) => r.id))
const pagesDir = join(__dirname, '..', 'pages')
const pageSources = readdirSync(pagesDir)
  .filter((f) => f.endsWith('.tsx'))
  .map((f) => ({ file: f, src: readFileSync(join(pagesDir, f), 'utf8') }))

function allMatches(re: RegExp, src: string): string[] {
  return [...src.matchAll(re)].map((m) => m[1])
}

describe('references', () => {
  it('ids are unique and every reference has a resolvable link', () => {
    expect(refIds.size).toBe(references.length)
    for (const r of references) {
      expect(r.short.length).toBeGreaterThan(2)
      expect(r.citation.length).toBeGreaterThan(20)
      expect(refUrl(r)).toMatch(/^https:\/\//)
    }
  })

  it('every citation used in a page exists', () => {
    for (const { file, src } of pageSources) {
      const arrays = allMatches(/(?:refs|ids)=\{\[([^\]]*)\]\}/g, src)
      for (const arr of arrays) {
        for (const id of allMatches(/'([^']+)'/g, arr)) {
          expect(refIds.has(id), `${file}: unknown reference "${id}"`).toBe(true)
        }
      }
    }
  })

  it('every reference is cited somewhere (no orphans)', () => {
    const cited = new Set<string>()
    for (const { src } of pageSources) for (const arr of allMatches(/(?:refs|ids)=\{\[([^\]]*)\]\}/g, src)) for (const id of allMatches(/'([^']+)'/g, arr)) cited.add(id)
    for (const q of questions) q.refs.forEach((r) => cited.add(r))
    for (const c of clinicalCases) c.refs.forEach((r) => cited.add(r))
    for (const d of drugs) d.refs.forEach((r) => cited.add(r))
    const orphans = references.filter((r) => !cited.has(r.id)).map((r) => r.id)
    expect(orphans).toEqual([])
  })
})

describe('questions', () => {
  it('have unique ids and valid structure', () => {
    const ids = new Set<string>()
    for (const q of questions) {
      expect(ids.has(q.id), `duplicate ${q.id}`).toBe(false)
      ids.add(q.id)
      expect(q.options.length, q.id).toBeGreaterThanOrEqual(3)
      expect(new Set(q.options).size, `${q.id} has duplicate options`).toBe(q.options.length)
      expect(q.answer, q.id).toBeGreaterThanOrEqual(0)
      expect(q.answer, q.id).toBeLessThan(q.options.length)
      expect(q.explanation.length, q.id).toBeGreaterThan(40)
      for (const r of q.refs) expect(refIds.has(r), `${q.id}: unknown ref ${r}`).toBe(true)
    }
  })

  it('cover every module with at least 8 questions', () => {
    for (const m of modules) {
      expect(questions.filter((q) => q.module === m.id).length, m.id).toBeGreaterThanOrEqual(8)
    }
  })

  it('avoid "all/none of the above" (incompatible with shuffled options)', () => {
    for (const q of questions) for (const o of q.options) expect(o.toLowerCase(), q.id).not.toMatch(/(all|none|both) of the above/)
  })

  it('every quick check embedded in a page resolves', () => {
    const ids = new Set(questions.map((q) => q.id))
    for (const { file, src } of pageSources) {
      for (const id of allMatches(/getQuestion\('([^']+)'\)/g, src)) expect(ids.has(id), `${file}: unknown question "${id}"`).toBe(true)
    }
  })

  it('each question is embedded at most once across lessons', () => {
    const seen = new Map<string, string>()
    for (const { file, src } of pageSources) {
      for (const id of allMatches(/getQuestion\('([^']+)'\)/g, src)) {
        expect(seen.has(id), `${id} embedded in ${seen.get(id)} and ${file}`).toBe(false)
        seen.set(id, file)
      }
    }
  })
})

describe('cases', () => {
  it('are well formed', () => {
    const ids = new Set<string>()
    for (const c of clinicalCases) {
      expect(ids.has(c.id)).toBe(false)
      ids.add(c.id)
      expect(c.steps.length).toBeGreaterThanOrEqual(3)
      expect(c.takeaways.length).toBeGreaterThan(0)
      for (const r of c.refs) expect(refIds.has(r), `${c.id}: ${r}`).toBe(true)
      for (const s of c.steps) {
        expect(s.answer).toBeGreaterThanOrEqual(0)
        expect(s.answer).toBeLessThan(s.options.length)
        expect(new Set(s.options).size).toBe(s.options.length)
        expect(s.explanation.length, `${c.id}: explanation too thin`).toBeGreaterThan(60)
      }
    }
  })
})

describe('flashcards & glossary', () => {
  it('flashcards have unique ids and cover every module', () => {
    expect(new Set(flashcards.map((f) => f.id)).size).toBe(flashcards.length)
    for (const m of modules) expect(flashcards.some((f) => f.module === m.id), m.id).toBe(true)
  })
  it('glossary terms are unique', () => {
    expect(new Set(glossary.map((g) => g.term.toLowerCase())).size).toBe(glossary.length)
  })
})

describe('modules & tools', () => {
  it('every registered tool anchor exists on its page', () => {
    const routeFile: Record<string, string> = {
      '/growth': 'Growth.tsx',
      '/development': 'Development.tsx',
      '/vaccines': 'Vaccines.tsx',
      '/congenital': 'Congenital.tsx',
      '/infections': 'Infections.tsx',
      '/fever': 'Fever.tsx',
      '/dehydration': 'Dehydration.tsx',
      '/febrile-seizure': 'FebrileSeizure.tsx',
      '/acute-care': 'AcuteCare.tsx',
    }
    for (const m of modules) {
      const page = pageSources.find((p) => p.file === routeFile[m.path])
      expect(page, m.path).toBeDefined()
      for (const t of m.tools) expect(page!.src.includes(`id="${t.id}"`), `${m.path} missing #${t.id}`).toBe(true)
    }
  })

  it('module numbers are sequential', () => {
    modules.forEach((m, i) => expect(m.number).toBe(i + 1))
  })
})

describe('milestone data', () => {
  it('ages ascend and every age has all four domains', () => {
    for (let i = 1; i < cdcMilestones.length; i++) expect(cdcMilestones[i].months).toBeGreaterThan(cdcMilestones[i - 1].months)
    for (const a of cdcMilestones) for (const d of ['social', 'language', 'cognitive', 'movement'] as const) expect(a.items[d].length, `${a.label} ${d}`).toBeGreaterThan(0)
  })
  it('WHO windows are internally consistent', () => {
    for (const w of whoMotorWindows) {
      expect(w.p1).toBeLessThan(w.median)
      expect(w.median).toBeLessThan(w.p99)
    }
  })
})

describe('answer-position balance', () => {
  it('correct answers are spread across display positions (no gaming by position)', async () => {
    const { shuffledOrder } = await import('@/lib/shuffle')
    const items = [
      ...questions.map((q) => ({ id: q.id, n: q.options.length, answer: q.answer })),
      ...clinicalCases.flatMap((c) => c.steps.map((s, i) => ({ id: `${c.id}#${i}`, n: s.options.length, answer: s.answer }))),
    ]
    const counts = [0, 0, 0, 0, 0]
    for (const it of items) counts[shuffledOrder(it.id, it.n).indexOf(it.answer)]++
    const share = counts.slice(0, 4).map((c) => c / items.length)
    for (const s of share) {
      expect(s).toBeGreaterThan(0.15)
      expect(s).toBeLessThan(0.35)
    }
  })

  it('shuffle is a deterministic permutation', async () => {
    const { shuffledOrder } = await import('@/lib/shuffle')
    const a = shuffledOrder('x', 4)
    expect([...a].sort()).toEqual([0, 1, 2, 3])
    expect(shuffledOrder('x', 4)).toEqual(a)
  })
})
