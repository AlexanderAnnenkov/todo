import Login from './components/startPage/startPage'
import MainContent from './components/content/mainContent'
import Registration from './components/startPage/registration/registration'
import {BrowserRouter, Route, Routes} from "react-router-dom"

function App() {
  return (
  <BrowserRouter>  
  <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path='/main' element={<MainContent/>}/>
    <Route path='/registration' element={<Registration/>}/>
  </Routes>
  </BrowserRouter>
  )
}

export default App
