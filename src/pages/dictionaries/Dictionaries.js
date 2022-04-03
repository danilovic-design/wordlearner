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
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export default function Dictionaries() {
  // Primary states
  const navigate = useNavigate();
  const { storedDictionaryData } = useContext(DataContext);
  const { uid } = useContext(AuthContext);
  const [userDictionaries, setUserDictionaries] = React.useState([]);
  const [userId, setUserId] = React.useState(null);
  // New dictionary related
  const [newDictionaryOpen, setNewDictionaryOpen] = React.useState(false);
  const handleOpenDictionary = () => setNewDictionaryOpen(true);
  const handleCloseDictionary = () => setNewDictionaryOpen(false);
  // New word related
  const [newWordOpen, setNewWordOpen] = React.useState(false);
  const handleOpenWord = () => {
    setNewWordOpen(true);
  };
  const handleCloseWord = () => setNewWordOpen(false);
  // Delete word related
  const [confirmDeletion, setConfirmDeletion] = React.useState(false);
  // Delete dictionary related
  const [dict2delete, setDict2delete] = React.useState("");
  const handleConfirmDeletion = () => setConfirmDeletion(true);
  const handleCloseDeletion = () => setConfirmDeletion(false);

  const [alertOpen, setAlertOpen] = React.useState(false);

  const handleCloseAlert = () => {
    setAlertOpen(false);
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
              navigate("/");
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

        <Snackbar
          open={alertOpen}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
        >
          <Alert
            onClose={handleCloseAlert}
            severity="success"
            sx={{ width: "100%" }}
          >
            New dictionary created
          </Alert>
        </Snackbar>

        <NewDictionaryModal
          handleCloseDictionary={handleCloseDictionary}
          newDictionaryOpen={newDictionaryOpen}
          userDictionaries={userDictionaries}
        />
      </Container>
    </Box>
  );
}
