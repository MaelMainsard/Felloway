import React, { useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { Box, TextField, Button, CircularProgress, Typography } from "@mui/material";
import { app } from "../config/Firebase";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, collection, where, query, getDocs } from "firebase/firestore";

const auth = getAuth(app);

const ForgotPasswordForm = () => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [resetEmailSent, setResetEmailSent] = useState(false);

    const ForgotPasswordSchema = Yup.object().shape({
        email: Yup.string().email("Provide a valid email address").required("Email is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: ForgotPasswordSchema,
        onSubmit: async (values, { setFieldError }) => {
            try {
                setSubmitting(true);

                const usersCollection = collection(getFirestore(app), "users");
                const q = query(usersCollection, where("email", "==", values.email));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.docs.length === 0) {
                    setFieldError("email", "No account found with this email address.");
                    return;
                }

                const userData = querySnapshot.docs[0].data();

                if (userData.fournisseur === "password") {
                    await sendPasswordResetEmail(auth, values.email);
                    setResetEmailSent(true);
                } else {
                    setFieldError("email", "This email is associated with a different login method.");
                }
            } catch (error) {
                console.error("Error sending password reset email:", error.message);
                setFieldError("email", "Error sending reset email. Please try again.");
            } finally {
                setSubmitting(false);
            }
        },
    });

    const { errors, touched, handleSubmit, getFieldProps } = formik;

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Box>
                    <TextField
                        fullWidth
                        autoComplete="username"
                        type="email"
                        label="Email Address"
                        {...getFieldProps("email")}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                    />

                    <Button
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                        startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                    >
                        {isSubmitting ? "Sending..." : "Send Reset Email"}
                    </Button>

                    {resetEmailSent && (
                        <Typography variant="body2" color="textSecondary" align="center" mt={2}>
                            Password reset email sent successfully.
                        </Typography>
                    )}
                </Box>
            </Form>
        </FormikProvider>
    );
};

export default ForgotPasswordForm;
