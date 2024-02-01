import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const LogoText = () => {
  return (
    <Box>
      <Link to="/">
        <Box component="img" src="/static/FellowayCombinaison.svg" alt="logo"/>
      </Link>
    </Box>
  );
};

export default LogoText;
