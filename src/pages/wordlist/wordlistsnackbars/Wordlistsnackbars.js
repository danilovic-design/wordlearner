import * as React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export default function WordlistSnackbars({
  newWordAlertOpen,
  deleteWordAlertOpen,
  handleCloseAlert,
  wordErrorOpen,
}) {
  return (
    <React.Fragment>
      <Snackbar
        open={newWordAlertOpen}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          New word successfully added
        </Alert>
      </Snackbar>
      <Snackbar
        open={deleteWordAlertOpen}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          Word successfully deleted
        </Alert>
      </Snackbar>
      <Snackbar
        open={wordErrorOpen}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="error"
          sx={{ width: "100%" }}
        >
          Some problem turned up
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
