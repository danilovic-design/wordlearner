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

export default function NewDictionaryModal({
  handleCloseDeletion,
  confirmDeletion,
}) {
  const handleNewWordSubmit = () => console.log("New dictionary submit");
  return (
    <div>
      <Modal
        open={confirmDeletion}
        onClose={handleCloseDeletion}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create a new dictionary
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
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
              label="In Hungarian"
              name="firstlanguage"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="secondlanguage"
              label="In Swedish"
              name="secondlanguage"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add new word
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
