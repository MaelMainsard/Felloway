import React, { useState,useRef } from 'react';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { getLoggedUser } from "../config/util";
import { newMessage,uploadPicture } from "../lib/script"
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

const ChatPageFooter = ({ chat_id, set_add_pic, add_pic }) => {
    const [message, setMessage] = useState('');
    let user_id = getLoggedUser().uid;
    const fileInputRef = useRef(null);

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        // Appel de la fonction newMessage avec le contenu du message
        newMessage(chat_id, message);
        // Réinitialiser le contenu de l'input après l'envoi
        setMessage('');
        // Vous pouvez également ajouter ici d'autres traitements si nécessaire
      }
    };

    const handleSend = () => {
      newMessage(chat_id, message);
      setMessage('');
    }

    const handleImageChange = (e) => {
      if (e.target.files[0]) {
        set_add_pic(e.target.files[0]);
      }
    };

    const handleClickInsertPhoto = () => {
      // Déclencher le clic de l'input file
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };
  
    return (
      <div className="p-8 w-full">
        <div className={`w-full flex flex-row items-center ${!add_pic ? 'justify-between' : 'justify-end'}`}>
          {!add_pic && (
            <div className="dropdown dropdown-top absolute ml-3">
              <AddCircleIcon tabIndex={0} role="button" className='text-green-1 cursor-pointer'/>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white text-grey-3 rounded-box w-52 ">
                <li>
                  <a className='flex flex-row justify-between ' onClick={handleClickInsertPhoto}>
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
              className={`input rounded-full  bg-white w-full border-none ${!add_pic ? 'pl-12' : 'pr-20' } shadow-md`}
              placeholder="Envoyer un message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress} // Ajout du gestionnaire d'événements
            />
            {!add_pic && (
            <SendIcon
                className="cursor-pointer text-green-1 mr-2 absolute"
                onClick={()=> handleSend()}
              />
            )}
          </div>
          {add_pic && (
            <div className='absolute mr-4 space-x-2'>
              <DeleteIcon
                className="cursor-pointer text-red-1"
                onClick={() => set_add_pic('')}
              />
              <SendIcon
                className="cursor-pointer text-green-1"
                onClick={() => uploadPicture(chat_id, set_add_pic, add_pic, message)}
              />
            </div>
          )}

        </div>
      </div>
    );
  };
  
  export default ChatPageFooter;