import { Container } from "@mui/material";
import NavBar from "../components/BottomNavBar"
//////////////////////////////////////

const Home = () => {

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
      <h1>Page accueil</h1>
      <div style={{ marginTop: "auto", display: "flex", width: "100%" }}>
        <NavBar/>
      </div>
    </Container>
  );
};

export default Home;