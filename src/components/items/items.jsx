import axios from "axios"
import React from "react"
import style from "./items.module.css"

let Items = ({ state, setTodos, showTasks, getTasks }) => {
  // let date = new Date(Date.parse(state[0].createdAt))

  // Function 'Delete task'
  const delItem = (id) => {
    axios
      .delete(`https://todo-api-learning.herokuapp.com/v1/task/1/${id}`)
      .then(() => {
        let newTodos = state.filter((e) => e.uuid !== id)
        setTodos(newTodos)
      })
  }
  //Funcion 'Edit check'
  const switchCheck = (e) => {
    axios
      .patch(`https://todo-api-learning.herokuapp.com/v1/task/1/${e.uuid}`, {
        name: e.name,
        done: !e.done,
      })
      .then((res) => {
        getTasks()
      })
  }
  //onDblClick event for switch attribute 'contentEditable' on tag 'span'
  const enableContentEditable = (e) => {
    e.target.contentEditable = true
  }
  //onBlur event for switch attribute 'contentEditable' on tag 'span' when click on body site
  const disableBlur = (e, content) => {
    e.target.contentEditable = false
    e.target.textContent = content.name
  }
  //onKeyDown event for accept edit in 'Editmode'
  const editTask = (e, content) => {
    console.log(content)
    if (e.key === "Enter") {
      if (e.target.textContent !== "") {
        const editTask = e.target.textContent
        content.name = e.target.textContent
        axios
          .patch(
            `https://todo-api-learning.herokuapp.com/v1/task/1/${content.uuid}`,
            {
              name: editTask,
              done: false,
            }
          )
          .then((res) => {
            console.log(editTask)
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
  }
  // let date = new Date(Date.parse(showTasks[0].createdAt))

  // console.log(date.toLocaleString());
  return (
    <ul className={style.items}>
      {showTasks.map((t) => (
        <li key={t.uuid} id={t.uuid} className={style.item}>
          <input
            type="checkbox"
            checked={t.done}
            onChange={() => {
              switchCheck(t)
            }}
          />

          <span
            onDoubleClick={enableContentEditable}
            onKeyDown={(e) => editTask(e, t)}
            onBlur={(e) => disableBlur(e, t)}
            className={style.text}
          >
            {t.name}
          </span>

          <span className={style.date}>
            {new Date(Date.parse(t.createdAt)).toLocaleString()}
          </span>

          <span
            onClick={() => {
              delItem(t.uuid)
            }}
            className={style.delete}
          >
            <img src="https://cdn-icons-png.flaticon.com/512/2602/2602735.png" />
          </span>
        </li>
      ))}
    </ul>
  )
}

export default Items
