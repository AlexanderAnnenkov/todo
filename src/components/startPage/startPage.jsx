import React, { useState } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import style from "./startPage.module.css"
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"

const StartPage = () => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const onNewLogin = (e) => {
    setLogin(e.target.value)
  }

  const onNewPassword = (e) => {
    setPassword(e.target.value)
  }

  const sendUser = async (e) => {
    try {
      e.preventDefault()

      const user = await axios.post("http://localhost:3002/login", {
        login,
        password
      })
      localStorage.setItem("accessToken", user.data)
      navigate("/main")
      setLogin("")
      setPassword("")
      // console.log(user.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={style.container}>
      <h1 className={style.text}>Todo List</h1>
      <form action="post" onSubmit={sendUser}>
        <div className={style.login}>
          <TextField
            id="outlined-required"
            label="Login"
            onChange={onNewLogin}
            value={login}
          />
        </div>
        <div className={style.pwrd}>
          <TextField
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={onNewPassword}
            value={password}
          />
        </div>
        <div className={style.btn}>
          <Button type="submit">Sign in</Button>
        </div>
      </form>
      <p className={style.textDescript}>If you don`t have account, sign up!</p>
      <span className={style.btn1}>
        <NavLink to="/registration">
          <Button>Sign up</Button>
        </NavLink>
      </span>
    </div>
  )
}

export default StartPage
