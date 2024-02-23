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
        <h1>Page Settings</h1>
        Un formulaire qui change les données le la bdd du user
        <SettingForm user={user}></SettingForm>
      </Container>
      <BottomNavBar />
    </div>
  );
};

export default Settings;