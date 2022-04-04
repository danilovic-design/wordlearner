import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function LoginAction({ setReloginState }) {
  return (
    <Box>
      <Typography pb={2} pt={2}>
        You need to relogin to modify your password
      </Typography>
      <Button
        onClick={() => {
          setReloginState(1);
        }}
        fullWidth
        color="secondary"
      >
        Relogin
      </Button>
    </Box>
  );
}
