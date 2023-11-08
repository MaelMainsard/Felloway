import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
    };

    const handleEmailSignIn = () => {
        firebase.auth().signInWithEmailAndPassword(email, password);
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleGoogleSignIn}>Sign in with Google</button>
            <br />
            <br />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button onClick={handleEmailSignIn}>Sign in with Email</button>
        </div>
    );
};

export default Login;
