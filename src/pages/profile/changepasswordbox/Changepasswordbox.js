import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { authFormStyle } from "../../../styles/Main";
import ConformDeleteAccount from "../confirmdeleteaccount/Confirmdeleteaccount";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function ChangePasswordBox({ handleNewPasswordSubmit, error }) {
  const [deleteConfirmationOn, setDeleteConfirmation] = React.useState(false);

  return (
    <Box>
      <Demo>
        <Box
          component="form"
          onSubmit={handleNewPasswordSubmit}
          sx={{ ...authFormStyle, mb: 3 }}
        >
          <Typography component="h2" variant="h6">
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
            id="passwordagain"
            color="secondary"
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
            Change password
          </Button>
        </Box>
      </Demo>
      <Demo>
        <Box sx={{ ...authFormStyle, pb: "20px" }}>
          <Typography component="h2" variant="h6" sx={{ pb: 3 }}>
            Delete account
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={() => {
              setDeleteConfirmation(true);
            }}
          >
            Delete account
          </Button>
        </Box>
      </Demo>
      <ConformDeleteAccount
        deleteConfirmationOn={deleteConfirmationOn}
        setDeleteConfirmation={setDeleteConfirmation}
      />
    </Box>
  );
}
