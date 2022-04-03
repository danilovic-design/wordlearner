import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as BrowserLink, useNavigate } from "react-router-dom";
import Copyright from "../copyright/Copyright";
import { resetPassword } from "../../database/authfunctions";

/*function delCopyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Danilović-Design
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}*/

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();

  const handleResetPassword = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    resetPassword(data.get("email")).then(() => {
      navigate("/");
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Reset your password
          </Typography>
          <Box
            component="form"
            onSubmit={handleResetPassword}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Get password reset email
            </Button>
            <Grid container>
              <Grid item xs>
                <Link component={BrowserLink} to={"/login"} variant="body2">
                  "Do you have an account? Sign In"
                </Link>
              </Grid>
              <Grid item>
                <Link component={BrowserLink} to={"/signup"} variant="body2">
                  "Don't you have an account? Sign Up"
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
