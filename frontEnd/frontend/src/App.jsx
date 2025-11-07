import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/login.jsx'
import SignUp from './pages/Signup.jsx'

function App() { 

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
