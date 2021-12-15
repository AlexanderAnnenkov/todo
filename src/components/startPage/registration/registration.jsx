import React, { useState } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import style from "../startPage.module.css"
import axios from "axios"
import Alert from "@mui/material/Alert"
import { NavLink } from "react-router-dom"

const Registration = () => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPass, setRepeatPassword] = useState("")
  const [alert, setAlert] = useState("")
  const [triggerError, setTriggerError] = useState(false)

  const sendUser = async (e) => {
    try {
      e.preventDefault()
      if (password !== repeatPass) {
        setTriggerError(true)
        return setAlert("Password no identify")
      }
      const user = await axios.post("http://localhost:3002/registration", {
        login: login,
        password: password,
      })
      localStorage.setItem("accessToken", user.data.jwtToken)
      setLogin("")
      setPassword("")
      setRepeatPassword("")
      // navigate("/main")
    } catch (err) {
      setAlert(err.response.data)
      setTriggerError(true)
    }
  }

  const onNewLogin = (e) => {
    setLogin(e.target.value)
  }

  const onNewPassword = (e) => {
    setPassword(e.target.value)
  }

  const onRepeatPass = (e) => {
    setRepeatPassword(e.target.value)
  }

  return (
    <div className={style.container}>
      {triggerError && (
        <Alert severity="error" onClose={() => setTriggerError(false)}>
          {alert}
        </Alert>
      )}
      <h1 className={style.text}>Todo List</h1>
      <h2 className={style.text}>Registration</h2>
      <form action="post" onSubmit={sendUser}>
        <div className={style.login}>
          <TextField
            required
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
            label="Password"
            type="password"
            autoComplete="off"
            onChange={onNewPassword}
            value={password}
          />
        </div>
        <div className={style.pwrd1}>
          <TextField
            required
            label="Repeat Password"
            type="password"
            autoComplete="off"
            onChange={onRepeatPass}
            value={repeatPass}
          />
        </div>
        <div className={style.btn}>
          <Button type="submit">Sign up</Button>
        </div>
      </form>
      <p className={style.textDescript}>If you have account, sign in!</p>
      <span className={style.btn1}>
        <NavLink to="/login">
          <Button>Sign in</Button>
        </NavLink>
      </span>
    </div>
  )
}

export default Registration
