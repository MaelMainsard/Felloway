import { Container } from "@mui/material";
import NavBar from "../components/BottomNavBar"
import ChatMenuHeader from "../components/ChatMenuHeader";
//////////////////////////////////////

const ChatMenu = ({user}) => {

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
      <ChatMenuHeader user={user}/>
      <div style={{ marginTop: "auto", display: "flex", width: "100%" }}>
        <NavBar/>
      </div>
    </Container>
  );
};

export default ChatMenu;