import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Link, Box, Divider } from "@mui/material";
import styled from "@emotion/styled";

import SocialAuth from "../components/SocialAuth";
import SignupForm from "../components/SignupForm";
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

const ContentStyle = styled(Box)({
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
    y: 40,
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

const Signup = ({ setAuth, setUser }) => {
  return (
    <RootStyle>
      <Container maxWidth="sm">
        <ContentStyle>
          <HeadingStyle component={motion.div} {...fadeInUp}>
            <LogoText />

            <Typography sx={{ color: "text.secondary", mb: 5 }}>
              Entrez vos informations ci-dessous
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

          <SignupForm setAuth={setAuth} setUser={setUser} />

          <Typography
            component={motion.p}
            {...fadeInUp}
            variant="body2"
            align="center"
            sx={{ color: "text.secondary", mt: 2 }}
          >
            En vous inscrivant, j'accepte les{" "}
            <Link underline="always" color="text.primary" href="#">
              Conditions d'utilisation
            </Link>{" "}
            &{" "}
            <Link underline="always" color="text.primary" href="#">
              Politique de confidentialité
            </Link>
            .
          </Typography>

          <Typography
            component={motion.p}
            {...fadeInUp}
            variant="body2"
            align="center"
            sx={{ mt: 3 }}
          >
            Vous avez un compte ?{" "}
            <Link variant="subtitle2" component={RouterLink} to="/login">
              Connectez-vous ici
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default Signup;
