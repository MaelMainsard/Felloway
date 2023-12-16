import React, { useState, useEffect } from 'react';
import ChatMenuHeader from '../components/chat-preview-header';
import ChatMenuBody from '../components/chat-preview-body';
import ChatPageHeader from '../components/chat-page-header';
import { NoConv } from '../lib/icon_and_loader';
import { useSwipeable } from 'react-swipeable';

const ChatMenu = () => {
  const [showMessage, setShowMessage] = useState(true);
  const [user_id, setUserId] = useState('');
  const [openChat, setOpenChat] = useState(false);
  const [chat, setChat] = useState('');


  useEffect(() => {
    setUserId('72MMTbrxZCRRUHoZFJUnkVOxDNk1');
  }, [user_id]);


  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setShowMessage(true);
    },
    onSwipedRight: () => {
      setShowMessage(false);
    },
  });

  return (
    <div className="flex flex-row w-screen">
      <div className={`h-screen bg-white sm:w-5/12 w-full ${openChat ? 'hidden sm:block' : ''}`} {...handlers}>
        <ChatMenuHeader user_id={user_id} state_show_message={showMessage} state_set_show_message={setShowMessage}/>
        <ChatMenuBody user_id={user_id} state_show_message={showMessage} state_set_show_message={setShowMessage} set_open_chat={setOpenChat} set_chat={setChat} />
      </div>
      <div className={`h-screen bg-grey_1 w-full ${!openChat && window.innerWidth < 640 ? 'hidden sm:block' : ''}`}>
        <ChatPageHeader open_chat={setOpenChat} chat_id={chat} user_id={user_id} set_chat_id={setChat}/>
      </div>
    </div>
  );
};

export default ChatMenu;