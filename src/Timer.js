import { render } from '@testing-library/react';
import React from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

function Timer(props) {
    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
          return <div className="timer">Finish...</div>;
        }
      
        return (
          <div className="timer">
            <div className="text">Remaining</div>
            <div className="value">{remainingTime}</div>
            <div className="text">seconds</div>
          </div>
        );
    };

  return (
    <div>
        <CountdownCircleTimer
            key={props.timerRestart}
            isPlaying={props.started}
            duration={60}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            onComplete={()=>{
                props.toogleFinish()
            }}
        >
            {renderTime}
        </CountdownCircleTimer>
        <div>
            Timer:{props.timeLeft}
        </div>
        <div>
            Correct Words:{props.numCorrectWords}
        </div>
        <div>
            Correct Words:{props.numCorrectChars}
        </div>
        <div>
            Accuracy :{props.accuracy}
        </div>
    </div>
    
  )
}

export default Timer