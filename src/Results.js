import React from 'react'

function Results(props) {
  return (
    <div>
        <h3>Your result are</h3>
        <p>Accuracy : {props.accuracy}</p>
        <p>Words pred minute: {props.numCorrectWords}</p>
        <p>Charactes pre minute :{props.numCorrectChars}</p>
    </div>
  )
}

export default Results