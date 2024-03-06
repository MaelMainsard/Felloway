import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Link, Box, Divider } from "@mui/material";
import styled from "@emotion/styled";
import LoginForm from "../components/LoginForm";
import SocialAuth from "../components/SocialAuth";
import LogoText from "../components/LogoText";
import { motion } from "framer-motion";

//////////////////////////////////
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

let easing = [0.6, -0.05, 0.01, 0.99];
const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

const Login = ({ setAuth, setUser }) => {
  return (
    <RootStyle>
      <Container maxWidth="sm">
        <ContentStyle>
          <HeadingStyle component={motion.div} {...fadeInUp}>
            <LogoText />
            <Typography sx={{ color: "text.secondary", mb: 5 }}>
              Connectez-vous à votre compte
            </Typography>
          </HeadingStyle>

          <Box component={motion.div} {...fadeInUp}>
            <SocialAuth setAuth={setAuth} setUser={setUser} />
          </Box>

          <Divider sx={{ my: 3 }} component={motion.div} {...fadeInUp}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              OU
            </Typography>
          </Divider>

          <LoginForm setAuth={setAuth} setUser={setUser} />

          <Typography
            component={motion.p}
            {...fadeInUp}
            variant="body2"
            align="center"
            sx={{ mt: 3 }}
          >
            Vous n'avez pas de compte ?{" "}
            <Link variant="subtitle2" component={RouterLink} to="/signup">
              Inscrivez-vous
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default Login;
