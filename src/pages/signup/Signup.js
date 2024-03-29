import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signUp } from "../../database/authfunctions";
import { useNavigate } from "react-router-dom";
import Copyright from "../copyright/Copyright";
import { Link as BrowserLink } from "react-router-dom";
import { authFormStyle, landingBoxStyle } from "../../styles/Main";
import { errorText } from "../../database/errorcodes";
import { PAGEROOT } from "../../database/deploy";
import { styled } from "@mui/material/styles";

/*function Copyright(props) {
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

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const theme = createTheme();

export default function Signup() {
  const pageText = "Sign up";
  const navigate = useNavigate();

  const [error, setError] = React.useState(null);

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    signUp(data.get("email"), data.get("password"))
      .then(() => {
        navigate(`${PAGEROOT}`);
      })

      .catch((firebaseError) => {
        setError(errorText(firebaseError.code));
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
                {pageText}
              </Typography>
              <Box
                component="form"
                onSubmit={handleSignupSubmit}
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
                  variant="filled"
                  autoFocus
                  error={error ? true : false}
                  helperText={error ? error : null}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  color="secondary"
                  type="password"
                  id="password"
                  variant="filled"
                  error={error ? true : false}
                  helperText={error ? error : null}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="passwordagain"
                  label="Password again"
                  type="password"
                  color="secondary"
                  id="passwordagain"
                  variant="filled"
                  error={error ? true : false}
                  helperText={error ? error : null}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {pageText}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link
                      component={BrowserLink}
                      to={`${PAGEROOT}resetpassword`}
                      variant="body2"
                      color="secondary"
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      component={BrowserLink}
                      to={`${PAGEROOT}login`}
                      variant="body2"
                      color="secondary"
                    >
                      Do you have an account? Log In
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
