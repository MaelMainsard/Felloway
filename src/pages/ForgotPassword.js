import React from "react";
import { Container, Typography, Box, CssBaseline, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

const ForgotPassword = () => {
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Forgot Password
                </Typography>
                <ForgotPasswordForm />
                <Box mt={2}>
                    <Typography variant="body2" color="textSecondary" align="center">
                        <Link component={RouterLink} to="/login" variant="body2">
                            Remember your password? Login here.
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default ForgotPassword;
