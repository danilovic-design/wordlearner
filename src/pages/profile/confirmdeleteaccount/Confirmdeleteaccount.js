import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ConfirmDeleteWord({
  deleteConfirmationOn,
  setDeleteConfirmation,
}) {
  const handleDeleteAccount = () => {};

  const handleCloseDeletion = () => {
    setDeleteConfirmation(false);
  };

  return (
    <div>
      <Modal
        open={deleteConfirmationOn}
        onClose={handleCloseDeletion}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Do you really want to delete your account? All of your data,
            dictionaries, words will be lost.
          </Typography>

          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Button
              onClick={handleCloseDeletion}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              I've changed my mind
            </Button>

            <Button
              onClick={handleDeleteAccount}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="error"
            >
              I made up my mind, delete it
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
