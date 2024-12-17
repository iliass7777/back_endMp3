import style from './index.module.css';
import { mp3 } from '../api/index';
import { useState, useRef, useEffect } from 'react';

export function MP3() {
  const in1 = useRef(null);
  const [messages, setMessages] = useState("");
  const [status, setStatus] = useState('');
  const url = in1.current.value;

  const eventSource = new EventSource(`http://localhost:3008/mp3?url=${url}`);

  eventSource.onmessage = (event) => {
      console.log('Message reçu:', event.data);
      if (event.data.includes('Téléchargement disponible')) {
          alert('La conversion est terminée. Le téléchargement va commencer.');
      }
  };
  
  eventSource.onerror = () => {
      console.error('Erreur lors de la connexion au serveur.');
      eventSource.close();
  };
  
  const handleDownload = async () => {
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

  return (
    <>
      <h1 className={style.h1}>Bienvenue Mp3 Download</h1>
      <div className={style.container}>
        <input
          type="text"
          className={style.input}
          ref={in1}
          placeholder="Enter the video URL"
          
        />
        <button onClick={handleDownload}>Download</button>
        <p>{status}</p>
        <div>
          <h3>{messages}</h3>
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
