import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import NewDictionaryModal from "./newdictionarymodal/Newdictionarymodal";
import Typography from "@mui/material/Typography";
import Dictionary from "./dictionary/Dictionary";
import NewWordModal from "./newwordmodal/Newwordmodal";
import ConfirmDeleteDictionary from "./confirmdeletedictionary/Confirmdeletedictionary";

export default function Dictionaries() {
  const [newDictionaryOpen, setNewDictionaryOpen] = React.useState(false);
  const handleOpenDictionary = () => setNewDictionaryOpen(true);
  const handleCloseDictionary = () => setNewDictionaryOpen(false);
  const [newWordOpen, setNewWordOpen] = React.useState(false);
  const handleOpenWord = () => setNewWordOpen(true);
  const handleCloseWord = () => setNewWordOpen(false);
  //handleCloseDeletion, confirmDeletion
  const [confirmDeletion, setConfirmDeletion] = React.useState(false);
  const handleConfirmDeletion = () => setConfirmDeletion(true);
  const handleCloseDeletion = () => setConfirmDeletion(false);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Button
        onClick={handleOpenDictionary}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Create a new dictionary
      </Button>
      <hr />
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        My dictionaries
      </Typography>
      <Dictionary
        handleOpenWord={handleOpenWord}
        handleConfirmDeletion={handleConfirmDeletion}
      />
      <NewDictionaryModal
        handleCloseDictionary={handleCloseDictionary}
        newDictionaryOpen={newDictionaryOpen}
      />
      <NewWordModal
        handleCloseWord={handleCloseWord}
        newWordOpen={newWordOpen}
      />
      <ConfirmDeleteDictionary
        handleCloseDeletion={handleCloseDeletion}
        confirmDeletion={confirmDeletion}
      />
    </Container>
  );
}
