import React,{useState,useEffect} from 'react'
import TypingField from './TypingField';
import Timer from './Timer';
import Results from './Results';

function App() {
  const [currentWord,setCurrentWord] = useState("");
  const [words,setWords] = useState([]);
  const [wordToCheck,setWordToCheck] = useState("");
  const [wordsPassed,setWordsPassed] = useState([]);
  const [isTypingCorrect,setIsTypingCorrect] = useState(true);

  const [result,setResult] = useState({numCorrectWords:0,numCorrectChars:0,accuracy:0});
  const [started,setStarted] = useState(false);
  const [finished,setFinished] = useState(false);
  const [timerRestart,setTimerRestart] = useState(0);//every time i increment timeRestart the clock restarts

  const restart =() =>{
    setCurrentWord("");
    setWordToCheck("");
    setWordsPassed([]);
    setIsTypingCorrect(true);
    setResult({numCorrectWords:0,numCorrectChars:0,accuracy:0});
    setStarted(false);
    setFinished(false);
    setTimerRestart((prevTime) => prevTime+1);
    fetchRandomWords();
  }
  const toogleFinish =()=>{
    setFinished(!finished);
  }
  const handleTyping = (e)=>{

    if(started===false){
      setStarted(true);
    }

    const key = e.key;
    if(key==="Backspace"){
      backspacePressed(key);
    }else if(key === " "){
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
      setIsTypingCorrect(true);
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
    }else{
      setIsTypingCorrect(false);
    }
  }

  const spacePressed = () =>{
      //removes the first word from the array 
      setWords((prevWords)=>{
        return prevWords.filter((item,index)=>{
          if(index === 1){
            setWordToCheck(item);
          }
          if(index!==0){
            return item;
          }
        })
      })
      //add the word writen in the input in the passed words array
      //and resets the currentWord
      setWordsPassed([...wordsPassed,currentWord])
      setCurrentWord("");

      //if the words is corrcet increment the num of correct words and 
      //add to num of correct chars the lenght of the word
      //calulate the accuracy 
      if(currentWord === wordToCheck){

        const correctWords = result.numCorrectWords+1;
        const correctChars = result.numCorrectChars+wordToCheck.length;
        console.log(wordsPassed.length)

        //im adding 1 to wordsPassed.lenght ,because the wordsPassed is not updated yet
        //from the previous setWordsPassed call 
        const accuracy = 100/(1 + wordsPassed.length) * correctWords;
        setResult({
          ...result,
          numCorrectWords:correctWords,
          numCorrectChars:correctChars,
          accuracy:accuracy
        })
      }else{
        const accuracy = 100/(1 + wordsPassed.length) * result.numCorrectWords;
        setResult({
          ...result,
          accuracy:accuracy
        })
      }
  }
  const backspacePressed = () =>{
    if(currentWord.length > 0){
      //note:must return 1 char to the first word of the words array
      //if the currentWord is equl to the wordToCheck
      const subString = wordToCheck.substring(0,currentWord.length);

      if(subString === currentWord){
        setIsTypingCorrect(true);

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
      }else{
        setIsTypingCorrect(false);
      }
      
      //removes the last char from the currentWord-input elemnt
      const slicedWord = currentWord.substring(0,currentWord.length-1);
      setCurrentWord(slicedWord);

      //chek if after removing 1 char the word will it be correct 
      const slicedWord2 = wordToCheck.substring(0,slicedWord.length);
      if(slicedWord2===slicedWord){
        setIsTypingCorrect(true);
      }
    }

  }

  const fetchRandomWords = () =>{
    fetch(`https://random-word-api.herokuapp.com/word?number=20`)
    .then(res=>res.json())
    .then(res=>{
      setWordToCheck(res[0])
      setWords(res);
    })
  }

  useEffect(()=>{
    fetchRandomWords();
  },[])

  return (
    <div>
        <Timer 
          toogleFinish={toogleFinish}
          numCorrectWords={result.numCorrectWords}
          numCorrectChars={result.numCorrectChars}
          accuracy={result.accuracy}
          started={started}
          timerRestart={timerRestart}
        />
        <TypingField data={{
            currentWord:currentWord,
            words:words,
            wordsPassed:wordsPassed,
            isTypingCorrect:isTypingCorrect,
          }}
          handler={handleTyping}
        />

        {finished===true && <Results 
          numCorrectWords={result.numCorrectWords}
          numCorrectChars={result.numCorrectChars}
          accuracy={result.accuracy}
          restart={restart} />}
    </div>
  )
}

export default App;
