import { useState } from "react";
import style from "./App.module.css";
import Buttons from "./components/buttons/buttons";
import Items from "./components/items/items";
import Pagination from "./components/pagination/pagination";

function App() {
  const _=require('lodash');
  if (JSON.parse(localStorage.getItem('todos'))===null){
    localStorage.setItem('todos', JSON.stringify([]))
  }
  const [actionType, setActionType] = useState({
    filter: 'All',
  })
  let filterTask = []
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')))
  

  switch(actionType.filter){
    case 'Done' : filterTask=(todos.filter(e => e.isCheck === true))
    break
    case 'Undone': filterTask=(todos.filter(e => e.isCheck === false))
    break
    case 'Old': filterTask =_.sortBy(todos, 'date')
    break
    case 'New': filterTask =_.sortBy(todos, 'date').reverse()
    break
    default: filterTask = todos
    break
  }

  const [text,setText] = useState('');
  let date = new Date()
  // console.log(date)
  const onNewTextTask = (e) => {
    setText(e.target.value);
    
  }


  const sendTask=(event)=>{
    if(event.key === "Enter"){
      todos.push({
        id: Math.random(),
        name: text,
        isCheck: false,
        date: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
        // date: "27.11.2021"
      })
      localStorage.setItem('todos', JSON.stringify(todos));
      setText('')
    }
  }
  const sortTaskNew = () => {
    switch(actionType.sort){
      case 'Old': {
      let sort =_.sortBy(todos, 'date')
      localStorage.setItem('todos', JSON.stringify(sort))
    }
      break
      case 'New': {
      let sort =_.sortBy(todos, 'date').reverse()
      localStorage.setItem('todos', JSON.stringify(sort))
      }
      break
      default:
        break
    }
      
  }
  // sortTaskNew()

  
  return (
    <div className={style.app}>
      <h1 className={style.title}>ToDo List</h1>
      <input onKeyDown={sendTask} onChange={onNewTextTask} value={text} className={style.fieldWrite} type="text" placeholder="I want to..."></input>
      <Buttons setActionType={setActionType} actionType={actionType}/>
      <Items state={todos} filterTask={filterTask} setTodos={setTodos}/>
      <Pagination/> 
    </div>
  );
}

export default App;
