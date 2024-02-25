import React from 'react';
import {BottomNavBar} from "../components/BottomNavBar";
import {TopNavBar} from "../components/TopNavBar";
import {ChatMenu} from "../components/ChatMenu";
import { useSelector } from 'react-redux';
import { ChatPage } from '../components/ChatPage';

const Chat = () => {

  const { group_id } = useSelector(state => state.chat);
  
  return (
      <div className="h-screen flex flex-col">
      <TopNavBar />
      {!group_id ?
        <ChatMenu />:
        <ChatPage/>
      }
      <BottomNavBar />
      </div>
  );
  
};

export default Chat;