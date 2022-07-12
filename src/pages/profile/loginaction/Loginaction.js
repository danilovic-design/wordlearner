import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { authFormStyle } from "../../../styles/Main";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function LoginAction({ setReloginState }) {
  return (
    <Box>
      <Demo>
        <Box sx={{ marginBottom: "20px" }}>
          <Box sx={authFormStyle}>
            <Typography variant="h5">Modify password</Typography>
            <Typography pb={2} pt={2} variant="body2">
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
        </Box>
      </Demo>
      <Demo>
        <Box sx={authFormStyle}>
          <Typography variant="h5" color="warning">
            Delete account
          </Typography>
          <Typography pb={2} pt={2} variant="body2">
            You need to relogin to delete your account
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
      </Demo>
    </Box>
  );
}
