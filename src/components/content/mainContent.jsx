import { useState, useEffect } from "react"
import style from "./mainContent.module.css"
import Buttons from "./../buttons/buttons"
import Items from "./../items/items"
import Pagination from "../pagination/pagination"
import axios from "axios"
import Input from "../input/input"
import Alert from "@mui/material/Alert"

function MainContent() {
  const [text, setText] = useState("")
  const [filtredType, setFiltredType] = useState("all")
  const [orderType, setOrderType] = useState("asc")
  const [currentPage, setCurrentPage] = useState("0")
  const [todos, setTodos] = useState([])
  const [alert, setAlert] = useState("")
  const [triggerError, setTriggerError] = useState(false)
  let allPages = [] // Array with count number page
  let showTasks = [] // Array for render 5 task in page
  const token = localStorage.getItem("accessToken")
  // console.log(token)

  useEffect(() => {
    getTasks()
    
  }, [text, filtredType, orderType])

  const getTasks = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3002/tasks?filterBy=${filtredType}&sortBy=${orderType}`,
        {
          headers: {
            authorization: localStorage.getItem("accessToken"),
            "Content-Type": "application/json;charset=utf-8",
          },
        }
      )
      setTodos(result.data)
    } catch (err) {
      console.log(err)
    }
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
        await axios.post(
          "http://localhost:3002/task",
          { name: text },
          {
            headers: {
              authorization: `${token}`,
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json;charset=utf-8",
            },
          }
        )
        setText("")
        getTasks()
      }
    } catch (err) {
      // console.log(err)
      console.log(err.response ,'123123123');
      setAlert(err.response.data.message)
      setTriggerError(true)
    }
  }
  // Render components
  return (
    <div className={style.app}>
      {triggerError && (
        <Alert severity="error" onClose={() => setTriggerError(false)}>
          {alert}
        </Alert>
      )}

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

export default MainContent
