import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { assessmentQuestions } from '@/data/assessments'
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react'

export default function Assessment() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)

  const categories = Array.from(new Set(assessmentQuestions.map((q) => q.category)))

  const filteredQuestions = selectedCategory
    ? assessmentQuestions.filter((q) => q.category === selectedCategory)
    : assessmentQuestions

  const currentQuestion = filteredQuestions[currentQuestionIndex]

  const handleStartQuiz = (category: string | null) => {
    setSelectedCategory(category)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnsweredQuestions(0)
    setQuizComplete(false)
  }

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    setAnsweredQuestions(answeredQuestions + 1)

    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setQuizComplete(true)
    }
  }

  if (!selectedCategory) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-primary mb-2">
            Assessment & Quizzes
          </h1>
          <p className="text-lg text-muted-foreground">
            Test your knowledge with MCQs and case-based questions
          </p>
        </div>

        {/* Category Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            className="cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => handleStartQuiz(null)}
          >
            <CardHeader>
              <CardTitle>All Topics</CardTitle>
              <CardDescription>
                {assessmentQuestions.length} questions covering all pediatric topics
              </CardDescription>
            </CardHeader>
          </Card>

          {categories.map((category) => {
            const categoryQuestions = assessmentQuestions.filter((q) => q.category === category)
            return (
              <Card
                key={category}
                className="cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => handleStartQuiz(category)}
              >
                <CardHeader>
                  <CardTitle className="capitalize">{category.replace('-', ' ')}</CardTitle>
                  <CardDescription>
                    {categoryQuestions.length} questions
                  </CardDescription>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {categoryQuestions.filter((q) => q.type === 'mcq').length > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        MCQ: {categoryQuestions.filter((q) => q.type === 'mcq').length}
                      </Badge>
                    )}
                    {categoryQuestions.filter((q) => q.type === 'case').length > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        Case: {categoryQuestions.filter((q) => q.type === 'case').length}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  if (quizComplete) {
    const percentage = Math.round((score / filteredQuestions.length) * 100)
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-primary mb-2">Quiz Complete!</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-2">{percentage}%</div>
              <div className="text-xl text-muted-foreground">
                {score} / {filteredQuestions.length} correct
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={() => handleStartQuiz(selectedCategory)} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Retake Quiz
              </Button>
              <Button variant="outline" onClick={() => setSelectedCategory(null)}>
                Choose Different Topic
              </Button>
            </div>

            {percentage >= 80 && (
              <div className="bg-green-500/10 border border-green-500 p-4 rounded-lg text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                <p className="font-semibold">Excellent Work!</p>
                <p className="text-sm text-muted-foreground">
                  You have a strong understanding of this topic.
                </p>
              </div>
            )}

            {percentage >= 60 && percentage < 80 && (
              <div className="bg-yellow-500/10 border border-yellow-500 p-4 rounded-lg text-center">
                <p className="font-semibold">Good Effort!</p>
                <p className="text-sm text-muted-foreground">
                  Review the topics you missed and try again.
                </p>
              </div>
            )}

            {percentage < 60 && (
              <div className="bg-red-500/10 border border-red-500 p-4 rounded-lg text-center">
                <p className="font-semibold">Keep Studying!</p>
                <p className="text-sm text-muted-foreground">
                  Review the learning materials and retake the quiz.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-primary mb-2">Assessment</h1>
          <p className="text-lg text-muted-foreground capitalize">
            {selectedCategory ? selectedCategory.replace('-', ' ') : 'All Topics'}
          </p>
        </div>
        <Button variant="outline" onClick={() => setSelectedCategory(null)}>
          ← Change Topic
        </Button>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {filteredQuestions.length}
            </span>
            <span className="text-sm font-semibold">
              Score: {score} / {answeredQuestions}
              {answeredQuestions > 0 && ` (${Math.round((score / answeredQuestions) * 100)}%)`}
            </span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{
                width: `${((currentQuestionIndex + 1) / filteredQuestions.length) * 100}%`,
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Question */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary">{currentQuestion.type.toUpperCase()}</Badge>
            <Badge variant="outline" className="capitalize">
              {currentQuestion.category.replace('-', ' ')}
            </Badge>
          </div>
          <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {currentQuestion.options?.map((option, idx) => {
              const isSelected = selectedAnswer === idx
              const isCorrect = idx === currentQuestion.correctAnswer
              const showColors = showResult

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                    showColors && isCorrect
                      ? 'border-green-500 bg-green-500/10'
                      : showColors && isSelected && !isCorrect
                      ? 'border-red-500 bg-red-500/10'
                      : isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:bg-accent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{option}</span>
                    {showColors && isCorrect && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {showColors && isSelected && !isCorrect && (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {showResult && (
            <div className="bg-accent p-4 rounded-lg space-y-3">
              <div className="flex items-start gap-2">
                {selectedAnswer === currentQuestion.correctAnswer ? (
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <h3 className="font-semibold mb-2">
                    {selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect'}
                  </h3>
                  <p className="text-sm">{currentQuestion.rationale}</p>
                </div>
              </div>

              <Button onClick={handleNext} className="w-full">
                {currentQuestionIndex < filteredQuestions.length - 1
                  ? 'Next Question →'
                  : 'View Results'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
