import React, { useState } from "react";

const Login = ({ firebase }) => {
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
        </div>
    );
};

export default Login;
