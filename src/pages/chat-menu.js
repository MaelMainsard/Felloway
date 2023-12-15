import React, { useState, useEffect } from 'react';
import ChatMenuHeader from '../components/chat-preview-header';
import ChatMenuBody from '../components/chat-preview-body';
import ChatPageHeader from '../components/chat-page-header';
import { NoConv } from '../lib/icon_and_loader';

const ChatMenu = () => {
  const [showMessage, setShowMessage] = useState(true);
  const [user_id, setUserId] = useState('');
  const [openChat, setOpenChat] = useState(false);
  const [chat, setChat] = useState('');


  useEffect(() => {
    const delayEmptyUserId = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUserId('72MMTbrxZCRRUHoZFJUnkVOxDNk1'); // Définir le user_id après le délai
    };

    delayEmptyUserId();
  }, [user_id]);


  return (
    <div className="flex flex-row w-screen">
      <div className={`h-screen bg-white sm:w-5/12 w-full ${openChat ? 'hidden sm:block' : ''}`}>
        <ChatMenuHeader user_id={user_id} state_show_message={showMessage} state_set_show_message={setShowMessage}/>
        <ChatMenuBody user_id={user_id} state_show_message={showMessage} set_open_chat={setOpenChat} set_chat={setChat} />
      </div>
      <div className={`h-screen bg-grey_1 w-full p-2 ${!openChat && window.innerWidth < 640 ? 'hidden sm:block' : ''}`}>
          <div className='mt-64'>
            <button className="btn" onClick={()=> {setOpenChat(false); console.log(chat)}}>Button</button>
            <NoConv />
          </div>
      </div>
    </div>
  );
};

export default ChatMenu;