import React, { useContext, useState } from "react";
import "./Leftsidebar.css";
import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const Leftsidebar = () => {
  const navigate = useNavigate();
  const { userData, chatData, setChatUser, setMessagesId } =
    useContext(AppContext);
  const [searchResult, setSearchResult] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const inputHandler = async (e) => {
    const input = e.target.value.trim();

    if (!input) {
      setShowSearch(false);
      setSearchResult(null);
      return;
    }

    try {
      setShowSearch(true);
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", input.toLowerCase()));
      const querySnap = await getDocs(q);

      if (!querySnap.empty) {
        const foundUser = querySnap.docs[0].data();
        if (foundUser.id === userData?.id) return;

        const isAlreadyChatted = chatData?.some(
          (chat) => chat.rId === foundUser.id
        );
        if (!isAlreadyChatted) {
          setSearchResult(foundUser);
        } else {
          setSearchResult(null);
        }
      } else {
        setSearchResult(null);
      }
    } catch (error) {
      console.error("Error searching for user:", error);
    }
  };

  const addChat = async () => {
    if (!searchResult) return;

    const messagesRef = collection(db, "message");
    const chatsRef = collection(db, "chats");

    try {
      const newMessageDoc = doc(messagesRef);
      await setDoc(newMessageDoc, {
        createAt: serverTimestamp(),
        messages: [],
      });

      const chatForMe = {
        messageId: newMessageDoc.id,
        lastMessage: "",
        rId: searchResult.id,
        updatedAt: Date.now(),
        messageSeen: true,
      };

      const chatForThem = {
        messageId: newMessageDoc.id,
        lastMessage: "",
        rId: userData.id,
        updatedAt: Date.now(),
        messageSeen: false,
      };

      const myChatDoc = doc(chatsRef, userData.id);
      const theirChatDoc = doc(chatsRef, searchResult.id);

      const mySnap = await getDoc(myChatDoc);
      const theirSnap = await getDoc(theirChatDoc);

      if (!mySnap.exists()) {
        await setDoc(myChatDoc, { chatsData: [chatForMe] });
      } else {
        await updateDoc(myChatDoc, {
          chatsData: arrayUnion(chatForMe),
        });
      }

      if (!theirSnap.exists()) {
        await setDoc(theirChatDoc, { chatsData: [chatForThem] });
      } else {
        await updateDoc(theirChatDoc, {
          chatsData: arrayUnion(chatForThem),
        });
      }

      setSearchResult(null);
      setShowSearch(false);
    } catch (error) {
      toast.error("Failed to add chat");
      console.error("Error adding chat:", error);
    }
  };

  const setChat = async (Item) => {
    try {
      setChatUser(Item);
      setMessagesId(Item.messageId);
      const userChatRef = doc(db, "chats", userData.id);
      const userChatsSnapshot = await getDoc(userChatRef);
      const userChatsData = userChatsSnapshot.data();
      const chatIndex = userChatsData.chatsData.findIndex(
        (c) => c.messageId === Item.messageId
      );
      userChatsData.chatsData[chatIndex].messageSeen = true;
      await updateDoc(userChatRef, {
        chatsData: userChatsData.chatsData,
      });
    } catch (error) {
      toast.error("Failed to add chat");
      console.error("Error adding chat:", error);
    }
  };
  //   try {
  //     const myChatRef = doc(db, "chats", userData.id);
  //     const mySnap = await getDoc(myChatRef);

  //     if (mySnap.exists()) {
  //       const currentChats = mySnap.data().chatsData || [];
  //       const updatedChats = currentChats.map((chat) =>
  //         chat.messageId === chatItem.messageId
  //           ? { ...chat, messageSeen: true }
  //           : chat
  //       );

  //       await updateDoc(myChatRef, { chatsData: updatedChats });
  //     }
  //   } catch (error) {
  //     console.error("Error updating seen status:", error);
  //   }

  //   navigate("/chat");
  // };

  const handleLogout = () => {
    // TODO: Add actual logout logic if needed
    navigate("/");
  };

  return (
    <div className="ls">
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} className="logo" alt="logo" />
          <div className="menu">
            <img src={assets.menu_icon} alt="menu" />
            <div className="sub-menu">
              <p onClick={() => navigate("/ProfileUpdate")}>Edit Profile</p>
              <hr />
              <p onClick={handleLogout}>Logout</p>
            </div>
          </div>
        </div>

        <div className="ls-search">
          <img src={assets.search_icon} alt="search" />
          <input
            onChange={inputHandler}
            type="text"
            placeholder="Search here.."
          />
        </div>
      </div>

      <div className="ls-list">
        {showSearch && searchResult ? (
          <div onClick={addChat} className="friends add-user">
            <img src={searchResult.avatar} alt="user-avatar" />
            <p>{searchResult.name}</p>
          </div>
        ) : (
          Array.isArray(chatData) &&
          chatData.map((item, index) => (
            <div
              onClick={() => setChat(item)}
              key={index}
              className={`friends ${
                item.messageSeen || item.messageId ? "" : "border"
              }`}
            >
              <img
                src={item.userData?.avatar || assets.default_avatar}
                alt="chat-avatar"
              />
              <div>
                <p>{item.userData?.name || "Unknown User"}</p>
                <span>{item.lastMessage}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Leftsidebar;
