import React from 'react'

function TypingField(props) {

    const callHandler = (e) =>{
        props.handler(e);
    }
  return (
    <div className='holder'>
        <div className='input-field' tabIndex="0" onKeyUp={props.data.finished===false ? callHandler:undefined}>
          <div className='writen-words'>
            {
              //loops though the array from the back
              props.data.wordsPassed.slice(0).reverse().map((item,index)=>{
                return (
                  <span key={index}>{item +" "}</span>
                  )
                })
              }
          </div>
          <div className={props.data.isTypingCorrect===true?'current-word':'current-word wrong-word'}>
              <span>{props.data.currentWord}</span>
          </div>
          <div className='write-indicator'>

          </div>
          <div className='words-to-write'>
            {
              props.data.words.map((item,index)=>{
                return(
                  <span key={index}>
                    {item +" "}
                  </span>
                )
              })
            }
          </div>
        </div>
    </div>
  )
}

export default TypingField