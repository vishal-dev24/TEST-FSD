import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './COMPO/Register.jsx'
import Login from './COMPO/Login.jsx'
import Profile from './COMPO/Profile.jsx'
import AddTask from './COMPO/AddTask.jsx'
import Update from './COMPO/Update.jsx'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/AddTask' element={<AddTask />} />
        <Route path='/update/:id' element={<Update />} />
      </Routes>
    </Router>
  )
}

export default App