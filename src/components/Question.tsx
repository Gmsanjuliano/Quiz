import QuestionModel from "../model/question";
import styles from "../styles/Question.module.css"
import Answer from "./Answer";
import Tempo from "./tempo";
import Title from "./Title";

const letters = [
  {value: 'A', collor: '#F2C866'},
  {value: 'B', collor: '#F266BA'},
  {value: 'C', collor: '#85D4F2'},
  {value: 'D', collor: '#BCE596'},
]

interface QuestionProps{
  value: QuestionModel
  respTime?: number
  onResponse: (index: number) => void
  runOut: () => void
}

export default function Question(props: QuestionProps) {
  const question = props.value

  function renderAnswers() {
    return question.answers.map((answer, i) => {
      return (
        <Answer 
          key={`${question.id}-${i}`}
          value={answer}
          index={i}
          letter={letters[i].value}
          letterBgCollor={letters[i].collor}
          onResponse={props.onResponse}
        />
      )
    })
  }

  return (
    <div className={styles.question}>
      <Title text={question.title} />
      <Tempo key={question.id} time={props.respTime ?? 10} runOut={props.runOut}/>
      {renderAnswers()}
    </div>
  )
}