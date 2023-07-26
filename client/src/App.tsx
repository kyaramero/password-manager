import React from 'react'
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import CardRegister from './pages/CardRegister'
import AccountRegister from './pages/AccountRegister'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/cardregister" element={<CardRegister />}></Route>
        <Route path="/accountregister" element={<AccountRegister />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
