import React from "react";
import style from './buttons.module.css'

let Buttons = ({setFiltredType, filtredType, orderType, setOrderType}) => {     
    return(
        <div className={style.btn}>
            <button onClick={() => setFiltredType('all')} 
            className={filtredType ==='All' ? style.active : style.button}
            >All</button>
            <button onClick={() => setFiltredType('undone')} className={filtredType ==='undone' ? style.active : style.button}>Undone</button>
            <button onClick={() => setFiltredType('done')} className={filtredType ==='done' ? style.active : style.button}>Done</button>
            <p>Sort by Date:</p>
            <button onClick={() => setOrderType('asc')} className={orderType ==='asc' ? style.active : style.button}>Old</button>
            <button onClick={() => setOrderType('New')} className={orderType ==='New' ? style.active : style.button}>New</button>
        </div>
    )
}

export default Buttons