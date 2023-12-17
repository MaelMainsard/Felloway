import React, { useState, useEffect } from 'react';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

const ChatPageFooter = ({ chat_id }) => {


  return (
      <div className="bg-white p-8 w-full">
          <div className="join w-full">
              <input className="input rounded-full join-item bg-grey_1 w-full border-none" placeholder="Envoyer un message..." />
              <div className="join-item bg-grey_1 justify-center align-middle items-center flex flex-col pr-2 pl-2">
                  <InsertPhotoIcon className=' cursor-pointer' />
              </div>
              <div className="join-item bg-grey_1 justify-center align-middle items-center flex flex-col pr-2 rounded-r-full">
                  <KeyboardVoiceIcon className=' cursor-pointer' />
              </div>

          </div>
      </div>
  );
};

export default ChatPageFooter;
