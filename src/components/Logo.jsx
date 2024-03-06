import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const Logo = () => {
  return (
    <Box>
      <Link to="/">
        <Box component="img" src="/Logo.svg" alt="logo" />
      </Link>
    </Box>
  );
};

export default Logo;
