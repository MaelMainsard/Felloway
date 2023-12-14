import React, { useState, useEffect } from 'react';
import ChatMenuHeader from '../components/chat-menu-header';
import ChatMenuBody from '../components/chat-menu-body';


const ChatMenu = () => {
  const [showMessage, setShowMessage] = useState(true);
  const [user_id, setUserId] = useState('');


  useEffect(() => {
    const delayEmptyUserId = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUserId('72MMTbrxZCRRUHoZFJUnkVOxDNk1'); // Définir le user_id après le délai
    };

    delayEmptyUserId();
  }, [user_id]);

  return (
    <div className="h-screen bg-white">
      <ChatMenuHeader
        user_id={user_id}
        state_show_message={showMessage}
        state_set_show_message={setShowMessage}
      />
      <ChatMenuBody user_id={user_id} state_show_message={showMessage} />
      
    </div>
  );
};

export default ChatMenu;