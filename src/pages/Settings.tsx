import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useStore } from '@/store/useStore'
import { Moon, Sun, Trash2, Download, Info } from 'lucide-react'

export default function Settings() {
  const { darkMode, toggleDarkMode, userProgress, updateProgress } = useStore()

  const handleClearProgress = () => {
    if (window.confirm('Are you sure you want to clear all your progress? This cannot be undone.')) {
      updateProgress({
        completedModules: [],
        assessmentScores: {},
        bookmarks: [],
      })
    }
  }

  const handleExportData = () => {
    const data = JSON.stringify(userProgress, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'pediatrics-master-progress.json'
    a.click()
    URL.revokeObjectURL(url)
  }

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

      {/* Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
          <CardDescription>
            Track your learning journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-accent p-4 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {userProgress.completedModules.length}
              </div>
              <div className="text-sm text-muted-foreground">Modules Completed</div>
            </div>
            <div className="bg-accent p-4 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {Object.keys(userProgress.assessmentScores).length}
              </div>
              <div className="text-sm text-muted-foreground">Assessments Taken</div>
            </div>
            <div className="bg-accent p-4 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {userProgress.bookmarks.length}
              </div>
              <div className="text-sm text-muted-foreground">Bookmarks</div>
            </div>
          </div>

          {Object.keys(userProgress.assessmentScores).length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Assessment Scores</h3>
              <div className="space-y-2">
                {Object.entries(userProgress.assessmentScores).map(([category, score]) => (
                  <div key={category} className="flex items-center justify-between p-3 bg-accent rounded">
                    <span className="text-sm capitalize">{category.replace('-', ' ')}</span>
                    <Badge variant={score >= 80 ? 'success' : score >= 60 ? 'warning' : 'destructive'}>
                      {score}%
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>
            Export or clear your learning data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b">
            <div className="flex items-center gap-3">
              <Download className="h-5 w-5" />
              <div>
                <div className="font-semibold">Export Data</div>
                <div className="text-sm text-muted-foreground">
                  Download your progress as JSON
                </div>
              </div>
            </div>
            <Button onClick={handleExportData} variant="outline">
              Export
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trash2 className="h-5 w-5 text-destructive" />
              <div>
                <div className="font-semibold">Clear All Progress</div>
                <div className="text-sm text-muted-foreground">
                  Reset all learning data and scores
                </div>
              </div>
            </div>
            <Button onClick={handleClearProgress} variant="destructive">
              Clear Data
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
