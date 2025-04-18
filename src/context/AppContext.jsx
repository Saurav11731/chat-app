import React, { createContext, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState(null);

  const loadUserData = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        console.error("User document does not exist.");
        return;
      }

      const data = userSnap.data();
      setUserData(data);

      if (data?.name) {
        navigate("/chat");
      } else {
        navigate("/ProfileUpdate");
      }

      // Update lastSeen immediately
      await updateDoc(userRef, { lastSeen: Date.now() });

      // Update lastSeen every 6 seconds
      const intervalId = setInterval(async () => {
        if (auth.currentUser) {
          await updateDoc(userRef, { lastSeen: Date.now() });
        }
      }, 6000);

      // Optional: If you're calling loadUserData in a useEffect, use this return
      return () => clearInterval(intervalId);
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const value = { userData, setUserData, chatData, setChatData, loadUserData };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContextProvider;
