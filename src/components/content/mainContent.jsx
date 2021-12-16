import { useState, useEffect } from "react"
import style from "./mainContent.module.css"
import Buttons from "./../buttons/buttons"
import Items from "./../items/items"
import Pagination from "../pagination/pagination"
import axios from "axios"
import Input from "../input/input"
import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import { useNavigate } from "react-router"

function MainContent() {
  const [text, setText] = useState("")
  const [filtredType, setFiltredType] = useState("all")
  const [orderType, setOrderType] = useState("asc")
  const [currentPage, setCurrentPage] = useState("0")
  const [todos, setTodos] = useState([])
  const [alert, setAlert] = useState("")
  const [showTasks, setShowTasks] = useState([])
  const [triggerError, setTriggerError] = useState(false)
  const navigate = useNavigate()
  let allPages = [] // Array with count number page
  const token = localStorage.getItem("accessToken")

  useEffect(() => {
    getTasks()
  }, [filtredType, orderType, currentPage])

  const getTasks = async () => {
    try {
      if (!localStorage.getItem("accessToken")) return navigate("/login")
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
      setShowTasks(result.data.slice(currentPage * 5, (currentPage + 1) * 5))
    } catch (err) {
      setAlert(err.response.data)
      setTriggerError(true)
    }
  }
  // const for count page
  const countPages = Math.ceil(todos.length / 5)
  // Cycle for push in array 'allPages' quantity page
  for (let i = 0; i < countPages; i++) {
    allPages.push(i)
  }

  

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
      setAlert(err.response.data)
      setTriggerError(true)
    }
  }
  const exitAccount = () => {
    localStorage.removeItem("accessToken")
    navigate("/login")
  }
  // Render components
  return (
    <div>
      <div className={style.btnExt}>
        <Button
          variant="text"
          onClick={() => {
            exitAccount()
          }}
        >
          Exit
        </Button>
      </div>
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
          setShowTasks={setShowTasks}
          setTriggerError={setTriggerError}
          setAlert={setAlert}
        />

        <Pagination
          allPages={allPages}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  )
}

export default MainContent
