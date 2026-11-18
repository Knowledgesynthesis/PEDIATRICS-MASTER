# Pediatrics Master

Evidence-based pediatrics as an interactive, offline-capable web app. Nine modules take a learner from well-child care to emergencies. Each module has stated objectives, concise guideline-backed content, interactive bedside tools and built-in retrieval practice. Clinical cases, a question bank and rapid-review cards follow to make the knowledge stick.

Content was checked against current guidance in **November 2026** (see `src/content/meta.ts`).

## What's inside

| | |
|---|---|
| **9 modules** | Growth & well-child care · Development · Immunizations · Newborn & congenital · Respiratory & ENT infections · Fever & serious infection · Fluids & dehydration · Febrile seizures · Emergencies & dosing |
| **24 interactive tools** | e.g., AAP 2021 febrile-infant pathway, ACIP dose-validity checker, RSV protection decision, CCHD pulse-ox algorithm, bilirubin rate of rise, Westley score, AAP 2013 AOM decision, McIsaac score, Clinical Dehydration Scale, WHO plans A/B/C, ORT planner, Holliday–Segar, febrile-seizure classifier, PAT, vitals & resuscitation card, weight-based dose calculator (30+ drugs with per-dose maximums), status-epilepticus timer |
| **97 questions** | Board-style; each explanation covers why the answer is right and why the distractors are wrong, with sources. Options are shuffled deterministically. |
| **17 cases** | Stepwise synthetic patients where new information is revealed after each decision |
| **72 review cards** | High-yield numbers and rules for spaced recall |
| **94 references** | Every recommendation links to its source (`/references`) |

Learning design: objectives → content → quick check → tool → module quiz → cases → interleaved mixed exams and flashcards (retrieval practice, spacing, interleaving). Answers are kept in memory for the current session only. Nothing is persisted except the theme preference.

## Evidence policy

- **One source of truth for citations:** `src/content/references.ts`. Pages, questions, cases and drugs cite reference ids, and tests fail if any id is unknown or any reference is unused.
- **Links:** a DOI or official URL is used only when it is stable. Otherwise the link opens a PubMed search for the article title.
- **Contested areas say so.** Immunizations teach the AAP 2026 schedule and summarize the status of the federal schedule litigation (*AAP v. Kennedy*) in one short note.
- **No invented precision.** Where a guideline leaves something as an option (for example, LP for febrile infants 22–28 days with normal markers), the tool reports it as an option.

### Updating content

1. Edit the module page (`src/pages/*.tsx`) or content file (`src/content/*`).
2. Add or update the source in `src/content/references.ts` and cite it by id.
3. Update `CONTENT_REVIEWED` in `src/content/meta.ts`.
4. Run `npm run check`.

## Development

```bash
npm install
npm run dev        # local dev server
npm run test       # 104 unit + content-integrity tests
npm run lint       # zero-warning ESLint
npm run build      # type-check + production build (PWA)
npm run check      # all of the above
```

Stack: React 18, TypeScript (strict), Vite 7, Tailwind CSS 3, React Router 7, Zustand, vite-plugin-pwa, Vitest.

### Project layout

```
src/
  lib/clinical/      pure, unit-tested calculators (dosing, fluids, vaccines, febrile infant, …)
  content/           references, modules, questions, cases, flashcards, glossary, milestones
  components/learn/  lesson building blocks (Section, Callout, ToolFrame, QuestionCard, controls)
  pages/             one page per module + practice/reference pages
```

### Testing

- `src/lib/clinical/*.test.ts`: boundary and guideline-example tests for every calculator (e.g., ACIP grace period, IPV final-dose rule, ondansetron weight-band edges, CCHD repeat logic, febrile-infant age bands).
- `src/content/content.test.ts`: every quick check, citation and tool anchor resolves; no orphan references; questions are well formed; correct answers are balanced across display positions.

### Deployment

The app is a single-page app using `BrowserRouter`. Configure the static host to serve `index.html` for unknown paths (SPA fallback). After the first load, the service worker serves every route offline.

---

For education. All cases are synthetic. Confirm doses and recommendations against current guidelines and local protocols before clinical use.
