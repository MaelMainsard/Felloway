import { useState } from "react";
import { CssBaseline } from "@mui/material";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import Profil from "./pages/Profil";
import PrivateRoute from "./routes/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {

  const theme = createTheme(
    {
      "palette": {
        "common": { "black": "#000", "white": "#fff" },
        "background": { "paper": "#fff", "default": "#fafafa" },
        "primary": {
          "light": "rgba(70, 171, 182, 1)",
          "main": "rgba(25, 151, 164, 1)",
          "dark": "rgba(20, 120, 131, 1)",
          "contrastText": "#fff"
        },
        "secondary": {
          "light": "rgba(248, 189, 102, 1)",
          "main": "rgba(247, 173, 65, 1)",
          "dark": "rgba(197, 138, 52, 1)",
          "contrastText": "rgba(255, 255, 255, 1)"
        },
        "error": {
          "light": "#e57373",
          "main": "#f44336",
          "dark": "#d32f2f",
          "contrastText": "#fff"
        },
        "text": {
          "primary": "rgba(0, 0, 0, 0.87)",
          "secondary": "rgba(0, 0, 0, 0.54)", "disabled": "rgba(0, 0, 0, 0.38)", "hint": "rgba(0, 0, 0, 0.38)"
        },
        "InputText": {
          "primary": "#F7F7F7"
        }
      }
    }
  );

  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null)
  const location = useLocation();

  return (
    <>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} setUser={setUser}/>} />
        <Route path="/signup" element={<Signup setAuth={setAuth} setUser={setUser}/>} />
        <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>} />
        <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><Settings/></PrivateRoute>} />
        <Route path="/profil" element={<PrivateRoute><Profil/></PrivateRoute>} />

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
      </ThemeProvider>
    </>
  );
}

export default App;