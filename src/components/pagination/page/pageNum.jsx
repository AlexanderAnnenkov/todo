import React from "react";
import style from "../pagination.module.css"

let PageNum =({allPages, setCurrentPage, currentPage}) =>{
    console.log(currentPage);
    return (
        allPages.map(e => <li key={e} className={currentPage === e ? style.active : style.page} onClick={()=>{setCurrentPage(e)}}>{e + 1}</li>)
    )
}
export default PageNum