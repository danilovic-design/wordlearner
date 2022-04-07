import * as React from "react";
import { landingBoxStyle } from "../../styles/Main";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckIcon from "@mui/icons-material/Check";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { PAGEROOT } from "../../database/deploy";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <Box sx={landingBoxStyle} pt={5} pb={3} pl={2} pr={2}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Demo>
          <Box pt={2} pb={4} pl={2} pr={2}>
            <Box>
              <Typography mt={2} mb={1} variant="h4" align="center">
                Wordlearner
              </Typography>
              <Typography align="center" mb={2}>
                Your personal dictionary-booklet
              </Typography>
            </Box>
            <Box>
              <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={9}>
                  <List dense={true}>
                    <ListItem>
                      <ListItemIcon>
                        <CheckIcon />
                      </ListItemIcon>
                      <ListItemText primary="Take notes of your newly learned words" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckIcon />
                      </ListItemIcon>
                      <ListItemText primary="Learn more languages at once" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckIcon />
                      </ListItemIcon>
                      <ListItemText primary="Test your knowledge" />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
              <Grid item xs={1}></Grid>
            </Box>
            <Box pt={3} pb={2}>
              <Button
                onClick={() => {
                  navigate(`${PAGEROOT}login`);
                }}
                variant="contained"
                color="secondary"
                fullWidth
              >
                Login
              </Button>
            </Box>
          </Box>
        </Demo>
      </Container>
    </Box>
  );
}
