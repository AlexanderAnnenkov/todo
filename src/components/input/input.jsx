import React from "react"
import style from "./input.module.css"
import { useTranslation } from "react-i18next";
import "../../translation/i18n";

const Input = ({ sendTask, onNewTextTask, text }) => {
  const {t} = useTranslation()
  return (
    <input
      onKeyDown={sendTask}
      onChange={onNewTextTask}
      value={text}
      className={style.fieldWrite}
      type="text"
      placeholder={t("placeholderInput")}
    ></input>
  )
}

export default Input
