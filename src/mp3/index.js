import style from './index.module.css';
import { mp3 } from '../api/index';
import { useState, useRef, useEffect } from 'react';

export function MP3() {
  const in1 = useRef(null);
  const [status, setStatus] = useState('');
  const handleDownload = async () => {
    const url = in1.current.value;
    const formats = document.getElementsByName('format');
    let selectedFormat = '';
    if (!url) {
      setStatus('Please enter a valid URL.');
      return;
    }
    for (const format of formats) {
      if (format.checked) {
        selectedFormat = String(format.value);
        break;
      }
    }
    if (!selectedFormat) {
      setStatus('Please select a format.');
      return;
    }
    try {
      console.log('Downloading MP3 from:', url);
      setStatus('Conversion initiée. Veuillez attendre...');
      const  {data}  = await mp3(url, selectedFormat); // Assuming `mp3` is a function that triggers the conversion
      const download = document.createElement("a");
      download.href = "http://localhost:3008/ytverter/" + Object.values(data)[0];
      download.download = selectedFormat === "mp3" ? "download.mp3" : "download.mp4";
      download.click();
      setStatus('Téléchargement terminé');
    } catch (error) {
      console.error('Error during download:', error);
      setStatus('Échec du téléchargement. Veuillez réessayer.');
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
        <input type='radio' name='format' value='mp3' />mp3
        <input type='radio' name='format' value='mp4' />mp4
      </div>
    </>
  );
}


