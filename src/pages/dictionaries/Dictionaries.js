import React, { useContext, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import NewDictionaryModal from "./newdictionarymodal/Newdictionarymodal";
import Typography from "@mui/material/Typography";
import Dictionary from "./dictionary/Dictionary";
import Divider from "@mui/material/Divider";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { DataContext } from "../../contexts/Datacontext";
import { AuthContext } from "../../contexts/Authcontext";

export default function Dictionaries() {
  const [newDictionaryOpen, setNewDictionaryOpen] = React.useState(false);
  const [dict2delete, setDict2delete] = React.useState("");
  const handleOpenDictionary = () => setNewDictionaryOpen(true);
  const handleCloseDictionary = () => setNewDictionaryOpen(false);
  const [newWordOpen, setNewWordOpen] = React.useState(false);
  const handleOpenWord = () => {
    console.log("open it");
    setNewWordOpen(true);
  };
  const handleCloseWord = () => setNewWordOpen(false);
  //handleCloseDeletion, confirmDeletion
  const [confirmDeletion, setConfirmDeletion] = React.useState(false);
  const { storedDictionaryData } = useContext(DataContext);
  const { uid } = useContext(AuthContext);
  const handleConfirmDeletion = () => setConfirmDeletion(true);
  const handleCloseDeletion = () => setConfirmDeletion(false);

  const [userDictionaries, setUserDictionaries] = React.useState([]);
  const [userId, setUserId] = React.useState(null);

  useEffect(() => {
    setUserDictionaries(storedDictionaryData);
    setUserId(uid);
  }, [storedDictionaryData, uid]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="text.primary">Dictionaries</Typography>
      </Breadcrumbs>
      {userDictionaries.map((data, index) => (
        <Dictionary
          key={`userdicts${index}`}
          data={data}
          userDictionaries={userDictionaries}
          handleConfirmDeletion={handleConfirmDeletion}
          dict2delete={dict2delete}
          setDict2delete={setDict2delete}
          handleCloseDeletion={handleCloseDeletion}
          confirmDeletion={confirmDeletion}
          userId={userId}
          newWordOpen={newWordOpen}
          handleOpenWord={handleOpenWord}
          handleCloseWord={handleCloseWord}
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
        userDictionaries={userDictionaries}
      />
    </Container>
  );
}
