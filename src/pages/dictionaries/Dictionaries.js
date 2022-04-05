import React, { useContext, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import NewDictionaryModal from "./newdictionarymodal/Newdictionarymodal";
import Dictionary from "./dictionary/Dictionary";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { DataContext } from "../../contexts/Datacontext";
import { AuthContext } from "../../contexts/Authcontext";
import { BreadCrumbTypographyStyle } from "../../styles/Main";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import { StyledBreadcrumb } from "../../styles/StyledBreadcrumb";
import { mainBoxStyle } from "../../styles/Main";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import DictionarySnackbars from "./dictionarysnackbars/Dictionarysnackbars";
import { PAGEROOT } from "../../database/deploy";
import NewWordModal from "./dictionary/newwordmodal/Newwordmodal";

export default function Dictionaries() {
  /*  ----------------
    Primary states
      ---------------- */
  const navigate = useNavigate();
  const { storedDictionaryData } = useContext(DataContext);
  const { uid } = useContext(AuthContext);
  const [userDictionaries, setUserDictionaries] = React.useState([]);
  const [userId, setUserId] = React.useState(null);
  /*  ----------------
    New dictionary related states
      ---------------- */
  const [newDictionaryOpen, setNewDictionaryOpen] = React.useState(false);
  const handleOpenDictionary = () => setNewDictionaryOpen(true);
  const handleCloseDictionary = () => setNewDictionaryOpen(false);
  /*  ----------------
    New word related states
      ---------------- */
  const [newWordOpen, setNewWordOpen] = React.useState(false);
  const handleOpenWord = () => {
    setNewWordOpen(true);
  };
  const handleCloseWord = () => setNewWordOpen(false);

  /*  ----------------
    Delete word related
      ---------------- */
  const [confirmDeletion, setConfirmDeletion] = React.useState(false);
  /*  ----------------
    Delete dictionary related
      ---------------- */
  const [dict2delete, setDict2delete] = React.useState("");
  const handleConfirmDeletion = () => setConfirmDeletion(true);
  const handleCloseDeletion = () => setConfirmDeletion(false);
  /*  ----------------
    Alerts related states
      ---------------- */
  const [newWordAlertOpen, setNewWordAlertOpen] = React.useState(false);
  const [newDictionaryAlertOpen, setNewDictionaryAlertOpen] =
    React.useState(false);
  const [deleteDictionaryAlertOpen, setDeleteDictionaryAlertOpen] =
    React.useState(false);
  const [dictionaryErrorOpen, setDictionaryErrorOpen] = React.useState(false);
  const [newWordInputDictionary, setNewWordDictionary] = React.useState(null);

  const handleCloseAlert = () => {
    setNewWordAlertOpen(false);
    setNewDictionaryAlertOpen(false);
    setDeleteDictionaryAlertOpen(false);
    setDictionaryErrorOpen(false);
  };

  useEffect(() => {
    setUserDictionaries(storedDictionaryData);
    setUserId(uid);
  }, [storedDictionaryData, uid]);

  return (
    <Box sx={mainBoxStyle}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Breadcrumbs aria-label="breadcrumb" sx={BreadCrumbTypographyStyle}>
          <StyledBreadcrumb
            onClick={() => {
              navigate(`${PAGEROOT}`);
            }}
            label="Home"
            icon={<HomeIcon fontSize="small" />}
          />
        </Breadcrumbs>

        <Stack spacing={1}>
          {userDictionaries.map((data, index) => (
            <Dictionary
              key={`userdicts${index}`}
              data={data}
              dict2delete={dict2delete}
              confirmDeletion={confirmDeletion}
              handleCloseDeletion={handleCloseDeletion}
              handleConfirmDeletion={handleConfirmDeletion}
              handleOpenWord={handleOpenWord}
              newWordAlertOpen={newWordAlertOpen}
              setDict2delete={setDict2delete}
              setDictionaryErrorOpen={setDictionaryErrorOpen}
              setNewWordAlertOpen={setNewWordAlertOpen}
              setDeleteDictionaryAlertOpen={setDeleteDictionaryAlertOpen}
              userDictionaries={userDictionaries}
              userId={userId}
              setNewWordDictionary={setNewWordDictionary}
            />
          ))}
        </Stack>
        {userDictionaries.length === 0 ? "No current dictionaries" : null}

        <Button
          onClick={handleOpenDictionary}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          color="secondary"
        >
          Create a new dictionary
        </Button>

        <DictionarySnackbars
          newWordAlertOpen={newWordAlertOpen}
          newDictionaryAlertOpen={newDictionaryAlertOpen}
          deleteDictionaryAlertOpen={deleteDictionaryAlertOpen}
          handleCloseAlert={handleCloseAlert}
          dictionaryErrorOpen={dictionaryErrorOpen}
        />

        <NewDictionaryModal
          handleCloseDictionary={handleCloseDictionary}
          newDictionaryOpen={newDictionaryOpen}
          userDictionaries={userDictionaries}
          setNewDictionaryAlertOpen={setNewDictionaryAlertOpen}
          setDictionaryErrorOpen={setDictionaryErrorOpen}
        />
        {newWordInputDictionary && newWordOpen ? (
          <NewWordModal
            data={newWordInputDictionary}
            handleCloseWord={handleCloseWord}
            newWordOpen={newWordOpen}
            userId={userId}
            userDictionaries={userDictionaries}
            handleCloseAlert={handleCloseAlert}
            newWordAlertOpen={newWordAlertOpen}
            setWordErrorOpen={setDictionaryErrorOpen}
            setNewWordAlertOpen={setNewWordAlertOpen}
          />
        ) : null}
      </Container>
    </Box>
  );
}
