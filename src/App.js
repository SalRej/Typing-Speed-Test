import React,{useState} from 'react'

function App() {
  const [currentWord,setCurrentWord] = useState();
  const handleTyping = ()=>{

  }
  return (
    <div>
        <input type="text" value={currentWord} onChange={handleTyping}/>
    </div>
  )
}

export default App;
