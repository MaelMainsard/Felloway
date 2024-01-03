import { Container } from "@mui/material";
import NavBar from "../components/BottomNavBar";
import { useState, useEffect } from "react";
import SettingForm from "../components/SettingForm";


import { app } from "../config/Firebase"
import { collection, addDoc,setDoc, doc, getFirestore } from "firebase/firestore";

const db = getFirestore(app);

const Settings = ({user, setUser}) => {

  console.log("user", user);
  
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    setLoading(true)

    if (user === null) {
      const localUser = localStorage.getItem('felloway_uid');
      if (localUser) {
        setUser(JSON.parse(localUser)); // Parse la chaîne JSON pour obtenir un objet
      }
    } else {
      setUser(user);
      localStorage.setItem('felloway_uid', JSON.stringify(user)); // Convertit l'objet en chaîne JSON
    }

  });


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
      Un formulaire qui change les données le la bdd du user
     <SettingForm user={user}></SettingForm>

      <div style={{ marginTop: "auto", display: "flex", width: "100%" }}>
        <NavBar/>
      </div>
    </Container>
  );
};

export default Settings;