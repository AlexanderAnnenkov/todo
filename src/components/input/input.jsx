import React from "react"
import style from "./input.module.css"

const Input = ({ sendTask, onNewTextTask, text }) => {
  return (
    <input
      onKeyDown={sendTask}
      onChange={onNewTextTask}
      value={text}
      className={style.fieldWrite}
      type="text"
      placeholder="I want to..."
    ></input>
  )
}

export default Input
