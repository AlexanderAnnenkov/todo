import React from "react"
import style from "./buttons.module.css"
import { useTranslation } from "react-i18next";
import "../../translation/i18n";

let Buttons = ({ setFiltredType, filtredType, orderType, setOrderType }) => {
  const {t} = useTranslation()
  return (
    <div className={style.btn}>
      <button
        onClick={() => setFiltredType("")}
        className={filtredType === "All" ? style.active : style.button}
      >
        {t ("all")}
      </button>
      <button
        onClick={() => setFiltredType("undone")}
        className={filtredType === "undone" ? style.active : style.button}
      >
        {t ("undone")}
      </button>
      <button
        onClick={() => setFiltredType("done")}
        className={filtredType === "done" ? style.active : style.button}
      >
        {t ("done")}
      </button>
      <p>{t ("sortByDate")}</p>
      <button
        onClick={() => setOrderType("desc")}
        className={orderType === "desc" ? style.active : style.button}
      >
        {t ("old")}
      </button>
      <button
        onClick={() => setOrderType("asc")}
        className={orderType === "asc" ? style.active : style.button}
      >
        {t ("new")}
      </button>
    </div>
  )
}

export default Buttons
