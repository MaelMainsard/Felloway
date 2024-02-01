import React, { useState,useRef } from 'react';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { getLoggedUser } from "../config/util";
import { newMessage,uploadPicture } from "../lib/script"
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

const ChatPageFooter = ({ task, updateTask }) => {

    const fileInputRef = useRef(null);

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSend()
      }
    };

    const handleSend = () => {
      newMessage(task.chat_id, task.messages_input_footer);
      updateTask({
        messages_input_footer: ''
      })
    }

    const handleImageChange = (e) => {
      if (e.target.files[0]) {
        updateTask({addPicture: e.target.files[0]})
      }
    };

    const handleClickInsertPhoto = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };
  
    return (
      <div className="p-8 w-full">
        <div className={`w-full flex flex-row items-center ${!task.add_pic ? 'justify-between' : 'justify-end'}`}>
          {!task.add_pic && (
            <div className="dropdown dropdown-top absolute ml-3">
              <AddCircleIcon tabIndex={0} role="button" className='text-green-1 cursor-pointer'/>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white text-grey-3 rounded-box w-52 ">
                <li>
                  <a className='flex flex-row justify-between' onClick={handleClickInsertPhoto}>
                    Ajouter une image
                    <input
                      type="file"
                      onChange={handleImageChange}
                      accept="image/*"
                      ref={fileInputRef}
                      style={{ display: 'none' }} // Cacher l'input file
                    />
                    <InsertPhotoIcon
                      className="cursor-pointer"
                    />
                  </a>
                </li>
              </ul>
            </div>
          )}
          <div className=' w-full flex flex-row justify-end items-center mr-2'>
            <input
              className={`input rounded-full  bg-white w-full border-none ${!task.add_pic ? 'pl-12 pr-12' : 'pr-20' } shadow-md`}
              placeholder="Envoyer un message..."
              value={task.messages}
              onChange={(e) => updateTask({messages_input_footer: e.target.value})}
              onKeyPress={handleKeyPress} // Ajout du gestionnaire d'événements
            />
            {!task.add_pic && (
            <SendIcon
                className="cursor-pointer text-green-1 mr-2 absolute"
                onClick={()=> handleSend()}
              />
            )}
          </div>
          {task.add_pic && (
            <div className='absolute mr-4 space-x-2'>
              <DeleteIcon
                className="cursor-pointer text-red-1"
                onClick={() => updateTask({addPicture: ''})}
              />
              <SendIcon
                className="cursor-pointer text-green-1"
                onClick={() => uploadPicture(task,updateTask)}
              />
            </div>
          )}

        </div>
      </div>
    );
  };
  
  export default ChatPageFooter;