import React,{useState} from 'react'
import TypingField from './TypingField';
import WordsField from './WordsField';


function App() {
  const [currentWord,setCurrentWord] = useState();
  return (
    <div>
      <TypingField />
      <WordsField />
    </div>
  )
}

export default App;
