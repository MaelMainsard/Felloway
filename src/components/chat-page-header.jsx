import React, { useState, useEffect } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import GetUserInfo from '../fetcher/fetcher-header-chat-page';

const ChatPageHeader = ({ task, updateTask }) => {

  useEffect(() => {
    GetUserInfo({ task, updateTask });
  }, [task.chat_id,task.user_id]);

  return (
    <div className="navbar bg-white">
      <div className="navbar-start">
        {task.windowWidth < 640 && (
          <button className="btn btn-ghost btn-circle" onClick={() => updateTask({open_chat_page:false})}>
            <ArrowBackIosNewIcon className="h-5 w-5" />
          </button>
        )}
      </div>
      <div className="navbar-center">
        {task.avatar_chat_info}
      </div>
      <div className="navbar-end">
        {/* Contenu de la navbar-end */}
      </div>
    </div>
  );
};

export default ChatPageHeader;
