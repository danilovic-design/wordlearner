import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteWord } from "../../../database/dbfunctions";
import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Chip from "@mui/material/Chip";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  // marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function TestCard({
  expanded,
  handleExpandClick,
  dictId,
  allDictionaryData,
  userId,
  wordList,
  randomNumber,
  getRandomNumber,
  defaultDirection,
}) {
  const handleDeleteWordSubmit = () => {
    let payload = {
      dictId: dictId,
      userId: userId,
      wordData: wordList[randomNumber],
      userDictionaries: allDictionaryData,
    };
    deleteWord(payload).then(() => {
      console.log("New dictionary submit");
    });
  };

  return (
    <Card sx={{ paddingTop: "5px" }}>
      <CardHeader
        action={
          <IconButton onClick={handleDeleteWordSubmit} aria-label="settings">
            <DeleteIcon />
          </IconButton>
        }
        title={
          defaultDirection
            ? wordList[randomNumber].firstLang
            : wordList[randomNumber].secondLang
        }
      />

      <CardActions disableSpacing={true} sx={{ justifyContent: "flex-end" }}>
        <Typography variant="subtitle2" component="div" sx={{ color: "grey" }}>
          Click for hint
        </Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {defaultDirection
              ? wordList[randomNumber].secondLang
              : wordList[randomNumber].firstLang}
          </Typography>
        </CardContent>
      </Collapse>
      <Box mb={1} mr={1} sx={{ textAlign: "right" }}>
        <Chip
          onClick={getRandomNumber}
          icon={<CheckCircleIcon />}
          label="Guessed it"
          color="success"
        />
      </Box>
    </Card>
  );
}
