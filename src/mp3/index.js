import style from './index.module.css'
import {mp3} from '../api/index'
import { useState,useRef, useEffect } from 'react'
export function MP3(){
    const in1=useRef()
    const [url,setUrl]=useState("")
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [isError, setIsError] = useState(false);
    const [me,setMe]=useState('');
    useEffect(()=>{
        const eventSource = new EventSource('http://localhost:3008/your-sse-endpoint');
        eventSource.onopen = () => {
            console.log('SSE connection established');
            setIsConnected(true);
            setIsError(false);
          };
          eventSource.onmessage = (event) => {
            console.log('Received message:', event.data);
            setMessages((prevMessages) => [...prevMessages, event.data]);
          };
          eventSource.onerror = (error) => {
            console.error('SSE connection error:', error);
            setIsConnected(false);
            setIsError(true);
          };
          return () => {
            eventSource.close();
          };
    },[])
    return <>
    <h1 className={style.h1}>Bienvenue Mp3 downoload</h1>
    <h2 className={style.h2}>interdi aux telephone</h2>
    <div  className={style.container}>
         <input type="text" className={style.input} ref={in1}/>
         <button onClick={()=>{
            console.log(in1.current.value)
            setUrl(in1.current.value)
            console.log(url)
            mp3(in1.current.value)
         setMe('sucsses')
         }}>downoload</button>
            <p>{me}</p>
         <p>{messages}</p>
    </div>
    </>
}