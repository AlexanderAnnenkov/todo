import axios from "axios";
import React from "react";
import style from './items.module.css'



let Items = ({state , setTodos, showTasks}) => {   
    console.log(state); 
// Function 'Delete task'    
    const delItem = (id) =>{
        axios.delete(`https://todo-api-learning.herokuapp.com/v1/task/1/${id}`)
        .then(() => {
            let newTodos = state.filter((e) => e.uuid !== id);
            setTodos(newTodos);})      
    }
//Funcion 'Edit check'
    const switchCheck = (e) => {
        axios.patch(`https://todo-api-learning.herokuapp.com/v1/task/1/${e.uuid}`,{
            name: e.name,
            done: !e.done
        }).then(
            e.done=!e.done,
        )
        
        // localStorage.setItem('todos', JSON.stringify(state))
        // setTodos(JSON.parse(localStorage.getItem('todos'))) 
    }
//onDblClick event for switch attribute 'contentEditable' on tag 'span'
    const enableContentEditable = (e) =>{
        e.target.contentEditable=true;
    }
//onBlur event for switch attribute 'contentEditable' on tag 'span' when click on body site
    const disableBlur =(e, content) =>{
        e.target.contentEditable=false;
        e.target.textContent=content.name
    }
//onKeyDown event for accept edit in 'Editmode'
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
        <li key={t.uuid} id={t.uuid} className={style.item}>
            <input 
            type="checkbox" 
            checked={t.done} 
            onChange={() => {switchCheck(t)}}/>

            <span 
            onDoubleClick={enableContentEditable} 
            onKeyDown={(e) => editTask(e, t)}
            onBlur={(e) => disableBlur(e, t)} 
            className={style.text}>{t.name}</span>

            <span 
            className={style.date}>{t.date}</span>

            <span 
            onClick={() => {delItem(t.uuid)}} 
            className={style.delete}>
                    <img src="https://cdn-icons-png.flaticon.com/512/2602/2602735.png"/>
            </span>
        </li> )}
        </ul>
    )
}

export default Items