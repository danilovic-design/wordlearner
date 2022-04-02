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
import { deleteWord } from "../../../database/dbfunctions";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function TestCard({
  expanded,
  handleExpandClick,
  servedFirst,
  getRandomWord,
  servedSecond,
  dictId,
  allDictionaryData,
  userId,
  wordData,
}) {
  const handleDeleteWordSubmit = () => {
    let payload = {
      dictId: dictId,
      userId: userId,
      wordData: wordData,
      userDictionaries: allDictionaryData,
    };
    deleteWord(payload).then(() => {
      console.log("New dictionary submit");
      getRandomWord();
    });
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <IconButton onClick={handleDeleteWordSubmit} aria-label="settings">
            <DeleteIcon />
          </IconButton>
        }
        title={`${servedFirst}`}
      />

      <CardActions disableSpacing>
        <Typography>Súgó</Typography>
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
          <Typography paragraph>{servedSecond}</Typography>
        </CardContent>
      </Collapse>
      <Button onClick={getRandomWord}>Guessed it</Button>
    </Card>
  );
}
