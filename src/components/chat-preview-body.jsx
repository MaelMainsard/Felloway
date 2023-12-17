import React, { useState, useEffect } from 'react';
import GetMessagePreview from '../fetcher/fetcher-chat-preview';

const ChatMenuBody = ({ user_id, state_show_message, set_open_chat, set_chat, state_set_show_message }) => {
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    GetMessagePreview({ user_id, setMessages, state_show_message, set_open_chat, set_chat });
  }, [user_id, state_show_message]);

  return (
    <div className='p-2 h-max'>
      {messages}
    </div>
  );
};

export default ChatMenuBody;