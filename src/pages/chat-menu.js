import React, { useState, useEffect } from 'react';
import ChatMenuHeader from '../components/chat-preview-header';
import ChatMenuBody from '../components/chat-preview-body';
import ChatPageHeader from '../components/chat-page-header';
import ChatPageFooter from '../components/chat-page-footer'
import ChatPageBody from '../components/chat-page-body';
import { useSwipeable } from 'react-swipeable';
import { NoConv } from '../lib/icon_and_loader';

const ChatMenu = () => {
  const [showMessage, setShowMessage] = useState(true);
  const [user_id, setUserId] = useState('');
  const [openChat, setOpenChat] = useState(false);
  const [chat, setChat] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

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
       {(((!openChat) && (windowWidth < 640) || (windowWidth > 640))) && ( 
        <div className={`h-screen bg-white sm:w-5/12 w-full`} {...handlers}>
          <ChatMenuHeader
            user_id={user_id}
            state_show_message={showMessage}
            state_set_show_message={setShowMessage}
            set_open_chat={setOpenChat}
            set_chat={setChat}
          />
          <ChatMenuBody
            user_id={user_id}
            state_show_message={showMessage}
            state_set_show_message={setShowMessage}
            set_open_chat={setOpenChat}
            set_chat={setChat}
          />
        </div> 
      )}
      {((openChat && (windowWidth < 640)) || (chat && (windowWidth > 640))) && (
        <div className={`h-screen bg-grey_1 w-full flex flex-col justify-between`}>
            <ChatPageHeader
              open_chat={setOpenChat}
              chat_id={chat}
              user_id={user_id}
            />
            <ChatPageBody chat_id={chat} user_id={user_id}/>
            <ChatPageFooter chat_id={chat} user_id={user_id} />
        </div>
      )}
    {(windowWidth > 640) && (!chat) && (
      <div className={`h-screen bg-grey_1 w-full flex-col justify-between`}>
        <NoConv />
      </div>
    )}

    </div>
  );
  
};

export default ChatMenu;