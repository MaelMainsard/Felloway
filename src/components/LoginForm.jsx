import React, { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

import { app } from "../config/Firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  collection,
  where,
  query,
  getDocs,
} from "firebase/firestore";

const auth = getAuth(app);

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

const LoginForm = ({ setAuth, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Provide a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        const usersCollection = collection(getFirestore(app), "users");
        const q = query(usersCollection, where("email", "==", values.email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.docs.length === 0) {
          setStatus({ error: "User not found. Please sign up." });
          setSubmitting(false);
          return;
        }
        const userData = querySnapshot.docs[0].data();

        if (userData.fournisseur === "password") {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            values.email,
            values.password
          );
          // Signed in
          const user = userCredential.user;
          setUser(userCredential.user);
          sessionStorage.setItem(
            "loggedUser",
            JSON.stringify(userCredential.user)
          );
          setAuth(true);
          navigate(from, { replace: true });
        } else if (userData.fournisseur === "google") {
          setStatus({
            error:
              "This email is already associated with a Google Account. Please sign in with Google.",
          });
          setSubmitting(false);
        }
      } catch (error) {
        if (error.code === "auth/invalid-login-credentials") {
          setStatus({ error: "Email address or password invalid." });
        } else {
          setStatus({
            error: "An unexpected error occurred. Please try again later.",
          });
        }
        setSubmitting(false);
      }
    },
  });

  const { status, errors, touched, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box
          component={motion.div}
          animate={{
            transition: {
              staggerChildren: 0.55,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
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
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <Icon icon="eva:eye-fill" />
                      ) : (
                        <Icon icon="eva:eye-off-fill" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={animate}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    {...getFieldProps("remember")}
                    checked={formik.values.remember}
                  />
                }
                label="Se souvenir de moi"
              />

              <Link
                component={RouterLink}
                variant="subtitle2"
                to="/forgot-password"
                underline="hover"
              >
                Mot de passe oublié ?
              </Link>
            </Stack>

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {isSubmitting ? "Chargement..." : "Connexion"}
            </LoadingButton>
            {status && status.error && (
              <div style={{ color: "red" }}>{status.error}</div>
            )}
          </Box>
        </Box>
      </Form>
    </FormikProvider>
  );
};

export default LoginForm;
