import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Card from "@mui/material/Card";
import ChangeWordModal from "./changewordmodal/Changewordmodal";
import DeleteWordModal from "./confirmdeleteword/Confirmdeleteword";

export default function Word({ wordData, userId, dictId, allDictionaryData }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [changeWordOpen, setChangeWordOpen] = React.useState(false);
  const handleChangeWord = () => setChangeWordOpen(true);
  const handleCloseChangeWord = () => setChangeWordOpen(false);
  //handleCloseDeletion, confirmDeletion
  const [confirmDeletion, setConfirmDeletion] = React.useState(false);
  const handleConfirmDeletion = () => setConfirmDeletion(true);
  const handleCloseDeletion = () => setConfirmDeletion(false);
  return (
    <Card>
      <Grid container>
        <Grid item xs={11}>
          <Box>{wordData.firstLang}</Box>
          <Box>{wordData.secondLang}</Box>
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={handleMenu} aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        </Grid>
      </Grid>

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
            handleChangeWord();
          }}
        >
          Modify word
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleConfirmDeletion();
          }}
        >
          Delete word
        </MenuItem>
      </Menu>
      <ChangeWordModal
        changeWordOpen={changeWordOpen}
        handleCloseChangeWord={handleCloseChangeWord}
        wordData={wordData}
        dictId={dictId}
        userId={userId}
        allDictionaryData={allDictionaryData}
      ></ChangeWordModal>
      <DeleteWordModal
        handleCloseDeletion={handleCloseDeletion}
        confirmDeletion={confirmDeletion}
        wordData={wordData}
        userId={userId}
        dictId={dictId}
        allDictionaryData={allDictionaryData}
        firstLang={wordData.firstLang}
      ></DeleteWordModal>
    </Card>
  );
}
