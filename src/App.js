import { useState } from "react";
import { CssBaseline } from "@mui/material";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import Profil from "./pages/Profil";
import ForgotPassword from "./pages/ForgotPassword";

import "./App.css"
function App() {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null)
  const location = useLocation();

  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} setUser={setUser}/>} />
        <Route path="/signup" element={<Signup setAuth={setAuth} setUser={setUser}/>} />
        <Route path="/home" element={<Home user={user}/>} />
        <Route path="/chat" element={<Chat user={user} setUser={setUser}/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/profil" element={<Profil user={user}/>} />

        <Route
          path="/"
          element={
            auth ? (
              <Home setAuth={setAuth} user={user}/>
            ) : (
              <Navigate to="/login" state={{ from: location }} replace />
            )
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;
