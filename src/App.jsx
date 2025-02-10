import React from 'react'// eslint-disable-line
import { Routes, Route } from 'react-router-dom'

import ProfileUpdate from './pages/ProfileUpdate/ProfileUpdate'
import Login from './pages/Login/Login'
import Chat from './pages/Login/Chat/chat'


function App() {
  return (
    <>
   <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/chat" element={<Chat />} />
    <Route path="/ProfileUpdate" element={<ProfileUpdate />} />
    </Routes>
    </>
  )
}

export default App