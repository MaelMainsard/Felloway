import React, { useState } from 'react';

const ChatMenuHeader = ({user}) => {
  console.log(user)
  const [isBlueBackground, setIsBlueBackground] = useState(true);

  const handleToggleBackground = () => {
    setIsBlueBackground((prevValue) => !prevValue);
  };

  const buttonStyle = {
    backgroundColor: isBlueBackground ? '#014bf6' : 'transparent',
  };

  const buttonStyle2 = {
    backgroundColor: isBlueBackground ? 'transparent' : '#014bf6',
  };

  const h5Style1 = {
    color: isBlueBackground ? '#ffffff' : '#c7c7c7', // Changer la couleur du texte
  };

  const h5Style2 = {
    color: isBlueBackground ? '#c7c7c7' : '#ffffff', // Changer la couleur du texte
  };

  return (
    <div className="chatMenuHeader">
      <div className="chatMenuCircle">
        <img src={user.photoURL} className="avatar" alt="Avatar" style={{width: '100%'}} />
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
        <img src="/static/bell.png" className="bell" alt="Bell" />
      </div>
    </div>
  );
};

export default ChatMenuHeader;