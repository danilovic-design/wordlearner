import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { changeWord } from "../../../../database/dbfunctions";

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
  wordData,
  dictId,
  allDictionaryData,
  userId,
}) {
  const handleNewWordSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      userId: userId,
      dictId: dictId,
      userDictionaries: allDictionaryData,
      wordData: wordData,
      newWord: {
        rightGuesses: 0,
        firstLang: data.get("firstlanguage"),
        secondLang: data.get("secondlanguage"),
      },
    };
    console.log("New dictionary submit", payload);
    changeWord(payload).then(() => {
      handleCloseChangeWord();
    });
  };

  const shortenTitle = (title) => {
    return title.length > 50 ? title.substr(0, 49) + "..." : title;
  };

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
              label={shortenTitle(wordData.firstLang)}
              defaultValue={wordData.firstLang}
              name="firstlanguage"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="secondlanguage"
              label={shortenTitle(wordData.secondLang)}
              defaultValue={wordData.secondLang}
              name="secondlanguage"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
            >
              Change word
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
