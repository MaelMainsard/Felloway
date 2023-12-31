import React, { useState } from 'react';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { firestore } from '../config/Firebase';
import { collection, addDoc, serverTimestamp, updateDoc, doc } from "firebase/firestore"; 

const ChatPageFooter = ({ chat_id, user_id }) => {
    const [message, setMessage] = useState('');
  
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        // Appel de la fonction newMessage avec le contenu du message
        newMessage(chat_id, user_id, message);
        // Réinitialiser le contenu de l'input après l'envoi
        setMessage('');
        // Vous pouvez également ajouter ici d'autres traitements si nécessaire
      }
    };
  
    return (
      <div className="bg-white p-8 w-full">
        <div className="join w-full">
          <input
            className="input rounded-full join-item bg-grey_1 w-full border-none"
            placeholder="Envoyer un message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress} // Ajout du gestionnaire d'événements
          />
          <div className="join-item bg-grey_1 justify-center align-middle items-center flex flex-col pr-2 pl-2">
            <InsertPhotoIcon className="cursor-pointer" />
          </div>
          <div className="join-item bg-grey_1 justify-center align-middle items-center flex flex-col pr-2 rounded-r-full">
            <KeyboardVoiceIcon className="cursor-pointer" />
          </div>
        </div>
      </div>
    );
  };
  
  export default ChatPageFooter;
  
  async function newMessage(chat_id, user_id, content) {
    await addDoc(collection(firestore, "groups",chat_id,"messages"), {
        content: content,
        sender_id: user_id,
        timestamp: serverTimestamp(),
        view_by: [user_id]
    });

    await updateDoc(doc(firestore, "groups", chat_id), {
        last_message: content,
        last_message_timestamp: serverTimestamp(),
    });
  }