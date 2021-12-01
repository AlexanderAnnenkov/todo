import React from "react"
import style from "../pagination.module.css"

let PageNext = ({ allPages, setCurrentPage }) => {
  return (
    <li
      className={style.page}
      onClick={() => setCurrentPage(allPages.length - 1)}
    >
      &gt;&gt;
    </li>
  )
}
export default PageNext
