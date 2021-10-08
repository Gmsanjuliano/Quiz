import styles from "../styles/Statistic.module.css"

interface StatisticProps {
  value: any
  text: string
  bgCollor?: string
  fontCollor?: string
}

export default function Statistic(props : StatisticProps) {
  return (
    <div className={styles.statistic}>
      <div className={styles.value} style={{
        backgroundColor: props.bgCollor ?? '#FDD60F',
        color: props.fontCollor ?? '#333'
      }}>
        {props.value}
      </div>
      <div className={styles.text}>
        {props.text}
      </div>
    </div>
  )
}
