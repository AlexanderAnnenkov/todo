import React, { useState } from "react"
import style from "./adminPanel.module.css"
import Button from "@mui/material/Button"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { useTranslation } from "react-i18next"
import "../../translation/i18n"
import { useNavigate } from "react-router"
import i18next from "i18next"
import User from "./user/user"

const AdminPanel = () => {
  const [language, setLanguage] = useState("")
  const { t } = useTranslation()
  const navigate = useNavigate()
  const handleChange = (event) => {
    i18next.changeLanguage(event.target.value)
    setLanguage(i18next.language)
  }
  const exitAccount = () => {
    localStorage.removeItem("accessToken")
    navigate("/login")
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
            <MenuItem value={"ua"}>Ukranian</MenuItem>
          </Select>
        </FormControl>
        <span className={style.btn1}>
          <Button
            variant="text"
            size="large"
            onClick={() => {
              exitAccount()
            }}
          >
            {t("exit")}
          </Button>
        </span>
      </div>
      <div className={style.content}>
        <h1>Users</h1>
        <ul className={style.items}>
            <User/>
        </ul>
      </div>
    </div>
  )
}

export default AdminPanel