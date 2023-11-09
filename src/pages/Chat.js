import { Container } from "@mui/material";
import NavBar from "../components/BottomNavBar"
import ChatBox from "../components/ChatBox"
//////////////////////////////////////

const ChatMenu = () => {

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
      <ChatBox/>
      <div style={{ marginTop: "auto", display: "flex", width: "100%" }}>
        <NavBar/>
      </div>
    </Container>
  );
};

export default ChatMenu;