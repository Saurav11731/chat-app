import React, { createContext, useEffect, useState } from "react";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState(null);
  const [activeChatId, setActiveChatId] = useState(null); // ✅ renamed from messagesId
  const [messages, setMessages] = useState([]);
  const [chatUser, setChatUser] = useState(null);

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

      navigate(data?.name ? "/chat" : "/ProfileUpdate");

      // Immediate lastSeen update
      await updateDoc(userRef, { lastSeen: Date.now() });

    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  // Auto-update lastSeen every 60s
  useEffect(() => {
    if (!auth.currentUser) return;

    const userRef = doc(db, "users", auth.currentUser.uid);

    const intervalId = setInterval(async () => {
      try {
        await updateDoc(userRef, { lastSeen: Date.now() });
      } catch (error) {
        console.error("Error updating lastSeen:", error);
      }
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  // Sync chat list
  useEffect(() => {
    if (userData) {
      const chatRef = doc(db, "chats", userData.id);
      const unSub = onSnapshot(chatRef, async (res) => {
        if (!res.exists()) return;
        const chatItems = res.data().chatsData || [];

        try {
          const tempData = await Promise.all(
            chatItems.map(async (item) => {
              const userSnap = await getDoc(doc(db, "users", item.rId));
              return {
                ...item,
                userData: userSnap.exists() ? userSnap.data() : {},
              };
            })
          );

          setChatData(tempData.sort((a, b) => b.updatedAt - a.updatedAt));
        } catch (err) {
          console.error("Error fetching chat list users:", err);
        }
      });

      return () => unSub();
    }
  }, [userData]);

  const value = {
    userData,
    setUserData,
    chatData,
    setChatData,
    loadUserData,
    activeChatId,
    setActiveChatId,
    messages,
    setMessages,
    chatUser,
    setChatUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContextProvider;
