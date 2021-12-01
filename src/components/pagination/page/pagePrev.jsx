import React from "react"
import style from "../pagination.module.css"

let PagePrev = ({ allPages, setCurrentPage }) => {
  return (
    <li className={style.page} onClick={() => setCurrentPage(allPages[0])}>
      &lt;&lt;
    </li>
  )
}
export default PagePrev
