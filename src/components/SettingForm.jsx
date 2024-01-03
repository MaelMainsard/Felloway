import * as Yup from "yup";
import { Typography } from "@mui/material";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

import { app } from "../config/Firebase"
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { collection, addDoc,setDoc, updateDoc, doc, getFirestore } from "firebase/firestore";

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



const SettingForm = ({ user }) => {
  const navigate = useNavigate();

  console.log(user);

  const [errorText, setErrorText] = useState("");

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!"),
    lastName: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!"),
    email: Yup.string()
        .email("Email must be a valid email address"),      
    age: Yup.number()
        .min(16, "You must be at least 16 years old"),        
    gender: Yup.string()
        .matches(/^(men|women|other)$/, "Sexe must be homme, femme or autre"),
    location: Yup.string()
        .matches(/^(France|Belgique|Suisse)$/, "Lieu must be France, Belgique or Suisse"),
  });

  

  const formik = useFormik({
    initialValues: {
        firstName: user.firstName,
        lastName: user.lastName ,
        email: user.email,
        age: user.age,
        gender: user.gender,
        location: user.location,
    },
    validationSchema: SignupSchema, 

    onSubmit: async () => {
      try {

        // Update user profile
         await updateDoc(doc(db, "users", user.uid), {
          firstName: formik.values.firstName,
          lastName: formik.values.lastName,
          email: formik.values.email,
          age: formik.values.age,
          gender: formik.values.gender,
          location: formik.values.location,
        });
        
      } catch (error) {
        console.error(error);
        setErrorText(error.message);
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
              label="First name"
              {...getFieldProps("firstName")}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
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
              label="Email address"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
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
              type="number"
              minRows={0}
              label="Age"
              {...getFieldProps("age")}
              error={Boolean(touched.age && errors.age)}
              helperText={touched.age && errors.age}
            />          
          </Stack>

          <Stack
            spacing={3}
            component={motion.div}
            initial={{ opacity: 0, y: 40 }}
            animate={animate}
          >
            <FormControl >
              <InputLabel id="gender-select-standard-label">Gender</InputLabel>
              <Select
                fullWidth
                labelId="gender-select-standard-label"
                label="Gender"
                {...getFieldProps("gender")}
                error={Boolean(touched.gender && errors.gender)}
                helperText={touched.gender && errors.gender}
              >
                <MenuItem value={"men"}>Homme</MenuItem>
                <MenuItem value={"women"}>Femme</MenuItem>
                <MenuItem value={"other"}>Autre</MenuItem>
            </Select>
          </FormControl>    
          </Stack>

          <Stack
            spacing={3}
            component={motion.div}
            initial={{ opacity: 0, y: 40 }}
            animate={animate}
          >
             <TextField
              fullWidth
              label="Location"
              {...getFieldProps("location")}
              error={Boolean(touched.location && errors.location)}
              helperText={touched.location && errors.location}
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
              Update
            </LoadingButton>
          </Box>
        </Stack>
      </Form>
      
    </FormikProvider>
  );
};

export default SettingForm;












