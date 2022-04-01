import React,{useState,useEffect} from 'react'

function App() {
  const [currentWord,setCurrentWord] = useState("");
  const [words,setWords] = useState([]);
  const [wordToCheck,setWordToCheck] = useState("");
  const [wordsPassed,setWordsPassed] = useState([]);

  const handleTyping = (e)=>{
      const key = e.key;

      if(key=="Backspace"){
        backspacePressed(key);
      }else if(key == " "){
        spacePressed();
      }else{
        typing(key);
      }
  }
  const typing = (key)=>{

    //im gona use temp word for the caclulations below
    //because the currentWord dosent update imediatly;
    const tempWord = currentWord + key;
    setCurrentWord(currentWord + key);
    const subString = wordToCheck.substring(0,tempWord.length);

    if(subString === tempWord){

      setWords((prevWords)=>{

        return prevWords.map((item,index)=>{
          if(index === 0){
            return item.substring(1);
          }
          else{
            return item

          } 
        })
      })
    }
  }

  const spacePressed = () =>{
      setWords((prevWords)=>{
        return prevWords.filter((item,index)=>{
          if(index === 1){
            setWordToCheck(item);
          }
          if(index!=0){
            return item;
          }
        })
      })
      setWordsPassed([...wordsPassed,currentWord])
      setCurrentWord("");
  }
  const backspacePressed = (key) =>{
    if(currentWord.length > 0){
      //note:must return 1 char to the first word of the words array
      //if the currentWord is equl to the wordToCheck
      const subString = wordToCheck.substring(0,currentWord.length);
      console.log(subString +"===" + wordToCheck);
      if(subString === currentWord){
        const lastChar = subString[subString.length-1];
        setWords((prevWords)=>{
          return prevWords.map((item,index)=>{
            if(index===0){
              return lastChar + item;
            }else{
              return item;
            }
          })
        })
      }
      
      //remoes the last char from the currentWord-input elemnt
      const slicedWord = currentWord.substring(0,currentWord.length-1);
      setCurrentWord(slicedWord);
    }

  }

  useEffect(()=>{
    fetch(`https://random-word-api.herokuapp.com/word?number=20`)
    .then(res=>res.json())
    .then(res=>{
      setWordToCheck(res[0])
      setWords(res);
    })
  },[])
  return (
    <div>
        <input className="test2" type="text" value={currentWord} onKeyUp={handleTyping}/>
        <div className='holder' tabIndex="0" onKeyUp={handleTyping}>
          <div className='test1'>
            {
              //loops though the array from the back
              wordsPassed.slice(0).reverse().map(item=>{
                return (
                  <span>{item +" "}</span>
                  )
                })
              }
          </div>
          <div className='test2' onKeyUp={handleTyping}>
              {currentWord}
          </div>
          <div className='test3'>
            {
              words.map(item=>{
                return(
                  <span>
                    {item +" "}
                  </span>
                )
              })
            }
          </div>
        </div>

        <p>{currentWord}</p>
    </div>
  )
}

export default App;
