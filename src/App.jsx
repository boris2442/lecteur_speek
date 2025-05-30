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
      <section className="flex flex-col justify-center items-center  w-[100vw] ">
        <div className="max-w-2xl mx-auto p-4 space-y-6">
          <h1 className="text-3xl font-bold text-center">Un lecteur de texte</h1>
          <p className="text-center text-gray-600">Entrez un texte, cliquez sur lire pour écouter</p>

          <textarea
            className="w-full h-40 p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Écrivez un texte"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Voix :</label>
              <select
                className="w-full p-2 border rounded-md"
                onChange={(e) =>
                  setSelectedVoice(voices.find((v) => v.name === e.target.value))
                }
              >
                {voices.map((voice, i) => (
                  <option key={i} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Vitesse : {rate}</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Tonalité : {pitch}</label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            {!isPlaying && (
              <button
                onClick={handleTextReading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Lire
              </button>
            )}
            {isPlaying && !isPaused && (
              <>
                <button
                  onClick={pauseReading}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                >
                  Pause
                </button>
                <button
                  onClick={stopReading}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Arrêter
                </button>
              </>
            )}
            {isPaused && (
              <>
                <button
                  onClick={resumeReading}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Reprendre
                </button>
                <button
                  onClick={stopReading}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Arrêter
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    
      <footer className="mt-8 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} Lecteur Vocal. Tous droits réservés.</p>
      </footer>
    </>
  );
}

export default App;
