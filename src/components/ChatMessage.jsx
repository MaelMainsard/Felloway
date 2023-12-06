import React, { useState, useEffect } from 'react';
import { getMessagePreview } from "../controller/messagePreviewController";
import { LoaderMesssagePreview, LoaderNoAvatarDM, LoaderNoAvatarGroup } from "../components/Loader";

const ChatMesssage = ({user,message, showMessage}) => {

  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [lastMessage,setLastMessage] = useState('');
  const [lastTime, setLastTime] = useState('');


  useEffect(() => {
    getMessagePreview(setLastMessage,setLastTime, setAvatar,setTitle,setLoading,showMessage,message,user)
}, [showMessage]);

return (
  <>
    {loading ? (
      <div className="LoaderPreview">
        <LoaderMesssagePreview />
      </div>
    ) : (
      <div className='chatMessage'>
        <div className="chatMessageImg">
          {avatar === '' ? (
            showMessage ?
            <LoaderNoAvatarDM /> :
            <LoaderNoAvatarGroup/>
          ) : (
            <img src={avatar} alt="messageImg" />
          )}
        </div>
        <div className="chatMessageBody">
          <div className="chatMessageHeader">
            <h4>{title}</h4>
            <h6>{lastTime}</h6>
          </div>
          <div className="chatMessageBottom">
            <h5>{lastMessage}</h5>
            <div className="notifiCircle">
              <h4>{message.number_message}</h4>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
);
};
  
  export default ChatMesssage;