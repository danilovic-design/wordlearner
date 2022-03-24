import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

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

export default function ChangeWordModal({
  handleCloseChangeWord,
  changeWordOpen,
}) {
  const handleNewWordSubmit = () => console.log("New dictionary submit");
  return (
    <div>
      <Modal
        open={changeWordOpen}
        onClose={handleCloseChangeWord}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Change your entry
          </Typography>

          <Box
            component="form"
            onSubmit={handleNewWordSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstlanguage"
              label="ring"
              name="firstlanguage"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="secondlanguage"
              label="csörgés"
              name="secondlanguage"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Change word
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
