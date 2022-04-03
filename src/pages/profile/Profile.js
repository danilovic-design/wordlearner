import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useNavigate } from "react-router-dom";
import { changeUserPassword } from "../../database/authfunctions";
import { BreadCrumbTypographyStyle } from "../../styles/Main";
import { mainBoxStyle } from "../../styles/Main";
import { StyledBreadcrumb } from "../../styles/StyledBreadcrumb";
import HomeIcon from "@mui/icons-material/Home";

export default function Profile() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleNewPasswordSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    changeUserPassword(data.get("password"))
      .then(() => {
        handleClick();
      })
      .catch((err) => console.log(err));
  };
  return (
    <Box sx={mainBoxStyle}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Breadcrumbs aria-label="breadcrumb" sx={BreadCrumbTypographyStyle}>
          <StyledBreadcrumb
            onClick={() => {
              navigate("/");
            }}
            label="Home"
            icon={<HomeIcon fontSize="small" />}
          />
          <StyledBreadcrumb label="Manage your account" />
        </Breadcrumbs>

        <Box
          component="form"
          onSubmit={handleNewPasswordSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="passwordagain"
            label="Password again"
            type="password"
            id="passwordagain"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="secondary"
          >
            Change password
          </Button>
        </Box>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            This is a success message!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
