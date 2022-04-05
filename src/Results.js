import React from 'react'

function Results(props) {
  return (
    <div className='results-holder'>
        <h3>Your result are</h3>
        <p>Accuracy : {props.accuracy}</p>
        <p>Words pred minute: {props.numCorrectWords}</p>
        <p>Charactes pre minute :{props.numCorrectChars}</p>
        <button onClick={()=>{props.restart()}}>Try again</button>
    </div>
  )
}

export default Results