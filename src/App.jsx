import React, { useContext, useEffect, useState } from "react"; // eslint-disable-line
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ProfileUpdate from "./pages/ProfileUpdate/ProfileUpdate";
import Login from "./pages/Login/Login";
import Chat from "./pages/Login/Chat/chat";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { AppContext } from "./context/AppContext";

const App = () => {
  const navigate = useNavigate();
  const { loadUserData } = useContext(AppContext);
  
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        navigate("/chat");
        await loadUserData(user.uid);
      } else {
        navigate("/");
      }
    });
  }, []);
  

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
};

export default App;
