import { CountdownCircleTimer } from "react-countdown-circle-timer"
import styles from "../styles/Tempo.module.css"

interface TempoProps {
  key: any
  time: number
  runOut: () => void
}

export default function Tempo(props: TempoProps) {
  return (
    <div className={styles.tempo}>
      <CountdownCircleTimer
        duration={props.time}
        size={120}
        isPlaying
        onComplete={props.runOut}
        colors={[
          ['#BCE596', 0.33],
          ['#F7B801', 0.33],
          ['#ED827A', 0.33],
        ]}>
        {({remainingTime}) => remainingTime}
        </CountdownCircleTimer>
    </div>
  )
}