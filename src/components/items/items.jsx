import React from "react";
import style from './items.module.css'



let Items = ({state , setTodos, showTasks}) => {    
    
    const delItem = (id) =>{
      let newTodos = state.filter((e) => e.id !== id);
      setTodos(newTodos);
      localStorage.setItem("todos", JSON.stringify(newTodos));
    }

    const switchCheck = (e) => { 
        e.isCheck=!e.isCheck
        localStorage.setItem('todos', JSON.stringify(state))
        setTodos(JSON.parse(localStorage.getItem('todos'))) 
    }

    const enableContentEditable = (e) =>{
        e.target.contentEditable=true;
    }

    const disableBlur =(e) =>{
        e.target.contentEditable=false;
    }

    const editTask = (e, content) =>{
        if (e.key === 'Enter'){
            if(e.target.textContent !==''){
                content.name = e.target.textContent
                localStorage.setItem('todos', JSON.stringify(state))
                e.target.contentEditable = false
            } else {
                e.target.textContent = content.name
                e.target.contentEditable=false
            }
            
        }
        if (e.key === 'Escape'){
            e.target.textContent = content.name
            e.target.contentEditable=false
        }
    }
    
    return(
        <ul className={style.items}>
        {showTasks.map(t => 
        <li key={t.id} id={t.id} className={style.item}>
            <input 
            type="checkbox" 
            checked={t.isCheck} 
            onChange={() => {switchCheck(t)}}/>

            <span 
            onDoubleClick={enableContentEditable} 
            onKeyDown={(e) => editTask(e, t)}
            onBlur={disableBlur} 
            className={style.text}>{t.name}</span>

            <span 
            className={style.date}>{t.date}</span>

            <span 
            onClick={() => {delItem(t.id)}} 
            className={style.delete}>
                    <img src="https://cdn-icons-png.flaticon.com/512/2602/2602735.png"/>
            </span>
        </li> )}
        </ul>
    )
}

export default Items