import { Container } from "@mui/material";
import NavBar from "../components/BottomNavBar";
import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import { getLoggedUser } from "../config/util";
//////////////////////////////////////

const Home = () => {

  let user = getLoggedUser();

  const [image, setImage] = useState(user.photoURL);

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

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
      <Avatar alt="User Avatar" src={image} />
      <h1>Bonjour {user.displayName}</h1>
      <div style={{ marginTop: "auto", display: "flex", width: "100%" }}>
        <NavBar/>
      </div>
    </Container>
  );
};

export default Home;