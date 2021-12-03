import { useState, useEffect } from "react"
import style from "./App.module.css"
import Buttons from "./components/buttons/buttons"
import Items from "./components/items/items"
import Pagination from "./components/pagination/pagination"
import axios from "axios"
import Input from "./components/input/input"
import Alert from "@mui/material/Alert"

function App() {
  const [text, setText] = useState("")
  const [filtredType, setFiltredType] = useState("")
  const [orderType, setOrderType] = useState("")
  const [currentPage, setCurrentPage] = useState("0")
  const [todos, setTodos] = useState([])
  const [alert, setAlert] = useState("")
  const [triggerError, setTriggerError] = useState(false)
  let allPages = [] // Array with count number page
  let showTasks = [] // Array for render 5 task in page

  useEffect(() => {
    axios
      .get(
        `https://heroku-backend-app-for-todo.herokuapp.com/tasks/?filterBy=${filtredType}&${orderType}`
      )
      .then((res) => {
        setTodos(res.data)
      })
  }, [text, filtredType, orderType])

  const getTasks = () => {
    axios
      .get(
        `https://heroku-backend-app-for-todo.herokuapp.com/tasks?filterBy=${filtredType}`
      )
      .then((res) => {
        setTodos(res.data)
      })
  }
  // const for count page
  const countPages = Math.ceil(todos.length / 5)
  // Cycle for push in array 'allPages' quantity page
  for (let i = 0; i < countPages; i++) {
    allPages.push(i)
  }
  showTasks = todos.slice(currentPage * 5, (currentPage + 1) * 5)

  // onChange event for change value tag 'Input'
  const onNewTextTask = (e) => {
    setText(e.target.value)
  }
  //onKeyDown event for send object task in array on localstorage
  const sendTask = async (event) => {
    try {
      if (event.key === "Enter" && event.target.value !== "") {
        await axios.post("https://heroku-backend-app-for-todo.herokuapp.com/task", {
          name: text,
        })
        setText("")
        getTasks()
      }
    } catch (err) {
      console.log(err);
      setAlert(err.response.data.message)
      setTriggerError(true)
    }
  }
  // Render components
  return (
    <div className={style.app}>
      {triggerError && <Alert severity="error" onClose={()=> setTriggerError(false)} >{alert}</Alert>}

      <h1 className={style.title}>ToDo List</h1>

      <Input sendTask={sendTask} onNewTextTask={onNewTextTask} text={text} />

      <Buttons
        setFiltredType={setFiltredType}
        filtredType={filtredType}
        orderType={orderType}
        setOrderType={setOrderType}
      />

      <Items
        getTasks={getTasks}
        state={todos}
        setTodos={setTodos}
        showTasks={showTasks}
        setTriggerError={setTriggerError}
        setAlert={setAlert}
      />

      <Pagination
        allPages={allPages}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  )
}

export default App
