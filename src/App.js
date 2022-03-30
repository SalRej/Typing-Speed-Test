import React,{useState,useEffect} from 'react'

function App() {
  const [currentWord,setCurrentWord] = useState("");
  const [words,setWords] = useState([]);
  const handleTyping = (e)=>{
      setCurrentWord(e.target.value);
  }

  useEffect(()=>{
    fetch(`https://random-word-api.herokuapp.com/word?number=10`)
    .then(res=>res.json())
    .then(res=>{
      setWords(res);
    })
  },[])
  return (
    <div>
        <input className="test" type="text" value={currentWord} onChange={handleTyping}/>
        <input className="test2" disabled={true} value={words.join(" ")}/>
        <p>{currentWord}</p>
    </div>
  )
}

export default App;
