import { useState, useEffect } from "react"
import style from "./mainContent.module.css"
import Buttons from "./../buttons/buttons"
import Items from "./../items/items"
import Pagination from "../pagination/pagination"
import axios from "axios"
import Input from "../input/input"
import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { useNavigate } from "react-router"
import { useTranslation } from "react-i18next"
import "../../translation/i18n"
import i18next from "i18next"

function MainContent() {
  const [text, setText] = useState("")
  const [filtredType, setFiltredType] = useState("all")
  const [orderType, setOrderType] = useState("asc")
  const [currentPage, setCurrentPage] = useState("0")
  const [todos, setTodos] = useState([])
  const [alert, setAlert] = useState("")
  const [showTasks, setShowTasks] = useState([])
  const [language, setLanguage] = useState('')
  const [triggerError, setTriggerError] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation()
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

  const handleChange = (event) => {
    i18next.changeLanguage(event.target.value)
    setLanguage(i18next.language)
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
  const delItem = async(id) => {
    try {
      await axios.delete(`http://localhost:3002/task/${id}`, {
        headers: {
          authorization: `${token}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json;charset=utf-8",
        },
      })
      getTasks()
    } catch (err) {
      setAlert(err.response.data.message)
      setTriggerError(true)
    }
  }
  const switchCheck = async (e) => {
    try {
      await axios.patch(
        `http://localhost:3002/task/${e.uuid}`,
        {
          name: e.name,
          done: !e.done,
        },
        {
          headers: {
            authorization: `${token}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json;charset=utf-8",
          },
        }
      )
      getTasks()
    } catch (err) {
      setAlert(err.response.data.message)
      setTriggerError(true)
    }
  }
  const editTask = async (e, content) => {
    try {
      if (e.key === "Enter") {
        if (e.target.textContent !== "") {
          const editTask = e.target.textContent
          content.name = e.target.textContent
          await axios
            .patch(
              `https://heroku-backend-app-for-todo.herokuapp.com/task/${content.uuid}`,
              {
                name: editTask,
                done: false,
              },
              {
                headers: {
                  authorization: `${token}`,
                  "Access-Control-Allow-Origin": "*",
                  "Content-Type": "application/json;charset=utf-8",
                },
              }
            )
            .then((res) => {
              e.target.contentEditable = false
              getTasks()
            })
        } else {
          e.target.textContent = content.name
          e.target.contentEditable = false
        }
      }
      if (e.key === "Escape") {
        e.target.textContent = content.name
        e.target.contentEditable = false
      }
    } catch (err) {
      setAlert(err.response.data.message)
      setTriggerError(true)
    }
  }
  const handleOnDragEnd = async (result) => {
    try {
      if (!result.destination) return
      const items = Array.from(showTasks)
      const [reorderitems] = items.splice(result.source.index, 1)
      items.splice(result.destination.index, 0, reorderitems)
      setShowTasks(items)
      const indexArray = items.map((task, index) => {
        return { index: task.index, uuid: showTasks[index].uuid }
      })
      await axios.patch(`http://localhost:3002/dnd`, {indexArray}, {
        headers: {
          authorization: `${token}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json;charset=utf-8",
        },
      })
      getTasks()
    } catch (err) {
      console.log(err.response)
      setAlert(err.response.data)
      setTriggerError(true)
    }
  }

  // Render components
  return (
    <div>
      <div className={style.btnExt}>
        <FormControl variant="standard" size="small" sx={{width:100}}>
          <InputLabel id="demo-simple-select-label">Language</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={language}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={'en'}>English</MenuItem>
            <MenuItem value={'ru'}>Russian</MenuItem>
          </Select>
        </FormControl>
        <span className={style.btn1}>
          <Button
          variant="text"
          size="large"
          onClick={() => {
            exitAccount()
          }}
        >
          {t("exit")}
        </Button>
        </span>
      </div>
      <div className={style.app}>
        {triggerError && (
          <Alert severity="error" onClose={() => setTriggerError(false)}>
            {alert}
          </Alert>
        )}

        <h1 className={style.title}>{t("title")}</h1>

        <Input sendTask={sendTask} onNewTextTask={onNewTextTask} text={text} />

        <Buttons
          setFiltredType={setFiltredType}
          filtredType={filtredType}
          orderType={orderType}
          setOrderType={setOrderType}
        />

        <Items
          showTasks={showTasks}
          delItem={delItem}
          switchCheck={switchCheck}
          editTask={editTask}
          handleOnDragEnd={handleOnDragEnd}       
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
