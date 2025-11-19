import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronRight, CheckCircle } from 'lucide-react'

const clinicalCases = [
  {
    id: 'case-1',
    title: '4-Month-Old with Wheezing',
    category: 'Infections',
    difficulty: 'Moderate',
    presentation: 'A 4-month-old infant presents with 3 days of runny nose and cough, now with increased work of breathing. On exam: temp 38.2°C, RR 55, retractions present, diffuse wheezing and crackles. SpO2 94% on room air.',
    questions: [
      {
        question: 'What is the most likely diagnosis?',
        options: ['Asthma', 'Pneumonia', 'Bronchiolitis', 'Foreign body aspiration'],
        correct: 2,
        explanation: 'Bronchiolitis is most common in infants <2 years (peak 3-6 months). Classic presentation: URI prodrome → wheezing + respiratory distress. Asthma diagnosis is rare at this age.',
      },
      {
        question: 'What is the most appropriate initial management?',
        options: ['Albuterol nebulizer', 'Oral corticosteroids', 'Supportive care', 'Antibiotics'],
        correct: 2,
        explanation: 'Supportive care is the cornerstone of bronchiolitis management. This includes hydration, oxygen if needed, and nasal suctioning. Bronchodilators and steroids are generally not beneficial.',
      },
    ],
  },
  {
    id: 'case-2',
    title: '18-Month-Old Not Walking',
    category: 'Development',
    difficulty: 'Easy',
    presentation: 'An 18-month-old is brought for well-child visit. Parents are concerned because the child is not walking independently yet. The child can stand while holding furniture and says 8-10 words. Otherwise healthy.',
    questions: [
      {
        question: 'Is this a developmental concern?',
        options: ['No, within normal limits', 'Yes, requires immediate referral', 'Borderline, reassess in 3 months', 'Yes, requires extensive workup'],
        correct: 1,
        explanation: 'Most children walk independently by 15 months. Not walking at 18 months is a red flag requiring developmental evaluation and early intervention referral.',
      },
      {
        question: 'What is the next best step?',
        options: ['Reassurance only', 'Developmental screening and referral', 'MRI brain', 'Genetic testing'],
        correct: 1,
        explanation: 'Developmental screening should be performed, and early intervention referral is appropriate. Extensive workup like MRI or genetics would be guided by exam findings and developmental assessment.',
      },
    ],
  },
  {
    id: 'case-3',
    title: '2-Year-Old with Barking Cough',
    category: 'Infections',
    difficulty: 'Easy',
    presentation: 'A 2-year-old presents at night with sudden onset of barking cough and hoarse voice. Low-grade fever. On exam: mild stridor at rest, no retractions, SpO2 99%. Child is playful and interactive.',
    questions: [
      {
        question: 'What is the diagnosis?',
        options: ['Epiglottitis', 'Croup', 'Bronchiolitis', 'Foreign body'],
        correct: 1,
        explanation: 'Barking/seal-like cough with hoarseness and stridor is classic for croup (laryngotracheobronchitis). Symptoms often worse at night.',
      },
      {
        question: 'What is the most appropriate treatment?',
        options: ['Antibiotics', 'Dexamethasone', 'Albuterol', 'Observation only'],
        correct: 1,
        explanation: 'Dexamethasone (0.6 mg/kg PO) is effective for all severities of croup, including mild cases. It reduces symptoms and ED revisits.',
      },
    ],
  },
  {
    id: 'case-4',
    title: '6-Week-Old with Fever',
    category: 'Acute Care',
    difficulty: 'Hard',
    presentation: 'A 6-week-old presents with fever to 38.7°C. Parents report decreased feeding and fussiness. On exam: T 38.8°C, HR 165, RR 45. Infant is irritable, anterior fontanelle is full. No rash. Otherwise normal exam.',
    questions: [
      {
        question: 'What is the most appropriate next step?',
        options: ['Discharge with acetaminophen', 'Oral antibiotics and follow-up in 24h', 'Full sepsis workup and IV antibiotics', 'Observation only'],
        correct: 2,
        explanation: 'Fever in infant <2 months with concerning signs (irritability, full fontanelle) requires full sepsis evaluation (blood, urine, CSF cultures) and empiric IV antibiotics. Do not delay.',
      },
      {
        question: 'Which organisms are of highest concern in this age group?',
        options: ['S. pneumoniae, H. influenzae', 'Group B Strep, E. coli, Listeria', 'S. aureus, Enterococcus', 'Viral only'],
        correct: 1,
        explanation: 'Neonates and young infants are at risk for Group B Streptococcus, E. coli, and Listeria. Empiric coverage with ampicillin + cefotaxime (or gentamicin) is standard.',
      },
    ],
  },
  {
    id: 'case-5',
    title: '10-Year-Old with Sore Throat',
    category: 'Infections',
    difficulty: 'Easy',
    presentation: 'A 10-year-old presents with 2 days of sore throat and fever. Denies cough or runny nose. On exam: temp 38.9°C, tonsillar exudates present, tender anterior cervical lymphadenopathy.',
    questions: [
      {
        question: 'What is the next best step?',
        options: ['Empiric antibiotics', 'Rapid strep test', 'Reassurance, likely viral', 'Throat culture only'],
        correct: 1,
        explanation: 'This presentation is suspicious for strep pharyngitis (Modified Centor criteria). Rapid strep test should be performed. If positive, treat with antibiotics.',
      },
      {
        question: 'If rapid strep test is positive, what is first-line treatment?',
        options: ['Azithromycin 5 days', 'Amoxicillin or Penicillin V 10 days', 'Cephalexin 7 days', 'Supportive care only'],
        correct: 1,
        explanation: 'Penicillin V or amoxicillin for 10 days is first-line for strep pharyngitis. This prevents rheumatic fever and suppurative complications.',
      },
    ],
  },
]

export default function Cases() {
  const [selectedCase, setSelectedCase] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showExplanation, setShowExplanation] = useState(false)

  const caseData = selectedCase
    ? clinicalCases.find((c) => c.id === selectedCase)
    : null

  const handleSelectCase = (caseId: string) => {
    setSelectedCase(caseId)
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setShowExplanation(false)
  }

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
    setShowExplanation(true)
  }

  const handleNextQuestion = () => {
    if (caseData && currentQuestion < caseData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowExplanation(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-primary mb-2">
          Clinical Cases
        </h1>
        <p className="text-lg text-muted-foreground">
          Practice case-based reasoning with synthetic pediatric vignettes
        </p>
      </div>

      {!selectedCase ? (
        /* Case Selection */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {clinicalCases.map((case_) => (
            <Card
              key={case_.id}
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => handleSelectCase(case_.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">{case_.title}</CardTitle>
                    <div className="flex gap-2 mb-3">
                      <Badge variant="secondary">{case_.category}</Badge>
                      <Badge
                        variant={
                          case_.difficulty === 'Easy'
                            ? 'success'
                            : case_.difficulty === 'Moderate'
                            ? 'warning'
                            : 'destructive'
                        }
                      >
                        {case_.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardDescription className="text-sm">
                  {case_.presentation.slice(0, 150)}...
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        /* Active Case */
        <div className="space-y-6">
          <Button variant="outline" onClick={() => setSelectedCase(null)}>
            ← Back to Cases
          </Button>

          {/* Case Presentation */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">{caseData?.title}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{caseData?.category}</Badge>
                    <Badge>{caseData?.difficulty}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{caseData?.presentation}</p>
            </CardContent>
          </Card>

          {/* Question */}
          {caseData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>
                    Question {currentQuestion + 1} of {caseData.questions.length}
                  </span>
                  <Badge variant="outline">
                    {selectedAnswers.filter((_, i) => i < currentQuestion + 1).length} /{' '}
                    {caseData.questions.length} answered
                  </Badge>
                </CardTitle>
                <CardDescription className="text-base mt-3">
                  {caseData.questions[currentQuestion].question}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {caseData.questions[currentQuestion].options.map((option, idx) => {
                    const isSelected = selectedAnswers[currentQuestion] === idx
                    const isCorrect = idx === caseData.questions[currentQuestion].correct
                    const showResult = showExplanation

                    return (
                      <button
                        key={idx}
                        onClick={() => !showExplanation && handleAnswer(idx)}
                        disabled={showExplanation}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                          showResult && isCorrect
                            ? 'border-green-500 bg-green-500/10'
                            : showResult && isSelected && !isCorrect
                            ? 'border-red-500 bg-red-500/10'
                            : isSelected
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:bg-accent'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{option}</span>
                          {showResult && isCorrect && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>

                {showExplanation && (
                  <div className="bg-accent p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Explanation</h3>
                    <p className="text-sm">{caseData.questions[currentQuestion].explanation}</p>
                  </div>
                )}

                {showExplanation && currentQuestion < caseData.questions.length - 1 && (
                  <Button onClick={handleNextQuestion} className="w-full">
                    Next Question →
                  </Button>
                )}

                {showExplanation && currentQuestion === caseData.questions.length - 1 && (
                  <div className="bg-primary/10 p-4 rounded-lg text-center">
                    <h3 className="font-semibold mb-2">Case Complete!</h3>
                    <p className="text-sm mb-4">
                      You answered{' '}
                      {
                        selectedAnswers.filter(
                          (ans, idx) => ans === caseData.questions[idx].correct
                        ).length
                      }{' '}
                      / {caseData.questions.length} questions correctly
                    </p>
                    <Button onClick={() => setSelectedCase(null)}>
                      Return to Case List
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
