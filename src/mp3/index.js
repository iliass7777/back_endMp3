import style from './index.module.css';
import { mp3 } from '../api/index';
import { useState, useRef, useEffect } from 'react';

export function MP3() {
  const in1 = useRef();
  const [messages, setMessages] = useState("");
  const [status, setStatus] = useState('');

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3008/your-sse-endpoint');

    eventSource.onopen = () => {
      console.log('SSE connection established');
    };

    eventSource.onmessage = (event) => {
      console.log('Received message:', event.data);
      setMessages( event.data);
    };

    eventSource.onerror = (error) => {
      console.error('SSE connection error:', error)
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handleDownload = async () => {
    const inputValue = in1.current.value;
    if (!inputValue) {
      setStatus('Please enter a valid URL.');
      return;
    }

    try {
      console.log('Downloading MP3 from:', inputValue);
      await mp3(inputValue); // Assuming `mp3` is a function that handles the download
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
