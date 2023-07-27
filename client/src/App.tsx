import React from 'react'
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'
import { ThemeProvider } from 'styled-components'
import theme from './styles/theme'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import CardRegister from './pages/CardRegister'
import AccountRegister from './pages/AccountRegister'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/cardregister" element={<CardRegister />}></Route>
          <Route path="/accountregister" element={<AccountRegister />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
