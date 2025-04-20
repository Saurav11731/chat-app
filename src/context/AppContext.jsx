// src/context/AppContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";

// Named export for AppContext
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchUser, setSearchUser] = useState("");
  const [newMsg, setNewMsg] = useState("");
  const [newUser, setNewUser] = useState(null);

  // Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("🔥 Auth user:", user);
        await loadUserData(user.uid);
      } else {
        setUserData(null);
        navigate("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Fixed version of loadUserData
  const loadUserData = async (uid) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const data = userSnap.data();

        // ✅ Apply fallback to ensure chatsData is always an array
        const userData = {
          ...data,
          chatsData: Array.isArray(data.chatsData) ? data.chatsData : [],
        };

        console.log("✅ Loaded User Data:", userData);
        setUserData(userData);

        // Optional: if you want to use fetchChats with messageId
        // const chatIds = userData.chatsData.map(chat => chat.messageId);
        // fetchChats(chatIds);
      } else {
        console.error("❌ User doc not found!");
        signOut(auth);
      }
    } catch (error) {
      console.error("❌ Error loading user data:", error);
    }
  };

  // Optional: fetchChats using messageIds if you're not storing full chat in users
  const fetchChats = async (chatIds = []) => {
    try {
      if (chatIds.length === 0) {
        console.warn("⚠️ No chats to fetch.");
        return;
      }

      const chatPromises = chatIds.map((chatId) =>
        getDoc(doc(db, "chats", chatId))
      );
      const chatDocs = await Promise.all(chatPromises);
      const userChats = chatDocs
        .filter((doc) => doc.exists())
        .map((doc) => ({ id: doc.id, ...doc.data() }));
      setChats(userChats);
    } catch (error) {
      console.error("❌ Error fetching chats:", error);
    }
  };

  // Auto update last seen on unload
  useEffect(() => {
    const updateLastSeen = async () => {
      try {
        if (auth.currentUser) {
          const userRef = doc(db, "users", auth.currentUser.uid);
          await updateDoc(userRef, { lastSeen: Date.now() });
          console.log("✅ Last seen updated");
        }
      } catch (error) {
        console.error("❌ Error updating lastSeen:", error);
      }
    };

    window.addEventListener("beforeunload", updateLastSeen);

    return () => {
      updateLastSeen();
      window.removeEventListener("beforeunload", updateLastSeen);
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        userData,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        loading,
        searchUser,
        setSearchUser,
        newMsg,
        setNewMsg,
        newUser,
        setNewUser,
        loadUserData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Default export
export default AppContextProvider;
