import React from "react"; // eslint-disable-line
import /* css */ "./Chat.css";
import Leftsidebar from "../../../component/Leftsidebar/Leftsidebar";
import Rightsidebar from "../../../component/Rightsidebar/Rightsidebar";
import Chatbox from "../../../component/Chatbox/Chatbox";
const Chat = () => {
  return (
    <div className="chat">
      <div className="chat-container">
        <Leftsidebar />
        <Chatbox />
        <Rightsidebar />
      </div>
    </div>
  );
};

export default Chat;
