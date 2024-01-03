import React, { useEffect, useRef } from 'react';
import GetMessagePage from '../fetcher/fetcher-chat-body';
import { Scrollbars } from 'react-custom-scrollbars';

const ChatPageBody = ({ chat_id, user_id, messages,setMessages  }) => {
  const scrollbarsRef = useRef(null);

  useEffect(() => {
      GetMessagePage({ user_id, setMessages, chat_id });
  }, [chat_id]);

  useEffect(() => {
    if (scrollbarsRef.current) {
      // Faites défiler vers le bas en utilisant la référence de Scrollbars
      scrollbarsRef.current.scrollToBottom();
    }
  }, [messages,chat_id]);

  return (
    <Scrollbars autoHide  ref={scrollbarsRef}>
      <div className="flex flex-col align-top justify-start items-stretch h-fit p-3">
        {messages}
      </div>
    </Scrollbars>
  );
};

export default ChatPageBody;
