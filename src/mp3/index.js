import style from './index.module.css';
import { mp3 } from '../api/index';
import { useState, useRef, useEffect } from 'react';

export function MP3() {
  const in1 = useRef(null);
  const [status, setStatus] = useState('');
  const [downloadStatus, setDownloadStatus] = useState('idle'); // idle, inProgress, completed
  const [message, setMessage] = useState('');
  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3008/ytverter');

    eventSource.onmessage = (event) => {
      const data = event.data.trim();
      console.log('Message reçu:', data);
      setMessage(data);

      if (data.includes('Conversion en cours')) {
        setDownloadStatus('inProgress');
      } else if (data.includes('Téléchargement disponible')) {
        setDownloadStatus('completed');
        alert('La conversion est terminée. Vous pouvez télécharger le fichier.');
        eventSource.close();
      } else if (data.includes('Erreur')) {
        setDownloadStatus('error');
      }
    };

    eventSource.onerror = () => {
      console.error('Erreur lors de la connexion au serveur.');
      setDownloadStatus('error');
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);
  
  const handleDownload = async () => {
    const url=in1.current.value
    if (!url) {
      setStatus('Please enter a valid URL.');
      return;
    }

    try {
      console.log('Downloading MP3 from:', url);
      await mp3(url); // Assuming `mp3` is a function that handles the download
      setStatus('Download successful!');
    } catch (error) {
      console.error('Error during download:', error);
      setStatus('Download failed. Please try again.');
    }
  };
const vider=(e)=>{
  setStatus('')

}
  return (
    <>
      <h1 className={style.h1}>Bienvenue Mp3 Download</h1>
      <div className={style.container}>
        <input
          type="text"
          className={style.input}
          ref={in1}
          placeholder="Enter the video URL"
          onChange={vider}
        />
        <button onClick={ handleDownload}>Download</button>
        { <p>{downloadStatus}</p> }
        <div>
          <h3></h3>
        </div>
        <select>
          <option selected hidden>selectionner la format du video</option>
          <option>MP3</option>
          <option>MP4</option>
        </select>
      </div>
    </>
  );
}
