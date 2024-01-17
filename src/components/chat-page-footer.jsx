import React, { useState,useRef } from 'react';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
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
      <div className="bg-white p-8 w-full">
        <div className="join w-full">
          <input
            className="input rounded-full join-item bg-grey-1 w-full border-none"
            placeholder="Envoyer un message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress} // Ajout du gestionnaire d'événements
          />
          <div className="join-item bg-grey-1 justify-center align-middle items-center flex flex-col pr-4 pl-2 rounded-full">
          {add_pic ? (
            <div className='flex space-x-3'>
              <DeleteIcon 
                className="cursor-pointer text-red-1" 
                onClick={()=>set_add_pic('')}
              />
              <SendIcon
                className="cursor-pointer text-font-1"
                onClick={()=>uploadPicture(chat_id,set_add_pic,add_pic,message)}
              />
            </div>
            ) : (
              <div>
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }} // Cacher l'input file
                />
                <InsertPhotoIcon
                  className="cursor-pointer text-font-1"
                  onClick={handleClickInsertPhoto}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default ChatPageFooter;