import React, { useState, useEffect } from 'react';
import GetMessagePage from '../fetcher/fetcher-chat-body';

const ChatPageBody = ({ chat_id, user_id }) => {
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    GetMessagePage({user_id,setMessages,chat_id});
  }, [chat_id]);

  return (
    <div className="flex flex-col align-top justify-start items-stretch h-screen overflow-y-scroll p-3">
      {messages}
    </div>
  );
};

export default ChatPageBody;
