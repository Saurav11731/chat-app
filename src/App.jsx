import React from "react"; // eslint-disable-line
import { Routes, Route, Navigate } from "react-router-dom";

import ProfileUpdate from "./pages/ProfileUpdate/ProfileUpdate";
import Login from "./pages/Login/Login";
import Chat from "./pages/Login/Chat/chat";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App=() =>{
  
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/ProfileUpdate" element={<ProfileUpdate />} />
      </Routes>
    </>
  );
}

export default App;
