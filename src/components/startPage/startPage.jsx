import React, { useState } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import style from "./startPage.module.css"
import { NavLink, useNavigate, Navigate } from "react-router-dom"
import Alert from "@mui/material/Alert"
import axios from "axios"

const StartPage = () => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [alert, setAlert] = useState("")
  const [triggerError, setTriggerError] = useState(false)
  const navigate = useNavigate()

  if (localStorage.getItem("accessToken")) return <Navigate replace to='/main'/>

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
        password,
      })
      localStorage.setItem("accessToken", user.data.jwtToken)
      setLogin("")
      setPassword("")
      navigate("/main")
    } catch (err) {
      setAlert(err.response.data);
      setTriggerError(true)
    }
  }

  return (
    <div className={style.container}>
      {triggerError && (
          <Alert severity="error" onClose={() => setTriggerError(false)}>
            {alert}
          </Alert>
        )}
      <h1 className={style.text}>Todo List</h1>
      <form action="post" onSubmit={sendUser}>
        <div className={style.login}>
          <TextField
            id="outlined-required"
            label="Login"
            onChange={onNewLogin}
            value={login}
            autoComplete="off"
          />
        </div>
        <div className={style.pwrd}>
          <TextField
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            onChange={onNewPassword}
            value={password}
            autoComplete="off"
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
