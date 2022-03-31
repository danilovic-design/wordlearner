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
import { Link as RouterLink } from "react-router-dom";

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

export default function Profile() {
  const [expanded, setExpanded] = React.useState(false);

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
          to="/dictionary"
        >
          Hungarian-Swedish dictionary
        </Link>
        <Typography color="text.primary">Hungarian-Swedish test</Typography>
      </Breadcrumbs>
      <Grid container>
        <Grid item>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              action={
                <IconButton aria-label="settings">
                  <DeleteIcon />
                </IconButton>
              }
              title="Shrimp and Chorizo Paella aflajekljk jljj ljklj jpo k"
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
                <Typography paragraph>
                  Heat 1/2 cup of the broth in a pot until simmering, add
                  saffron and set aside for 10 minutes.
                </Typography>
              </CardContent>
            </Collapse>
            <Button>Guessed it</Button>
          </Card>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </Container>
  );
}
