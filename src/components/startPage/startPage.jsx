import React, { useState } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import style from "./startPage.module.css"
import { NavLink, useNavigate, Navigate } from "react-router-dom"
import Alert from "@mui/material/Alert"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Snackbar from '@mui/material/Snackbar';
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import axios from "axios"
import { useTranslation } from "react-i18next"
import "../../translation/i18n"
import i18next from "i18next"

const StartPage = () => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [alert, setAlert] = useState("")
  const [language, setLanguage] = useState("en")
  const [triggerError, setTriggerError] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

  if (localStorage.getItem("accessToken"))
    return <Navigate replace to="/main" />

  const onNewLogin = (e) => {
    setLogin(e.target.value)
  }

  const onNewPassword = (e) => {
    setPassword(e.target.value)
  }

  const sendUser = async (e) => {
    try {
      e.preventDefault()

      const user = await axios.post(
        `${API_ENDPOINT}/login`,
        {
          login,
          password,
        }, 
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json;charset=utf-8",
            "accept-language": `${language}`
          },
        }
      )
      localStorage.setItem("accessToken", user.data.jwtToken)
      setLogin("")
      setPassword("")
      navigate("/main")
    } catch (err) {
      setAlert(err.response.data)
      setTriggerError(true)
    }
  }

  const handleChange = (event) => {
    i18next.changeLanguage(event.target.value)
    setLanguage(i18next.language)
  }
  return (
    <div>
      <div className={style.btnExt}>
        <FormControl variant="standard" size="small" sx={{ width: 100 }}>
          <InputLabel id="demo-simple-select-label">Language</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={language}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={"en"}>English</MenuItem>
            <MenuItem value={"ru"}>Russian</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={style.container}>
      <Snackbar open={triggerError} autoHideDuration={3000} onClose={() => setTriggerError(false)}>
          <Alert severity="error" onClose={() => setTriggerError(false)}>
            {alert}
          </Alert>
        </Snackbar>
        <h1 className={style.text}>{t("title")}</h1>
        <form action="post" onSubmit={sendUser}>
          <div className={style.login}>
            <TextField
              required
              id="outlined-required"
              label={t("login")}
              onChange={onNewLogin}
              value={login}
              autoComplete="off"
            />
          </div>
          <div className={style.pwrd}>
            <TextField
              required
              id="outlined-password-input"
              label={t("password")}
              type="password"
              onChange={onNewPassword}
              value={password}
              autoComplete="off"
            />
          </div>
          <div className={style.btn}>
            <Button type="submit">{t("signIn")}</Button>
          </div>
        </form>
        <p className={style.textDescript}>{t("logDescription")}</p>
        <span className={style.btn1}>
          <NavLink to="/registration">
            <Button>{t("signUp")}</Button>
          </NavLink>
        </span>
      </div>
    </div>
  )
}

export default StartPage
