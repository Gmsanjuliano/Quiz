import { useEffect, useState } from 'react'
import Quiz from '../components/Quiz'
import QuestionModel from '../model/question'
import { useRouter } from 'next/dist/client/router'

const BASE_URL = 'http://localhost:3000/api'

export default function Home() {
  const router = useRouter()

  const [questionsIds, setQuestionsIds] = useState<number[]>([])
  const [question, setQuestion] = useState<QuestionModel>()
  const [correctAnswer, setCorrectAnswer] = useState<number>(0)

  async function loadQuestionsIds() {
    const resp = await fetch(`${BASE_URL}/quiz`)
    const questionsIds = await resp.json()
    setQuestionsIds(questionsIds)
  }

  async function loadQuestion(questionId: number) {
    const resp = await fetch(`${BASE_URL}/questions/${questionId}`)
    const json = await resp.json()
    const newQuestion = QuestionModel.createUsingObject(json)
    setQuestion(newQuestion)
  }

  useEffect(() => {
    loadQuestionsIds()
  }, [])

  useEffect(() => {
    questionsIds.length > 0 && loadQuestion(questionsIds[0])
  }, [questionsIds])

  function answeredQuestion(answeredQuestion: QuestionModel) {
    setQuestion(answeredQuestion)
    const gotIt = answeredQuestion.gotIt
    setCorrectAnswer(correctAnswer + (gotIt ? 1 : 0))
  }

  function nextQuestionId() {
    if (question) {
      const nextIndex = questionsIds.indexOf(question.id) + 1
      return questionsIds[nextIndex]
    }
  }

  function keepGoing() {
    const nextId = nextQuestionId()
    nextId ? nextQuestion(nextId) : end()
  }

  function nextQuestion(nextId: number) {
    loadQuestion(nextId)
  }

  function end() {
    router.push({
      pathname: "/result",
      query: {
        total: questionsIds.length,
        correct: correctAnswer
      }
    })
  }

  return question ? (
    <Quiz 
      question={question}
      lastQuestion={nextQuestionId() === undefined}
      answeredQuestion={answeredQuestion}
      keepGoing = {keepGoing} />
  ) : false 
}
