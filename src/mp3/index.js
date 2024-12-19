import style from './index.module.css';
import { mp3 } from '../api/index';
import { useState, useRef, useEffect } from 'react';

export function MP3() {
  const in1 = useRef(null);
  const [status, setStatus] = useState('');
  const [downloadStatus, setDownloadStatus] = useState('idle'); // idle, inProgress, completed, error
  const [progress, setProgress] = useState(0); // Progress percentage
  const [message, setMessage] = useState('');

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3008/ytverter');

    eventSource.onmessage = (event) => {
        console.log('Message reçu:', event.data);

        if (event.data.includes('Conversion démarrée')) {
            setDownloadStatus('inProgress');
        } else if (event.data.includes('Progression:')) {
            const progressMatch = event.data.match(/Progression: (\d+)%/);
            if (progressMatch) {
                setProgress(Number(progressMatch[1])); // Met à jour la progression
            }
        } else if (event.data.includes('Téléchargement disponible')) {
            setDownloadStatus('completed');
            alert('La conversion est terminée. Vous pouvez télécharger le fichier.');
            eventSource.close();
        } else if (event.data.includes('Erreur')) {
            setDownloadStatus('error');
            setMessage(event.data);
        }
    };

    eventSource.onerror = () => {
        console.error('Erreur de connexion au serveur.');
        setDownloadStatus('error');
        eventSource.close();
    };

    return () => {
        eventSource.close();
    };
}, []);


  const handleDownload = async () => {
    const url = in1.current.value;
    if (!url) {
      setStatus('Please enter a valid URL.');
      return;
    }

    try {
      console.log('Downloading MP3 from:', url);
      await mp3(url); // Assuming `mp3` is a function that triggers the conversion
      setStatus('Conversion initiée. Veuillez attendre...');
    } catch (error) {
      console.error('Error during download:', error);
      setStatus('Download failed. Please try again.');
    }
  };

  const vider = () => {
    setStatus('');
    setMessage('');
  };

  return (
    <>
      <h1 className={style.h1}>Bienvenue MP3 Download</h1>
      <div className={style.container}>
        <input
          type="text"
          className={style.input}
          ref={in1}
          placeholder="Enter the video URL"
          onChange={vider}
        />
        <button onClick={handleDownload}>Convertir</button>
        {downloadStatus === 'inProgress' && <p>Avancement : {progress}%</p>}
        {downloadStatus === 'completed' && <p>Téléchargement terminé !</p>}
        {downloadStatus === 'error' && <p>{message}</p>}
        <div>
          <h3>{message}</h3>
        </div>
        <select>
          <option selected hidden>Selectionner le format de la vidéo</option>
          <option>MP3</option>
          <option>MP4</option>
        </select>
      </div>
    </>
  );
}
