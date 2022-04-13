import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Word from "./word/Word";
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
import { PAGEROOT } from "../../database/deploy";
import WordSearchbar from "./wordsearchbar/Wordsearchbar";
import { getFilteredWordlist } from "./functions/wordlistfunctions";

export default function Words() {
  const { dictId } = useParams();
  const { storedDictionaryData } = useContext(DataContext);
  const { uid } = useContext(AuthContext);
  const [userId, setUserId] = useState(null); /** @returns {String} */
  const [dictWords, setDictWords] = useState([]);
  const [dictData, setDictData] = useState({});
  const [allDictionaryData, setAllDictionaryData] = useState();
  const [newWordOpen, setNewWordOpen] = useState(false);
  const [newWordAlertOpen, setNewWordAlertOpen] = useState(false);
  const [deleteWordAlertOpen, setDeleteWordAlertOpen] = useState(false);
  const [wordErrorOpen, setWordErrorOpen] = useState(false);
  const [filteredWordlist, setFilteredWordlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Getting the current dictionary from more dictionaries
    if (storedDictionaryData.length > 0) {
      setAllDictionaryData(storedDictionaryData);
      let dictionaryForTheCurrentLanguage = storedDictionaryData.filter(
        (dict) => {
          return dict.dictId === dictId;
        }
      );
      let currentLanguage = dictionaryForTheCurrentLanguage[0];
      if (currentLanguage) {
        setDictWords(currentLanguage.words);
        setFilteredWordlist(currentLanguage.words);
        setDictData(currentLanguage);
      } else {
        navigate(`${PAGEROOT}notfound`);
      }
    }
  }, [dictId, storedDictionaryData, navigate]);

  useEffect(() => {
    setUserId(uid);
  }, [uid]);

  const handleCloseAlert = () => {
    setNewWordAlertOpen(false);
    setDeleteWordAlertOpen(false);
  };

  const handleNewWordModalOn = () => {
    console.log("handling");
    setNewWordOpen(true);
  };

  const handleCloseWord = () => {
    setNewWordOpen(false);
  };

  const handleSearchChange = (changeEvent) => {
    setFilteredWordlist(
      getFilteredWordlist(dictWords, changeEvent.target.value)
    );
  };

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
        <WordSearchbar handleSearchChange={handleSearchChange} />

        <Box>
          <Stack spacing={1}>
            {filteredWordlist.map((wordData, index) => (
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

        {dictWords.length === 0
          ? "There are no words in this dictionary yet."
          : null}
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
