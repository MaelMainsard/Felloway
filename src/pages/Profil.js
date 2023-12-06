import { Container } from "@mui/material";
import NavBar from "../components/BottomNavBar"
import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
//////////////////////////////////////




const Profil = ({user}) => {
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>       
        <h1>Profil</h1>
        <IconButton aria-label="delete">
          <Link to="/settings" style={{ color: "inherit", textDecoration: "none" }}>
            <SettingsIcon style={{ color: "inherit" }} />
          </Link>
        </IconButton>
      </div>
      <Avatar alt="User Avatar" src={image} />
      <div style={{ marginTop: "auto", display: "flex", width: "100%" }}>
        <NavBar/>
      </div>

      
    </Container>
  );
};

export default Profil;