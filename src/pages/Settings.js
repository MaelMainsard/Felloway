import { Container } from "@mui/material";
import NavBar from "../components/BottomNavBar";
import { useState } from "react";
//////////////////////////////////////

const Settings = () => {

  
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [age, setAge] = useState("");
  const [sexe, setSexe] = useState("");
  const [lieu, setLieu] = useState("");

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

      <div>
        <label htmlFor="email">Adresse mail:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="nom">Nom:</label>
        <input type="text" id="nom" value={nom} onChange={(e) => setNom(e.target.value)} />
      </div>
      <div>
        <label htmlFor="prenom">Prénom:</label>
        <input type="text" id="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
      </div>
      <div>
        <label htmlFor="age">Âge:</label>
        <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
      </div>
      <div>
        <label htmlFor="sexe">Sexe:</label>
        <input type="text" id="sexe" value={sexe} onChange={(e) => setSexe(e.target.value)} />
      </div>
      <div>
        <label htmlFor="lieu">Lieu:</label>
        <input type="text" id="lieu" value={lieu} onChange={(e) => setLieu(e.target.value)} />
      </div>

      <div style={{ marginTop: "auto", display: "flex", width: "100%" }}>
        <NavBar/>
      </div>
    </Container>
  );
};

export default Settings;