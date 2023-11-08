import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyACzy5axRJO9MT_0PAOj_s4jS48LwYzZsU",
  authDomain: "felloway-30160.firebaseapp.com",
  projectId: "felloway-30160",
  storageBucket: "felloway-30160.appspot.com",
  messagingSenderId: "1001735400507",
  appId: "1:1001735400507:web:9600cdb2a6c690f5ed801e",
  measurementId: "G-RZRZE7HY9K"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Vérifie si l'utilisateur est connecté
    const userIsLoggedIn = checkIfUserIsLoggedIn();
    setIsLoggedIn(userIsLoggedIn);
  }, []);

  function checkIfUserIsLoggedIn() {
    // Vérifie si l'utilisateur est connecté en utilisant Firebase
    const user = firebase.auth().currentUser;
    return !!user;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home firebase={firebase} /> : <Navigate to="/login" />} />
        <Route path="/login" element={!isLoggedIn ? <Login firebase={firebase} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
