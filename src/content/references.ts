import type { Reference } from '@/types'

/**
 * Single source of truth for every citation in the app.
 * Rule: a DOI/official URL is included only when it is stable and verified;
 * otherwise `refUrl()` falls back to a PubMed title search, which always resolves.
 */
export const references: Reference[] = [
  // ── Immunization ───────────────────────────────────────────────────────────
  {
    id: 'aap-schedule-2026',
    short: 'AAP schedule 2026',
    citation:
      'American Academy of Pediatrics, Committee on Infectious Diseases. Recommended Childhood and Adolescent Immunization Schedule: United States, 2026. Pediatrics. 2026;157(3):e2025075754.',
    url: 'https://www.aap.org/ImmunizationSchedule',
    kind: 'guideline',
  },
  {
    id: 'aap-rsv-2026',
    short: 'AAP RSV 2026–27',
    citation:
      'American Academy of Pediatrics. Recommendations for the Prevention of RSV Disease in Infants and Children, 2026–2027 (policy statement). Pediatrics. Published online September 2, 2026.',
    url: 'https://www.aap.org/en/news-room/news-releases/aap/2026/american-academy-of-pediatrics-issues-recommendations-for-rsv-immunizations-2026-2027/',
    kind: 'guideline',
  },
  {
    id: 'aap-flu-2026',
    short: 'AAP influenza 2026–27',
    citation:
      'American Academy of Pediatrics, Committee on Infectious Diseases. Recommendations for Prevention and Control of Influenza in Children, 2026–2027. Pediatrics. 2026.',
    url: 'https://www.aap.org/en/news-room/news-releases/aap/2026/american-academy-of-pediatrics-issues-recommendations-for-influenza-prevention-and-control-for-2026-27/',
    kind: 'guideline',
  },
  {
    id: 'acip-best-practices',
    short: 'ACIP best practices',
    citation:
      'Kroger A, Bahta L, Long S, Sanchez P. General Best Practice Guidelines for Immunization. Advisory Committee on Immunization Practices (ACIP). CDC; updated regularly.',
    url: 'https://www.cdc.gov/vaccines/hcp/imz-best-practices/index.html',
    kind: 'guideline',
  },
  {
    id: 'cdc-catchup',
    short: 'CDC catch-up schedule',
    citation: 'CDC. Catch-up Immunization Schedule for Children and Adolescents (minimum ages and intervals).',
    url: 'https://www.cdc.gov/vaccines/hcp/imz-schedules/child-adolescent-catch-up.html',
    kind: 'guideline',
  },
  {
    id: 'aap-v-kennedy',
    short: 'AAP v. Kennedy (2026)',
    citation:
      'American Academy of Pediatrics et al. v. Kennedy et al., No. 25-11916 (D. Mass.). Order staying the January 2026 CDC childhood schedule memo and reconstituted-ACIP actions, March 16, 2026; appeal pending (1st Cir.).',
    url: 'https://www.kff.org/quick-insights/the-courts-opening-shot-on-federal-vaccine-policy-changes/',
    kind: 'policy',
  },
  {
    id: 'mmr-acip-2013',
    short: 'ACIP MMR 2013',
    citation:
      'McLean HQ, Fiebelkorn AP, Temte JL, Wallace GS. Prevention of measles, rubella, congenital rubella syndrome, and mumps, 2013: summary recommendations of the ACIP. MMWR Recomm Rep. 2013;62(RR-04):1-34.',
    url: 'https://www.cdc.gov/mmwr/preview/mmwrhtml/rr6204a1.htm',
    kind: 'guideline',
  },
  {
    id: 'measles-2026',
    short: 'US measles status 2026',
    citation:
      'Pan American Health Organization determination that endemic measles transmission has been re-established in the United States (November 2026); CDC case counts: ~2,250–2,290 cases in 2025 (sources differ) and >5,400 by mid-November 2026.',
    url: 'https://www.sciencenews.org/article/measles-us-elimination-status-vaccine',
    kind: 'policy',
  },
  {
    id: 'opel-2013',
    short: 'Opel 2013',
    citation:
      'Opel DJ, Heritage J, Taylor JA, et al. The architecture of provider-parent vaccine discussions at health supervision visits. Pediatrics. 2013;132(6):1037-1046.',
    kind: 'trial',
  },
  {
    id: 'hviid-2019',
    short: 'Hviid 2019',
    citation:
      'Hviid A, Hansen JV, Frisch M, Melbye M. Measles, Mumps, Rubella Vaccination and Autism: A Nationwide Cohort Study. Ann Intern Med. 2019;170(8):513-520.',
    kind: 'trial',
  },
  {
    id: 'red-book',
    short: 'Red Book 2024–27',
    citation:
      'American Academy of Pediatrics. Red Book: 2024–2027 Report of the Committee on Infectious Diseases. 33rd ed. Kimberlin DW, Banerjee R, Barnett ED, Lynfield R, Sawyer MH, eds. Itasca, IL: AAP; 2024.',
    url: 'https://publications.aap.org/redbook',
    kind: 'guideline',
  },

  // ── Growth & well-child ────────────────────────────────────────────────────
  {
    id: 'who-cdc-charts',
    short: 'CDC/WHO growth charts',
    citation:
      'Grummer-Strawn LM, Reinold C, Krebs NF. Use of World Health Organization and CDC growth charts for children aged 0–59 months in the United States. MMWR Recomm Rep. 2010;59(RR-9):1-15.',
    url: 'https://www.cdc.gov/mmwr/preview/mmwrhtml/rr5909a1.htm',
    kind: 'guideline',
  },
  {
    id: 'aap-obesity-2023',
    short: 'AAP obesity CPG 2023',
    citation:
      'Hampl SE, Hassink SG, Skinner AC, et al. Clinical Practice Guideline for the Evaluation and Treatment of Children and Adolescents With Obesity. Pediatrics. 2023;151(2):e2022060640.',
    url: 'https://doi.org/10.1542/peds.2022-060640',
    kind: 'guideline',
  },
  {
    id: 'bright-futures',
    short: 'Bright Futures periodicity',
    citation:
      'American Academy of Pediatrics/Bright Futures. Recommendations for Preventive Pediatric Health Care (Periodicity Schedule). Updated annually.',
    url: 'https://www.aap.org/periodicityschedule',
    kind: 'guideline',
  },
  {
    id: 'newt',
    short: 'NEWT (Flaherman 2015)',
    citation:
      'Flaherman VJ, Schaefer EW, Kuzniewicz MW, Li SX, Walsh EM, Paul IM. Early weight loss nomograms for exclusively breastfed newborns. Pediatrics. 2015;135(1):e16-e23.',
    kind: 'trial',
  },
  {
    id: 'aap-bp-2017',
    short: 'AAP BP CPG 2017',
    citation:
      'Flynn JT, Kaelber DC, Baker-Smith CM, et al. Clinical Practice Guideline for Screening and Management of High Blood Pressure in Children and Adolescents. Pediatrics. 2017;140(3):e20171904.',
    url: 'https://doi.org/10.1542/peds.2017-1904',
    kind: 'guideline',
  },

  {
    id: 'aap-safe-sleep-2022',
    short: 'AAP safe sleep 2022',
    citation:
      'Moon RY, Carlin RF, Hand I; Task Force on SIDS. Sleep-Related Infant Deaths: Updated 2022 Recommendations for Reducing Infant Deaths in the Sleep Environment. Pediatrics. 2022;150(1):e2022057990.',
    url: 'https://doi.org/10.1542/peds.2022-057990',
    kind: 'guideline',
  },
  {
    id: 'aap-vitd-2008',
    short: 'AAP vitamin D',
    citation:
      'Wagner CL, Greer FR; Section on Breastfeeding; Committee on Nutrition. Prevention of rickets and vitamin D deficiency in infants, children, and adolescents. Pediatrics. 2008;122(5):1142-1152.',
    kind: 'guideline',
  },
  {
    id: 'aap-iron-2010',
    short: 'AAP iron 2010',
    citation:
      'Baker RD, Greer FR; Committee on Nutrition. Diagnosis and prevention of iron deficiency and iron-deficiency anemia in infants and young children (0–3 years of age). Pediatrics. 2010;126(5):1040-1050.',
    kind: 'guideline',
  },
  {
    id: 'niaid-peanut-2017',
    short: 'NIAID peanut 2017',
    citation:
      'Togias A, Cooper SF, Acebal ML, et al. Addendum guidelines for the prevention of peanut allergy in the United States: Report of the NIAID-sponsored expert panel. J Allergy Clin Immunol. 2017;139(1):29-44.',
    kind: 'guideline',
  },

  // ── Development ────────────────────────────────────────────────────────────
  {
    id: 'cdc-milestones-2022',
    short: 'CDC/AAP milestones 2022',
    citation:
      'Zubler JM, Wiggins LD, Macias MM, et al. Evidence-Informed Milestones for Developmental Surveillance Tools. Pediatrics. 2022;149(3):e2021052138.',
    url: 'https://doi.org/10.1542/peds.2021-052138',
    kind: 'guideline',
  },
  {
    id: 'aap-dev-screening-2020',
    short: 'AAP surveillance & screening 2020',
    citation:
      'Lipkin PH, Macias MM; Council on Children With Disabilities. Promoting Optimal Development: Identifying Infants and Young Children With Developmental Disorders Through Developmental Surveillance and Screening. Pediatrics. 2020;145(1):e20193449.',
    url: 'https://doi.org/10.1542/peds.2019-3449',
    kind: 'guideline',
  },
  {
    id: 'aap-asd-2020',
    short: 'AAP autism 2020',
    citation:
      'Hyman SL, Levy SE, Myers SM; Council on Children With Disabilities. Identification, Evaluation, and Management of Children With Autism Spectrum Disorder. Pediatrics. 2020;145(1):e20193447.',
    url: 'https://doi.org/10.1542/peds.2019-3447',
    kind: 'guideline',
  },
  {
    id: 'cdc-addm-2025',
    short: 'CDC ADDM 2025',
    citation:
      'Shaw KA, Williams S, Patrick ME, et al. Prevalence and Early Identification of Autism Spectrum Disorder Among Children Aged 4 and 8 Years — ADDM Network, 16 Sites, United States, 2022. MMWR Surveill Summ. 2025;74(2):1-22.',
    kind: 'review',
  },
  {
    id: 'who-motor-2006',
    short: 'WHO motor windows 2006',
    citation:
      'WHO Multicentre Growth Reference Study Group. WHO Motor Development Study: windows of achievement for six gross motor development milestones. Acta Paediatr Suppl. 2006;450:86-95.',
    kind: 'trial',
  },
  {
    id: 'noritz-motor-2013',
    short: 'AAP motor delay 2013',
    citation:
      'Noritz GH, Murphy NA; Neuromotor Screening Expert Panel. Motor delays: early identification and evaluation. Pediatrics. 2013;131(6):e2016-e2027.',
    kind: 'guideline',
  },
  {
    id: 'acmg-exome-2021',
    short: 'ACMG exome 2021',
    citation:
      'Manickam K, McClain MR, Demmer LA, et al. Exome and genome sequencing for pediatric patients with congenital anomalies or intellectual disability: an evidence-based clinical guideline of the ACMG. Genet Med. 2021;23(11):2029-2037.',
    kind: 'guideline',
  },

  // ── Newborn & congenital ───────────────────────────────────────────────────
  {
    id: 'aap-bili-2022',
    short: 'AAP hyperbilirubinemia 2022',
    citation:
      'Kemper AR, Newman TB, Slaughter JL, et al. Clinical Practice Guideline Revision: Management of Hyperbilirubinemia in the Newborn Infant 35 or More Weeks of Gestation. Pediatrics. 2022;150(3):e2022058859.',
    url: 'https://doi.org/10.1542/peds.2022-058859',
    kind: 'guideline',
  },
  {
    id: 'bilitool',
    short: 'BiliTool',
    citation: 'BiliTool: AAP 2022 hyperbilirubinemia threshold calculator.',
    url: 'https://www.bilitool.org',
    kind: 'resource',
  },
  {
    id: 'cchd-2025',
    short: 'AAP CCHD screening 2025',
    citation:
      'Oster ME, et al. Newborn Screening for Critical Congenital Heart Disease: A New Algorithm and Other Updated Recommendations: Clinical Report. Pediatrics. 2025;155(1):e2024069667.',
    url: 'https://doi.org/10.1542/peds.2024-069667',
    kind: 'guideline',
  },
  {
    id: 'aha-ie-2021',
    short: 'AHA endocarditis 2021',
    citation:
      'Wilson WR, Gewitz M, Lockhart PB, et al. Prevention of Viridans Group Streptococcal Infective Endocarditis: A Scientific Statement From the American Heart Association. Circulation. 2021;143(20):e963-e978.',
    kind: 'guideline',
  },
  {
    id: 'beneductus-2023',
    short: 'BeNeDuctus 2023',
    citation:
      'Hundscheid T, Onland W, Kooi EMW, et al. Expectant Management or Early Ibuprofen for Patent Ductus Arteriosus. N Engl J Med. 2023;388(11):980-990.',
    kind: 'trial',
  },
  {
    id: 'aap-down-2022',
    short: 'AAP Down syndrome 2022',
    citation:
      'Bull MJ, Trotter T, Santoro SL, et al. Health Supervision for Children and Adolescents With Down Syndrome. Pediatrics. 2022;149(5):e2022057010.',
    url: 'https://doi.org/10.1542/peds.2022-057010',
    kind: 'guideline',
  },
  {
    id: 'turner-2024',
    short: 'Turner guideline 2024',
    citation:
      'Gravholt CH, Andersen NH, Christin-Maitre S, et al. Clinical practice guidelines for the care of girls and women with Turner syndrome. Eur J Endocrinol. 2024;190(6):G53-G151.',
    kind: 'guideline',
  },
  {
    id: 'aap-ch-2023',
    short: 'AAP congenital hypothyroidism 2023',
    citation:
      'Rose SR, Wassner AJ, Wintergerst KA, et al. Congenital Hypothyroidism: Screening and Management. Pediatrics. 2023;151(1):e2022060420.',
    url: 'https://doi.org/10.1542/peds.2022-060420',
    kind: 'guideline',
  },
  {
    id: 'acmg-pku-2014',
    short: 'ACMG PKU 2014',
    citation:
      'Vockley J, Andersson HC, Antshel KM, et al. Phenylalanine hydroxylase deficiency: diagnosis and management guideline. Genet Med. 2014;16(2):188-200.',
    kind: 'guideline',
  },
  {
    id: 'cmv-consensus-2017',
    short: 'cCMV consensus 2017',
    citation:
      'Rawlinson WD, Boppana SB, Fowler KB, et al. Congenital cytomegalovirus infection in pregnancy and the neonate: consensus recommendations for prevention, diagnosis, and therapy. Lancet Infect Dis. 2017;17(6):e177-e188.',
    kind: 'guideline',
  },
  {
    id: 'valgan-2015',
    short: 'Kimberlin 2015',
    citation:
      'Kimberlin DW, Jester PM, Sánchez PJ, et al. Valganciclovir for symptomatic congenital cytomegalovirus disease. N Engl J Med. 2015;372(10):933-943.',
    kind: 'trial',
  },
  {
    id: 'cdc-sti-2021',
    short: 'CDC STI guidelines 2021',
    citation:
      'Workowski KA, Bachmann LH, Chan PA, et al. Sexually Transmitted Infections Treatment Guidelines, 2021. MMWR Recomm Rep. 2021;70(4):1-187.',
    url: 'https://www.cdc.gov/std/treatment-guidelines/',
    kind: 'guideline',
  },

  // ── Respiratory & ENT ──────────────────────────────────────────────────────
  {
    id: 'aap-bronch-2014',
    short: 'AAP bronchiolitis 2014',
    citation:
      'Ralston SL, Lieberthal AS, Meissner HC, et al. Clinical Practice Guideline: The Diagnosis, Management, and Prevention of Bronchiolitis. Pediatrics. 2014;134(5):e1474-e1502.',
    url: 'https://doi.org/10.1542/peds.2014-2742',
    kind: 'guideline',
  },
  {
    id: 'bronch-anz-2025',
    short: 'Australasian bronchiolitis 2025',
    citation: 'PREDICT Network. Australasian Bronchiolitis Guideline: 2025 Update. J Paediatr Child Health. 2025.',
    url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12397848/',
    kind: 'guideline',
  },
  {
    id: 'aap-sinusitis-2013',
    short: 'AAP sinusitis 2013',
    citation:
      'Wald ER, Applegate KE, Bordley C, et al. Clinical practice guideline for the diagnosis and management of acute bacterial sinusitis in children aged 1 to 18 years. Pediatrics. 2013;132(1):e262-e280.',
    url: 'https://doi.org/10.1542/peds.2013-1071',
    kind: 'guideline',
  },
  {
    id: 'bids-2015',
    short: 'BIDS trial 2015',
    citation:
      'Cunningham S, Rodriguez A, Adams T, et al. Oxygen saturation targets in infants with bronchiolitis (BIDS): a double-blind, randomised, equivalence trial. Lancet. 2015;386(9998):1041-1048.',
    kind: 'trial',
  },
  {
    id: 'paris-2018',
    short: 'PARIS trial 2018',
    citation:
      'Franklin D, Babl FE, Schlapbach LJ, et al. A Randomized Trial of High-Flow Oxygen Therapy in Infants with Bronchiolitis. N Engl J Med. 2018;378(12):1121-1131.',
    kind: 'trial',
  },
  {
    id: 'aap-aom-2013',
    short: 'AAP AOM 2013',
    citation:
      'Lieberthal AS, Carroll AE, Chonmaitree T, et al. The Diagnosis and Management of Acute Otitis Media. Pediatrics. 2013;131(3):e964-e999.',
    url: 'https://doi.org/10.1542/peds.2012-3488',
    kind: 'guideline',
  },
  {
    id: 'tubes-2022',
    short: 'AAO-HNS tubes 2022',
    citation:
      'Rosenfeld RM, Tunkel DE, Schwartz SR, et al. Clinical Practice Guideline: Tympanostomy Tubes in Children (Update). Otolaryngol Head Neck Surg. 2022;166(1 suppl):S1-S55.',
    kind: 'guideline',
  },
  {
    id: 'drug-allergy-2022',
    short: 'Drug allergy parameter 2022',
    citation:
      'Khan DA, Banerji A, Blumenthal KG, et al. Drug allergy: A 2022 practice parameter update. J Allergy Clin Immunol. 2022;150(6):1333-1393.',
    kind: 'guideline',
  },
  {
    id: 'westley-1978',
    short: 'Westley 1978',
    citation:
      'Westley CR, Cotton EK, Brooks JG. Nebulized racemic epinephrine by IPPB for the treatment of croup: a double-blind study. Am J Dis Child. 1978;132(5):484-487.',
    kind: 'trial',
  },
  {
    id: 'croup-dex-dose-2019',
    short: 'Parker & Cooper 2019',
    citation:
      'Parker CM, Cooper MN. Prednisolone Versus Dexamethasone for Croup: a Randomized Controlled Trial. Pediatrics. 2019;144(3):e20183772.',
    kind: 'trial',
  },
  {
    id: 'croup-cochrane-2023',
    short: 'Cochrane croup steroids 2023',
    citation: 'Aregbesola A, Tam CM, Kothari A, Le ML, Ragheb M, Klassen TP. Glucocorticoids for croup in children. Cochrane Database Syst Rev. 2023;1:CD001955.',
    kind: 'review',
  },
  {
    id: 'croup-humid-2006',
    short: 'Cochrane humidified air',
    citation: 'Moore M, Little P. Humidified air inhalation for treating croup. Cochrane Database Syst Rev. 2006;(3):CD002870.',
    kind: 'review',
  },
  {
    id: 'idsa-gas-2012',
    short: 'IDSA GAS 2012',
    citation:
      'Shulman ST, Bisno AL, Clegg HW, et al. Clinical Practice Guideline for the Diagnosis and Management of Group A Streptococcal Pharyngitis: 2012 Update by the IDSA. Clin Infect Dis. 2012;55(10):e86-e102.',
    url: 'https://doi.org/10.1093/cid/cis629',
    kind: 'guideline',
  },
  {
    id: 'idsa-gas-2025',
    short: 'IDSA GAS 2025',
    citation:
      '2025 Clinical Practice Guideline Update by the Infectious Diseases Society of America on Group A Streptococcal Pharyngitis: Risk Assessment Using Clinical Scoring Systems in Children and Adults. Clin Infect Dis. 2025.',
    kind: 'guideline',
  },
  {
    id: 'gas-carriage-2010',
    short: 'Shaikh 2010',
    citation:
      'Shaikh N, Leonard E, Martin JM. Prevalence of streptococcal pharyngitis and streptococcal carriage in children: a meta-analysis. Pediatrics. 2010;126(3):e557-e564.',
    kind: 'review',
  },
  {
    id: 'pids-cap-2011',
    short: 'PIDS/IDSA CAP 2011',
    citation:
      'Bradley JS, Byington CL, Shah SS, et al. The management of community-acquired pneumonia in infants and children older than 3 months of age: clinical practice guidelines by PIDS and IDSA. Clin Infect Dis. 2011;53(7):e25-e76.',
    url: 'https://doi.org/10.1093/cid/cir531',
    kind: 'guideline',
  },
  {
    id: 'scout-cap-2022',
    short: 'SCOUT-CAP 2022',
    citation:
      'Williams DJ, Creech CB, Walter EB, et al. Short- vs Standard-Course Outpatient Antibiotic Therapy for Community-Acquired Pneumonia in Children: The SCOUT-CAP Randomized Clinical Trial. JAMA Pediatr. 2022;176(3):253-261.',
    kind: 'trial',
  },
  {
    id: 'cap-it-2021',
    short: 'CAP-IT 2021',
    citation:
      'Bielicki JA, Stöhr W, Barratt S, et al. Effect of Amoxicillin Dose and Treatment Duration on the Need for Antibiotic Re-treatment in Children With Community-Acquired Pneumonia: The CAP-IT Randomized Clinical Trial. JAMA. 2021;326(17):1713-1724.',
    kind: 'trial',
  },
  {
    id: 'cap-effusion-2026',
    short: 'IDSA/PIDS effusion 2026',
    citation:
      'IDSA/PIDS. Guideline on community-acquired pneumonia with parapneumonic effusion in children 3 months to 18 years (2026) — first section of the CAP guideline update.',
    url: 'https://www.healio.com/news/infectious-disease/20260622/pediatric-pneumonia-guidelines-get-first-update-in-15-years',
    kind: 'guideline',
  },
  {
    id: 'cdc-flu-antivirals',
    short: 'CDC flu antivirals',
    citation: 'CDC. Influenza Antiviral Medications: Summary for Clinicians (oseltamivir dosing by age and weight). Updated each season.',
    kind: 'guideline',
  },

  // ── Fever & serious infection ──────────────────────────────────────────────
  {
    id: 'aap-febrile-infant-2021',
    short: 'AAP febrile infant 2021',
    citation:
      'Pantell RH, Roberts KB, Adams WG, et al. Evaluation and Management of Well-Appearing Febrile Infants 8 to 60 Days Old. Pediatrics. 2021;148(2):e2021052228.',
    url: 'https://doi.org/10.1542/peds.2021-052228',
    kind: 'guideline',
  },
  {
    id: 'pecarn-febrile-2019',
    short: 'PECARN febrile infant rule',
    citation:
      'Kuppermann N, Dayan PS, Levine DA, et al. A Clinical Prediction Rule to Identify Febrile Infants 60 Days and Younger at Low Risk for Serious Bacterial Infections. JAMA Pediatr. 2019;173(4):342-351.',
    kind: 'trial',
  },
  {
    id: 'aap-uti-2011',
    short: 'AAP UTI 2011 (reaff. 2016)',
    citation:
      'Subcommittee on Urinary Tract Infection. Urinary Tract Infection: Clinical Practice Guideline for the Diagnosis and Management of the Initial UTI in Febrile Infants and Children 2 to 24 Months. Pediatrics. 2011;128(3):595-610. Reaffirmed 2016.',
    url: 'https://doi.org/10.1542/peds.2011-1330',
    kind: 'guideline',
  },
  {
    id: 'scout-uti-2023',
    short: 'SCOUT (UTI) 2023',
    citation:
      'Zaoutis T, Shaikh N, Fisher BT, et al. Short-Course Therapy for Urinary Tract Infections in Children: The SCOUT Randomized Clinical Trial. JAMA Pediatr. 2023;177(8):782-789.',
    kind: 'trial',
  },
  {
    id: 'phoenix-2024',
    short: 'Phoenix criteria 2024',
    citation:
      'Schlapbach LJ, Watson RS, Sorce LR, et al. International Consensus Criteria for Pediatric Sepsis and Septic Shock. JAMA. 2024;331(8):665-674.',
    kind: 'guideline',
  },
  {
    id: 'ssc-peds-2026',
    short: 'SSC children 2026',
    citation:
      'Surviving Sepsis Campaign International Guidelines for the Management of Sepsis and Septic Shock in Children 2026. Pediatr Crit Care Med. 2026;27(4). Co-published in Intensive Care Med.',
    url: 'https://journals.lww.com/pccmjournal/fulltext/2026/04000/surviving_sepsis_campaign_international_guidelines.3.aspx',
    kind: 'guideline',
  },
  {
    id: 'ssc-peds-2020',
    short: 'SSC children 2020',
    citation:
      'Weiss SL, Peters MJ, Alhazzani W, et al. Surviving Sepsis Campaign International Guidelines for the Management of Septic Shock and Sepsis-Associated Organ Dysfunction in Children. Pediatr Crit Care Med. 2020;21(2):e52-e106.',
    kind: 'guideline',
  },
  {
    id: 'feast-2011',
    short: 'FEAST 2011',
    citation:
      'Maitland K, Kiguli S, Opoka RO, et al. Mortality after fluid bolus in African children with severe infection. N Engl J Med. 2011;364(26):2483-2495.',
    kind: 'trial',
  },
  {
    id: 'aha-kd-2017',
    short: 'AHA Kawasaki 2017',
    citation:
      'McCrindle BW, Rowley AH, Newburger JW, et al. Diagnosis, Treatment, and Long-Term Management of Kawasaki Disease: A Scientific Statement for Health Professionals From the AHA. Circulation. 2017;135(17):e927-e999.',
    kind: 'guideline',
  },
  {
    id: 'aha-kd-2024',
    short: 'AHA Kawasaki 2024',
    citation:
      'Jone PN, Tremoulet A, Choueiter N, et al. Update on Diagnosis and Management of Kawasaki Disease: A Scientific Statement From the American Heart Association. Circulation. 2024.',
    url: 'https://doi.org/10.1161/CIR.0000000000001295',
    kind: 'guideline',
  },
  {
    id: 'aap-fever-2011',
    short: 'AAP fever & antipyretics',
    citation:
      'Sullivan JE, Farrar HC; Section on Clinical Pharmacology and Therapeutics. Fever and antipyretic use in children. Pediatrics. 2011;127(3):580-587.',
    kind: 'guideline',
  },

  // ── Fluids ─────────────────────────────────────────────────────────────────
  {
    id: 'aap-ivf-2018',
    short: 'AAP maintenance IVF 2018',
    citation:
      'Feld LG, Neuspiel DR, Foster BA, et al. Clinical Practice Guideline: Maintenance Intravenous Fluids in Children. Pediatrics. 2018;142(6):e20183083.',
    url: 'https://doi.org/10.1542/peds.2018-3083',
    kind: 'guideline',
  },
  {
    id: 'nice-ivf',
    short: 'NICE NG29',
    citation: 'National Institute for Health and Care Excellence. Intravenous fluid therapy in children and young people in hospital (NG29). London: NICE; 2015, updated 2020.',
    url: 'https://www.nice.org.uk/guidance/ng29',
    kind: 'guideline',
  },
  {
    id: 'cds-2004',
    short: 'Clinical Dehydration Scale',
    citation:
      'Friedman JN, Goldman RD, Srivastava R, Parkin PC. Development of a clinical dehydration scale for use in children between 1 and 36 months of age. J Pediatr. 2004;145(2):201-207.',
    kind: 'trial',
  },
  {
    id: 'steiner-2004',
    short: 'JAMA Rational Exam 2004',
    citation:
      'Steiner MJ, DeWalt DA, Byerley JS. Is this child dehydrated? JAMA. 2004;291(22):2746-2754.',
    kind: 'review',
  },
  {
    id: 'who-diarrhoea-2005',
    short: 'WHO diarrhoea manual',
    citation:
      'World Health Organization. The treatment of diarrhoea: a manual for physicians and other senior health workers. 4th rev. Geneva: WHO; 2005.',
    url: 'https://www.who.int/publications/i/item/9241593180',
    kind: 'guideline',
  },
  {
    id: 'cdc-age-2003',
    short: 'CDC gastroenteritis 2003',
    citation:
      'King CK, Glass R, Bresee JS, Duggan C. Managing acute gastroenteritis among children: oral rehydration, maintenance, and nutritional therapy. MMWR Recomm Rep. 2003;52(RR-16):1-16.',
    url: 'https://www.cdc.gov/mmwr/preview/mmwrhtml/rr5216a1.htm',
    kind: 'guideline',
  },
  {
    id: 'ondansetron-2006',
    short: 'Freedman 2006',
    citation:
      'Freedman SB, Adler M, Seshadri R, Powell EC. Oral ondansetron for gastroenteritis in a pediatric emergency department. N Engl J Med. 2006;354(16):1698-1705.',
    kind: 'trial',
  },
  {
    id: 'apple-juice-2016',
    short: 'Freedman 2016',
    citation:
      'Freedman SB, Willan AR, Boutis K, Schuh S. Effect of Dilute Apple Juice and Preferred Fluids vs Electrolyte Maintenance Solution on Treatment Failure Among Children With Mild Gastroenteritis. JAMA. 2016;315(18):1966-1974.',
    kind: 'trial',
  },
  {
    id: 'probiotics-2018',
    short: 'PECARN/PERC probiotics 2018',
    citation:
      'Schnadower D, Tarr PI, Casper TC, et al. Lactobacillus rhamnosus GG versus Placebo for Acute Gastroenteritis in Children. N Engl J Med. 2018;379(21):2002-2014; and Freedman SB, et al. Multicenter Trial of a Combination Probiotic for Children with Gastroenteritis. N Engl J Med. 2018;379(21):2015-2026.',
    kind: 'trial',
  },
  {
    id: 'ispad-dka-2022',
    short: 'ISPAD DKA 2022',
    citation:
      'Glaser N, Fritsch M, Priyambada L, et al. ISPAD Clinical Practice Consensus Guidelines 2022: Diabetic ketoacidosis and hyperglycemic hyperosmolar state. Pediatr Diabetes. 2022;23(7):835-856.',
    kind: 'guideline',
  },
  {
    id: 'pecarn-fluid-2018',
    short: 'PECARN FLUID 2018',
    citation:
      'Kuppermann N, Ghetti S, Schunk JE, et al. Clinical Trial of Fluid Infusion Rates for Pediatric Diabetic Ketoacidosis. N Engl J Med. 2018;378(24):2275-2287.',
    kind: 'trial',
  },

  // ── Seizures ───────────────────────────────────────────────────────────────
  {
    id: 'aap-fs-2011',
    short: 'AAP febrile seizure 2011',
    citation:
      'Subcommittee on Febrile Seizures. Febrile Seizures: Guideline for the Neurodiagnostic Evaluation of the Child With a Simple Febrile Seizure. Pediatrics. 2011;127(2):389-394.',
    url: 'https://doi.org/10.1542/peds.2010-3318',
    kind: 'guideline',
  },
  {
    id: 'aap-fs-2008',
    short: 'AAP FS long-term 2008',
    citation:
      'Steering Committee on Quality Improvement and Management. Febrile seizures: clinical practice guideline for the long-term management of the child with simple febrile seizures. Pediatrics. 2008;121(6):1281-1286.',
    kind: 'guideline',
  },
  {
    id: 'aes-se-2016',
    short: 'AES status epilepticus 2016',
    citation:
      'Glauser T, Shinnar S, Gloss D, et al. Evidence-Based Guideline: Treatment of Convulsive Status Epilepticus in Children and Adults: Report of the Guideline Committee of the American Epilepsy Society. Epilepsy Curr. 2016;16(1):48-61.',
    kind: 'guideline',
  },
  {
    id: 'esett-2019',
    short: 'ESETT 2019',
    citation:
      'Kapur J, Elm J, Chamberlain JM, et al. Randomized Trial of Three Anticonvulsant Medications for Status Epilepticus. N Engl J Med. 2019;381(22):2103-2113.',
    kind: 'trial',
  },
  {
    id: 'consept-eclipse-2019',
    short: 'ConSEPT & EcLiPSE 2019',
    citation:
      'Dalziel SR, Borland ML, Furyk J, et al. Levetiracetam versus phenytoin for second-line treatment of convulsive status epilepticus in children (ConSEPT). Lancet. 2019;393:2135-2145; and Lyttle MD, et al. (EcLiPSE). Lancet. 2019;393:2125-2134.',
    kind: 'trial',
  },

  // ── Emergencies & dosing ───────────────────────────────────────────────────
  {
    id: 'pals-2020',
    short: 'AHA PALS 2020',
    citation:
      'Topjian AA, Raymond TT, Atkins D, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines for CPR and ECC. Circulation. 2020;142(16 suppl 2):S469-S523.',
    kind: 'guideline',
  },
  {
    id: 'fleming-2011',
    short: 'Fleming 2011 (HR/RR centiles)',
    citation:
      'Fleming S, Thompson M, Stevens R, et al. Normal ranges of heart rate and respiratory rate in children from birth to 18 years of age: a systematic review of observational studies. Lancet. 2011;377(9770):1011-1018.',
    kind: 'review',
  },
  {
    id: 'pat-2010',
    short: 'Pediatric Assessment Triangle',
    citation:
      'Dieckmann RA, Brownstein D, Gausche-Hill M. The pediatric assessment triangle: a novel approach for the rapid evaluation of children. Pediatr Emerg Care. 2010;26(4):312-315.',
    kind: 'review',
  },
  {
    id: 'anaphylaxis-2023',
    short: 'Anaphylaxis parameter 2023',
    citation:
      'Golden DBK, Wang J, Waserman S, et al. Anaphylaxis: A 2023 practice parameter update. Ann Allergy Asthma Immunol. 2024;132(2):124-176.',
    kind: 'guideline',
  },
  {
    id: 'aap-epi-2017',
    short: 'AAP epinephrine 2017',
    citation:
      'Sicherer SH, Simons FER; Section on Allergy and Immunology. Epinephrine for First-aid Management of Anaphylaxis. Pediatrics. 2017;139(3):e20164006.',
    url: 'https://doi.org/10.1542/peds.2016-4006',
    kind: 'guideline',
  },
  {
    id: 'neffy-2025',
    short: 'FDA neffy 1 mg (2025)',
    citation:
      'US FDA approval of epinephrine nasal spray (neffy) 2 mg for patients ≥30 kg (Aug 2024) and 1 mg for children 4 years and older weighing 15 to <30 kg (Mar 2025).',
    kind: 'policy',
  },
  {
    id: 'aap-abuse-2015',
    short: 'AAP physical abuse 2015',
    citation:
      'Christian CW; Committee on Child Abuse and Neglect. The Evaluation of Suspected Child Physical Abuse. Pediatrics. 2015;135(5):e1337-e1354.',
    url: 'https://doi.org/10.1542/peds.2015-0356',
    kind: 'guideline',
  },
  {
    id: 'ten4-2021',
    short: 'TEN-4-FACESp 2021',
    citation:
      'Pierce MC, Kaczor K, Lorenz DJ, et al. Validation of a Clinical Decision Rule to Predict Abuse in Young Children Based on Bruising Characteristics. JAMA Netw Open. 2021;4(4):e215832.',
    kind: 'trial',
  },
]

const byId = new Map(references.map((r) => [r.id, r]))

export function getReference(id: string): Reference | undefined {
  return byId.get(id)
}

/** Link for a reference: explicit URL if verified, else a PubMed search on the article title. */
export function refUrl(ref: Reference): string {
  if (ref.url) return ref.url
  const parts = ref.citation.split('. ')
  const title = parts.length > 1 ? parts[1] : parts[0]
  return `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(title)}`
}
