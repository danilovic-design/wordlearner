import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { mainBoxStyle } from "../../styles/Main";
import { PAGEROOT } from "../../database/deploy";

export default function UnderConstruction() {
  const navigate = useNavigate();
  return (
    <Box sx={mainBoxStyle}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ pt: 4, pb: 4 }}>
          <Typography color="text.secondary" sx={{ pb: 4 }}>
            This page is under construction, please visit us later
          </Typography>
          <Button
            onClick={() => navigate(`${PAGEROOT}`)}
            fullWidth
            variant="contained"
            color="secondary"
          >
            Go back to homepage
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
