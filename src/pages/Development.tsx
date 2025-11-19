import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { milestones, redFlags } from '@/data/milestones'
import { AlertCircle } from 'lucide-react'

const ageRanges = [
  { label: '2 months', value: 2 },
  { label: '4 months', value: 4 },
  { label: '6 months', value: 6 },
  { label: '9 months', value: 9 },
  { label: '12 months', value: 12 },
  { label: '15 months', value: 15 },
  { label: '18 months', value: 18 },
  { label: '24 months (2 years)', value: 24 },
  { label: '30 months', value: 30 },
  { label: '36 months (3 years)', value: 36 },
  { label: '48 months (4 years)', value: 48 },
  { label: '60 months (5 years)', value: 60 },
]

const domainColors = {
  'gross-motor': 'bg-blue-500/20 text-blue-700 dark:text-blue-300',
  'fine-motor': 'bg-green-500/20 text-green-700 dark:text-green-300',
  'language': 'bg-purple-500/20 text-purple-700 dark:text-purple-300',
  'social': 'bg-pink-500/20 text-pink-700 dark:text-pink-300',
}

const domainLabels = {
  'gross-motor': 'Gross Motor',
  'fine-motor': 'Fine Motor',
  'language': 'Language',
  'social': 'Social',
}

export default function Development() {
  const [selectedAge, setSelectedAge] = useState(12)

  const currentMilestones = milestones.filter((m) => m.age === selectedAge)
  const currentRedFlags = redFlags.filter((rf) => rf.age === selectedAge)

  const groupedMilestones = {
    'gross-motor': currentMilestones.filter((m) => m.domain === 'gross-motor'),
    'fine-motor': currentMilestones.filter((m) => m.domain === 'fine-motor'),
    'language': currentMilestones.filter((m) => m.domain === 'language'),
    'social': currentMilestones.filter((m) => m.domain === 'social'),
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-primary mb-2">
          Development & Milestones
        </h1>
        <p className="text-lg text-muted-foreground">
          Explore developmental milestones across ages and identify red flags requiring evaluation
        </p>
      </div>

      {/* Age Timeline Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Select Age Range</CardTitle>
          <CardDescription>
            Choose an age to see expected milestones and developmental red flags
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {ageRanges.map((age) => (
              <Button
                key={age.value}
                variant={selectedAge === age.value ? 'default' : 'outline'}
                onClick={() => setSelectedAge(age.value)}
                className="w-full"
              >
                {age.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Milestones by Domain */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(groupedMilestones).map(([domain, items]) => {
          if (items.length === 0) return null
          return (
            <Card key={domain}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge className={domainColors[domain as keyof typeof domainColors]}>
                    {domainLabels[domain as keyof typeof domainLabels]}
                  </Badge>
                  <CardTitle className="text-lg">
                    {ageRanges.find((a) => a.value === selectedAge)?.label}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {items.map((milestone) => (
                    <li key={milestone.id} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-sm">{milestone.description}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Red Flags */}
      {currentRedFlags.length > 0 && (
        <Card className="border-destructive">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <CardTitle className="text-destructive">
                Developmental Red Flags - {ageRanges.find((a) => a.value === selectedAge)?.label}
              </CardTitle>
            </div>
            <CardDescription>
              These findings warrant further developmental evaluation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {currentRedFlags.map((flag) => (
                <li key={flag.id} className="flex items-start gap-3 p-3 bg-destructive/10 rounded-md">
                  <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <Badge variant="destructive" className="mb-1">
                      {domainLabels[flag.domain]}
                    </Badge>
                    <p className="text-sm">{flag.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Clinical Pearls */}
      <Card>
        <CardHeader>
          <CardTitle>Clinical Pearls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">General Principles</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Development progresses in predictable sequence but at individual rates</li>
              <li>Gross motor milestones: head control → roll → sit → stand → walk</li>
              <li>Language: cooing → babbling → words → phrases → sentences</li>
              <li>Social smiling emerges around 2 months</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">When to Refer</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Any developmental red flags present</li>
              <li>Loss of previously acquired skills (regression)</li>
              <li>Parental concern about development</li>
              <li>Delayed in multiple domains</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Screening Tools</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Ages & Stages Questionnaire (ASQ)</li>
              <li>Denver Developmental Screening Test (DDST-II)</li>
              <li>Modified Checklist for Autism (M-CHAT) at 18 and 24 months</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
