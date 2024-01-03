import { Icon } from "@iconify/react";
import { Stack, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { app } from "../config/Firebase"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, getFirestore, collection, addDoc } from "firebase/firestore";


const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const SocialAuth = ({ setAuth, setUser }) => {

  const navigate = useNavigate();

  return (
    <>
      <Stack direction="row" spacing={2}>
      <IconButton
        sx={{
          border: "2px solid #ccc",
          borderRadius: "5px",
          padding: "0.5675rem",
          flex: 1,
        }}
        onClick={() => {
          signInWithPopup(auth, provider)
            .then(async (result) => {
              setUser(result.user)
              console.log("user log", result.user);
              setAuth(true);
              // Add user to the database if it doesn't exist
              const userRef = doc(db, "users", result.user.uid);
              const userDoc = await getDoc(userRef);         
              if (!userDoc.exists()) {
                console.log("User does not exist in the database");
                let firstName;
                if (auth.currentUser.providerData[0].firstName != null && auth.currentUser.providerData[0].firstName != undefined) {
                  firstName = auth.currentUser.providerData[0].firstName;
                } else {
                  firstName = auth.currentUser.providerData[0].displayName;
                }
                let lastName;
                if (auth.currentUser.providerData[0].lastName != null && auth.currentUser.providerData[0].lastName != undefined) {
                  lastName = auth.currentUser.providerData[0].lastName;
                } else {
                  lastName = "";
                }
                await setDoc(doc(db, "users", result.user.uid), {                
                  firstName: firstName,
                  lastName: lastName,
                  email: auth.currentUser.providerData[0].email,
                  avatar: auth.currentUser.providerData[0].photoURL,
                  fournisseur: auth.currentUser.providerData[0].providerId,
                });
                const userImagesRef = collection(db, 'users', result.user.uid, 'images');
                await addDoc(userImagesRef, { url: auth.currentUser.providerData[0].photoURL });
              }              
              sessionStorage.setItem("loggedUser", JSON.stringify(result.user));

              navigate("/", { replace: true });
            })
            .catch((error) => {
              // Handle Errors here.
              const errorCode = error.code;
              const errorMessage = error.message;
              // The email of the user's account used.
              const email = error.customData.email;
              // The AuthCredential type that was used.
              const credential = GoogleAuthProvider.credentialFromError(error);
              // ...
            });
        }}
      >
        <Icon icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
      </IconButton>
        <IconButton
          sx={{
            border: "2px solid #ccc",
            borderRadius: "5px",
            padding: "0.5675rem",
            flex: 1,
          }}
        >
          <Icon
            icon="eva:facebook-fill"
            color="#1877F2"
            width={22}
            height={22}
          />
          
        </IconButton>
        <IconButton
          sx={{
            border: "2px solid #ccc",
            borderRadius: "5px",
            padding: "0.5675rem",
            flex: 1,
          }}
        >
          <Icon
            icon="eva:twitter-fill"
            color="#1C9CEA"
            width={22}
            height={22}
          />
        </IconButton>
      </Stack>
    </>
  );
};

export default SocialAuth;
