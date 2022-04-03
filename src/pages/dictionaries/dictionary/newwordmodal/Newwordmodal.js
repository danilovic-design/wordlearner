import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { saveNewWord } from "../../../../database/dbfunctions";

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

export default function NewWordModal({
  handleCloseWord,
  newWordOpen,
  data,
  userId,
  userDictionaries,
}) {
  const handleNewWordSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      userId: userId,
      dictId: data.dictId,
      userDictionaries: userDictionaries,
      firstLang: formData.get("firstlanguage"),
      secondLang: formData.get("secondlanguage"),
    };

    saveNewWord(payload).then(() => {
      handleCloseWord();
    });
  };

  return (
    <div>
      <Modal
        open={newWordOpen}
        onClose={handleCloseWord}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a new word
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Add a new word to this dictionary.
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
              label={`In ${data.firstLang}`}
              name="firstlanguage"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="secondlanguage"
              label={`In ${data.secondLang}`}
              name="secondlanguage"
            />
            <Button
              type="submit"
              fullWidth
              color="secondary"
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
