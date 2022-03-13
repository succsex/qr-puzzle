import React, { useState, useEffect } from 'react'
import QR from 'components/QR'
import styles from '../styles/Home.module.css'
import { levelGenerator } from '@/lib/utils'
import qs from 'qs'


const Stage = ({ pending, stage, onDevelopment }) => {
  const { answerIndex, choices } = levelGenerator(stage)
  const [deadline, setDeadline] = useState(5)

  useEffect(() => {
    if (pending) {
      return null
    }

    const timeoutId = setInterval(() => {
      if (deadline) {
        setDeadline(0)
      } else {
        console.log('111111111')
        clearInterval(timeoutId)
      }
    }, 5000)
    return () => clearInterval(timeoutId)
  }, [pending, deadline])

  useEffect(() => {
    if (!deadline) {
      console.log('done')
    }
  }, [deadline])

  return (
    <section>
      <div className="w-full bg-gray-200 h-1">
        <div className="bg-blue-600 w-full h-1 duration-5000 scale-x-0"></div>
      </div>
      <h1 className={styles.title}>
        Stage: <strong>{stage}</strong>
      </h1>
      <div className="flex space-around">
        {choices.map((choice, index) => (
          <QR
            key={index}
            onDevelopment={onDevelopment}
            url={`submit/${choice}?${qs.stringify({
              correct: index === answerIndex ? 't' : 'f'
            })}`}
          />
        ))}
      </div>
    </section>
  )
}

export default React.memo(Stage)
