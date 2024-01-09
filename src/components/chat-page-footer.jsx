import React, { useState } from 'react';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { firestore } from '../config/Firebase';
import { collection, addDoc, serverTimestamp, updateDoc, doc, getDoc } from "firebase/firestore"; 
import { getLoggedUser } from "../config/util";

const ChatPageFooter = ({ chat_id }) => {
    const [message, setMessage] = useState('');
    let user_id = getLoggedUser().uid;
  
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
            className="input rounded-full join-item bg-grey-1 w-full border-none"
            placeholder="Envoyer un message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress} // Ajout du gestionnaire d'événements
          />
          <div className="join-item bg-grey-1 justify-center align-middle items-center flex flex-col pr-2 pl-2">
            <InsertPhotoIcon className="cursor-pointer" />
          </div>
        </div>
      </div>
    );
  };
  
  export default ChatPageFooter;
  
  async function newMessage(chat_id, user_id, content) {

    const usersRef = doc(firestore, "users", user_id);
    const usersSnap = await getDoc(usersRef);
    const user_data = usersSnap.data();

    await addDoc(collection(firestore, "groups",chat_id,"messages"), {
        content: content,
        sender_id: user_id,
        sender_name: user_data.firstName + " " + user_data.lastName,
        sender_img: user_data.avatar,
        timestamp: serverTimestamp(),
        view_by: [user_id]
    });

    await updateDoc(doc(firestore, "groups", chat_id), {
        last_message: content,
        last_message_timestamp: serverTimestamp(),
    });
  }