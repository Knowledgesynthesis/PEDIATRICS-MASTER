import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { infections, infectionDecisionTrees } from '@/data/infections'
import { AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react'

export default function Infections() {
  const [selectedInfection, setSelectedInfection] = useState<string | null>('bronchiolitis')

  const selectedInfectionData = selectedInfection
    ? infections.find((i) => i.id === selectedInfection)
    : null

  const decisionTree = selectedInfection && selectedInfection in infectionDecisionTrees
    ? infectionDecisionTrees[selectedInfection as keyof typeof infectionDecisionTrees]
    : null

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-primary mb-2">
          Common Pediatric Infections
        </h1>
        <p className="text-lg text-muted-foreground">
          Evidence-based management of common childhood infections with decision trees
        </p>
      </div>

      {/* Infection Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Select an Infection</CardTitle>
          <CardDescription>
            Choose a condition to see diagnosis, management, and decision algorithms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {infections.map((infection) => (
              <Button
                key={infection.id}
                variant={selectedInfection === infection.id ? 'default' : 'outline'}
                onClick={() => setSelectedInfection(infection.id)}
                className="h-auto py-3 px-4 justify-start"
              >
                <div className="text-left">
                  <div className="font-semibold">{infection.name}</div>
                  <div className="text-xs opacity-70 mt-1">{infection.ageGroup}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Infection Details */}
      {selectedInfectionData && (
        <>
          {/* Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Diagnosis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {selectedInfectionData.diagnosis.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                  Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {selectedInfectionData.management.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Red Flags */}
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                Red Flags - Immediate Evaluation Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {selectedInfectionData.redFlags.map((flag, idx) => (
                  <li key={idx} className="flex items-start gap-2 p-2 bg-destructive/10 rounded">
                    <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{flag}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Notes */}
          {selectedInfectionData.notes && (
            <Card className="bg-accent/50">
              <CardHeader>
                <CardTitle className="text-lg">Clinical Pearl</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{selectedInfectionData.notes}</p>
              </CardContent>
            </Card>
          )}

          {/* Decision Tree */}
          {decisionTree && (
            <Card className="border-primary">
              <CardHeader>
                <CardTitle>Clinical Decision Tree</CardTitle>
                <CardDescription>
                  Severity-based management approach
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(decisionTree).map(([severity, data]) => {
                    const severityColors = {
                      mild: 'border-green-500 bg-green-500/10',
                      nonsevere: 'border-green-500 bg-green-500/10',
                      moderate: 'border-yellow-500 bg-yellow-500/10',
                      severe: 'border-red-500 bg-red-500/10',
                    }
                    const severityBadge = {
                      mild: 'success',
                      nonsevere: 'success',
                      moderate: 'warning',
                      severe: 'destructive',
                    }

                    return (
                      <div
                        key={severity}
                        className={`border-2 rounded-lg p-4 ${severityColors[severity as keyof typeof severityColors]}`}
                      >
                        <div className="mb-3">
                          <Badge variant={severityBadge[severity as keyof typeof severityBadge] as any}>
                            {severity.charAt(0).toUpperCase() + severity.slice(1)}
                          </Badge>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <div className="text-xs font-semibold text-muted-foreground mb-2">
                              CRITERIA
                            </div>
                            <ul className="space-y-1">
                              {data.criteria.map((criterion: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-2 text-sm">
                                  <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                                  {criterion}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex items-start gap-2 pt-2 border-t border-border">
                            <ArrowRight className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                            <div>
                              <div className="text-xs font-semibold text-muted-foreground mb-1">
                                ACTION
                              </div>
                              <div className="text-sm font-medium">{data.action}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* General Principles */}
      <Card>
        <CardHeader>
          <CardTitle>General Principles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Viral vs Bacterial</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Most pediatric respiratory infections are viral</li>
              <li>Supportive care is often sufficient</li>
              <li>Antibiotics reserved for bacterial infections</li>
              <li>Avoid overuse of antibiotics to prevent resistance</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">When to Hospitalize</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Age &lt;3 months with fever</li>
              <li>Severe respiratory distress or hypoxia</li>
              <li>Dehydration or inability to tolerate oral intake</li>
              <li>Toxic appearance or altered mental status</li>
              <li>Immunocompromised patients</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
