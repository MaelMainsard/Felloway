import { useState } from "react";
import { CssBaseline } from "@mui/material";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat"
import Settings from "./pages/Settings"

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
        <Route path="/home" element={<Home/>} />
        <Route path="/chat" element={<Chat user={user}/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route
          path="/"
          element={
            auth ? (
              <Home setAuth={setAuth} />
            ) : (
              <Navigate to="/login" state={{ from: location }} replace />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
