import React from 'react'
import Login from './components/Login'
import Home from './components/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import OtpPage from './components/OtpPage'
import OwnerLogin from './components/OwnerLogin'

const App = () => {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/otpPage' element={<OtpPage/>} />
          <Route path='/ownerlogin' element={<OwnerLogin/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
