import style from './index.module.css'
import {mp3} from '../api/index'
import { useState,useRef } from 'react'
export function MP3(){
    const in1=useRef()
    const [url,setUrl]=useState("")
    return <>
    <h1 className={style.h1}>Bienvenue Mp3 downoload</h1>
    <h2 className={style.h2}>interdi aux telephone</h2>
    <div  className={style.container}>
         <input type="text" className={style.input} ref={in1}/>
         <button onClick={()=>{
            setUrl(in1.current.value)
            mp3(url)
            console.log("sucsess")
            
         }}>downoload</button>
    </div>
    </>
}