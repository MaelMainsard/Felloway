import React from 'react';
import {BottomNavBar} from "../components/BottomNavBar";

const ChatMenu = () => {

  return (
    <div className="h-screen flex flex-col justify-between">
      <span>Chat page</span>
      <BottomNavBar/>
    </div>
  );
  
};

export default ChatMenu;