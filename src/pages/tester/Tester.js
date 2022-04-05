import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import { useParams, useNavigate } from "react-router-dom";
import { DataContext } from "../../contexts/Datacontext";
import TestCard from "./testcard/Testcard";
import { AuthContext } from "../../contexts/Authcontext";
import Box from "@mui/material/Box";
import { BreadCrumbTypographyStyle } from "../../styles/Main";
import { mainBoxStyle } from "../../styles/Main";
import { StyledBreadcrumb } from "../../styles/StyledBreadcrumb";
import HomeIcon from "@mui/icons-material/Home";
import { PAGEROOT } from "../../database/deploy";

export default function Tester() {
  const navigate = useNavigate();
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
              dictData.firstLang
                ? `${dictData.firstLang} - ${dictData.secondLang} test`
                : null
            }
          />
        </Breadcrumbs>
        <Box>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={handleSwapDirections}
          >
            Swap languages
          </Button>
        </Box>
        <Box sx={{ paddingTop: "20px" }}>
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
    </Box>
  );
}
