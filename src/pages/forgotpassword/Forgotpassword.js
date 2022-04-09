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
import { PAGEROOT } from "../../database/deploy";
import { authFormStyle, landingBoxStyle } from "../../styles/Main";
import { styled } from "@mui/material/styles";

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

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function Login() {
  const navigate = useNavigate();

  const handleResetPassword = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    resetPassword(data.get("email")).then(() => {
      navigate(`${PAGEROOT}`);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={landingBoxStyle} pt={5} pb={3} pl={2} pr={2}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Demo>
            <Box sx={authFormStyle}>
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
                  color="secondary"
                  autoFocus
                  variant="filled"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color="secondary"
                >
                  Get password reset email
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link
                      component={BrowserLink}
                      to={`${PAGEROOT}login`}
                      variant="body2"
                      color="secondary"
                    >
                      "Do you have an account? Sign In"
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      component={BrowserLink}
                      to={`${PAGEROOT}signup`}
                      variant="body2"
                      color="secondary"
                    >
                      "Don't you have an account? Sign Up"
                    </Link>
                  </Grid>
                </Grid>
              </Box>
              <Copyright sx={{ mt: 8, mb: 4 }} />
            </Box>
          </Demo>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
