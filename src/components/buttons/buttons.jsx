import React from "react";
import style from './buttons.module.css'

let Buttons = ({setActionType}) => {
    
    return(
        <div className={style.btn}>
            <button onClick={() => setActionType('All')} className={style.button}>All</button>
            <button onClick={() => setActionType('Undone')} className={style.button}>Undone</button>
            <button onClick={() => setActionType('Done')} className={style.button}>Done</button>
            <p>Sort by Date:</p>
            <button onClick={() => setActionType('Old')} className={style.button}>Old</button>
            <button onClick={() => setActionType('New')} className={style.button}>New</button>
        </div>
    )
}

export default Buttons