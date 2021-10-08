import { useRouter } from "next/dist/client/router"
import Button from "../components/Button"
import Statistic from "../components/Statistic"
import styles from "../styles/Result.module.css"

export default function Result() {
  const router = useRouter()

  const total = +router.query.total
  const correct = + router.query.correct
  const percent = Math.round((correct/total) * 100)

  return (
    <div className={styles.result}>
      <h1>Resultado Do Quiz</h1>
      <div style={{
        display: "flex"
      }}>
        <Statistic text="Perguntas" value={total}/>
        <Statistic text="Certas" value={correct}
          bgCollor="#9CD2A4"
        />
        <Statistic text="Percentual" value={`${percent}%`}
          bgCollor="#DE6A33"
        />
      </div>
      <Button href="/" text="Tentar Novamente"/>
    </div>
  )
}