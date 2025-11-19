import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { congenitalConditions, congenitalCategories } from '@/data/congenital'
import { Heart, Dna, Activity, Bug } from 'lucide-react'

const categoryIcons = {
  cardiac: Heart,
  genetic: Dna,
  metabolic: Activity,
  infection: Bug,
}

const categoryColors = {
  cardiac: 'text-red-500',
  genetic: 'text-blue-500',
  metabolic: 'text-green-500',
  infection: 'text-purple-500',
}

export default function Congenital() {
  const [selectedCategory, setSelectedCategory] = useState<string>('cardiac')
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null)

  const filteredConditions = congenitalConditions.filter(
    (c) => c.category === selectedCategory
  )

  const selectedConditionData = selectedCondition
    ? congenitalConditions.find((c) => c.id === selectedCondition)
    : null

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-primary mb-2">
          Congenital Disorders & Chronic Conditions
        </h1>
        <p className="text-lg text-muted-foreground">
          Cardiac defects, genetic syndromes, metabolic disorders, and congenital infections
        </p>
      </div>

      {/* Category Selector */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(congenitalCategories).map(([key, label]) => {
          const Icon = categoryIcons[key as keyof typeof categoryIcons]
          return (
            <Button
              key={key}
              variant={selectedCategory === key ? 'default' : 'outline'}
              onClick={() => {
                setSelectedCategory(key)
                setSelectedCondition(null)
              }}
              className="h-auto py-4 flex-col gap-2"
            >
              <Icon className={`h-6 w-6 ${selectedCategory === key ? '' : categoryColors[key as keyof typeof categoryColors]}`} />
              <span className="text-sm font-semibold">{label}</span>
            </Button>
          )
        })}
      </div>

      {/* Conditions List */}
      <Card>
        <CardHeader>
          <CardTitle>{congenitalCategories[selectedCategory as keyof typeof congenitalCategories]}</CardTitle>
          <CardDescription>
            Select a condition to view features, diagnosis, and management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredConditions.map((condition) => (
              <button
                key={condition.id}
                onClick={() => setSelectedCondition(condition.id)}
                className={`text-left p-4 rounded-md border transition-colors ${
                  selectedCondition === condition.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:bg-accent'
                }`}
              >
                <div className="font-semibold text-sm">{condition.name}</div>
                <Badge variant="secondary" className="mt-2">
                  {condition.category}
                </Badge>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Condition Details */}
      {selectedConditionData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Clinical Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {selectedConditionData.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Diagnosis</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {selectedConditionData.diagnosis.map((item, idx) => (
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
              <CardTitle className="text-lg">Management</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {selectedConditionData.management.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Clinical Pearls */}
      <Card>
        <CardHeader>
          <CardTitle>Clinical Pearls by Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              Congenital Heart Defects
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Most common: VSD, followed by ASD and PDA</li>
              <li>Cyanotic vs acyanotic distinction is key</li>
              <li>Tetralogy of Fallot: most common cyanotic CHD</li>
              <li>Early echocardiogram for diagnosis</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Dna className="h-4 w-4 text-blue-500" />
              Genetic Syndromes
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Down syndrome: trisomy 21, most common chromosomal disorder</li>
              <li>Turner syndrome: 45,X, short stature, webbed neck</li>
              <li>Klinefelter: 47,XXY, diagnosed in adolescence/adulthood</li>
              <li>Karyotype confirms diagnosis</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Activity className="h-4 w-4 text-green-500" />
              Metabolic Disorders
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Detected by newborn screening</li>
              <li>Early treatment prevents intellectual disability</li>
              <li>PKU: phenylalanine-restricted diet</li>
              <li>Hypothyroidism: levothyroxine replacement</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Bug className="h-4 w-4 text-purple-500" />
              TORCH Infections
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Toxoplasmosis, Other, Rubella, CMV, HSV</li>
              <li>CMV: most common congenital infection</li>
              <li>Hearing loss common sequela of CMV</li>
              <li>Prevention through maternal vaccination (rubella) and hygiene</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
