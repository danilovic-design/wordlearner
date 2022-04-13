import * as React from "react";
import { Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { CookieContext } from "../../contexts/Cookiecontext";

export default function CookieConsent() {
  const { setLocalCookiesConsented } = React.useContext(CookieContext);
  return (
    <Alert
      variant="standard"
      color="info"
      icon={false}
      sx={{ position: "absolute", bottom: "10px", right: 0, margin: 0 }}
    >
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={10}>
          <Typography variant="h6">We value your privacy</Typography>
          <Typography variant="body2">
            This site uses cookies, only the necessary ones, to enhance your
            browsing experience and analyse our traffic. By clicking "OK" you
            consent to use of our cookies.
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Button onClick={setLocalCookiesConsented}>OK</Button>
        </Grid>
      </Grid>
    </Alert>
  );
}
