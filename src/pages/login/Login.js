import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signIn } from "../../database/authfunctions";
import { Link as BrowserLink, useNavigate } from "react-router-dom";
import Copyright from "../copyright/Copyright";
import { landingBoxStyle, authFormStyle } from "../../styles/Main";
import { errorText } from "../../database/errorcodes";
import { PAGEROOT } from "../../database/deploy";
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

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const theme = createTheme();

export default function Login() {
  const pageText = "Log in";
  const navigate = useNavigate();
  const [persistence, setPersistence] = React.useState(false);

  const handlePersistenceChange = (event) => {
    setPersistence(event.currentTarget.checked);
  };

  const [error, setError] = React.useState(null);

  const handleLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    signIn(data.get("email"), data.get("password"), persistence)
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
              <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
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
                  error={error ? true : false}
                  helperText={error ? error : null}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  color="secondary"
                  id="password"
                  variant="filled"
                  autoComplete="current-password"
                  error={error ? true : false}
                  helperText={error ? error : null}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="primary"
                      checked={persistence}
                      onChange={handlePersistenceChange}
                    />
                  }
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color="secondary"
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
                      to={`${PAGEROOT}signup`}
                      variant="body2"
                      color="secondary"
                    >
                      "Don't have an account? Sign Up"
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
