import React from 'react';
import {BottomNavBar} from "../components/BottomNavBar";
import {TopNavBar} from "../components/TopNavBar";
import {ChatMenu} from "../components/ChatMenu";

const Chat = () => {
  
  return (
    <div className="h-screen flex flex-col justify-between">
      <TopNavBar />
      <ChatMenu/>
      <BottomNavBar />
    </div>
  );
  
};

export default Chat;