import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function ReloginBox({ handleLogin, error }) {
  const pageText = "Log in"
  return (
    <Box
      sx={{
        pt: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
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
          autoComplete="current-password"
          error={error ? true : false}
          helperText={error ? error : null}
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
      </Box>
    </Box>
  );
}
