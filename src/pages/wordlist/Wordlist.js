import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Word from "./word/Word";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Link as BrowserLink } from "react-router-dom";

export default function Words() {
  const navigate = useNavigate();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={BrowserLink} underline="hover" color="inherit" to="/">
          My dictionaries
        </Link>
        <Typography color="text.primary">
          Swedish-Hungarian dictionary
        </Typography>
      </Breadcrumbs>
      <Typography gutterBottom variant="h5" component="div">
        Magyar - Svéd
      </Typography>
      <Divider />
      <Word />
      <Button
        onClick={() => {
          navigate(-1);
        }}
        fullWidth
      >
        Back
      </Button>
    </Container>
  );
}
