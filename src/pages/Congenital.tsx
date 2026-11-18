import { useState } from 'react'
import { moduleById } from '@/content/modules'
import { getQuestion } from '@/content/questions'
import { Bullets, DataTable, ModuleFooter, OnThisPage, PageHeader, Panel, Section, ToolFrame } from '@/components/learn/Blocks'
import { Callout } from '@/components/learn/Callout'
import { NumberField, Result, Segmented } from '@/components/learn/Controls'
import { QuickCheck } from '@/components/learn/QuestionCard'
import { cchdScreen } from '@/lib/clinical/cchd'
import { bilirubinRateOfRise, escalationThreshold, phototherapyStopLevel } from '@/lib/clinical/bilirubin'
import { num } from '@/lib/utils'

const mod = moduleById.newborn

function CchdTool() {
  const [rh, setRh] = useState('97')
  const [foot, setFoot] = useState('93')
  const [attempt, setAttempt] = useState<1 | 2>(1)
  const r = num(rh)
  const f = num(foot)
  const valid = r !== null && f !== null && r >= 50 && r <= 100 && f >= 50 && f <= 100
  const out = valid ? cchdScreen(r, f, attempt) : null
  return (
    <ToolFrame id="tool-cchd" title="CCHD pulse-oximetry screen (2020 algorithm)" description="Screen at ≥24 h of age. Right hand = pre-ductal; foot = post-ductal." refs={['cchd-2020']}>
      <div className="grid gap-4 sm:grid-cols-3">
        <NumberField label="Right hand SpO₂" value={rh} onChange={setRh} unit="%" min={50} max={100} />
        <NumberField label="Foot SpO₂" value={foot} onChange={setFoot} unit="%" min={50} max={100} />
        <Segmented label="Screen" value={attempt} onChange={setAttempt} options={[{ value: 1, label: 'First' }, { value: 2, label: 'Repeat (1 h later)' }]} />
      </div>
      {out && (
        <Result tone={out.result === 'pass' ? 'good' : out.result === 'repeat' ? 'warn' : 'bad'} title={out.result === 'pass' ? 'PASS' : out.result === 'repeat' ? 'REPEAT in 1 hour' : 'FAIL'}>
          <p>{out.explanation}</p>
          {out.result === 'fail' && <p>Evaluate for hypoxemia (infection, pulmonary disease). If no other cause, a diagnostic echocardiogram is required before discharge.</p>}
          {out.result === 'pass' && <p>A pass does not exclude all heart disease (e.g., coarctation can be missed) — keep examining pulses and murmurs.</p>}
        </Result>
      )}
    </ToolFrame>
  )
}

function BiliTool() {
  const [t1, setT1] = useState('6.0')
  const [h1, setH1] = useState('20')
  const [t2, setT2] = useState('9.5')
  const [h2, setH2] = useState('30')
  const [exchange, setExchange] = useState('')
  const [started, setStarted] = useState('')
  const a = num(t1)
  const b = num(t2)
  const x = num(h1)
  const y = num(h2)
  const rate = a !== null && b !== null && x !== null && y !== null ? bilirubinRateOfRise(a, x, b, y) : null
  const ex = num(exchange)
  const st = num(started)
  return (
    <ToolFrame id="tool-bili" title="Bilirubin rate of rise & escalation" description="Get the threshold values for your infant from the AAP 2022 figures or BiliTool, then use this to interpret trajectory." refs={['aap-bili-2022', 'bilitool']}>
      <div className="grid gap-4 sm:grid-cols-4">
        <NumberField label="TSB 1" value={t1} onChange={setT1} unit="mg/dL" min={0} max={40} />
        <NumberField label="Age at TSB 1" value={h1} onChange={setH1} unit="h" min={0} max={400} />
        <NumberField label="TSB 2" value={t2} onChange={setT2} unit="mg/dL" min={0} max={40} />
        <NumberField label="Age at TSB 2" value={h2} onChange={setH2} unit="h" min={0} max={400} />
      </div>
      {rate ? (
        <Result tone={rate.suggestsHemolysis ? 'bad' : 'good'} title={`Rate of rise: ${rate.mgPerDlPerHour} mg/dL/h`}>
          <p>
            {rate.suggestsHemolysis
              ? `Meets the hemolysis rule (${rate.rule}). Check DAT (if not done), CBC with smear and reticulocytes, consider G6PD; repeat TSB per threshold proximity.`
              : `Below the hemolysis rule (${rate.rule}).`}
          </p>
        </Result>
      ) : (
        <p className="text-sm text-muted-foreground">Enter two values with the second at a later age.</p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField label="Exchange-transfusion threshold (from BiliTool)" value={exchange} onChange={setExchange} unit="mg/dL" min={5} max={40} />
        <NumberField label="Phototherapy threshold when it was started" value={started} onChange={setStarted} unit="mg/dL" min={5} max={40} />
      </div>
      {(ex !== null || st !== null) && (
        <Result tone="info" title="Action levels">
          {ex !== null && (
            <p>
              Escalation of care at <strong>{escalationThreshold(ex)} mg/dL</strong> (exchange − 2): intensive phototherapy, IV hydration if needed, TSB every 2 h, CBC/type & cross-match, IVIG for isoimmune hemolysis, and NICU/exchange-capable transfer.
            </p>
          )}
          {st !== null && (
            <p>
              Phototherapy may stop once TSB is ≤ <strong>{phototherapyStopLevel(st)} mg/dL</strong> (2 mg/dL below the starting threshold); check rebound per risk.
            </p>
          )}
        </Result>
      )}
    </ToolFrame>
  )
}

export default function Congenital() {
  return (
    <div className="space-y-10">
      <PageHeader module={mod} refs={['cchd-2020', 'aap-bili-2022', 'aap-down-2022', 'red-book']} />
      <OnThisPage
        items={[
          { id: 'screening', label: 'Newborn screening' },
          { id: 'cchd', label: 'CCHD screen' },
          { id: 'jaundice', label: 'Jaundice' },
          { id: 'heart', label: 'Murmurs & CHD' },
          { id: 'syndromes', label: 'Syndromes' },
          { id: 'infections', label: 'Congenital infections' },
        ]}
      />

      <Section id="screening" title="Newborn screening: what each positive result means" refs={['aap-ch-2023', 'acmg-pku-2014']}>
        <DataTable
          head={['Condition', 'Why it matters', 'First action on a positive screen']}
          rows={[
            ['Congenital hypothyroidism', 'Most common treatable cause of intellectual disability', 'Serum TSH + free T4 now; start levothyroxine 10–15 mcg/kg/day as soon as confirmed (ideally by 2 weeks)'],
            ['PKU', 'Phenylalanine toxicity → intellectual disability', 'Confirm and start Phe-restricted diet promptly; lifelong target Phe 120–360 µmol/L; BH4-responsive forms may use sapropterin'],
            ['Congenital adrenal hyperplasia (21-OH)', 'Salt-wasting crisis at 1–3 weeks; atypical genitalia in 46,XX', 'Same-day electrolytes and 17-OHP; endocrinology; stress-dose hydrocortisone if ill'],
            ['Galactosemia', 'Jaundice, liver failure, E. coli sepsis after milk feeds', 'Stop lactose (soy formula) immediately while confirming'],
            ['MCAD deficiency', 'Hypoketotic hypoglycemia and sudden death with fasting', 'Avoid fasting; emergency letter with IV dextrose plan'],
            ['SCID (low TRECs)', 'Fatal infections; curable with early transplant', 'Lymphocyte subsets; no live vaccines (incl. rotavirus); irradiated CMV-negative blood'],
            ['Sickle cell disease', 'Pneumococcal sepsis risk', 'Penicillin prophylaxis by 2 months until ≥5 years; fever = emergency'],
            ['Cystic fibrosis (IRT ± DNA)', 'Early nutrition improves outcomes', 'Sweat chloride at an accredited CF center'],
            ['Spinal muscular atrophy', 'Disease-modifying therapy works best pre-symptomatically', 'Urgent neuromuscular referral'],
          ]}
        />
        <Bullets
          items={[
            'Collect at 24–48 h; repeat if collected <24 h, after transfusion, or per state protocol (some states test twice routinely).',
            'Hearing “1-3-6”: screen by 1 month, diagnose by 3 months, intervene by 6 months.',
            'A normal screen does not exclude disease — act on symptoms.',
          ]}
        />
        <QuickCheck question={getQuestion('nb-ch')} />
      </Section>

      <Section id="cchd" title="Critical congenital heart disease screening" refs={['cchd-2020']}>
        <CchdTool />
        <QuickCheck question={getQuestion('nb-cchd-repeat')} />
        <QuickCheck question={getQuestion('nb-cchd-fail')} />
      </Section>

      <Section id="jaundice" title="Neonatal hyperbilirubinemia — AAP 2022 (≥35 weeks)" refs={['aap-bili-2022']}>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel title="What changed in 2022">
            <Bullets
              items={[
                'Phototherapy and exchange thresholds rose modestly and are now based on gestational age (35–40+ weeks) and presence of neurotoxicity risk factors.',
                'Universal TcB or TSB before discharge; visual estimation is unreliable.',
                'New escalation-of-care threshold = exchange threshold − 2 mg/dL.',
                'Post-discharge follow-up timing is set by how close TSB/TcB is to the phototherapy threshold.',
                'Phototherapy can stop when TSB falls ≥2 mg/dL below the threshold at initiation.',
              ]}
            />
          </Panel>
          <Callout tone="redflag" title="Neurotoxicity risk factors (lower the thresholds)">
            <Bullets
              items={['Gestational age <38 weeks (more so the earlier)', 'Albumin <3.0 g/dL', 'Isoimmune hemolytic disease (positive DAT), G6PD deficiency or other hemolysis', 'Sepsis', 'Significant clinical instability in the past 24 h']}
            />
          </Callout>
        </div>
        <Panel title="Rules you will use daily">
          <Bullets
            items={[
              'Jaundice in the first 24 h → measure TSB/TcB immediately.',
              'Mother’s antibody screen positive or unknown → infant DAT.',
              'Rate of rise ≥0.3 mg/dL/h (<24 h) or ≥0.2 mg/dL/h (later) suggests hemolysis.',
              'Support breastfeeding (8–12 feeds/day); do not give water or dextrose water.',
              'Jaundice beyond 2 weeks (3 weeks preterm) → total + direct bilirubin; direct ≥1.0 mg/dL is abnormal (biliary atresia until proven otherwise; use a stool color card).',
            ]}
          />
        </Panel>
        <BiliTool />
        <QuickCheck question={getQuestion('nb-jaundice-24h')} />
        <QuickCheck question={getQuestion('nb-rate-of-rise')} />
        <QuickCheck question={getQuestion('nb-cholestasis')} />
      </Section>

      <Section id="heart" title="Murmurs and congenital heart disease" refs={['aha-ie-2021', 'beneductus-2023']}>
        <DataTable
          head={['Feature', 'Innocent', 'Pathologic until proven otherwise']}
          rows={[
            ['Timing', 'Systolic (venous hum is continuous)', 'Holosystolic, diastolic, or continuous (non-venous)'],
            ['Intensity / quality', '≤2/6; vibratory, musical, or soft blowing', '≥3/6 or thrill; harsh'],
            ['S2 and extra sounds', 'Normal split S2', 'Fixed split, single or loud S2; clicks; gallop'],
            ['Position', 'Softer standing (Still’s); hum disappears supine/neck turn', 'Louder with standing/Valsalva (HCM)'],
            ['Child', 'Thriving, normal pulses and SpO₂', 'Poor feeding, sweating with feeds, FTT, syncope, abnormal pulses or SpO₂'],
          ]}
        />
        <QuickCheck question={getQuestion('nb-stills')} />
        <DataTable
          head={['Lesion', 'Key findings', 'What to do']}
          rows={[
            ['VSD (most common)', 'Holosystolic LLSB murmur; small = loud. Large → heart failure at 4–8 wk as PVR falls', 'Small muscular: watch (most close). Large: diuretics, high-calorie feeds, surgical closure if failure/FTT or pulmonary hypertension'],
            ['ASD (secundum)', 'Wide fixed split S2; soft ULSB flow murmur; ECG RAD, rSR′ V1; usually asymptomatic', 'Small often close; device closure ~2–5 y if RV enlargement'],
            ['PDA', 'Continuous “machinery” murmur, left infraclavicular; bounding pulses', 'Term: catheter closure if hemodynamically significant. Preterm: expectant management is often non-inferior (BeNeDuctus 2023); ibuprofen/indomethacin/acetaminophen when treating'],
            ['AVSD', 'Down syndrome; superior (left) QRS axis; heart failure', 'Repair at ~3–6 months'],
            ['Coarctation', 'Arm > leg BP, weak/delayed femorals; bicuspid valve common; Turner', 'Neonatal: shock as duct closes → PGE1; repair. Older: hypertension, rib notching'],
            ['Tetralogy of Fallot', 'Harsh ULSB ejection murmur, single S2; boot-shaped heart; 22q11.2', 'Tet spell: calm, knee-chest, O₂, IV fluid, opioid (morphine/IN fentanyl), phenylephrine, β-blocker. Repair in infancy'],
            ['Transposition (TGA)', 'Profound cyanosis day 1, often no murmur; “egg on a string”', 'PGE1, balloon atrial septostomy if restrictive; arterial switch in first weeks'],
            ['Hypoplastic left heart', 'Shock and acidosis as duct closes (days 2–7)', 'PGE1; staged palliation (Norwood → Glenn → Fontan)'],
          ]}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Callout tone="action" title="Duct-dependent lesion? Start PGE1">
            <p>Shock or cyanosis in the first weeks with weak femorals or failed oximetry: alprostadil 0.01–0.05 mcg/kg/min (up to 0.1). Expect apnea — be ready to support the airway. Do not wait for the echo if the picture fits.</p>
          </Callout>
          <Panel title="Endocarditis prophylaxis (dental) — AHA" refs={['aha-ie-2021']}>
            <Bullets
              items={['Prosthetic valve or prosthetic repair material', 'Previous infective endocarditis', 'Unrepaired cyanotic CHD (incl. palliative shunts)', 'Repaired CHD with prosthetic material: first 6 months, or residual defect at the repair site', 'Cardiac transplant with valvulopathy', 'Not for isolated VSD, ASD, PDA or MVP']}
            />
          </Panel>
        </div>
        <QuickCheck question={getQuestion('nb-duct')} />
        <QuickCheck question={getQuestion('nb-ie')} />
      </Section>

      <Section id="syndromes" title="Genetic syndromes: diagnose, then supervise" refs={['aap-down-2022', 'turner-2024']}>
        <DataTable
          head={['Syndrome', 'Recognize', 'Confirm', 'Must-do surveillance']}
          rows={[
            [
              'Down (trisomy 21)',
              'Hypotonia, upslanting fissures, flat profile, single transverse palmar crease, sandal gap; AVSD, duodenal atresia, Hirschsprung',
              'Karyotype (≈95% nondisjunction; translocation affects recurrence risk)',
              'Echo, CBC (transient abnormal myelopoiesis), TSH and hearing at birth; TSH at 6 and 12 mo then yearly; eye exam by 6 mo; sleep study by 4 y; no routine C-spine films; celiac testing only if symptomatic',
            ],
            [
              '22q11.2 deletion',
              'Conotruncal defects (TOF, truncus, interrupted arch), hypocalcemia, thymic hypoplasia, palatal anomalies, learning and psychiatric issues',
              'Chromosomal microarray (or FISH)',
              'Ionized calcium, CBC + lymphocyte subsets; hold live vaccines and use irradiated CMV-negative blood until T-cell function is known; speech/palate evaluation',
            ],
            [
              'Turner (45,X and variants)',
              'Short stature (nearly all), lymphedema at birth, webbed neck, primary ovarian insufficiency; bicuspid aortic valve, coarctation',
              'Karyotype (≥30 cells); Y material → gonadectomy',
              'Echo + cardiac MRI, BP; renal ultrasound; audiology; TSH, celiac, liver tests, HbA1c periodically; growth hormone early; estrogen at 11–12 y',
            ],
            [
              'Klinefelter (47,XXY)',
              'Tall, small firm testes, gynecomastia, language/learning difficulty; most never diagnosed',
              'Karyotype; high FSH/LH, low testosterone after puberty',
              'Testosterone at puberty when needed; fertility counseling (sperm retrieval); educational support',
            ],
            [
              'Fragile X',
              'Most common inherited ID; long face, large ears, macroorchidism after puberty, autism features',
              'FMR1 CGG repeat analysis (>200 = full mutation)',
              'Developmental and behavioral services; family testing (premutation: ovarian insufficiency, tremor-ataxia)',
            ],
          ]}
        />
        <QuickCheck question={getQuestion('nb-down')} />
      </Section>

      <Section id="infections" title="Congenital and perinatal infections" refs={['cmv-consensus-2017', 'valgan-2015', 'cdc-sti-2021', 'red-book']}>
        <DataTable
          head={['Infection', 'Clues', 'Diagnose', 'Treat / prevent']}
          rows={[
            ['CMV (most common)', '≈90% asymptomatic at birth; petechiae, microcephaly, periventricular calcifications; leading non-genetic cause of SNHL', 'Urine or saliva PCR <21 days (confirm saliva with urine)', 'Valganciclovir 16 mg/kg BID × 6 months for moderate–severe symptomatic disease, started within the first month; serial hearing tests. Some states now screen all newborns'],
            ['Syphilis (rising)', 'Snuffles, rash on palms/soles, hepatosplenomegaly, periostitis, anemia; late: Hutchinson teeth, saddle nose, saber shins', 'Compare infant and maternal RPR titers; exam, CBC, long-bone films, CSF', 'Aqueous penicillin G 50,000 U/kg IV q12h (≤7 d of age) then q8h, total 10 days. Screen every pregnancy, with repeat testing in the 3rd trimester and at delivery where indicated'],
            ['HSV', 'Vesicles, seizures, sepsis-like illness, hepatitis at 1–4 weeks; most mothers have no known history', 'Surface, blood and CSF PCR; ALT', 'Acyclovir 20 mg/kg IV q8h: 14 days (skin/eye/mouth) or ≥21 days (CNS/disseminated), then oral suppression × 6 months'],
            ['Toxoplasmosis', 'Chorioretinitis, hydrocephalus, diffuse calcifications; most asymptomatic at birth', 'Serology (IgG/IgM/IgA), PCR, eye exam, head imaging', 'Pyrimethamine + sulfadiazine + folinic acid × 12 months'],
            ['Rubella', 'Cataracts, SNHL, PDA/peripheral PS, “blueberry muffin” rash', 'IgM, PCR', 'Supportive; prevented by MMR before pregnancy'],
            ['Varicella', 'Limb hypoplasia, cicatricial scars (maternal infection 8–20 wk)', 'Clinical, PCR', 'Maternal rash 5 days before to 2 days after delivery → infant VariZIG'],
            ['Zika', 'Severe microcephaly, subcortical calcifications, eye anomalies, contractures', 'Maternal/infant PCR and IgM', 'Supportive; travel counseling'],
          ]}
        />
        <QuickCheck question={getQuestion('nb-ccmv')} />
      </Section>

      <ModuleFooter module={mod} />
    </div>
  )
}
