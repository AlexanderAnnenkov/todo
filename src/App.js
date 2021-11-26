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
  const [text,setText] = useState('');
  const [actionType, setActionType] = useState('all')
  const [currentPage, setCurrentPage] = useState('0')
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')))
  // const [allPages, setAllPages] = useState([]);
  // const [pages, setPages] = useState(0);
  let date = new Date()
  let filterTask = []
  let allPages =[]
  let showTasks = []
  

  switch(actionType){
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

  let countPages = Math.ceil(filterTask.length / 5);
    for (let i = 0 ; i < countPages; i++){
      allPages.push(i)
  }
  console.log(allPages)
  showTasks = filterTask.slice(currentPage*5 , (currentPage+1)*5)
  console.log()
  
  
  

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


  
  return (
    <div className={style.app}>
      <h1 className={style.title}>ToDo List</h1>
      <input onKeyDown={sendTask} onChange={onNewTextTask} value={text} className={style.fieldWrite} type="text" placeholder="I want to..."></input>
      <Buttons setActionType={setActionType} actionType={actionType}/>
      <Items state={todos} filterTask={filterTask} setTodos={setTodos} showTasks={showTasks}/>
      <Pagination allPages={allPages} setCurrentPage={setCurrentPage}/> 
    </div>
  );
}

export default App;
