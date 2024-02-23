import { Container } from "@mui/material";
import {BottomNavBar} from "../components/BottomNavBar";
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
    <div className="h-screen flex flex-col justify-between">
      <Container
        component="main"
        maxWidth="100%"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Avatar alt="User Avatar" src={image} />
        <h1>Bonjour {user.displayName}</h1>
      </Container>
      <BottomNavBar/>
    </div>
  );
};

export default Home;