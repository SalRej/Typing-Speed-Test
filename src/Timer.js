import React from 'react'

function Timer(props) {
  return (
    <div>
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