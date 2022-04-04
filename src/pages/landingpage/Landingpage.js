import * as React from "react";
import { mainBoxStyle } from "../../styles/Main";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

export default function LandingPage() {
  return (
    <Box sx={mainBoxStyle}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
      </Container>
    </Box>
  );
}
