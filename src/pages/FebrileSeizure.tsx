import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react'

export default function FebrileSeizure() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-primary mb-2">
          Febrile Seizures
        </h1>
        <p className="text-lg text-muted-foreground">
          Classification, management, and parent counseling for febrile seizures
        </p>
      </div>

      {/* Simple vs Complex Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-green-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <CardTitle>Simple Febrile Seizure</CardTitle>
            </div>
            <CardDescription>Most common (70-75%)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm mb-2">Criteria (ALL must be met)</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Generalized (not focal)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Duration &lt;15 minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Single episode in 24 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Age 6 months - 5 years</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Fever present</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-2">Workup</h3>
                <div className="bg-green-500/10 p-3 rounded">
                  <p className="text-sm">
                    <strong>No routine workup needed</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
                    <li>No neuroimaging (MRI/CT)</li>
                    <li>No EEG</li>
                    <li>No routine labs</li>
                    <li>Focus on identifying fever source</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-500">
            <CardHeader>
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-500" />
                <CardTitle>Complex Febrile Seizure</CardTitle>
              </div>
              <CardDescription>Higher risk (25-30%)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-sm mb-2">Criteria (ANY of the following)</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Focal features (one-sided, focal onset)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Duration &gt;15 minutes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Multiple episodes in 24 hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Postictal (Todd) paralysis</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-2">Workup</h3>
                  <div className="bg-red-500/10 p-3 rounded">
                    <p className="text-sm">
                      <strong>Consider further evaluation</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
                      <li>Neurology consultation</li>
                      <li>Consider EEG</li>
                      <li>Neuroimaging if indicated</li>
                      <li>May need closer follow-up</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
      </div>

      {/* Management */}
      <Card>
        <CardHeader>
          <CardTitle>Acute Management</CardTitle>
          <CardDescription>
            Immediate steps during a febrile seizure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-accent p-4 rounded">
                <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  During Seizure
                </h3>
                <ul className="space-y-1 text-sm">
                  <li>• Place child on side (recovery position)</li>
                  <li>• Protect from injury</li>
                  <li>• Do NOT restrain</li>
                  <li>• Do NOT place anything in mouth</li>
                  <li>• Time the seizure</li>
                  <li>• Monitor airway and breathing</li>
                </ul>
              </div>
              <div className="bg-accent p-4 rounded">
                <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  After Seizure
                </h3>
                <ul className="space-y-1 text-sm">
                  <li>• Allow postictal period</li>
                  <li>• Reassess vital signs</li>
                  <li>• Identify fever source</li>
                  <li>• Treat fever (acetaminophen/ibuprofen)</li>
                  <li>• Reassure parents</li>
                  <li>• Provide education</li>
                </ul>
              </div>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500 p-4 rounded">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm mb-1">If Seizure &gt;5 Minutes</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Call 911 / Emergency services</li>
                    <li>• Consider benzodiazepine (midazolam, diazepam, lorazepam)</li>
                    <li>• Transport to ED for further management</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lumbar Puncture Indications */}
      <Card>
        <CardHeader>
          <CardTitle>Lumbar Puncture Considerations</CardTitle>
          <CardDescription>
            When to consider LP in febrile seizure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-red-500/10 border border-red-500 p-4 rounded">
              <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                Strongly Consider LP
              </h3>
              <ul className="space-y-1 text-sm">
                <li>• Age &lt;12 months (especially &lt;6 months)</li>
                <li>• Clinical signs of meningitis (neck stiffness, bulging fontanelle, etc.)</li>
                <li>• Prolonged postictal state</li>
                <li>• Recent antibiotic use (may mask meningitis)</li>
              </ul>
            </div>
            <div className="bg-accent p-4 rounded">
              <h3 className="font-semibold text-sm mb-2">AAP Recommendations</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• LP recommended for infants &lt;12 months with first simple febrile seizure</li>
                <li>• Consider for age 12-18 months if immunization status incomplete</li>
                <li>• Not routinely recommended for simple febrile seizure in well-appearing child &gt;18 months</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Parent Counseling */}
      <Card>
        <CardHeader>
          <CardTitle>Parent Counseling & Education</CardTitle>
          <CardDescription>
            Key points for family discussion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Prognosis</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Febrile seizures are common (2-5% of children)</li>
                <li>Generally benign with excellent prognosis</li>
                <li>Do NOT cause brain damage or intellectual disability</li>
                <li>Do NOT mean the child has epilepsy</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Recurrence Risk</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Overall: 30-40% will have another febrile seizure</li>
                <li>Higher if first seizure &lt;18 months</li>
                <li>Higher if family history of febrile seizures</li>
                <li>Lower temperature threshold increases risk</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Future Epilepsy Risk</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Simple febrile seizure: ~1-2% (similar to general population)</li>
                <li>Complex febrile seizure: ~4-6%</li>
                <li>Risk factors: family history of epilepsy, complex features, neurodevelopmental abnormalities</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Prevention</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Antipyretics (acetaminophen, ibuprofen) do NOT prevent febrile seizures</li>
                <li>Prophylactic anticonvulsants NOT recommended for simple febrile seizures</li>
                <li>Rectal diazepam may be prescribed for high-risk children (rare)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clinical Pearls */}
      <Card>
        <CardHeader>
          <CardTitle>Clinical Pearls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-2 p-3 bg-accent rounded">
            <span className="text-primary mt-1">•</span>
            <span className="text-sm">
              Most febrile seizures occur on the first day of fever, often as the presenting sign
            </span>
          </div>
          <div className="flex items-start gap-2 p-3 bg-accent rounded">
            <span className="text-primary mt-1">•</span>
            <span className="text-sm">
              The fever itself, not the height of temperature, triggers the seizure
            </span>
          </div>
          <div className="flex items-start gap-2 p-3 bg-accent rounded">
            <span className="text-primary mt-1">•</span>
            <span className="text-sm">
              Common viral illnesses (HHV-6/roseola, influenza) are frequent triggers
            </span>
          </div>
          <div className="flex items-start gap-2 p-3 bg-accent rounded">
            <span className="text-primary mt-1">•</span>
            <span className="text-sm">
              Differentiate from rigors (shivering) which can be mistaken for seizures
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
