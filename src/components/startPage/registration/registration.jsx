import React, { useState } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import style from "../startPage.module.css"
import axios from "axios"
import Snackbar from '@mui/material/Snackbar';
import Alert from "@mui/material/Alert"
import { NavLink, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import "../../../translation/i18n"

const Registration = () => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPass, setRepeatPassword] = useState("")
  const [alert, setAlert] = useState("")
  const [triggerError, setTriggerError] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT


  const sendUser = async (e) => {
    try {
      e.preventDefault()
      if (password !== repeatPass) {
        setTriggerError(true)
        return setAlert(t("alertReg"))
      }
      const user = await axios.post(
        `${API_ENDPOINT}/registration`,
        {
          login: login,
          password: password,
        }
      )
      localStorage.setItem("accessToken", user.data.jwtToken)
      setLogin("")
      setPassword("")
      setRepeatPassword("")
      navigate("/main")
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
     <Snackbar open={triggerError} autoHideDuration={3000} onClose={() => setTriggerError(false)}>
          <Alert severity="error" onClose={() => setTriggerError(false)}>
            {alert}
          </Alert>
        </Snackbar>
      <h1 className={style.text}>{t("title")}</h1>
      <h2 className={style.text}>{t("registration")}</h2>
      <form action="post" onSubmit={sendUser}>
        <div className={style.login}>
          <TextField
            required
            id="outlined-required"
            label={t('login')}
            onChange={onNewLogin}
            value={login}
            autoComplete="off"
          />
        </div>
        <div className={style.pwrd}>
          <TextField
            required
            label={t("password")}
            type="password"
            autoComplete="off"
            onChange={onNewPassword}
            value={password}
          />
        </div>
        <div className={style.pwrd1}>
          <TextField
            required
            label={t("repeatPass")}
            type="password"
            autoComplete="off"
            onChange={onRepeatPass}
            value={repeatPass}
          />
        </div>
        <div className={style.btn}>
          <Button type="submit">{t("signUp")}</Button>
        </div>
      </form>
      <p className={style.textDescript}>{t("regDescription")}</p>
      <span className={style.btn1}>
        <NavLink to="/login">
          <Button>{t("signIn")}</Button>
        </NavLink>
      </span>
    </div>
  )
}

export default Registration
