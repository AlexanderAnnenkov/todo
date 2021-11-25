import React from "react";
import style from './buttons.module.css'

let Buttons = ({actionType,setActionType}) => {
    
    return(
        <div className={style.btn}>
            <button onClick={() => setActionType({...actionType, filter:'All'})} className={style.button}>All</button>
            <button onClick={() => setActionType({...actionType ,filter:'Undone'})} className={style.button}>Undone</button>
            <button onClick={() => setActionType({...actionType ,filter:'Done'})} className={style.button}>Done</button>
            <p>Sort by Date:</p>
            <button onClick={() => setActionType({...actionType, filter:'Old'})} className={style.button}>Old</button>
            <button onClick={() => setActionType({...actionType, filter:'New'})} className={style.button}>New</button>
        </div>
    )
}

export default Buttons