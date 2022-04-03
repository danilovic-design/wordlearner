import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Word from "./word/Word";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Link as BrowserLink } from "react-router-dom";
import { DataContext } from "../../contexts/Datacontext";
import { AuthContext } from "../../contexts/Authcontext";
import Box from "@mui/material/Box";
import NewWordModal from "../dictionaries/dictionary/newwordmodal/Newwordmodal";

export default function Words() {
  const { dictId } = useParams();
  const { storedDictionaryData } = useContext(DataContext);
  const { uid } = useContext(AuthContext);
  const [userId, setUserId] = useState(null);
  const [dictWords, setDictWords] = useState([]);
  const [dictData, setDictData] = useState({});
  const [allDictionaryData, setAllDictionaryData] = useState();
  const [newWordOpen, setNewWordOpen] = useState(false);
  const navigate = useNavigate();

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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={BrowserLink} underline="hover" color="inherit" to="/">
          Dictionaries
        </Link>
        <Typography color="text.primary">
          {dictData
            ? `${dictData.firstLang}-${dictData.secondLang} words`
            : null}
        </Typography>
      </Breadcrumbs>
      <NewWordModal
        handleCloseWord={handleCloseWord}
        newWordOpen={newWordOpen}
        data={dictData}
        userId={userId}
        userDictionaries={allDictionaryData}
      />
      <Divider />
      <Box>
        {dictWords.map((wordData, index) => (
          <Word
            key={`word${index}`}
            wordData={wordData}
            dictId={dictId}
            userId={uid}
            allDictionaryData={allDictionaryData}
          />
        ))}
      </Box>

      {dictWords.length === 0 ? "No words" : null}
      <Box>
        <Button
          onClick={handleNewWordModalOn}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Add a new word
        </Button>
      </Box>
    </Container>
  );
}
