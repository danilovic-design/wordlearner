import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

export default function UnderConstruction() {
  const navigate = useNavigate();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box>
        <Typography color="text.primary">
          This page is under construction, please visit us later
        </Typography>
        <Button onClick={() => navigate("/")} fullWidth>
          Go back to homepage
        </Button>
      </Box>
    </Container>
  );
}
