import React, { useState, useEffect } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import GetUserInfo from '../fetcher/fetcher-header-chat-page';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import VideocamIcon from '@mui/icons-material/Videocam';

const ChatPageHeader = ({ task, updateTask }) => {

  useEffect(() => {
    GetUserInfo({ task, updateTask });
  }, [task.chat_id,task.user_id]);

  return (
    <div>
      <div className="navbar bg-green-1 p-4 rounded-b-2xl shadow-md">
        <div className="navbar-start">
        </div>
        <div className="navbar-center">
          {task.avatar_chat_info}
          <PhoneEnabledIcon className='ml-5 text-white' style={{ fontSize: '20px' }} onClick={()=>alert("Utilise ton teléphone mdr t'as cru que j'avais le temps de dev ça lol")}/>
          <VideocamIcon className='ml-2 text-white' style={{ fontSize: '30px' }} onClick={()=>alert("Utilise whatsapp mdr t'as cru que j'avais le temps de dev ça lol")}/>
        </div>
        <div className="navbar-end">
          {/* Contenu de la navbar-end */}
        </div>
      </div>
      {task.window_width < 640 && (
        <div className='absolute  z-50' onClick={() => updateTask({ open_chat_page: false })}>
          <KeyboardBackspaceIcon className='text-green-1 ml-3 mt-2' style={{ fontSize: '40px' }}/>
        </div>
      )}
    </div>
  );
};

export default ChatPageHeader;

