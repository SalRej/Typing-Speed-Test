import React,{useState,useEffect,useRef} from 'react'
import Header from './Header';
import TypingField from './TypingField';
import Timer from './Timer';
import Results from './Results';

function App() {
  const [currentWord,setCurrentWord] = useState("");
  const [words,setWords] = useState([]);
  const [wordsPassed,setWordsPassed] = useState([]);
  const [finished,setFinished]= useState(false);
  const [result,setResult] = useState({numCorrectWords:0,numCorrectChars:0,accuracy:0});
  
  const wordToCheck = useRef("");
  const started = useRef(false);
  const isTypingCorrect = useRef(true);
  const timerRestart = useRef(0);//every time i increment timeRestart the clock restarts

  const restart =() =>{
    setCurrentWord("");
    setWordsPassed([]);
    setFinished(false);
    setResult({numCorrectWords:0,numCorrectChars:0,accuracy:0});

    wordToCheck.current="";
    isTypingCorrect.current = true;
    started.current=false;
    timerRestart.current = timerRestart.current + 1;

    fetchRandomWords();
  }
  const toogleFinish =()=>{
    setFinished(!finished);
  }
  const handleTyping = (e)=>{

    if(started.current===false){
      started.current=true;
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
    const subString = wordToCheck.current.substring(0,tempWord.length);

    if(subString === tempWord){
      isTypingCorrect.current=true;
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
      isTypingCorrect.current=false;
    }
  }

  const spacePressed = () =>{
      
      //if the words is corrcet increment the num of correct words and 
      //add to num of correct chars the lenght of the word
      //calulate the accuracy 
      console.log(currentWord + " " +wordToCheck.current)
      if(currentWord === wordToCheck.current){

        const correctWords = result.numCorrectWords+1;
        const correctChars = result.numCorrectChars+wordToCheck.current.length;
        console.log(wordsPassed.length)

        //im adding 1 to wordsPassed.lenght ,because the wordsPassed is not updated yet
        //from the previous setWordsPassed call 
        const accuracy = Math.floor(100/(1 + wordsPassed.length) * correctWords);
        setResult({
          ...result,
          numCorrectWords:correctWords,
          numCorrectChars:correctChars,
          accuracy:accuracy
        })
      }else{
        const accuracy = Math.floor(100/(1 + wordsPassed.length) * result.numCorrectWords);
        setResult({
          ...result,
          accuracy:accuracy
        })
      }
            //add the word writen in the input in the passed words array
      //and resets the currentWord
      setWordsPassed([...wordsPassed,currentWord])
      setCurrentWord("");

      //removes the first word from the array 
      setWords((prevWords)=>{
        return prevWords.filter((item,index)=>{
          if(index === 1){
            wordToCheck.current=item;
          }
          if(index!==0){
            return item;
          }
        })
      })
  }
  const backspacePressed = () =>{
    if(currentWord.length > 0){
      //note:must return 1 char to the first word of the words array
      //if the currentWord is equl to the wordToCheck
      const subString = wordToCheck.current.substring(0,currentWord.length);

      if(subString === currentWord){
        isTypingCorrect.current=true;
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
       isTypingCorrect.current=false;
      }
      
      //removes the last char from the currentWord-input elemnt
      const slicedWord = currentWord.substring(0,currentWord.length-1);
      setCurrentWord(slicedWord);

      //chek if after removing 1 char the word will it be correct 
      const slicedWord2 = wordToCheck.current.substring(0,slicedWord.length);
      if(slicedWord2===slicedWord){
        isTypingCorrect.current=true;
      }
    }

  }

  const fetchRandomWords = () =>{
    fetch(`https://random-word-api.herokuapp.com/word?number=200`)
    .then(res=>res.json())
    .then(res=>{
      wordToCheck.current=res[0];
      setWords(res);
    })
  }

  useEffect(()=>{
    fetchRandomWords();
  },[])

  return (
    <div>
        <Header />
        <div className={finished===true ? 'main-body disable-click':'main-body'}>
          <Timer 
            toogleFinish={toogleFinish}
            numCorrectWords={result.numCorrectWords}
            numCorrectChars={result.numCorrectChars}
            accuracy={result.accuracy}
            started={started.current}
            timerRestart={timerRestart.current}
          />
          <TypingField data={{
              currentWord:currentWord,
              words:words,
              wordsPassed:wordsPassed,
              isTypingCorrect:isTypingCorrect.current,
              finished:finished,
              started:started.current
            }}
            handler={handleTyping}
          />

        </div>
          {finished===true && <Results 
            numCorrectWords={result.numCorrectWords}
            numCorrectChars={result.numCorrectChars}
            accuracy={result.accuracy}
            restart={restart} />}
    </div>
  )
}

export default App;
