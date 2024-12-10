import style from './index.module.css'
export function MP3(){
    return <div  className={style.container}>
         <input type="text" className={style.input}/>
         <button>downoload</button>
    </div>
}