import * as React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export default function ProfileSnackbars({
  updatedPasswordAlertOpen,
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
    </React.Fragment>
  );
}
