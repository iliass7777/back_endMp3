import style from './index.module.css';
import { mp3 } from '../api/index';
import { useState, useRef, useEffect } from 'react';

export function MP3() {
  const in1 = useRef(null);
  const [status, setStatus] = useState('');
  const handleDownload = async () => {
    const url = in1.current.value;
    if (!url) {
      setStatus('Please enter a valid URL.');
      return;
    }

    try {
      console.log('Downloading MP3 from:', url);
      setStatus('Conversion initiée. Veuillez attendre...');
      const {data}=await mp3(url); // Assuming `mp3` is a function that triggers the conversion
      const download=document.createElement("a");
      download.href="http://localhost:3008/ytverter/"+data
      download.download="download.mp3";
      download.click();
      console.log(download)
      setStatus('telechargement terminer');
    } catch (error) {
      console.error('Error during download:', error);
      setStatus('Download failed. Please try again.');
    }
  };

  const vider = () => {
    setStatus('');
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
        <div>
          <h3>{status}</h3>
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
