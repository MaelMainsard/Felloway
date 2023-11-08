import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Vérifie si l'utilisateur est connecté
    const userIsLoggedIn = checkIfUserIsLoggedIn();
    setIsLoggedIn(userIsLoggedIn);
  }, []);

  function checkIfUserIsLoggedIn() {
    // Vérifie si l'utilisateur est connecté en utilisant votre méthode de vérification
    // Retourne true si l'utilisateur est connecté, false sinon
  }

  return (
    <Router>
      <Switch>
        <Route path="/login">
          {isLoggedIn ? <Redirect to="/" /> : <LoginPage />}
        </Route>
        <Route path="/">
          {isLoggedIn ? <HomePage /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
