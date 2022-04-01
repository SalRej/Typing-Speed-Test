import React,{useState,useEffect} from 'react'
import TypingField from './TypingField';

function App() {
  const [currentWord,setCurrentWord] = useState("");
  const [words,setWords] = useState([]);
  const [wordToCheck,setWordToCheck] = useState("");
  const [wordsPassed,setWordsPassed] = useState([]);
  const [isTypingCorrect,setIsTypingCorrect] = useState(true);
  const [numCorrectWords,setNumCorrectWords] = useState(0);

  const handleTyping = (e)=>{
    console.log(e);
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
          if(index!=0){
            return item;
          }
        })
      })
      //add the word writen in the input in the passed words array
      //and resets the currentWord
      setWordsPassed([...wordsPassed,currentWord])
      setCurrentWord("");

      if(currentWord === wordToCheck){
        setNumCorrectWords(numCorrectWords+1);
      }
  }
  const backspacePressed = (key) =>{
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
        <TypingField data={{
           currentWord:currentWord,
           words:words,
           wordsPassed:wordsPassed,
           numCorrectWords:numCorrectWords,
           isTypingCorrect:isTypingCorrect,
        }}
        handler={handleTyping}
        />
    </div>
  )
}

export default App;
