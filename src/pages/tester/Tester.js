import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
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
  const [allDictionaryData, setAllDictionaryData] = React.useState([]);
  const [defaultDirection, setDefaultDirection] = React.useState(true);
  const [randomNumber, setRandomNumber] = React.useState(0);

  const getRandomNumber = React.useCallback(() => {
    let maxWords = wordList.length;
    let createdRandomNumber = Math.floor(Math.random() * maxWords);
    if (maxWords > 1) {
      while (createdRandomNumber === randomNumber) {
        createdRandomNumber = Math.floor(Math.random() * maxWords);
      }
    }
    console.log("random number is", createdRandomNumber);
    setRandomNumber(createdRandomNumber);
  });

  /*const getRandomWord = React.useCallback(() => {
    getRandomNumber();
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
  });*/

  React.useEffect(() => {
    setAllDictionaryData(storedDictionaryData);
  }, [storedDictionaryData]);

  React.useEffect(() => {
    if (allDictionaryData.length > 0) {
      let filteredDictionary = allDictionaryData.filter((dict) => {
        return dict.dictId === dictId;
      });
      setDictData(filteredDictionary[0]);
      setWordList(filteredDictionary[0].words);
      console.log("Stored dictionary data is now set");
      //getRandomNumber();
      //getRandomWord();
    } else {
      console.log("Stored dictionary data is empty");
    }
  }, [allDictionaryData, dictId]);

  React.useEffect(() => {
    getRandomNumber();
  }, [wordList]);

  const handleSwapDirections = () => {
    defaultDirection ? setDefaultDirection(false) : setDefaultDirection(true);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} underline="hover" color="inherit" to="/">
          Dictionaries
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
        {wordList.length > 0 ? (
          <TestCard
            expanded={expanded}
            handleExpandClick={handleExpandClick}
            dictId={dictId}
            allDictionaryData={allDictionaryData}
            userId={uid}
            wordList={wordList}
            getRandomNumber={getRandomNumber}
            randomNumber={randomNumber}
            defaultDirection={defaultDirection}
          />
        ) : (
          "No words in the dictionary"
        )}
      </Box>
    </Container>
  );
}
