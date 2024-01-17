import React, { useState, useEffect } from 'react';
import GetMessagePreview from '../fetcher/fetcher-chat-preview';
import { Scrollbars } from 'react-custom-scrollbars';
import { getLoggedUser } from "../config/util";


const ChatMenuBody = ({ state_show_message, set_open_chat, set_chat }) => {
  const [messages, setMessages] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  let user_id = getLoggedUser().uid;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [user_id]); 

  useEffect(() => {
    GetMessagePreview({ user_id, setMessages, state_show_message, set_open_chat, set_chat });
  }, [user_id, state_show_message, set_open_chat, set_chat]); // Ajoutez les dépendances manquantes ici

  return (
    <Scrollbars autoHide>
      <div className={`p-2 h-max space-y-5 ${windowWidth < 640 ? 'mr-4' : '' }`}>
        {messages}
      </div>
    </Scrollbars>
  );
};

export default ChatMenuBody;