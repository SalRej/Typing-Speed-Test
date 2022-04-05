import React from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

function Timer(props) {
    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
          return <div className="timer">Finish...</div>;
        }
      
        return (
          <div className="timer">
            <div className="timer-value">{remainingTime}</div>
            <div className="text">seconds</div>
          </div>
        );
    };

  return (
    <div>
        <div className='test-speed'>
            <p>Typing Speed Test</p>
            <h1>Test your typing skills</h1>
        </div>

        <div className='performance-holder'>
            <CountdownCircleTimer
                key={props.timerRestart}
                isPlaying={props.started}
                duration={6}
                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[7, 5, 2, 0]}
                size={110}
                strokeWidth	={5}
                onComplete={()=>{
                    props.toogleFinish()
                }}
            >
                {renderTime}
            </CountdownCircleTimer>
            <div className='value-holder'>
                <div className='value'>
                    {props.numCorrectWords}
                </div>
                <p>words/min</p>
            </div>
            <div className='value-holder'>
                <div className='value'>
                    {props.numCorrectChars}
                </div>
                <p>chars/min</p>
            </div>
            <div className='value-holder'>
                <div className='value'>
                    {props.accuracy}
                </div>
                <p>% accuracy</p>
            </div>
        </div>
    </div>
    
  )
}

export default Timer