import React from 'react'
import Login from './components/Login'
import Home from './components/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import OtpPage from './components/OtpPage'
import OwnerLogin from './components/OwnerLogin'
import ResultsPage from './components/ResultsPage'
import ResultSuppliers from './components/ResultSuppliers'
import ContactUs from './components/ContactUs'
import AboutUs from './components/AboutUs'

const App = () => {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/otpPage' element={<OtpPage/>} />
          <Route path='/ownerlogin' element={<OwnerLogin/>}/>
          <Route path='/results' element={<ResultsPage/>}/>
          <Route path='/resultSuppliers' element={<ResultSuppliers/>}/>
          <Route path='/contact' element={<ContactUs/>}/>
          <Route path='/about' element={<AboutUs/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
