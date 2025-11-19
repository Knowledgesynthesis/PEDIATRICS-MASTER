import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Droplets, AlertCircle } from 'lucide-react'

interface Assessment {
  tears: boolean
  mucousMembranes: 'normal' | 'dry' | 'very-dry'
  skinTurgor: 'normal' | 'decreased' | 'tenting'
  capillaryRefill: 'normal' | 'delayed' | 'very-delayed'
  mentalStatus: 'normal' | 'irritable' | 'lethargic'
  urine: 'normal' | 'decreased' | 'minimal'
}

export default function Dehydration() {
  const [assessment, setAssessment] = useState<Assessment>({
    tears: true,
    mucousMembranes: 'normal',
    skinTurgor: 'normal',
    capillaryRefill: 'normal',
    mentalStatus: 'normal',
    urine: 'normal',
  })
  const [showResults, setShowResults] = useState(false)

  const calculateSeverity = () => {
    let score = 0

    if (!assessment.tears) score += 1
    if (assessment.mucousMembranes === 'dry') score += 1
    if (assessment.mucousMembranes === 'very-dry') score += 2
    if (assessment.skinTurgor === 'decreased') score += 1
    if (assessment.skinTurgor === 'tenting') score += 2
    if (assessment.capillaryRefill === 'delayed') score += 1
    if (assessment.capillaryRefill === 'very-delayed') score += 2
    if (assessment.mentalStatus === 'irritable') score += 1
    if (assessment.mentalStatus === 'lethargic') score += 2
    if (assessment.urine === 'decreased') score += 1
    if (assessment.urine === 'minimal') score += 2

    if (score <= 2) return 'mild'
    if (score <= 5) return 'moderate'
    return 'severe'
  }

  const severity = calculateSeverity()

  const severityInfo = {
    mild: {
      label: 'Mild Dehydration (3-5%)',
      color: 'success',
      weightLoss: '3-5%',
      features: ['Slightly dry mucous membranes', 'Normal vital signs', 'Minimal signs'],
      management: [
        'Oral rehydration therapy (ORT)',
        'Replacement: 50 mL/kg over 4 hours',
        'Maintenance fluids as needed',
        'Continue regular diet',
        'Close follow-up',
      ],
    },
    moderate: {
      label: 'Moderate Dehydration (6-9%)',
      color: 'warning',
      weightLoss: '6-9%',
      features: [
        'Decreased tears',
        'Dry mucous membranes',
        'Decreased skin turgor',
        'Delayed capillary refill',
        'Decreased urine output',
      ],
      management: [
        'First-line: Oral rehydration therapy (ORT)',
        'Replacement: 100 mL/kg over 4 hours',
        'If unable to tolerate PO: IV fluids',
        'Normal saline or Lactated Ringer bolus 20 mL/kg',
        'Reassess frequently',
      ],
    },
    severe: {
      label: 'Severe Dehydration (≥10%)',
      color: 'destructive',
      weightLoss: '≥10%',
      features: [
        'Sunken eyes, no tears',
        'Very dry mucous membranes',
        'Skin tenting',
        'Prolonged capillary refill (>3 sec)',
        'Lethargic or altered mental status',
        'Minimal urine output',
        'Tachycardia, hypotension',
      ],
      management: [
        'IMMEDIATE IV access',
        'NS or LR bolus 20 mL/kg rapidly',
        'Repeat boluses as needed until perfusion improves',
        'May require ICU admission',
        'Monitor electrolytes closely',
        'Correct underlying cause',
      ],
    },
  }

  const currentInfo = severityInfo[severity as keyof typeof severityInfo]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-primary mb-2">
          Dehydration Assessment & Management
        </h1>
        <p className="text-lg text-muted-foreground">
          Interactive simulator for assessing dehydration severity and planning rehydration
        </p>
      </div>

      {/* Interactive Simulator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="h-5 w-5" />
            Dehydration Simulator
          </CardTitle>
          <CardDescription>
            Input clinical findings to assess dehydration severity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Assessment Questions */}
          <div className="space-y-4">
            <div>
              <label className="font-semibold text-sm mb-2 block">Tears present?</label>
              <div className="flex gap-2">
                <Button
                  variant={assessment.tears ? 'default' : 'outline'}
                  onClick={() => setAssessment({ ...assessment, tears: true })}
                >
                  Yes
                </Button>
                <Button
                  variant={!assessment.tears ? 'default' : 'outline'}
                  onClick={() => setAssessment({ ...assessment, tears: false })}
                >
                  No
                </Button>
              </div>
            </div>

            <div>
              <label className="font-semibold text-sm mb-2 block">Mucous membranes</label>
              <div className="flex gap-2">
                {['normal', 'dry', 'very-dry'].map((option) => (
                  <Button
                    key={option}
                    variant={assessment.mucousMembranes === option ? 'default' : 'outline'}
                    onClick={() =>
                      setAssessment({
                        ...assessment,
                        mucousMembranes: option as Assessment['mucousMembranes'],
                      })
                    }
                  >
                    {option === 'very-dry' ? 'Very Dry' : option.charAt(0).toUpperCase() + option.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-semibold text-sm mb-2 block">Skin turgor</label>
              <div className="flex gap-2">
                {['normal', 'decreased', 'tenting'].map((option) => (
                  <Button
                    key={option}
                    variant={assessment.skinTurgor === option ? 'default' : 'outline'}
                    onClick={() =>
                      setAssessment({
                        ...assessment,
                        skinTurgor: option as Assessment['skinTurgor'],
                      })
                    }
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-semibold text-sm mb-2 block">Capillary refill</label>
              <div className="flex gap-2">
                {['normal', 'delayed', 'very-delayed'].map((option) => (
                  <Button
                    key={option}
                    variant={assessment.capillaryRefill === option ? 'default' : 'outline'}
                    onClick={() =>
                      setAssessment({
                        ...assessment,
                        capillaryRefill: option as Assessment['capillaryRefill'],
                      })
                    }
                  >
                    {option === 'very-delayed' ? 'Very Delayed (>3s)' : option.charAt(0).toUpperCase() + option.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-semibold text-sm mb-2 block">Mental status</label>
              <div className="flex gap-2">
                {['normal', 'irritable', 'lethargic'].map((option) => (
                  <Button
                    key={option}
                    variant={assessment.mentalStatus === option ? 'default' : 'outline'}
                    onClick={() =>
                      setAssessment({
                        ...assessment,
                        mentalStatus: option as Assessment['mentalStatus'],
                      })
                    }
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-semibold text-sm mb-2 block">Urine output</label>
              <div className="flex gap-2">
                {['normal', 'decreased', 'minimal'].map((option) => (
                  <Button
                    key={option}
                    variant={assessment.urine === option ? 'default' : 'outline'}
                    onClick={() =>
                      setAssessment({
                        ...assessment,
                        urine: option as Assessment['urine'],
                      })
                    }
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <Button onClick={() => setShowResults(true)} className="w-full">
            Calculate Dehydration Severity
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {showResults && (
        <Card className={`border-2 ${severity === 'severe' ? 'border-destructive' : severity === 'moderate' ? 'border-yellow-500' : 'border-green-500'}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Assessment Results</CardTitle>
              <Badge variant={currentInfo.color as any} className="text-base px-4 py-1">
                {currentInfo.label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Weight Loss: {currentInfo.weightLoss}</h3>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Clinical Features</h3>
              <ul className="space-y-1">
                {currentInfo.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                {severity === 'severe' && <AlertCircle className="h-5 w-5 text-destructive" />}
                Recommended Management
              </h3>
              <ul className="space-y-2">
                {currentInfo.management.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 p-2 bg-accent rounded">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Educational Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Oral Rehydration Therapy (ORT)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">
              ORT is first-line for mild-to-moderate dehydration. It is as effective as IV fluids
              and less invasive.
            </p>
            <div>
              <h3 className="font-semibold text-sm mb-2">ORT Solution Composition</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Glucose and electrolytes</li>
                <li>Commercial: Pedialyte, Enfalyte</li>
                <li>WHO ORS packets available</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-2">Administration</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Small, frequent volumes (5 mL every 1-2 minutes)</li>
                <li>Gradually increase as tolerated</li>
                <li>Continue regular feeding once rehydrated</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pediatric Maintenance Fluids</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm">
              4-2-1 Rule for maintenance fluid calculation:
            </p>
            <div className="bg-accent p-3 rounded space-y-2">
              <div className="text-sm">
                <strong>First 10 kg:</strong> 4 mL/kg/hr
              </div>
              <div className="text-sm">
                <strong>Next 10 kg (11-20 kg):</strong> +2 mL/kg/hr
              </div>
              <div className="text-sm">
                <strong>Each kg above 20 kg:</strong> +1 mL/kg/hr
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-2">Example</h3>
              <p className="text-sm text-muted-foreground">
                25 kg child: (10 × 4) + (10 × 2) + (5 × 1) = 40 + 20 + 5 = <strong>65 mL/hr</strong>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clinical Pearls */}
      <Card>
        <CardHeader>
          <CardTitle>Clinical Pearls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Common Causes of Dehydration</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Gastroenteritis (most common)</li>
              <li>Inadequate intake</li>
              <li>Diabetic ketoacidosis</li>
              <li>Excessive losses (burns, fever)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Electrolyte Considerations</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Isonatremic (most common): Na 130-150 mEq/L</li>
              <li>Hyponatremic: Na &lt;130 mEq/L (correct slowly to avoid osmotic demyelination)</li>
              <li>Hypernatremic: Na &gt;150 mEq/L (correct slowly to avoid cerebral edema)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
