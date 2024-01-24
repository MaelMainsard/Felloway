import React, { useState, useEffect } from 'react';
import ChatMenuHeader from '../components/chat-preview-header';
import ChatMenuBody from '../components/chat-preview-body';
import ChatPageHeader from '../components/chat-page-header';
import ChatPageFooter from '../components/chat-page-footer'
import ChatPageBody from '../components/chat-page-body';
import { useSwipeable } from 'react-swipeable';
import { NoConv } from '../lib/icon_and_loader';
import NavBar from "../components/BottomNavBar";

const ChatMenu = () => {
  const [openChat, setOpenChat] = useState(false);
  const [chat, setChat] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [addPicture, setAddPicture] = useState('');
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='h-screen flex flex-col justify-between'>
      <div className="flex flex-row w-screen h-screen">
        {((!openChat && windowWidth < 640) || windowWidth > 640) && (
          <div
            className={` bg-white sm:max-w-sm w-full flex flex-col justify-between`}
          >
            <ChatMenuHeader
              set_open_chat={setOpenChat}
              set_chat={setChat}
              setShowMessage={setShowMessage}
              state_show_message={showMessage}
              show_conv={setOpenChat}
            />
            <ChatMenuBody
              set_open_chat={setOpenChat}
              set_chat={setChat}
              state_show_message={showMessage}
            />
          </div>
        )}
        {((openChat && windowWidth < 640) || (chat && windowWidth > 640)) && (
          <div className={` bg-grey-1 w-full flex flex-col justify-between`}>
            <ChatPageHeader open_chat={setOpenChat} chat_id={chat} />
            <ChatPageBody chat_id={chat} add_pic={addPicture} />
            <ChatPageFooter chat_id={chat} set_add_pic={setAddPicture} add_pic={addPicture} />
          </div>
        )}
        {windowWidth > 640 && !chat && (
          <div className="flex flex-col mx-auto mt-64">
            <NoConv />
          </div>
        )}
      </div>
      <NavBar/>
    </div>
  );
  
};

export default ChatMenu;