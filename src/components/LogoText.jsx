import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import LogoName from '../assets/FellowayLogoName.svg'

const LogoText = () => {
  return (
    <Box>
      <Link to="/">
        <Box component="img" src={LogoName} alt="logo"/>
      </Link>
    </Box>
  );
};

export default LogoText;
