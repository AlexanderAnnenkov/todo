import React from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import style from '../startPage.module.css'

const Registration = () => {
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
    </div>
  )
}

export default Registration
