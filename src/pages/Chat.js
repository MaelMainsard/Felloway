import { Container } from "@mui/material";
import NavBar from "../components/BottomNavBar"
import ChatMenuHeader from "../components/ChatMenuHeader";
import ChatMenuMesssage from "../components/ChatMenuMessage"
import React, { useState } from 'react';

import { firestore } from "../config/Firebase"
import { useCollection } from 'react-firebase-hooks/firestore';

//////////////////////////////////////

const ChatMenu = ({user}) => {

  const [showMessage, setShowMessage] = useState(true);
 

  const message = {
    'name': "Dimitri test",
    'last_time': "12h50 PM",
    'last_message': "Ou tu te chache en****lé ? et csinon blablablabla",
    'number_message': 5,
    'img': "https://img.freepik.com/psd-gratuit/personne-celebrant-son-orientation-sexuelle_23-2150115662.jpg"
  }

  return (
    <Container
      component="main"
      maxWidth="100%"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <ChatMenuHeader user={user} setShowMessage={setShowMessage} showMessage={showMessage}/>
      <ChatMenuMesssage message={message}/>
      <div style={{ marginTop: "auto", display: "flex", width: "100%" }}>
        <NavBar/>
      </div>
    </Container>
  );
};

export default ChatMenu;