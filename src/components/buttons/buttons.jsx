import React from "react";
import style from './buttons.module.css'

let Buttons = ({setActionType, actionType}) => {
    console.log(actionType);
    

   
    
    return(
        <div className={style.btn}>
            <button onClick={() => setActionType('All')} 
            className={actionType ==='All' ? style.active : style.button}
            >All</button>
            <button onClick={() => setActionType('Undone')} className={actionType ==='Undone' ? style.active : style.button}>Undone</button>
            <button onClick={() => setActionType('Done')} className={actionType ==='Done' ? style.active : style.button}>Done</button>
            <p>Sort by Date:</p>
            <button onClick={() => setActionType('Old')} className={actionType ==='Old' ? style.active : style.button}>Old</button>
            <button onClick={() => setActionType('New')} className={actionType ==='New' ? style.active : style.button}>New</button>
        </div>
    )
}

export default Buttons