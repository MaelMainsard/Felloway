import React from "react";
import { app } from "../config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

const auth = getAuth(app);

const Message = ({ message }) => {
  const [user] = useAuthState(auth);

  const avatar = message.avatar ? (
    <img
      className="chat-bubble__left"
      src={message.avatar}
      alt="user avatar"
    />
  ) : (
    <div className="avatar-placeholder">
      {message.name ? message.name.charAt(0).toUpperCase() : ""}
    </div>
  );

  return (
    <div className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
      {avatar}
      <div className="chat-bubble__right">
        <p className="user-name">{message.name}</p>
        <p className="user-message">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;