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
          Mot de passe oublié
        </Typography>
        <ForgotPasswordForm />
        <Box mt={2}>
          <Typography variant="body2" color="textSecondary" align="center">
            Vous vous souvenez de votre mot de passe ?{" "}
            <Link component={RouterLink} to="/login" variant="body2">
              Connectez-vous ici.
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
