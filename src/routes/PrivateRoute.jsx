import React from "react";
import {Navigate } from "react-router-dom";

function PrivateRoute({ children }) {

  function isLoggedIn() {
    const user = JSON.parse(sessionStorage.getItem("loggedUser"));
    return user !== null;
  }

  const isAuthenticated = isLoggedIn();

   if (!isAuthenticated) {
        return <Navigate to="/login" replace={true}/>
    }

    return children;
}

export default PrivateRoute;
  