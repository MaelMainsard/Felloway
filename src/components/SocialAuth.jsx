import { Icon } from "@iconify/react";
import { Stack, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { app } from "../config/Firebase"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

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
            .then((result) => {
              setUser(result.user)
              setAuth(true);
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
