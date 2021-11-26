import React from "react";
import style from "./pagination.module.css"
import PagePrev from "./page/pagePrev";
import PageNum from "./page/pageNum";
import PageNext from "./page/pageNext";

let Pagination = ({allPages, setCurrentPage}) => {

    return (
        <ul className={style.pagination}>
            <PagePrev/>
            <PageNum allPages={allPages} setCurrentPage={setCurrentPage}/>
            <PageNext/>
        </ul>
    )
}

export default Pagination;