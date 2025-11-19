import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { vaccines, vaccineSchedule, catchUpGuidelines } from '@/data/vaccines'
import { AlertCircle, Syringe } from 'lucide-react'

export default function Vaccines() {
  const [selectedVaccine, setSelectedVaccine] = useState<string | null>(null)

  const selectedVaccineData = selectedVaccine
    ? vaccines.find((v) => v.id === selectedVaccine)
    : null

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-primary mb-2">
          Vaccination Schedules (ACIP)
        </h1>
        <p className="text-lg text-muted-foreground">
          Interactive vaccine timeline from birth to 18 years with catch-up rules and contraindications
        </p>
      </div>

      {/* Vaccine Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Immunization Timeline</CardTitle>
          <CardDescription>
            Click on a vaccine to see detailed information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(vaccineSchedule).map(([age, vaccineIds]) => {
              const ageLabel =
                age === 'birth'
                  ? 'Birth'
                  : parseInt(age) >= 12
                  ? `${Math.floor(parseInt(age) / 12)} ${Math.floor(parseInt(age) / 12) === 1 ? 'year' : 'years'}${parseInt(age) % 12 ? ` ${parseInt(age) % 12}mo` : ''}`
                  : `${age} months`

              return (
                <div key={age} className="flex flex-col sm:flex-row gap-3 pb-4 border-b border-border last:border-0">
                  <div className="sm:w-32 font-semibold text-primary flex-shrink-0">
                    {ageLabel}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {vaccineIds.map((vaccineId) => {
                      const vaccine = vaccines.find((v) => v.id === vaccineId)
                      return (
                        <Badge
                          key={`${age}-${vaccineId}`}
                          variant={selectedVaccine === vaccineId ? 'default' : 'secondary'}
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                          onClick={() => setSelectedVaccine(vaccineId)}
                        >
                          <Syringe className="h-3 w-3 mr-1" />
                          {vaccine?.name || vaccineId}
                        </Badge>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Selected Vaccine Details */}
      {selectedVaccineData && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Syringe className="h-5 w-5" />
              {selectedVaccineData.name}
            </CardTitle>
            <CardDescription>
              Vaccine schedule and important considerations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Schedule</h3>
              <p className="text-sm">
                Given at:{' '}
                {selectedVaccineData.ages
                  .map((age) =>
                    age === 0
                      ? 'birth'
                      : age >= 12
                      ? `${Math.floor(age / 12)} ${Math.floor(age / 12) === 1 ? 'year' : 'years'}`
                      : `${age} months`
                  )
                  .join(', ')}
              </p>
            </div>
            {selectedVaccineData.notes && (
              <div>
                <h3 className="font-semibold mb-2">Notes</h3>
                <p className="text-sm text-muted-foreground">{selectedVaccineData.notes}</p>
              </div>
            )}
            {selectedVaccineData.contraindications && (
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2 text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  Contraindications
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  {selectedVaccineData.contraindications.map((ci, idx) => (
                    <li key={idx} className="text-sm text-destructive">
                      {ci}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* All Vaccines List */}
      <Card>
        <CardHeader>
          <CardTitle>All Recommended Vaccines</CardTitle>
          <CardDescription>Complete list of childhood immunizations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {vaccines.map((vaccine) => (
              <button
                key={vaccine.id}
                onClick={() => setSelectedVaccine(vaccine.id)}
                className="text-left p-3 rounded-md border border-border hover:bg-accent transition-colors"
              >
                <div className="flex items-start gap-2">
                  <Syringe className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm">{vaccine.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {vaccine.ages
                        .slice(0, 3)
                        .map((age) =>
                          age === 0
                            ? 'birth'
                            : age >= 12
                            ? `${Math.floor(age / 12)}y`
                            : `${age}mo`
                        )
                        .join(', ')}
                      {vaccine.ages.length > 3 && '...'}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Catch-Up Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Catch-Up Immunization Guidelines</CardTitle>
          <CardDescription>
            Key considerations for delayed or missed vaccines
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {catchUpGuidelines.map((guideline, idx) => (
              <div key={idx} className="p-3 bg-accent rounded-md">
                <div className="font-semibold text-sm mb-1">{guideline.vaccine}</div>
                <div className="text-sm text-muted-foreground">{guideline.guidance}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Clinical Pearls */}
      <Card>
        <CardHeader>
          <CardTitle>Clinical Pearls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">General Principles</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Vaccines can be given simultaneously (different sites)</li>
              <li>Minimum intervals between doses must be respected</li>
              <li>Live vaccines (MMR, varicella) require 4-week interval if not given simultaneously</li>
              <li>Valid doses: minimum age and minimum intervals met</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Common Contraindications</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Severe allergic reaction to previous dose</li>
              <li>Live vaccines: pregnancy, severe immunodeficiency</li>
              <li>DTaP: encephalopathy within 7 days of previous dose</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Not Contraindications</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Mild illness with or without fever</li>
              <li>Recent antibiotic therapy</li>
              <li>Prematurity (use chronological age, not corrected)</li>
              <li>Family history of adverse events</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
