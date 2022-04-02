import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link as RouterLink, useParams } from "react-router-dom";
import { DataContext } from "../../contexts/Datacontext";
import TestCard from "./testcard/Testcard";
import { AuthContext } from "../../contexts/Authcontext";
import Box from "@mui/material/Box";

export default function Tester() {
  const { dictId } = useParams();
  const { storedDictionaryData } = React.useContext(DataContext);
  const { uid } = React.useContext(AuthContext);
  const [expanded, setExpanded] = React.useState(false);
  const [wordList, setWordList] = React.useState([]);
  const [dictData, setDictData] = React.useState({});
  const [allDictionaryData, setAllDictionaryData] = React.useState({});
  const [servedFirst, setServedFirst] = React.useState("");
  const [servedSecond, setServedSecond] = React.useState("");
  const [defaultDirection, setDefaultDirection] = React.useState(true);
  const [randomNumber, setRandomNumber] = React.useState(0);
  const [currentWord, setCurrentWord] = React.useState("");

  React.useEffect(() => {
    console.log("[+] - Tester useEffect run");
    console.log(storedDictionaryData);
    setAllDictionaryData(storedDictionaryData);
    if (storedDictionaryData.length > 0) {
      let filteredDictionary = storedDictionaryData.filter((dict) => {
        return dict.dictId === dictId;
      });
      setDictData(filteredDictionary[0]);
      console.log("Setting wordlist", filteredDictionary[0].words);
      setWordList(filteredDictionary[0].words);
      getRandomWord();
    }
  }, [storedDictionaryData, uid, wordList]);

  React.useEffect(() => {
    getRandomWord();
  }, [defaultDirection]);

  const getRandomNumber = () => {
    console.log("Getting a random number");
    let maxWords = wordList.length;
    let createdRandomNumber = Math.floor(Math.random() * maxWords);
    if (maxWords > 1) {
      while (createdRandomNumber === randomNumber) {
        createdRandomNumber = Math.floor(Math.random() * maxWords);
      }
    }
    setRandomNumber(createdRandomNumber);
  };

  const handleSwapDirections = () => {
    defaultDirection ? setDefaultDirection(false) : setDefaultDirection(true);
  };

  const getRandomWord = () => {
    console.log("Getting a random word");
    getRandomNumber();
    console.log(wordList);
    if (wordList.length > 0) {
      if (defaultDirection) {
        setServedFirst(wordList[randomNumber].firstLang);
        setServedSecond(wordList[randomNumber].secondLang);
      } else {
        setServedFirst(wordList[randomNumber].secondLang);
        setServedSecond(wordList[randomNumber].firstLang);
      }
      setCurrentWord(wordList[randomNumber]);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} underline="hover" color="inherit" to="/">
          My dictionaries
        </Link>
        <Link
          component={RouterLink}
          underline="hover"
          color="inherit"
          to={`/dictionary/${dictId}`}
        >
          {" "}
          {dictData.firstLang
            ? `${dictData.firstLang} - ${dictData.secondLang} dictionary`
            : null}
        </Link>
        <Typography color="text.primary">
          {dictData.firstLang
            ? `${dictData.firstLang} - ${dictData.secondLang} test`
            : null}
        </Typography>
      </Breadcrumbs>
      <Box>
        <Button onClick={handleSwapDirections}>Swap languages</Button>
      </Box>
      <Box>
        {servedFirst ? (
          <TestCard
            expanded={expanded}
            handleExpandClick={handleExpandClick}
            servedFirst={servedFirst}
            servedSecond={servedSecond}
            getRandomWord={getRandomWord}
            dictId={dictId}
            allDictionaryData={allDictionaryData}
            userId={uid}
            wordData={currentWord}
          />
        ) : (
          "No words in the dictionary"
        )}
      </Box>
    </Container>
  );
}
