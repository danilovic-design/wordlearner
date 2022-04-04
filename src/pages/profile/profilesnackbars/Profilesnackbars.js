import * as React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export default function ProfileSnackbars({
  updatedPasswordAlertOpen,
  updatedPasswordAlertError,
  handlePasswordAlertClose,
}) {
  return (
    <React.Fragment>
      <Snackbar
        open={updatedPasswordAlertOpen}
        autoHideDuration={4000}
        onClose={handlePasswordAlertClose}
      >
        <Alert
          onClose={handlePasswordAlertClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Password successfully updated
        </Alert>
      </Snackbar>

      <Snackbar
        open={updatedPasswordAlertError}
        autoHideDuration={4000}
        onClose={handlePasswordAlertClose}
      >
        <Alert
          onClose={handlePasswordAlertClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Some problem turned up
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
