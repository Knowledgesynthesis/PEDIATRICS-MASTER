/**
 * Weight-based pediatric dosing for high-yield drugs.
 * Every entry states the per-dose maximum; results are capped and flagged.
 * Sources: AAP Red Book 2024–27, IDSA GAS 2012, AAP AOM 2013, PIDS/IDSA CAP 2011, AES 2016 + ESETT,
 * AAP/AAAAI anaphylaxis, CDC influenza antivirals, Freedman 2006 (ondansetron), PALS 2020.
 */

export type DoseUnit = 'mg' | 'mg PE' | 'mL' | 'units' | 'g'

export type DrugCategory = 'Analgesia & fever' | 'Antimicrobials' | 'Respiratory' | 'GI' | 'Emergency & resuscitation' | 'Seizures'

interface BaseDrug {
  id: string
  name: string
  category: DrugCategory
  indication: string
  route: string
  frequency: string
  notes?: string
  refs: string[]
}

export interface PerKgDrug extends BaseDrug {
  kind: 'per-kg'
  /** Dose per kg; a [low, high] tuple yields a range. */
  perKg: number | [number, number]
  unit: DoseUnit
  maxDose?: number
  /** Concentration for volume calculation (unit per mL). */
  concentration?: { perMl: number; label: string }
  maxDaily?: string
}

export interface BandDrug extends BaseDrug {
  kind: 'band'
  /**
   * Ordered bands. A band applies when weight < maxKg, or weight ≤ maxKg if `inclusive`.
   * Boundaries follow each source exactly (e.g., ondansetron "8–15 kg" includes 15 kg).
   */
  bands: { maxKg: number; inclusive?: boolean; dose: string }[]
}

export type Drug = PerKgDrug | BandDrug

export const drugs: Drug[] = [
  // Analgesia & fever
  {
    id: 'acetaminophen',
    kind: 'per-kg',
    name: 'Acetaminophen (paracetamol)',
    category: 'Analgesia & fever',
    indication: 'Pain / fever discomfort',
    route: 'PO',
    perKg: 15,
    unit: 'mg',
    maxDose: 1000,
    frequency: 'q6h PRN (10–15 mg/kg q4–6h; ≤5 doses/24 h)',
    maxDaily: '75 mg/kg/day, not to exceed 4,000 mg/day',
    concentration: { perMl: 32, label: '160 mg/5 mL' },
    notes: 'Infants <3 months with fever need clinical evaluation before antipyretics. Treat discomfort, not the number.',
    refs: ['aap-fever-2011'],
  },
  {
    id: 'ibuprofen',
    kind: 'per-kg',
    name: 'Ibuprofen',
    category: 'Analgesia & fever',
    indication: 'Pain / fever discomfort (age ≥6 months)',
    route: 'PO',
    perKg: 10,
    unit: 'mg',
    maxDose: 400,
    frequency: 'q6–8h PRN',
    maxDaily: '40 mg/kg/day (OTC max 1,200 mg/day)',
    concentration: { perMl: 20, label: '100 mg/5 mL' },
    notes: 'Avoid if dehydrated, vomiting, or suspected varicella. Infant drops are 50 mg/1.25 mL (40 mg/mL) — check the product.',
    refs: ['aap-fever-2011'],
  },
  // Antimicrobials
  {
    id: 'amoxicillin-high',
    kind: 'per-kg',
    name: 'Amoxicillin (high dose)',
    category: 'Antimicrobials',
    indication: 'AOM; community-acquired pneumonia',
    route: 'PO',
    perKg: 45,
    unit: 'mg',
    maxDose: 2000,
    frequency: 'BID (= 90 mg/kg/day)',
    maxDaily: '4,000 mg/day',
    concentration: { perMl: 80, label: '400 mg/5 mL' },
    notes: 'AOM: 10 d if <2 y or severe; 7 d at 2–5 y; 5–7 d at ≥6 y. CAP: 5 days total for uncomplicated outpatient pneumonia (SCOUT-CAP, CAP-IT).',
    refs: ['aap-aom-2013', 'pids-cap-2011', 'scout-cap-2022'],
  },
  {
    id: 'amoxicillin-gas',
    kind: 'per-kg',
    name: 'Amoxicillin (strep pharyngitis)',
    category: 'Antimicrobials',
    indication: 'Group A strep pharyngitis',
    route: 'PO',
    perKg: 50,
    unit: 'mg',
    maxDose: 1000,
    frequency: 'Once daily × 10 days (or 25 mg/kg BID, max 500 mg/dose)',
    concentration: { perMl: 80, label: '400 mg/5 mL' },
    refs: ['idsa-gas-2012'],
  },
  {
    id: 'amox-clav',
    kind: 'per-kg',
    name: 'Amoxicillin–clavulanate ES-600 (14:1)',
    category: 'Antimicrobials',
    indication: 'AOM with β-lactamase risk; amoxicillin failure',
    route: 'PO',
    perKg: 45,
    unit: 'mg',
    maxDose: 2000,
    frequency: 'BID (= 90 mg/kg/day amoxicillin component)',
    concentration: { perMl: 120, label: '600 mg/5 mL (amoxicillin)' },
    notes: 'Use the 14:1 formulation to limit clavulanate (diarrhea).',
    refs: ['aap-aom-2013'],
  },
  {
    id: 'cefdinir',
    kind: 'per-kg',
    name: 'Cefdinir',
    category: 'Antimicrobials',
    indication: 'AOM with non-severe penicillin allergy',
    route: 'PO',
    perKg: 14,
    unit: 'mg',
    maxDose: 600,
    frequency: 'Once daily (or 7 mg/kg BID)',
    concentration: { perMl: 50, label: '250 mg/5 mL' },
    notes: 'Red stools with iron-containing foods are harmless.',
    refs: ['aap-aom-2013'],
  },
  {
    id: 'cephalexin-gas',
    kind: 'per-kg',
    name: 'Cephalexin (strep pharyngitis)',
    category: 'Antimicrobials',
    indication: 'GAS pharyngitis, non-anaphylactic penicillin allergy',
    route: 'PO',
    perKg: 20,
    unit: 'mg',
    maxDose: 500,
    frequency: 'BID × 10 days',
    concentration: { perMl: 50, label: '250 mg/5 mL' },
    notes: 'Shares a side chain with amoxicillin — avoid after amoxicillin anaphylaxis.',
    refs: ['idsa-gas-2012', 'drug-allergy-2022'],
  },
  {
    id: 'clindamycin-gas',
    kind: 'per-kg',
    name: 'Clindamycin (strep pharyngitis)',
    category: 'Antimicrobials',
    indication: 'GAS pharyngitis, anaphylactic penicillin allergy',
    route: 'PO',
    perKg: 7,
    unit: 'mg',
    maxDose: 300,
    frequency: 'TID × 10 days',
    concentration: { perMl: 15, label: '75 mg/5 mL' },
    refs: ['idsa-gas-2012'],
  },
  {
    id: 'azithro-gas',
    kind: 'per-kg',
    name: 'Azithromycin (strep pharyngitis)',
    category: 'Antimicrobials',
    indication: 'GAS pharyngitis, anaphylactic penicillin allergy',
    route: 'PO',
    perKg: 12,
    unit: 'mg',
    maxDose: 500,
    frequency: 'Once daily × 5 days',
    concentration: { perMl: 40, label: '200 mg/5 mL' },
    notes: 'Macrolide resistance in GAS is common in some regions — check local data.',
    refs: ['idsa-gas-2012'],
  },
  {
    id: 'azithro-cap',
    kind: 'per-kg',
    name: 'Azithromycin (atypical pneumonia)',
    category: 'Antimicrobials',
    indication: 'Suspected M. pneumoniae CAP (school age)',
    route: 'PO',
    perKg: 10,
    unit: 'mg',
    maxDose: 500,
    frequency: 'Day 1; then 5 mg/kg (max 250 mg) daily on days 2–5',
    concentration: { perMl: 40, label: '200 mg/5 mL' },
    notes: 'Do not add routinely to amoxicillin. Amoxicillin–clavulanate does NOT cover atypical organisms.',
    refs: ['pids-cap-2011'],
  },
  {
    id: 'ceftriaxone',
    kind: 'per-kg',
    name: 'Ceftriaxone (standard)',
    category: 'Antimicrobials',
    indication: 'Serious bacterial infection (non-CNS); AOM failure (IM × 1–3 d)',
    route: 'IV/IM',
    perKg: 50,
    unit: 'mg',
    maxDose: 2000,
    frequency: 'q24h (AOM: max 1 g IM)',
    notes: 'Avoid in hyperbilirubinemic neonates and with concurrent IV calcium in neonates.',
    refs: ['red-book', 'aap-aom-2013'],
  },
  {
    id: 'ceftriaxone-mening',
    kind: 'per-kg',
    name: 'Ceftriaxone (meningitic dosing)',
    category: 'Antimicrobials',
    indication: 'Suspected bacterial meningitis (>28 days), with vancomycin',
    route: 'IV',
    perKg: 50,
    unit: 'mg',
    maxDose: 2000,
    frequency: 'q12h (= 100 mg/kg/day, max 4 g/day)',
    refs: ['red-book'],
  },
  {
    id: 'acyclovir-neonatal',
    kind: 'per-kg',
    name: 'Acyclovir (neonatal HSV)',
    category: 'Antimicrobials',
    indication: 'Suspected/confirmed neonatal HSV',
    route: 'IV',
    perKg: 20,
    unit: 'mg',
    frequency: 'q8h (14 d SEM; ≥21 d CNS/disseminated)',
    notes: 'Hydrate; monitor renal function and ANC. Follow with oral suppression × 6 months.',
    refs: ['red-book'],
  },
  {
    id: 'oseltamivir',
    kind: 'band',
    name: 'Oseltamivir (treatment)',
    category: 'Antimicrobials',
    indication: 'Influenza: hospitalized, severe, or high risk (<5 y, chronic conditions) — start ASAP regardless of symptom duration',
    route: 'PO',
    frequency: 'BID × 5 days',
    bands: [
      { maxKg: 15, inclusive: true, dose: '30 mg BID (age ≥1 y). Age <1 y: 3 mg/kg/dose BID.' },
      { maxKg: 23, inclusive: true, dose: '45 mg BID' },
      { maxKg: 40, inclusive: true, dose: '60 mg BID' },
      { maxKg: Infinity, dose: '75 mg BID' },
    ],
    notes: 'Bands: ≤15 kg, >15–23 kg, >23–40 kg, >40 kg. Suspension 6 mg/mL.',
    refs: ['cdc-flu-antivirals', 'aap-flu-2026'],
  },
  {
    id: 'pen-v',
    kind: 'band',
    name: 'Penicillin V (strep pharyngitis)',
    category: 'Antimicrobials',
    indication: 'GAS pharyngitis',
    route: 'PO',
    frequency: '× 10 days',
    bands: [
      { maxKg: 27, inclusive: true, dose: '250 mg BID or TID' },
      { maxKg: Infinity, dose: '500 mg BID or TID' },
    ],
    refs: ['idsa-gas-2012'],
  },
  {
    id: 'bpg',
    kind: 'band',
    name: 'Benzathine penicillin G (strep pharyngitis)',
    category: 'Antimicrobials',
    indication: 'GAS pharyngitis — adherence concerns',
    route: 'IM, single dose',
    frequency: 'Once',
    bands: [
      { maxKg: 27, dose: '600,000 units IM' },
      { maxKg: Infinity, dose: '1,200,000 units IM' },
    ],
    refs: ['idsa-gas-2012'],
  },
  // Respiratory
  {
    id: 'dexamethasone-croup',
    kind: 'per-kg',
    name: 'Dexamethasone (croup)',
    category: 'Respiratory',
    indication: 'Croup — all severities',
    route: 'PO (IM/IV if vomiting or severe)',
    perKg: 0.6,
    unit: 'mg',
    maxDose: 10,
    frequency: 'Single dose',
    concentration: { perMl: 1, label: '1 mg/mL oral' },
    notes: '0.15–0.3 mg/kg appears similarly effective. Some protocols cap at 16 mg. Prednisolone 1 mg/kg is an alternative.',
    refs: ['croup-dex-dose-2019', 'croup-cochrane-2023'],
  },
  {
    id: 'l-epinephrine-neb',
    kind: 'per-kg',
    name: 'Epinephrine 1 mg/mL (L-epinephrine), nebulized',
    category: 'Respiratory',
    indication: 'Croup with stridor at rest and distress',
    route: 'Nebulized',
    perKg: 0.5,
    unit: 'mg',
    maxDose: 5,
    frequency: 'May repeat q15–20 min if severe; observe ≥2 h after last dose',
    concentration: { perMl: 1, label: '1 mg/mL (0.5 mL/kg, max 5 mL)' },
    notes: 'Racemic epinephrine 2.25% 0.5 mL is equivalent.',
    refs: ['croup-cochrane-2023'],
  },
  // GI
  {
    id: 'ondansetron',
    kind: 'band',
    name: 'Ondansetron ODT',
    category: 'GI',
    indication: 'Vomiting with gastroenteritis, to enable ORT (age ≥6 months)',
    route: 'PO (ODT)',
    frequency: 'Single dose, then start ORT in 15–30 min',
    bands: [
      { maxKg: 8, dose: '0.15 mg/kg (below trial weight bands)' },
      { maxKg: 15, inclusive: true, dose: '2 mg' },
      { maxKg: 30, inclusive: true, dose: '4 mg' },
      { maxKg: Infinity, dose: '6 mg' },
    ],
    notes: 'Bands from Freedman 2006: 8–15 kg, >15–30 kg, >30 kg. Avoid with long QT.',
    refs: ['ondansetron-2006'],
  },
  // Emergency & resuscitation
  {
    id: 'epi-im',
    kind: 'per-kg',
    name: 'Epinephrine IM (anaphylaxis)',
    category: 'Emergency & resuscitation',
    indication: 'Anaphylaxis — first-line, no contraindication',
    route: 'IM anterolateral thigh',
    perKg: 0.01,
    unit: 'mg',
    maxDose: 0.5,
    frequency: 'Repeat q5–15 min if needed',
    concentration: { perMl: 1, label: '1 mg/mL' },
    notes: 'Max 0.3 mg in prepubertal children, 0.5 mg adolescents. Never delay for antihistamines/steroids.',
    refs: ['anaphylaxis-2023', 'aap-epi-2017'],
  },
  {
    id: 'epi-autoinjector',
    kind: 'band',
    name: 'Epinephrine auto-injector / nasal spray (prescribing)',
    category: 'Emergency & resuscitation',
    indication: 'Anaphylaxis action plan — prescribe 2 devices',
    route: 'IM auto-injector or intranasal',
    frequency: 'Repeat in 5–15 min if no improvement',
    bands: [
      { maxKg: 7.5, dose: 'Draw up 0.01 mg/kg (1 mg/mL) — no device sized for <7.5 kg' },
      { maxKg: 15, dose: '0.1 mg auto-injector' },
      { maxKg: 30, dose: '0.15 mg auto-injector, or 1 mg nasal spray (age ≥4 y)' },
      { maxKg: Infinity, dose: '0.3 mg auto-injector, or 2 mg nasal spray' },
    ],
    notes: 'AAP suggests switching to 0.3 mg at ≈25 kg. Nasal epinephrine: 1 mg for 15–<30 kg (FDA 2025), 2 mg ≥30 kg.',
    refs: ['aap-epi-2017', 'neffy-2025'],
  },
  {
    id: 'epi-arrest',
    kind: 'per-kg',
    name: 'Epinephrine IV/IO (cardiac arrest)',
    category: 'Emergency & resuscitation',
    indication: 'Pulseless arrest',
    route: 'IV/IO',
    perKg: 0.01,
    unit: 'mg',
    maxDose: 1,
    frequency: 'q3–5 min',
    concentration: { perMl: 0.1, label: '0.1 mg/mL' },
    refs: ['pals-2020'],
  },
  {
    id: 'bolus',
    kind: 'per-kg',
    name: 'Isotonic fluid bolus',
    category: 'Emergency & resuscitation',
    indication: 'Shock / severe dehydration',
    route: 'IV/IO',
    perKg: [10, 20],
    unit: 'mL',
    maxDose: 1000,
    frequency: 'Over 5–20 min; reassess after each bolus',
    notes: 'Balanced crystalloid preferred in septic shock. Stop for hepatomegaly, crackles, or rising work of breathing.',
    refs: ['ssc-peds-2026'],
  },
  {
    id: 'd10',
    kind: 'per-kg',
    name: 'Dextrose 10% (hypoglycemia)',
    category: 'Emergency & resuscitation',
    indication: 'Symptomatic hypoglycemia',
    route: 'IV/IO',
    perKg: [2, 5],
    unit: 'mL',
    maxDose: 250,
    frequency: 'Bolus, then recheck glucose in 15 min; start dextrose-containing infusion',
    notes: '2–5 mL/kg D10 = 0.2–0.5 g/kg glucose.',
    refs: ['pals-2020'],
  },
  {
    id: 'naloxone',
    kind: 'per-kg',
    name: 'Naloxone',
    category: 'Emergency & resuscitation',
    indication: 'Opioid toxicity with respiratory depression',
    route: 'IV/IO/IM/IN',
    perKg: 0.1,
    unit: 'mg',
    maxDose: 2,
    frequency: 'Repeat q2–3 min as needed',
    concentration: { perMl: 0.4, label: '0.4 mg/mL' },
    notes: 'Use smaller titrated doses in chronic opioid use to avoid acute withdrawal.',
    refs: ['pals-2020'],
  },
  {
    id: 'hypertonic-saline',
    kind: 'per-kg',
    name: '3% saline (symptomatic hyponatremia)',
    category: 'Emergency & resuscitation',
    indication: 'Hyponatremia with seizures or severe neuro symptoms',
    route: 'IV',
    perKg: 2,
    unit: 'mL',
    maxDose: 100,
    frequency: 'Over 10 min; repeat up to 2× until symptoms resolve',
    notes: 'Goal: rise of 4–6 mEq/L acutely; total correction ≤8–10 mEq/L in 24 h.',
    refs: ['aap-ivf-2018'],
  },
  // Seizures
  {
    id: 'midazolam-in',
    kind: 'per-kg',
    name: 'Midazolam intranasal',
    category: 'Seizures',
    indication: 'Seizure ≥5 min, no IV access',
    route: 'IN (split between nostrils, atomizer)',
    perKg: 0.2,
    unit: 'mg',
    maxDose: 10,
    frequency: 'May repeat once after 5 min',
    concentration: { perMl: 5, label: '5 mg/mL' },
    refs: ['aes-se-2016'],
  },
  {
    id: 'midazolam-im',
    kind: 'per-kg',
    name: 'Midazolam IM',
    category: 'Seizures',
    indication: 'Seizure ≥5 min, no IV access',
    route: 'IM',
    perKg: 0.2,
    unit: 'mg',
    maxDose: 10,
    frequency: 'Single dose (AES: 5 mg if 13–40 kg; 10 mg if >40 kg)',
    concentration: { perMl: 5, label: '5 mg/mL' },
    refs: ['aes-se-2016'],
  },
  {
    id: 'lorazepam',
    kind: 'per-kg',
    name: 'Lorazepam IV',
    category: 'Seizures',
    indication: 'Seizure ≥5 min with IV access',
    route: 'IV/IO',
    perKg: 0.1,
    unit: 'mg',
    maxDose: 4,
    frequency: 'May repeat once after 5 min (max 2 benzodiazepine doses including pre-hospital)',
    concentration: { perMl: 2, label: '2 mg/mL' },
    refs: ['aes-se-2016'],
  },
  {
    id: 'levetiracetam',
    kind: 'per-kg',
    name: 'Levetiracetam IV',
    category: 'Seizures',
    indication: 'Second-line for benzodiazepine-refractory status epilepticus',
    route: 'IV over 5–10 min',
    perKg: 60,
    unit: 'mg',
    maxDose: 4500,
    frequency: 'Single loading dose',
    notes: 'Equivalent efficacy to fosphenytoin and valproate (ESETT); levetiracetam ≈ phenytoin in children (ConSEPT, EcLiPSE).',
    refs: ['esett-2019', 'consept-eclipse-2019'],
  },
  {
    id: 'fosphenytoin',
    kind: 'per-kg',
    name: 'Fosphenytoin IV',
    category: 'Seizures',
    indication: 'Second-line for status epilepticus',
    route: 'IV (≤3 mg PE/kg/min, max 150 mg PE/min)',
    perKg: 20,
    unit: 'mg PE',
    maxDose: 1500,
    frequency: 'Single loading dose',
    notes: 'Monitor ECG and BP during infusion.',
    refs: ['aes-se-2016', 'esett-2019'],
  },
  {
    id: 'valproate',
    kind: 'per-kg',
    name: 'Valproate IV',
    category: 'Seizures',
    indication: 'Second-line for status epilepticus',
    route: 'IV over 10 min',
    perKg: 40,
    unit: 'mg',
    maxDose: 3000,
    frequency: 'Single loading dose',
    notes: 'Avoid <2 y, liver disease, suspected mitochondrial/metabolic disorder, and pregnancy.',
    refs: ['esett-2019'],
  },
  {
    id: 'phenobarbital',
    kind: 'per-kg',
    name: 'Phenobarbital IV',
    category: 'Seizures',
    indication: 'Second-line if others unavailable; first-line in neonates',
    route: 'IV',
    perKg: [15, 20],
    unit: 'mg',
    maxDose: 1000,
    frequency: 'Single loading dose',
    notes: 'Respiratory depression and hypotension — be ready to support the airway.',
    refs: ['aes-se-2016'],
  },
]

export interface DoseResult {
  doseText: string
  volumeText: string | null
  capped: boolean
}

function roundDose(n: number): number {
  if (n < 1) return Math.round(n * 100) / 100
  if (n < 10) return Math.round(n * 10) / 10
  return Math.round(n)
}

function roundVolume(n: number): number {
  return n < 1 ? Math.round(n * 100) / 100 : Math.round(n * 10) / 10
}

function fmt(n: number): string {
  return n.toLocaleString('en-US', { maximumFractionDigits: 2 })
}

export function computeDose(drug: Drug, weightKg: number): DoseResult | null {
  if (!(weightKg > 0) || weightKg > 200) return null
  if (drug.kind === 'band') {
    const band =
      drug.bands.find((b) => (b.inclusive ? weightKg <= b.maxKg : weightKg < b.maxKg)) ?? drug.bands[drug.bands.length - 1]
    return { doseText: band.dose, volumeText: null, capped: false }
  }
  const [lo, hi] = Array.isArray(drug.perKg) ? drug.perKg : [drug.perKg, drug.perKg]
  const rawLo = lo * weightKg
  const rawHi = hi * weightKg
  const max = drug.maxDose ?? Infinity
  const dLo = roundDose(Math.min(rawLo, max))
  const dHi = roundDose(Math.min(rawHi, max))
  const capped = rawHi > max
  const doseText = dLo === dHi ? `${fmt(dLo)} ${drug.unit}` : `${fmt(dLo)}–${fmt(dHi)} ${drug.unit}`
  let volumeText: string | null = null
  if (drug.concentration) {
    const vLo = roundVolume(dLo / drug.concentration.perMl)
    const vHi = roundVolume(dHi / drug.concentration.perMl)
    volumeText = `${vLo === vHi ? fmt(vLo) : `${fmt(vLo)}–${fmt(vHi)}`} mL of ${drug.concentration.label}`
  }
  return { doseText, volumeText, capped }
}
