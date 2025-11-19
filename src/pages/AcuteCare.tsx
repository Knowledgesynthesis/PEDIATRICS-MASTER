import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Calculator } from 'lucide-react'

export default function AcuteCare() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-primary mb-2">
          Acute Pediatric Care
        </h1>
        <p className="text-lg text-muted-foreground">
          Pediatric-specific dosing, emergency management, and acute care fundamentals
        </p>
      </div>

      {/* Pediatric Dosing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Weight-Based Dosing Principles
          </CardTitle>
          <CardDescription>
            Always use weight-based calculations for pediatric medications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-accent p-4 rounded">
              <h3 className="font-semibold mb-3">Common Pediatric Medications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="font-semibold text-sm mb-2">Acetaminophen (Tylenol)</div>
                  <div className="text-sm text-muted-foreground">
                    10-15 mg/kg/dose PO/PR every 4-6 hours
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Max: 75 mg/kg/day or 4 g/day
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-sm mb-2">Ibuprofen (Advil, Motrin)</div>
                  <div className="text-sm text-muted-foreground">
                    10 mg/kg/dose PO every 6-8 hours
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Age ≥6 months. Max: 40 mg/kg/day
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-sm mb-2">Amoxicillin</div>
                  <div className="text-sm text-muted-foreground">
                    Standard: 45-50 mg/kg/day divided BID-TID
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    High-dose (AOM): 80-90 mg/kg/day divided BID
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-sm mb-2">Azithromycin (Z-pack)</div>
                  <div className="text-sm text-muted-foreground">
                    Day 1: 10 mg/kg, then 5 mg/kg daily × 4 days
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Or 12 mg/kg daily × 5 days
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500 p-4 rounded">
              <h3 className="font-semibold text-sm mb-2">Dosing Safety Tips</h3>
              <ul className="space-y-1 text-sm">
                <li>• ALWAYS verify weight in kg</li>
                <li>• Use actual body weight (not ideal)</li>
                <li>• Double-check calculations</li>
                <li>• Know maximum doses</li>
                <li>• Consider renal/hepatic function</li>
                <li>• Educate parents on proper dosing</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vital Signs by Age */}
      <Card>
        <CardHeader>
          <CardTitle>Normal Pediatric Vital Signs</CardTitle>
          <CardDescription>
            Age-specific reference ranges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Age</th>
                  <th className="text-left p-2">Heart Rate (bpm)</th>
                  <th className="text-left p-2">Respiratory Rate</th>
                  <th className="text-left p-2">BP Systolic (mmHg)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">Newborn</td>
                  <td className="p-2">100-160</td>
                  <td className="p-2">30-60</td>
                  <td className="p-2">60-90</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Infant (1-12 mo)</td>
                  <td className="p-2">100-150</td>
                  <td className="p-2">25-40</td>
                  <td className="p-2">70-100</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Toddler (1-3 yr)</td>
                  <td className="p-2">90-140</td>
                  <td className="p-2">20-30</td>
                  <td className="p-2">80-110</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Preschool (3-6 yr)</td>
                  <td className="p-2">80-120</td>
                  <td className="p-2">20-25</td>
                  <td className="p-2">85-115</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">School-age (6-12 yr)</td>
                  <td className="p-2">70-110</td>
                  <td className="p-2">18-22</td>
                  <td className="p-2">90-120</td>
                </tr>
                <tr>
                  <td className="p-2">Adolescent (≥12 yr)</td>
                  <td className="p-2">60-100</td>
                  <td className="p-2">12-20</td>
                  <td className="p-2">95-130</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Scenarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Fever Without Source (Age &lt;3 months)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-red-500/10 p-3 rounded">
                <p className="text-sm font-semibold mb-2">High Risk for Serious Bacterial Infection</p>
                <ul className="space-y-1 text-sm">
                  <li>• Full sepsis workup (blood, urine, CSF cultures)</li>
                  <li>• Empiric IV antibiotics immediately</li>
                  <li>• Hospitalize for observation</li>
                  <li>• Ampicillin + cefotaxime (or gentamicin)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-2">Consider</h3>
                <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                  <li>GBS, E. coli, Listeria (neonates)</li>
                  <li>HSV if any risk factors</li>
                  <li>Pertussis if paroxysmal cough</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Anaphylaxis Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-red-500/10 p-3 rounded">
                <p className="text-sm font-semibold mb-2">Epinephrine is First-Line</p>
                <ul className="space-y-1 text-sm">
                  <li>• IM epinephrine 1:1000</li>
                  <li>• Dose: 0.01 mg/kg (max 0.3-0.5 mg)</li>
                  <li>• Inject lateral thigh (vastus lateralis)</li>
                  <li>• Can repeat every 5-15 minutes</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-2">Supportive Care</h3>
                <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                  <li>Remove trigger if identified</li>
                  <li>Airway management (oxygen, intubation if needed)</li>
                  <li>IV fluids for hypotension</li>
                  <li>Antihistamines, steroids (adjuncts only)</li>
                  <li>Observe for biphasic reaction (4-6 hours)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status Epilepticus</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-accent p-3 rounded">
                <p className="text-sm mb-2">
                  <strong>Definition:</strong> Seizure &gt;5 minutes or recurrent seizures without return to baseline
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-2">Management</h3>
                <ol className="list-decimal list-inside text-sm space-y-1">
                  <li>ABCs, oxygen, glucose check</li>
                  <li>Benzodiazepine (lorazepam 0.1 mg/kg IV or midazolam 0.2 mg/kg IM)</li>
                  <li>If seizure continues: second dose or load with fosphenytoin/levetiracetam</li>
                  <li>Refractory: phenobarbital, propofol, or intubation</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Neonatal Jaundice</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-sm mb-2">Physiologic vs Pathologic</h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-green-500/10 p-2 rounded">
                    <div className="font-semibold mb-1">Physiologic</div>
                    <ul className="space-y-0.5">
                      <li>• Appears day 2-3</li>
                      <li>• Peaks day 3-5</li>
                      <li>• Resolves by 1-2 weeks</li>
                    </ul>
                  </div>
                  <div className="bg-red-500/10 p-2 rounded">
                    <div className="font-semibold mb-1">Pathologic</div>
                    <ul className="space-y-0.5">
                      <li>• Appears &lt;24 hours</li>
                      <li>• Rapid rise (&gt;5 mg/dL/day)</li>
                      <li>• Total bili &gt;18 mg/dL</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-2">Treatment</h3>
                <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                  <li>Phototherapy (most common)</li>
                  <li>Exchange transfusion if severe</li>
                  <li>Treat underlying cause</li>
                </ul>
              </div>
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
            <h3 className="font-semibold mb-2">Pediatric Assessment Triangle (PAT)</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Quick visual assessment to identify sick children:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li><strong>Appearance:</strong> TICLS (Tone, Interactiveness, Consolability, Look/gaze, Speech/cry)</li>
              <li><strong>Work of Breathing:</strong> Retractions, nasal flaring, positioning</li>
              <li><strong>Circulation to Skin:</strong> Color, mottling, capillary refill</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Red Flags for Serious Illness</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Toxic appearance</li>
              <li>Altered mental status or extreme irritability</li>
              <li>Severe respiratory distress</li>
              <li>Signs of shock (prolonged cap refill, mottling, tachycardia)</li>
              <li>Petechial or purpuric rash</li>
              <li>Severe dehydration</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
