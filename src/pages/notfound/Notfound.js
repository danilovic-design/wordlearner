import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { mainBoxStyle } from "../../styles/Main";
import { PAGEROOT } from "../../database/deploy";

export default function Notfound() {
  const navigate = useNavigate();
  return (
    <Box sx={mainBoxStyle}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box pt={3}>
          <Typography pb={2} color="text.primary" align="center" variant="h6">
            The requested page is not found
          </Typography>
          <Button onClick={() => navigate(`${PAGEROOT}`)} fullWidth>
            Go back to homepage
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
