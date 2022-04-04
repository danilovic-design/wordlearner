import * as React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import ConfirmDeleteDictionary from "./confirmdeletedictionary/Confirmdeletedictionary";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NewWordModal from "./newwordmodal/Newwordmodal";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function Dictionary({
  data,
  dict2delete,
  handleCloseAlert,
  handleCloseDeletion,
  handleCloseWord,
  handleConfirmDeletion,
  handleOpenWord,
  confirmDeletion,
  setDict2delete,
  newWordOpen,
  newWordAlertOpen,
  setDictionaryErrorOpen,
  setNewWordAlertOpen,
  setDeleteDictionaryAlertOpen,
  userDictionaries,
  userId,
}) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Card>
        <CardHeader
          action={
            <IconButton onClick={handleMenu} aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={`${data.firstLang} - ${data.secondLang}`}
          subheader={`Contains ${data.words.length} words`}
          titleTypographyProps={{ variant: "h6" }}
        />
        <CardActions disableSpacing>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={6}
          >
            <Chip
              label="Add a new word"
              onClick={handleOpenWord}
              variant="outlined"
              icon={<AddCircleIcon />}
            />
            <Chip
              label="Start a word test"
              onClick={() => navigate(`/test/${data.dictId}`)}
              icon={<PlayCircleFilledWhiteIcon />}
            />
          </Stack>
        </CardActions>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              navigate(`/dictionary/${data.dictId}`);
            }}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <Typography variant="inherit">Show/modify words</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              setDict2delete(data.dictId);
              handleConfirmDeletion();
            }}
          >
            <ListItemIcon>
              <DeleteForeverIcon />
            </ListItemIcon>
            <Typography variant="inherit">Delete dictionary</Typography>
          </MenuItem>
        </Menu>
      </Card>

      <ConfirmDeleteDictionary
        confirmDeletion={confirmDeletion}
        dict2delete={dict2delete}
        handleCloseDeletion={handleCloseDeletion}
        setDict2delete={setDict2delete}
        setDictionaryErrorOpen={setDictionaryErrorOpen}
        setDeleteDictionaryAlertOpen={setDeleteDictionaryAlertOpen}
        userDictionaries={userDictionaries}
        userId={userId}
      />

      <NewWordModal
        data={data}
        handleCloseWord={handleCloseWord}
        newWordOpen={newWordOpen}
        userId={userId}
        userDictionaries={userDictionaries}
        handleCloseAlert={handleCloseAlert}
        newWordAlertOpen={newWordAlertOpen}
        setWordErrorOpen={setDictionaryErrorOpen}
        setNewWordAlertOpen={setNewWordAlertOpen}
      />
    </Box>
  );
}
