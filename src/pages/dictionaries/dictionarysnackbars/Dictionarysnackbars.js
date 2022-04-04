import * as React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export default function DictionarySnackbars({
  newWordAlertOpen,
  newDictionaryAlertOpen,
  deleteDictionaryAlertOpen,
  handleCloseAlert,
  dictionaryErrorOpen,
}) {
  return (
    <React.Fragment>
      <Snackbar
        open={newDictionaryAlertOpen}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          New dictionary successfully added
        </Alert>
      </Snackbar>
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
        open={deleteDictionaryAlertOpen}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          Dictionary successfully deleted
        </Alert>
      </Snackbar>
      <Snackbar
        open={dictionaryErrorOpen}
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
