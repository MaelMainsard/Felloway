import React from "react";
import { Container, Typography, Box, CssBaseline, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import LogoText from "../components/LogoText";

const ForgotPassword = () => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <LogoText />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ color: "text.secondary" }}
          component="h1"
          variant="h5"
        >
          Forgot Password
        </Typography>
        <Box mt={2}>
          <ForgotPasswordForm />
        </Box>
        <Box mt={2}>
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            Remember your password ?
            <Link
              component={RouterLink}
              to="/login"
              variant="body2"
              style={{ marginLeft: "5px" }}
            >
              Login here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
