import Login from './components/startPage/startPage'
import MainContent from './components/content/mainContent'
import Registration from './components/startPage/registration/registration'
import AdminPanel from './components/adminPanel/adminPanel'
import {BrowserRouter, Route, Routes,Navigate } from "react-router-dom"

function App() {
  return (
  <BrowserRouter>  
  <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path='/main' element={<MainContent/>}/>
    <Route path='/registration' element={<Registration/>}/>
    <Route path='/admin' element={<AdminPanel/>}/>
    <Route path='*' element={<Navigate replace to='/login'/>}/>
  </Routes>
  </BrowserRouter>
  )
}

export default App
