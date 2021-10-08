import QuestionModel from "../model/question";
import styles from "../styles/Quiz.module.css"
import Button from "./Button";
import Question from "./Question";

interface QuizProps {
  question: QuestionModel
  lastQuestion: boolean
  answeredQuestion: (question: QuestionModel) => void
  keepGoing: () => void
}

export default function Quiz(props: QuizProps) {

  function onResponse(index: number) {
    if (props.question.unAnswered) {
      props.answeredQuestion(props.question.answerWhit(index))
    }
  }

  return (
    <div className={styles.quiz}>
      {props.question ?
        <Question 
          value={props.question}
          respTime={6}
          onResponse={onResponse}
          runOut = {props.keepGoing} />
        : false
      }

      <Button onClick={props.keepGoing} text={props.lastQuestion ? 'Finalizar' : 'Próxima'} />
    </div>
  )
}