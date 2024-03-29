import * as Yup from "yup";
import { Typography } from "@mui/material";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Box,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

import { app } from "../config/Firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getFirestore,
} from "firebase/firestore";

const db = getFirestore(app);
const auth = getAuth(app);

/////////////////////////////////////////////////////////////
let easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
  opacity: 1,
  y: 0,
  transition: {
    duration: 0.6,
    ease: easing,
    delay: 0.16,
  },
};

const SignupForm = ({ setAuth, setUser }) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [errorText, setErrorText] = useState("");

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First name required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Last name required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+,\-=\[\]{};':"\\|,.<>\/?])/,
        "Password must contain at least one uppercase letter and one special character"
      ),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formik.values.email,
          formik.values.password
        );
        const user = userCredential.user;
        setUser(userCredential.user);
        console.log("user log", user);
        setAuth(true);

        // Add user to the database
        await setDoc(doc(db, "users", user.uid), {
          firstName: formik.values.firstName,
          lastName: formik.values.lastName,
          email: formik.values.email,
          fournisseur: auth.currentUser.providerData[0].providerId,
        });
        sessionStorage.setItem(
          "loggedUser",
          JSON.stringify(userCredential.user)
        );

        navigate("/", { replace: true });
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            setErrorText(
              `This email is already associated with an existing account.`
            );
            break;
          case "auth/invalid-email":
            setErrorText(`Email address is invalid.`);
            break;
          case "auth/operation-not-allowed":
            setErrorText(`Error during sign up.`);
            break;
          case "auth/weak-password":
            setErrorText(
              "Password is not strong enough. Add additional characters including special characters and numbers."
            );
            break;
        }
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack
            component={motion.div}
            initial={{ opacity: 0, y: 60 }}
            animate={animate}
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
          >
            <TextField
              fullWidth
              label="Prénom"
              {...getFieldProps("firstName")}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Nom"
              {...getFieldProps("lastName")}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <Stack
            spacing={3}
            component={motion.div}
            initial={{ opacity: 0, y: 40 }}
            animate={animate}
          >
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="Mot de passe"
              {...getFieldProps("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <Icon
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </Stack>

          {errorText && (
            <Typography color="error" variant="body2">
              {errorText}
            </Typography>
          )}

          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={animate}
          >
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              S'inscrire
            </LoadingButton>
          </Box>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default SignupForm;
