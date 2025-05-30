// import { useState } from 'react' // Importe le hook useState de React
// import reactLogo from './assets/react.svg' // Importe le logo React (non utilisé ici)
// import viteLogo from '/vite.svg' // Importe le logo Vite (non utilisé ici)
// import './App.css' // Importe le fichier de styles CSS

// function App() { // Déclaration du composant principal App

//   const [text, setText] = useState(''); // Déclare l'état 'text' pour stocker le texte à lire
//   const [isPlaying, setIsPlaying] = useState(false); // Déclare l'état 'isPlaying' pour savoir si la lecture est en cours

//   const handleTextReading = () => { // Fonction pour gérer la lecture du texte
//     if (text) { // Vérifie si un texte a été saisi

//       if (!isPlaying) { // Si la lecture n'est pas en cours
//         const sp = new SpeechSynthesisUtterance(text); // Crée un objet de synthèse vocale avec le texte
//         [sp.voice] = speechSynthesis.getVoices() // Définit la voix à utiliser (prend la première voix disponible)
//         speechSynthesis.speak(sp); // Lance la lecture du texte à voix haute
//         setIsPlaying(true); // Met à jour l'état pour indiquer que la lecture est en cours
//       } else { // Si la lecture est déjà en cours
//         stopReading(); // Arrête la lecture
//       }
//     } else { // Si aucun texte n'a été saisi
//       alert('Veuillez entrer un texte à lire'); // Affiche une alerte demandant d'entrer un texte
//     }
//   }

//   const stopReading = () => { // Fonction pour arrêter la lecture
//     speechSynthesis.cancel(); // Arrête la synthèse vocale en cours
//     setIsPlaying(false); // Met à jour l'état pour indiquer que la lecture est arrêtée
//   }

//   return ( // Rendu du composant
//     <>
//       <h1>Un lecteur de text</h1>
//       <p>Vous entrez un texte dans ce champs puis cliquer sur lire pour ecouter</p> 
//       <textarea
//         name=""
//         id=""
//         placeholder='Ecrivez un texte'
//         onChange={(event) => { setText(event.target.value) }} // Met à jour l'état 'text' à chaque modification du textarea
//       ></textarea>
//       <div className="">
//         {
//           !isPlaying // Si la lecture n'est pas en cours
//             ? (<button onClick={handleTextReading}>lire</button>) // Affiche le bouton "lire" qui lance la lecture
//             : (<button onClick={stopReading}>Arreter</button>) // Sinon, affiche le bouton "Arreter" qui stoppe la lecture
//         }
//       </div>
//     </>
//   )
// }

// export default App // Exporte le composant App pour l'utiliser ailleurs










import { useEffect, useState } from 'react';
import Home from './components/Home';
import About from './components/About'; // Importation du composant About
 import Footer from './components/Footer'; // Importation du composant Footer (non utilisé ici)

function App() {
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
      setSelectedVoice(availableVoices[0]);
    };

    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
    loadVoices();

    // Charger le texte sauvegardé
    const savedText = localStorage.getItem('savedText');
    if (savedText) setText(savedText);
  }, []);

  useEffect(() => {
    localStorage.setItem('savedText', text);
  }, [text]);

  const handleTextReading = () => {
    if (!text) {
      alert('Veuillez entrer un texte à lire');
      return;
    }

    const sp = new SpeechSynthesisUtterance(text);
    sp.voice = selectedVoice;
    sp.rate = parseFloat(rate);
    sp.pitch = parseFloat(pitch);

    sp.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    speechSynthesis.speak(sp);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const stopReading = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const pauseReading = () => {
    speechSynthesis.pause();
    setIsPaused(true);
  };

  const resumeReading = () => {
    speechSynthesis.resume();
    setIsPaused(false);
  };

  return (
    // <>
    //   <h1>Un lecteur de texte</h1>
    //   <p>Vous entrez un texte dans ce champ puis cliquez sur lire pour écouter</p>

    //   <textarea
    //     placeholder='Écrivez un texte'
    //     value={text}
    //     onChange={(e) => setText(e.target.value)}
    //   ></textarea>

    //   <div>
    //     <label>Voix :</label>
    //     <select onChange={(e) => setSelectedVoice(voices.find(v => v.name === e.target.value))}>
    //       {voices.map((voice, i) => (
    //         <option key={i} value={voice.name}>
    //           {voice.name} ({voice.lang})
    //         </option>
    //       ))}
    //     </select>
    //   </div>

    //   <div>
    //     <label>Vitesse : {rate}</label>
    //     <input
    //       type="range"
    //       min="0.5"
    //       max="2"
    //       step="0.1"
    //       value={rate}
    //       onChange={(e) => setRate(e.target.value)}
    //     />
    //   </div>

    //   <div>
    //     <label>Tonalité : {pitch}</label>
    //     <input
    //       type="range"
    //       min="0"
    //       max="2"
    //       step="0.1"
    //       value={pitch}
    //       onChange={(e) => setPitch(e.target.value)}
    //     />
    //   </div>

    //   <div>
    //     {!isPlaying && (
    //       <button onClick={handleTextReading}>Lire</button>
    //     )}
    //     {isPlaying && !isPaused && (
    //       <>
    //         <button onClick={pauseReading}>Pause</button>
    //         <button onClick={stopReading}>Arrêter</button>
    //       </>
    //     )}
    //     {isPaused && (
    //       <>
    //         <button onClick={resumeReading}>Reprendre</button>
    //         <button onClick={stopReading}>Arrêter</button>
    //       </>
    //     )}
    //   </div>
    // </>

    <>
    <Home />
    <About />
     <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
  <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 space-y-6">
    <h1 className="text-3xl font-bold text-blue-600 text-center">Un lecteur de texte</h1>
    <p className="text-center text-gray-600">
      Entrez un texte dans le champ ci-dessous, puis cliquez sur <strong>Lire</strong> pour l’écouter.
    </p>

    <textarea
      className="w-full h-40 p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      placeholder="Écrivez un texte ici..."
      value={text}
      onChange={(e) => setText(e.target.value)}
    ></textarea>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">Voix :</label>
        <select
          className="w-full p-3 border border-gray-300 rounded-lg"
          onChange={(e) => setSelectedVoice(voices.find((v) => v.name === e.target.value))}
        >
          {voices.map((voice, i) => (
            <option key={i} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">Vitesse : {rate}</label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={(e) => setRate(parseFloat(e.target.value))}
          className="w-full accent-blue-600"
        />
      </div>
    </div>

    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">Tonalité : {pitch}</label>
      <input
        type="range"
        min="0"
        max="2"
        step="0.1"
        value={pitch}
        onChange={(e) => setPitch(parseFloat(e.target.value))}
        className="w-full accent-blue-600"
      />
    </div>

    <div className="flex flex-wrap gap-4 justify-center pt-4">
      {!isPlaying && (
        <button
          onClick={handleTextReading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Lire
        </button>
      )}

      {isPlaying && !isPaused && (
        <>
          <button
            onClick={pauseReading}
            className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
          >
            Pause
          </button>
          <button
            onClick={stopReading}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Arrêter
          </button>
        </>
      )}

      {isPaused && (
        <>
          <button
            onClick={resumeReading}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Reprendre
          </button>
          <button
            onClick={stopReading}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Arrêter
          </button>
        </>
      )}
    </div>
  </div>
</section>

    <Footer />
     
    </>
  );
}

export default App;
