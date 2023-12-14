import React,{useState,useEffect} from 'react';
import GetMessagePreview from '../fetcher/fetcher-chat-preview';

const ChatMenuBody = ({user_id,state_show_message}) => {

  const [messages, setMessages] = useState(null);

  useEffect(() => {
    GetMessagePreview({user_id,setMessages,state_show_message});
  }, [user_id,state_show_message]);


  return (
    <>
      {messages}
    </>
  );
};

export default ChatMenuBody;