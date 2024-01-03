import { Container } from "@mui/material";
import NavBar from "../components/BottomNavBar"
import ChatMenuHeader from "../components/ChatMenuHeader";
import ChatMessage from "../components/ChatMessage"
import React, { useState, useEffect } from 'react';
import { firestore } from '../config/Firebase';
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { getLoggedUser } from '../config/util';
import { LoaderConversation, EmptyConversation } from "../components/Loader";

//////////////////////////////////////

const ChatMenu = () => {

  let user = getLoggedUser();

  const [showMessage, setShowMessage] = useState(true);

  let [groupMessages, setGroupMessages] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    console.log("je rentre dans le useeffect de chatmenu");
    setLoading(true)

    const unsubscribe = onSnapshot(
      
      query(collection(firestore, "groups")),
      (snapshot) => {
        const messages = snapshot.docs
          .filter((doc) => doc.data().type === (showMessage ? "direct_message" : "group"))
          .map((doc) => ({ id: doc.id, data: doc.data() }));
          
        setGroupMessages(messages);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
      
    );

    return () => unsubscribe();
  }, [showMessage]);

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
      <div style={{marginTop:'60px', marginBottom: '80px'}}>
      {loading ? (
        <LoaderConversation />
      ) : (
        // Check if showMessage is still true before rendering messages
        groupMessages.length > 0 ? (
          // Map through groupMessages to create ChatMenuMessage components
          groupMessages.map((groupMessage) => (
            <ChatMessage key={groupMessage.id} user={user} message={groupMessage} showMessage={showMessage} />
          ))
        ) : (
          <EmptyConversation />
        )
      )}
    </div>
      

    <div style={{ marginTop: "auto", display: "flex", width: "100%", position: 'fixed', bottom: 0 }}>
      <NavBar />
    </div>
    </Container>
  );
};

export default ChatMenu;