import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [text, setText] = useState('');
  const handleTextReading=()=>{
    const sp= new SpeechSynthesisUtterance(text);
    [sp.voice]=speechSynthesis.getVoices()
    speechSynthesis.speak(sp);
    // filter(voice => voice.lang === 'fr-FR');
  }
  return (
    <>
      <h1>Un lecteur de text</h1>
      <p>Vous entrez un texte dans ce champs puis cliquer sur lire pour ecouter</p>
      <textarea name="" id="" placeholder='Ecrivez un texte' onChange={(event) => { setText(event.target.value) }}></textarea>
      <div className="">
        <button onClick={handleTextReading}>lire</button>
      </div>
    </>
  )
}

export default App
