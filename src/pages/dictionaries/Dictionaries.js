import React, { useContext, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import NewDictionaryModal from "./newdictionarymodal/Newdictionarymodal";
import Typography from "@mui/material/Typography";
import Dictionary from "./dictionary/Dictionary";
import NewWordModal from "./newwordmodal/Newwordmodal";
import ConfirmDeleteDictionary from "./confirmdeletedictionary/Confirmdeletedictionary";
import Divider from "@mui/material/Divider";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { DataContext } from "../../contexts/Datacontext";

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
  const { storedDictionaryData } = useContext(DataContext);

  const [userDictionaries, setUserDictionaries] = React.useState([]);

  useEffect(() => {
    console.log("[+] - Use effect in action in Dictionaries");
    console.log(storedDictionaryData);
    setUserDictionaries(storedDictionaryData);
  }, [storedDictionaryData]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="text.primary">My dictionaries</Typography>
      </Breadcrumbs>
      {userDictionaries.map((data, index) => (
        <Dictionary
          key={`userdicts${index}`}
          handleOpenWord={handleOpenWord}
          handleConfirmDeletion={handleConfirmDeletion}
        />
      ))}

      <Divider />

      <Button
        onClick={handleOpenDictionary}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Create a new dictionary
      </Button>
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
