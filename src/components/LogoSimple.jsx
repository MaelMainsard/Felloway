import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const LogoSimple = () => {
  return (
    <Box>
      <Link to="/">
        <Box component="img" src="/static/Felloway-pre.svg" alt="logo" />
      </Link>
    </Box>
  );
};

export default LogoSimple;
