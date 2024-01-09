import React, { useState, useEffect } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import GetUserInfo from '../fetcher/fetcher-header-chat-page';
import { getLoggedUser } from "../config/util";

const ChatPageHeader = ({ open_chat, chat_id }) => {
  const [info, setInfo] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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
    GetUserInfo({ setInfo, chat_id, user_id });
  }, [chat_id,user_id]);

  return (
    <div className="navbar bg-white">
      <div className="navbar-start">
        {windowWidth < 640 && (
          <button className="btn btn-ghost btn-circle" onClick={() => open_chat(false)}>
            <ArrowBackIosNewIcon className="h-5 w-5" />
          </button>
        )}
      </div>
      <div className="navbar-center">
        {info}
      </div>
      <div className="navbar-end">
        {/* Contenu de la navbar-end */}
      </div>
    </div>
  );
};

export default ChatPageHeader;
