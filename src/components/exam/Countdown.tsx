import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import React from 'react'

const Countdown = ({ submitExam }: { submitExam: () => void }) => {
  const handleComplete = () => {
    submitExam()
  }

  return (
    <CountdownCircleTimer
      isPlaying
      duration={75}
      colors={['#004777', '#F7B801', '#A30000', '#A30000']}
      colorsTime={[85, 50, 25, 0]}
      size={60}
      strokeWidth={5}
      onComplete={handleComplete}
    >
      {({ remainingTime }) => `${Math.floor(remainingTime / 60)}:${remainingTime % 60 < 10 ? '0' + remainingTime % 60 : remainingTime % 60}`}
    </CountdownCircleTimer>
  )
}

export default Countdown