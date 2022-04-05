import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { saveDict } from "../../../database/dbfunctions";
import { AuthContext } from "../../../contexts/Authcontext";

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
  handleCloseDictionary,
  newDictionaryOpen,
  userDictionaries,
  setDictionaryErrorOpen,
  setNewDictionaryAlertOpen,
}) {
  let { uid } = React.useContext(AuthContext);

  const handleNewDictionarySubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let saveData = {
      firstLang: data.get("firstlanguage"),
      secondLang: data.get("secondlanguage"),
      userDictionaries: userDictionaries,
      userId: uid,
    };
    saveDict(saveData)
      .then(() => {
        setNewDictionaryAlertOpen(true);
        handleCloseDictionary();
      })
      .catch(() => {
        setDictionaryErrorOpen(true);
        handleCloseDictionary();
      });
  };
  return (
    <div>
      <Modal
        open={newDictionaryOpen}
        onClose={handleCloseDictionary}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create a new dictionary
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Here you can create a new dictionary, which allows you to gather new
            words and test your knowledge.
          </Typography>
          <Box
            component="form"
            onSubmit={handleNewDictionarySubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstlanguage"
              label="First language"
              name="firstlanguage"
              color="secondary"
              autoComplete="off"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="secondlanguage"
              label="Second language"
              name="secondlanguage"
              color="secondary"
              autoComplete="off"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
            >
              Create
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
