import React from "react";
import style from "../pagination.module.css"

let PageNum =({allPages, setCurrentPage}) =>{
    return (
        allPages.map(e => <li className={style.active} onClick={()=>{setCurrentPage(e)}}>{e + 1}</li>)
    )
}
export default PageNum