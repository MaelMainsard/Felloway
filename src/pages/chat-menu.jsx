import React from 'react';
import {BottomNavBar} from "../components/BottomNavBar";
import {TopNavBar} from "../components/TopNavBar";
const ChatMenu = () => {

  return (
    <div className="h-screen flex flex-col justify-between">
      <TopNavBar/>
      <span>Chat page</span>
      <BottomNavBar/>
    </div>
  );
  
};

export default ChatMenu;