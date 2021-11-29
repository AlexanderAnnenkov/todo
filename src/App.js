import { useState } from "react";
import style from "./App.module.css";
import Buttons from "./components/buttons/buttons";
import Items from "./components/items/items";
import Pagination from "./components/pagination/pagination";
import {sortBy} from 'lodash'

function App() {

  if (JSON.parse(localStorage.getItem('todos'))===null){  /// Check on empty array  
    localStorage.setItem('todos', JSON.stringify([]))
  }

  const [text,setText] = useState('');
  const [actionType, setActionType] = useState('')
  const [currentPage, setCurrentPage] = useState('0')
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')))

  let filterTask = []   // Array for filter task
  let allPages =[]      // Array with count number page
  let showTasks = []    // Array for render 5 task in page
  
// 'Switch case' for Filtered task and Sort by date 
  switch(actionType){
    case 'Done' : filterTask=(todos.filter(e => e.isCheck === true))
    break
    case 'Undone': filterTask=(todos.filter(e => e.isCheck === false))
    break
    case 'Old': filterTask =sortBy(todos, 'date')
    break
    case 'New': filterTask =sortBy(todos, 'date').reverse()
    break
    default: filterTask = todos
    break
  }
  // const for count page
  const countPages = Math.ceil(filterTask.length / 5);
// Cycle for push in array 'allPages' quantity page
    for (let i = 0 ; i < countPages; i++){
      allPages.push(i)
  }

  showTasks = filterTask.slice(currentPage*5 , (currentPage+1)*5)

// onChange event for change value tag 'Input'
  const onNewTextTask = (e) => {
    setText(e.target.value);
    
  }
//onKeyDown event for send object task in array on localstorage
  const sendTask=(event)=>{
    if(event.key === "Enter" && event.target.value !==''){
      todos.unshift({
        id: Math.random(),
        name: text,
        isCheck: false,
        date: new Date().toLocaleString()
      })
      localStorage.setItem('todos', JSON.stringify(todos));
      setText('')
    }
  }
// Render components  
  return (
    <div className={style.app}>
      <h1 className={style.title}>ToDo List</h1>

      <input onKeyDown={sendTask}
      onChange={onNewTextTask} 
      value={text} 
      className={style.fieldWrite} 
      type="text" placeholder="I want to..."></input>

      <Buttons 
      setActionType={setActionType} 
      actionType={actionType}/>

{/* Component 'Items' is tasks 'Todo list' */}
      <Items 
      state={todos} 
      filterTask={filterTask} 
      setTodos={setTodos} 
      showTasks={showTasks}/>

      <Pagination 
      allPages={allPages}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}/>

    </div>
  );
}

export default App;
