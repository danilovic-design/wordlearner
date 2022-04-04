import * as React from "react";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import ConfirmDeleteDictionary from "./confirmdeletedictionary/Confirmdeletedictionary";
import NewWordModal from "./newwordmodal/Newwordmodal";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";

export default function Dictionary({
  handleConfirmDeletion,
  data,
  setDict2delete,
  handleCloseDeletion,
  confirmDeletion,
  dict2delete,
  userDictionaries,
  userId,
  handleOpenWord,
  handleCloseWord,
  newWordOpen,
  newWordAlertOpen,
  handleCloseAlert,
  setDictionaryErrorOpen,
  setNewWordAlertOpen,
  setDeleteDictionaryAlertOpen,
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
            Show/modify words
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              setDict2delete(data.dictId);
              handleConfirmDeletion();
            }}
          >
            Delete dictionary
          </MenuItem>
        </Menu>
      </Card>

      <ConfirmDeleteDictionary
        handleCloseDeletion={handleCloseDeletion}
        confirmDeletion={confirmDeletion}
        dict2delete={dict2delete}
        setDict2delete={setDict2delete}
        userDictionaries={userDictionaries}
        userId={userId}
        setDictionaryErrorOpen={setDictionaryErrorOpen}
        setDeleteDictionaryAlertOpen={setDeleteDictionaryAlertOpen}
      />

      <NewWordModal
        handleCloseWord={handleCloseWord}
        newWordOpen={newWordOpen}
        data={data}
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
