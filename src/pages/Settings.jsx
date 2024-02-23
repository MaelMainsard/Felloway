import { Container } from "@mui/material";
import {BottomNavBar} from "../components/BottomNavBar";
import { useState, useEffect } from "react";
import SettingForm from "../components/SettingForm";
import { getLoggedUser } from "../config/util";

import { app } from "../config/Firebase"
import { collection, addDoc,setDoc, doc, getFirestore } from "firebase/firestore";

const db = getFirestore(app);

const Settings = () => {

  let user = getLoggedUser();

  
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    setLoading(true)

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
        <BottomNavBar/>
      </div>
    </Container>
  );
};

export default Settings;