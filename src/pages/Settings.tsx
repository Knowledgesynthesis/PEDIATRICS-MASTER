import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useStore } from '@/store/useStore'
import { Moon, Sun, Info } from 'lucide-react'

export default function Settings() {
  const { darkMode, toggleDarkMode } = useStore()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-primary mb-2">
          Settings
        </h1>
        <p className="text-lg text-muted-foreground">
          Customize your learning experience
        </p>
      </div>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the visual appearance of the app
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              <div>
                <div className="font-semibold">Dark Mode</div>
                <div className="text-sm text-muted-foreground">
                  {darkMode ? 'Dark mode is enabled' : 'Light mode is enabled'}
                </div>
              </div>
            </div>
            <Button onClick={toggleDarkMode} variant="outline">
              {darkMode ? 'Switch to Light' : 'Switch to Dark'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            About Pediatrics Master
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Educational Platform</h3>
            <p className="text-sm text-muted-foreground">
              Pediatrics Master is an interactive learning platform designed to help medical students,
              residents, and healthcare professionals master pediatric medicine through evidence-based
              content and interactive learning modules.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Features</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Developmental milestones and red flags</li>
              <li>ACIP vaccination schedules</li>
              <li>Common pediatric infections decision trees</li>
              <li>Congenital disorders and chronic conditions</li>
              <li>Dehydration assessment simulator</li>
              <li>Febrile seizure management</li>
              <li>Interactive case studies</li>
              <li>Assessment quizzes with detailed rationales</li>
              <li>Offline-capable progressive web app</li>
            </ul>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Info className="h-4 w-4" />
              Important Disclaimer
            </h3>
            <p className="text-sm">
              This application is for <strong>educational purposes only</strong>. All cases and
              examples are synthetic. Always follow local protocols, consult current guidelines,
              and work with supervising physicians for patient care decisions. This tool should
              not be used as a substitute for professional medical judgment.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Version Information</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div>Version: 1.0.0</div>
              <div>Last Updated: {new Date().getFullYear()}</div>
              <div>Built with React, TypeScript, and Tailwind CSS</div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">References</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>American Academy of Pediatrics (AAP) Guidelines</li>
              <li>Advisory Committee on Immunization Practices (ACIP)</li>
              <li>CDC Pediatric Guidelines</li>
              <li>WHO Childhood Development Standards</li>
              <li>Evidence-based pediatric literature</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
