import { useState } from 'react'
import { ToolFrame } from '@/components/learn/Blocks'
import { Result, Segmented } from '@/components/learn/Controls'
import { assessUtiCulture, firstFebrileUtiImaging, idMasterUtiFixture, utiCultureThreshold, utiUrinalysisAnchors } from '@/lib/clinical/utiLearning'

const shared = idMasterUtiFixture

export function UtiLab({ id }: { id: string }) {
  const [caseId, setCaseId] = useState<'toddler' | 'preschool'>('toddler')
  const [method, setMethod] = useState<'catheter' | 'clean-catch'>('catheter')
  const [cultureStage, setCultureStage] = useState<'pending' | 'reported'>('pending')
  const [rbus, setRbus] = useState<'normal' | 'clinically-relevant-abnormality'>('normal')
  const toddler = caseId === 'toddler'
  const collection = toddler ? shared.method : method
  const ua = toddler ? shared.ua : { wbcPerHpf: 7, le: '1+' as const }
  const anchors = utiUrinalysisAnchors(shared.age, ua)
  const threshold = utiCultureThreshold(shared.age, collection)
  const cultureOutcome = assessUtiCulture(shared.age, collection, ua, shared.culture)
  const meetsCriteria = cultureOutcome === 'high-probability'
  const imaging = firstFebrileUtiImaging(rbus)

  return (
    <ToolFrame
      id={id}
      title="UTI case lab: same count, different specimen"
      description="Two fictional, low-complexity first febrile presentations. Reveal the culture, change the collection method, then test what changes on ultrasound."
      refs={['aap-uti-2026', 'aap-uti-figures-2026']}
    >
      <Segmented label="Synthetic case" value={caseId} onChange={(value) => { setCaseId(value); setCultureStage('pending'); setMethod('catheter'); setRbus('normal') }} options={[
        { value: 'toddler', label: `${shared.ageMonths}-month-old` },
        { value: 'preschool', label: '3-year-old' },
      ]} />
      <p className="text-sm">{toddler
        ? `Well-appearing ${shared.ageMonths}-month-old with fever without a source. Urine before antibiotics: ${shared.ua.wbcPerHpf} WBC/hpf.`
        : 'Well-appearing 3-year-old with fever and dysuria. Urine before antibiotics: 7 WBC/hpf, 1+ leukocyte esterase. No known urinary tract anomaly or other complicating feature.'}</p>
      {!toddler && <Segmented label="Culture collection" value={method} onChange={(value) => { setMethod(value); setRbus('normal') }} options={[
        { value: 'catheter', label: 'Catheter' },
        { value: 'clean-catch', label: 'Clean catch' },
      ]} />}
      <Segmented label="Culture stage" value={cultureStage} onChange={setCultureStage} options={[
        { value: 'pending', label: 'Culture pending' },
        { value: 'reported', label: 'Reveal culture' },
      ]} />
      {cultureStage === 'pending' ? (
        <Result tone="info" title={anchors.pendingHighProbability ? 'Meets the presumptive UA anchor' : 'Send culture; the presumptive UA anchor is not met'}>
          <p>{anchors.pendingHighProbability
            ? '18 WBC/hpf exceeds the pending-culture anchor (10 WBC/hpf or 2+ LE at this age). This supports empiric treatment while culture is pending in this presentation.'
            : '7 WBC/hpf and 1+ LE support sending a culture, but do not automatically trigger antibiotics in this stable vignette. Reassess if clinical suspicion is high or the child worsens.'}</p>
        </Result>
      ) : (
        <>
          <Result tone={meetsCriteria ? 'good' : 'warn'} title={meetsCriteria ? 'Meets high-probability UTI criteria' : 'Does not meet the clean-catch culture anchor'}>
            <p>Culture: {shared.culture.cfu.toLocaleString('en-US')} CFU/mL of a single uropathogen (<i>E. coli</i>). The {collection === 'catheter' ? 'catheter' : 'clean-catch'} anchor is ≥{threshold?.toLocaleString('en-US')} CFU/mL, paired with inflammation and a compatible presentation.</p>
            {!meetsCriteria && <p>That does not rule out UTI. Review collection quality and symptoms; if suspicion remains, reassess and consider another properly collected specimen.</p>}
          </Result>
          {meetsCriteria && (
            <>
              <p className="text-sm">With a first febrile UTI before age 5, obtain renal and bladder ultrasound (RBUS) to look for structural findings. Assume no features that would make this case an exception.</p>
              <Segmented label="Ultrasound result" value={rbus} onChange={setRbus} options={[
                { value: 'normal', label: 'Normal RBUS' },
                { value: 'clinically-relevant-abnormality', label: 'Clinically relevant abnormality' },
              ]} />
              <Result tone="info" title={imaging === 'offer-vcug' ? 'Offer VCUG' : 'No routine VCUG'}>
                <p>{imaging === 'offer-vcug'
                  ? 'A clinically relevant abnormality (for example, significant hydronephrosis) changes what to offer after the first febrile UTI.'
                  : 'A normal ultrasound does not rule out vesicoureteral reflux. In this uncomplicated first febrile episode, it is not an indication for routine VCUG.'}</p>
              </Result>
            </>
          )}
        </>
      )}
    </ToolFrame>
  )
}
