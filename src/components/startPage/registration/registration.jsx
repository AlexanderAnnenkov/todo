import React, { useState } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import style from "../startPage.module.css"
import axios from "axios"
import { useNavigate } from "react-router"

const Registration = () => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPass, setRepeatPassword] = useState("")
  const navigate=useNavigate()

  const sendUser = async (e) => {
    try {
      e.preventDefault()
        if (password !== repeatPass) {
          return alert("Password no identify")
        }
        const user = await axios.post("http://localhost:3002/registration", {
          login: login,
          password: password,
        })
        localStorage.setItem('accessToken', user.data)
        navigate('/main')
        setLogin("")
        setPassword("")
        setRepeatPassword("")
        console.log(user.data)
      
    } catch (err) {

      console.log(err)
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
      <h1 className={style.text}>Todo List</h1>
      <h2 className={style.text}>Registration</h2>
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
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={onNewPassword}
            value={password}
          />
        </div>
        <div className={style.pwrd1}>
          <TextField
            label="Repeat Password"
            type="password"
            autoComplete="current-password"
            onChange={onRepeatPass}
            value={repeatPass}
          />
        </div>
        <div className={style.btn}>
          <Button type="submit">Sign up</Button>
        </div>
      </form>
    </div>
  )
}

export default Registration
