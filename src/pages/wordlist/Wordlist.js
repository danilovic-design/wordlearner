import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Word from "./word/Word";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Link as BrowserLink } from "react-router-dom";
import { DataContext } from "../../contexts/Datacontext";
import { AuthContext } from "../../contexts/Authcontext";

export default function Words() {
  const navigate = useNavigate();
  const { dictId } = useParams();
  const { storedDictionaryData } = useContext(DataContext);
  const { uid } = useContext(AuthContext);
  const [dictWords, setDictWords] = useState([]);
  const [dictData, setDictData] = useState(null);
  const [allDictionaryData, setAllDictionaryData] = useState();

  useEffect(() => {
    if (storedDictionaryData.length > 0) {
      setAllDictionaryData(storedDictionaryData);
      let filteredDictionary = storedDictionaryData.filter((dict) => {
        return dict.dictId === dictId;
      });
      setDictWords(filteredDictionary[0].words);
      setDictData(filteredDictionary[0]);
    }
  }, [dictId, storedDictionaryData]);

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

      <Divider />
      {dictWords.map((wordData, index) => (
        <Word
          key={`word${index}`}
          wordData={wordData}
          dictId={dictId}
          userId={uid}
          allDictionaryData={allDictionaryData}
        />
      ))}

      {dictWords.length === 0 ? "No words" : null}

      <Button
        onClick={() => {
          navigate(-1);
        }}
        fullWidth
      >
        Back
      </Button>
    </Container>
  );
}
