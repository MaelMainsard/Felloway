import { Container } from "@mui/material";
import NavBar from "../components/BottomNavBar"
import { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { getLoggedUser } from '../config/util';
import Carousel from '../components/Carousel';
import Badge from '@mui/material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import { getFirestore, collection, doc, getDoc, updateDoc, deleteDoc, query, where, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { app } from '../config/Firebase';
import ProfilHeader from "../components/profil-header";

//////////////////////////////////////

const Formulaire = () => {



  


  return (
    <>
    <Container
      component="main"
      maxWidth="100%"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}>
          Formulaire

        <div style={{ marginTop: "auto", display: "flex", width: "100%" }}>
          <NavBar />
        </div>
      </Container >   
    </>
  );
};

export default Formulaire;