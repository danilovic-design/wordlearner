import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Word from "./word/Word";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { DataContext } from "../../contexts/Datacontext";
import { AuthContext } from "../../contexts/Authcontext";
import Box from "@mui/material/Box";
import NewWordModal from "../dictionaries/dictionary/newwordmodal/Newwordmodal";
import { mainBoxStyle } from "../../styles/Main";
import { BreadCrumbTypographyStyle } from "../../styles/Main";
import { StyledBreadcrumb } from "../../styles/StyledBreadcrumb";
import HomeIcon from "@mui/icons-material/Home";
import Stack from "@mui/material/Stack";
import WordlistSnackbars from "./wordlistsnackbars/Wordlistsnackbars";

export default function Words() {
  const { dictId } = useParams();
  const { storedDictionaryData } = useContext(DataContext);
  const { uid } = useContext(AuthContext);
  const [userId, setUserId] = useState(null);
  const [dictWords, setDictWords] = useState([]);
  const [dictData, setDictData] = useState({});
  const [allDictionaryData, setAllDictionaryData] = useState();
  const [newWordOpen, setNewWordOpen] = useState(false);
  const [newWordAlertOpen, setNewWordAlertOpen] = useState(false);
  const [deleteWordAlertOpen, setDeleteWordAlertOpen] = useState(false);
  const [wordErrorOpen, setWordErrorOpen] = useState(false);
  const navigate = useNavigate();

  const handleCloseAlert = () => {
    setNewWordAlertOpen(false);
    setDeleteWordAlertOpen(false);
  };

  useEffect(() => {
    if (storedDictionaryData.length > 0) {
      setAllDictionaryData(storedDictionaryData);
      let filteredDictionary = storedDictionaryData.filter((dict) => {
        return dict.dictId === dictId;
      });
      let pageDictionaryObject = filteredDictionary[0];
      if (pageDictionaryObject) {
        setDictWords(pageDictionaryObject.words);
        setDictData(pageDictionaryObject);
      } else {
        console.log("Not found");
        navigate("/notfound");
      }
    }
  }, [dictId, storedDictionaryData, navigate]);

  useEffect(() => {
    setUserId(uid);
  }, [uid]);

  const handleNewWordModalOn = () => {
    console.log("handling");
    setNewWordOpen(true);
  };

  const handleCloseWord = () => {
    setNewWordOpen(false);
  };

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
          <StyledBreadcrumb
            label={
              dictData
                ? `${dictData.firstLang}-${dictData.secondLang} words`
                : null
            }
          />
        </Breadcrumbs>

        <NewWordModal
          handleCloseWord={handleCloseWord}
          newWordOpen={newWordOpen}
          data={dictData}
          userId={userId}
          userDictionaries={allDictionaryData}
          setNewWordAlertOpen={setNewWordAlertOpen}
          setWordErrorOpen={setWordErrorOpen}
        />
        <Divider />
        <Box>
          <Stack spacing={1}>
            {dictWords.map((wordData, index) => (
              <Word
                key={`word${index}`}
                wordData={wordData}
                dictId={dictId}
                userId={uid}
                allDictionaryData={allDictionaryData}
                setDeleteWordAlertOpen={setDeleteWordAlertOpen}
                setWordErrorOpen={setWordErrorOpen}
              />
            ))}
          </Stack>
        </Box>

        {dictWords.length === 0 ? "No words" : null}
        <Box>
          <Button
            onClick={handleNewWordModalOn}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="secondary"
          >
            Add a new word
          </Button>
        </Box>
      </Container>
      <WordlistSnackbars
        handleCloseAlert={handleCloseAlert}
        deleteWordAlertOpen={deleteWordAlertOpen}
        newWordAlertOpen={newWordAlertOpen}
        wordErrorOpen={wordErrorOpen}
      />
    </Box>
  );
}
