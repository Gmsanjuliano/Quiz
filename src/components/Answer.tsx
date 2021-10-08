import AnswerModel from "../model/answer";
import styles from "../styles/Answer.module.css"

interface AnswerProps {
  value: AnswerModel
  index: number
  letter: string
  letterBgCollor: string
  onResponse: (index: number) => void
}

export default function Answer(props: AnswerProps) {
  const answer = props.value
  const revealedAnswer = answer.revealed ? styles.revealedAnswer : ''
  return (
    <div className={styles.answer} onClick={() => props.onResponse(props.index)}>
      <div className={`${revealedAnswer} ${styles.answerContent}`}>
        <div className={styles.front}>
          <div className={styles.letter} style={{backgroundColor: props.letterBgCollor}}>
              {props.letter}
          </div>
          <div className={styles.value}>
              {answer.value}
          </div>
        </div>
        <div className={ styles.back}>
          {answer.correct ? (
          <div className={styles.correct}>
            <div>Resposta Certa</div>
            <div className={styles.value}>{answer.value}</div>
          </div>
          ) : (
            <div className={styles.wrong}>
              <div>Resposta Errada</div>
              <div className={styles.value}>{answer.value}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}