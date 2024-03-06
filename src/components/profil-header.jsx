import React, { useState, useEffect } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import GetUserInfo from '../fetcher/fetcher-header-chat-page';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import VideocamIcon from '@mui/icons-material/Videocam';

const ProfilHeader = () => {

  const db = getFirestore(app);
  const storage = getStorage(app);
  let user = getLoggedUser();

  useEffect(() => {
    GetUserInfo({ task, updateTask });
  }, [task.chat_id,task.user_id]);

  return (
    <>
      <div className='bg-green-1 rounded-b-2xl shadow-md p-4'>
        {task.avatar_carousel_preview}
      </div>
      <div className='flex flex-row items-center space-x-2 m-6'>
        <div className="flex flex-row items-center justify-end w-full">
          <input
            className="input rounded-full bg-grey-1 w-full border-none text-xs p-5 pr-10 shadow-md focus-border-none"
            placeholder="Recherche..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <SearchIcon onClick={()=>{updateTask({conv_preview_filter: filter})}} className='text-green-1 absolute mr-3 cursor-pointer' />
        </div>
      </div>
      <Scrollbars autoHide>
        <div className={`p-2 space-y-5 mt-5 carousel`}>
          {task.messages_preview}
        </div>
      </Scrollbars>
    </>
  );
};

export default ProfilHeader;
