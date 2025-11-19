import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Baby, Syringe, Bug, Heart, Droplets,
  ThermometerSun, Stethoscope, ClipboardList, BookOpen
} from 'lucide-react'

const modules = [
  {
    title: 'Development & Milestones',
    description: 'Track developmental milestones, growth patterns, and identify red flags across ages',
    icon: Baby,
    path: '/development',
    color: 'text-blue-500',
  },
  {
    title: 'Vaccination Schedules',
    description: 'Interactive ACIP vaccine timeline, catch-up rules, and contraindications',
    icon: Syringe,
    path: '/vaccines',
    color: 'text-green-500',
  },
  {
    title: 'Common Infections',
    description: 'Decision trees for otitis media, bronchiolitis, croup, pneumonia, and more',
    icon: Bug,
    path: '/infections',
    color: 'text-red-500',
  },
  {
    title: 'Congenital Disorders',
    description: 'Cardiac defects, genetic syndromes, metabolic disorders, and TORCH infections',
    icon: Heart,
    path: '/congenital',
    color: 'text-pink-500',
  },
  {
    title: 'Acute Care',
    description: 'Pediatric dosing principles and acute care fundamentals',
    icon: Stethoscope,
    path: '/acute-care',
    color: 'text-purple-500',
  },
  {
    title: 'Dehydration Assessment',
    description: 'Classify severity and create rehydration plans for pediatric patients',
    icon: Droplets,
    path: '/dehydration',
    color: 'text-cyan-500',
  },
  {
    title: 'Febrile Seizures',
    description: 'Simple vs complex classification, management, and parent counseling',
    icon: ThermometerSun,
    path: '/febrile-seizure',
    color: 'text-orange-500',
  },
  {
    title: 'Clinical Cases',
    description: 'Practice case-based reasoning with synthetic pediatric vignettes',
    icon: ClipboardList,
    path: '/cases',
    color: 'text-indigo-500',
  },
  {
    title: 'Assessment & Quizzes',
    description: 'Test your knowledge with MCQs, matching, and case scenarios',
    icon: BookOpen,
    path: '/assessment',
    color: 'text-yellow-500',
  },
]

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-primary">
          Welcome to Pediatrics Master
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          An interactive pediatric learning platform covering development, vaccines,
          infections, congenital disorders, and acute care fundamentals. Built for
          medical students, residents, and healthcare professionals.
        </p>
        <div className="flex gap-2 flex-wrap">
          <Link to="/development">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link to="/assessment">
            <Button size="lg" variant="outline">Take Assessment</Button>
          </Link>
        </div>
      </div>

      {/* Educational Disclaimer */}
      <div className="bg-muted/50 border border-border rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          <strong>Educational purposes only.</strong> This platform uses synthetic examples
          and guideline-based educational content. Always follow local protocols and consult
          with supervising physicians for patient care decisions.
        </p>
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => {
          const Icon = module.icon
          return (
            <Link key={module.path} to={module.path}>
              <Card className="h-full hover:bg-accent/50 transition-colors cursor-pointer">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-accent ${module.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{module.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {module.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Learning Framework */}
      <Card>
        <CardHeader>
          <CardTitle>Pediatric Reasoning Framework</CardTitle>
          <CardDescription>
            Universal approach to pediatric patient evaluation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Identify age and developmental stage</li>
            <li>Check vaccines due/overdue</li>
            <li>Identify benign vs dangerous infections</li>
            <li>Prioritize supportive care</li>
            <li>Apply weight-based dosing</li>
            <li>Assess and classify dehydration</li>
            <li>Recognize red flags requiring ED or inpatient care</li>
            <li>Consider congenital or structural causes when patterns persist</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
