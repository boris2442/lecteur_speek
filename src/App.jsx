import { useState } from 'react' // Importe le hook useState de React
import reactLogo from './assets/react.svg' // Importe le logo React (non utilisé ici)
import viteLogo from '/vite.svg' // Importe le logo Vite (non utilisé ici)
import './App.css' // Importe le fichier de styles CSS

function App() { // Déclaration du composant principal App

  const [text, setText] = useState(''); // Déclare l'état 'text' pour stocker le texte à lire
  const [isPlaying, setIsPlaying] = useState(false); // Déclare l'état 'isPlaying' pour savoir si la lecture est en cours

  const handleTextReading = () => { // Fonction pour gérer la lecture du texte
    if (text) { // Vérifie si un texte a été saisi

      if (!isPlaying) { // Si la lecture n'est pas en cours
        const sp = new SpeechSynthesisUtterance(text); // Crée un objet de synthèse vocale avec le texte
        [sp.voice] = speechSynthesis.getVoices() // Définit la voix à utiliser (prend la première voix disponible)
        speechSynthesis.speak(sp); // Lance la lecture du texte à voix haute
        setIsPlaying(true); // Met à jour l'état pour indiquer que la lecture est en cours
      } else { // Si la lecture est déjà en cours
        stopReading(); // Arrête la lecture
      }
    } else { // Si aucun texte n'a été saisi
      alert('Veuillez entrer un texte à lire'); // Affiche une alerte demandant d'entrer un texte
    }
  }

  const stopReading = () => { // Fonction pour arrêter la lecture
    speechSynthesis.cancel(); // Arrête la synthèse vocale en cours
    setIsPlaying(false); // Met à jour l'état pour indiquer que la lecture est arrêtée
  }

  return ( // Rendu du composant
    <>
      <h1>Un lecteur de text</h1>
      <p>Vous entrez un texte dans ce champs puis cliquer sur lire pour ecouter</p> 
      <textarea
        name=""
        id=""
        placeholder='Ecrivez un texte'
        onChange={(event) => { setText(event.target.value) }} // Met à jour l'état 'text' à chaque modification du textarea
      ></textarea>
      <div className="">
        {
          !isPlaying // Si la lecture n'est pas en cours
            ? (<button onClick={handleTextReading}>lire</button>) // Affiche le bouton "lire" qui lance la lecture
            : (<button onClick={stopReading}>Arreter</button>) // Sinon, affiche le bouton "Arreter" qui stoppe la lecture
        }
      </div>
    </>
  )
}

export default App // Exporte le composant App pour l'utiliser ailleurs