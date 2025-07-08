import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Setting from './pages/Setting'
import Profile from './pages/Profile'

const App = () => {
  return (
    <div>
      <Navbar>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/' element={<Signup/>} />
          <Route path='/' element={<Login/>} />
          <Route path='/' element={<Setting/>} />
          <Route path='/' element={<Profile/>} />
        </Routes>
      </Navbar>
    </div>
  )
}

export default App