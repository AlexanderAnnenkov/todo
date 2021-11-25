import React from "react";
import style from "./pagination.module.css"
import PagePrev from "./page/pagePrev";
import PageNum from "./page/pageNum";
import PageNext from "./page/pageNext";

let Pagination = () => {
    return (
        <ul className={style.pagination}>
            <PagePrev/>
            <PageNum/>
            <PageNext/>
        </ul>
    )
}

export default Pagination;