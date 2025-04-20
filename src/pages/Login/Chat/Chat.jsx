import React, { useContext, useEffect, useState } from "react"; // ✅ useState imported
import "./Chat.css";
import Leftsidebar from "../../../component/Leftsidebar/Leftsidebar";
import Rightsidebar from "../../../component/Rightsidebar/Rightsidebar";
import Chatbox from "../../../component/Chatbox/Chatbox";
import { AppContext } from "../../../context/AppContext";

const Chat = () => {
  const { chatData, userData } = useContext(AppContext);
  const [loading, setLoading] = useState(true); // ✅ Correctly declare state

  useEffect(() => {
    if (chatData && userData) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [chatData, userData]);

  return (
    <div className="chat">
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="chat-container">
          <Leftsidebar />
          <Chatbox />
          <Rightsidebar />
        </div>
      )}
    </div>
  );
};

export default Chat;
