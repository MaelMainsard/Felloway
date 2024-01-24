import React, { useState, useEffect } from 'react';
import GetMessagePreview from '../fetcher/fetcher-chat-preview';
import { Scrollbars } from 'react-custom-scrollbars';
import { getLoggedUser } from "../config/util";
import SearchIcon from '@mui/icons-material/Search';

const ChatMenuBody = ({ state_show_message, set_open_chat, set_chat }) => {
  const [messages, setMessages] = useState(null);
  const [avatarList, setAvatarList] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [convFilter, setConvFilter] = useState('');

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
    GetMessagePreview({ setMessages, state_show_message, set_open_chat, set_chat, setAvatarList,convFilter});
  }, [user_id, state_show_message, set_open_chat, set_chat, convFilter]); 

  return (
    <div className='h-full flex flex-col'>
      <div className='bg-green-1 rounded-b-2xl shadow-md p-4'>
        {avatarList}
      </div>
       <div className="flex flex-row items-center justify-end m-8">
        <input
            className="input rounded-full bg-grey-1 w-full border-none text-xs p-5 pr-10 shadow-md focus-border-none"
            placeholder="Recherche..."
            value={convFilter}
            onChange={(e) => setConvFilter(e.target.value)}
        />
        <SearchIcon className='text-green-1 absolute mr-3'/>
      </div> 
      <Scrollbars autoHide>
        <div className={`p-2 space-y-5 mt-5 ${windowWidth < 640 ? 'mr-4' : ''}`}>
          {messages}
        </div>
      </Scrollbars>
    </div>
  );
};

export default ChatMenuBody;