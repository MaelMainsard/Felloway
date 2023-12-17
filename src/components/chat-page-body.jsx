import React, { useState, useEffect } from 'react';
import GetMessagePreview from '../fetcher/fetcher-chat-preview';

const ChatPageBody = ({ chat_id }) => {
  // const [messages, setMessages] = useState(null);

  // useEffect(() => {
  //   GetMessagePreview({ user_id, setMessages, state_show_message, set_open_chat, set_chat });
  // }, [state_show_message]);

  return (
    <div className='flex flex-col justify-start align-top items-start pl-2'>
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <div className="chat-header">
          Obi-Wan Kenobi
          <time className="text-xs opacity-50">12:45</time>
        </div>
        <div className="chat-bubble">You were the Chosen One!</div>
        <div className="chat-footer opacity-50">
          Delivered
        </div>
      </div>
      
    </div>
  );
};

export default ChatPageBody;
