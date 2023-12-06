import { AddMessageIcon } from '../components/Loader'
import { GetUserAvatar } from '../controller/messagePreviewController'
import React, { useState, useEffect } from 'react';

const ChatMenuHeader = ({user, setShowMessage, showMessage}) => {

  const handleToggleBackground = () => {
    setShowMessage((prevValue) => !prevValue);
  };

  const buttonStyle = {
    backgroundColor: showMessage ? '#014bf6' : 'transparent',
  };

  const buttonStyle2 = {
    backgroundColor: showMessage ? 'transparent' : '#014bf6',
  };

  const h5Style1 = {
    color: showMessage ? '#ffffff' : '#c7c7c7', // Changer la couleur du texte
  };

  const h5Style2 = {
    color: showMessage ? '#c7c7c7' : '#ffffff', // Changer la couleur du texte
  };

  const [avatarComponent, setAvatarComponent] = useState(null);


  useEffect(() => {
    const fetchAvatar = async () => {
      const avatar = await GetUserAvatar({ user });
      setAvatarComponent(avatar);
    };

    fetchAvatar();
  }, [user]);

  return (
    <div className="chatMenuHeader">
      <div className="chatMenuCircle">
        {avatarComponent}
      </div>
      <div className="chatMenuToggle">
        <div className='chatMenuToggleButton' style={buttonStyle} onClick={handleToggleBackground}>
          <h5 style={h5Style1}>Messages</h5>
        </div>
        <div className='chatMenuToggleButton' style={buttonStyle2} onClick={handleToggleBackground}>
          <h5 style={h5Style2}>Groupes</h5>
        </div>
      </div>
      <div className="chatMenuCircle">
        <AddMessageIcon/>
      </div>
    </div>
  );
};

export default ChatMenuHeader;