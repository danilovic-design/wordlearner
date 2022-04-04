import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function ChangePasswordBox({ handleNewPasswordSubmit }) {
  return (
    <Box
      component="form"
      onSubmit={handleNewPasswordSubmit}
      noValidate
      sx={{ mt: 1 }}
    >
      <Typography component="h1" variant="h5">
        Change password
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        color="secondary"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="passwordagain"
        label="Password again"
        type="password"
        id="passwordagain"
        color="secondary"
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
  );
}
