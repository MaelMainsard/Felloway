import { Container } from "@mui/material";
import NavBar from "../components/BottomNavBar"
//////////////////////////////////////

const Settings = () => {

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
      <h1>Page Settings</h1>
      <div style={{ marginTop: "auto", display: "flex", width: "100%" }}>
        <NavBar/>
      </div>
    </Container>
  );
};

export default Settings;