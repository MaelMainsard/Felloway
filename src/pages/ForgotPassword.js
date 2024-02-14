import React from "react";
import { Container, Typography, Box, CssBaseline, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import LogoText from "../components/LogoText";
import styled from "@emotion/styled";

const RootStyle = styled("div")({
  background: "rgb(249, 250, 251)",
  height: "100vh",
  display: "grid",
  placeItems: "center",
});

const HeadingStyle = styled(Box)({
  textAlign: "center",
});

const ContentStyle = styled("div")({
  maxWidth: 480,
  padding: 25,
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  background: "#fff",
});

const ForgotPassword = () => {
  return (
    <RootStyle>
      <Container component="main" maxWidth="xs">
        <ContentStyle>
          <HeadingStyle>
            <LogoText />
          </HeadingStyle>
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
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default ForgotPassword;
