// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const app = initializeApp(firebaseConfig);