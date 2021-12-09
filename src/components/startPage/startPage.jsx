import React from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import style from './startPage.module.css'
import { NavLink } from "react-router-dom"

const StartPage = () => {
  return (
    <div className={style.container}>
        <h1 className={style.text}>Todo List</h1>
        <form action="post">
            <div className={style.login}>
          <TextField
            id="outlined-required"
            label="Login"
          />
          </div>
          <div className={style.pwrd}>
          <TextField
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          </div>
          <div className={style.btn}>
          <Button>Sign in</Button>
          </div>
        </form>
        <p className={style.textDescript}>If you don`t have account, sign up!</p>
        <span className={style.btn1}><NavLink to='/registration'>
        <Button>Sign up</Button></NavLink>
        </span>
    </div>
  )
}

export default StartPage
