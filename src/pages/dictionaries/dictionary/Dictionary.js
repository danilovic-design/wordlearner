import * as React from "react";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import ConfirmDeleteDictionary from "./confirmdeletedictionary/Confirmdeletedictionary";
import NewWordModal from "./newwordmodal/Newwordmodal";

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
}) {
  console.log("[+] - Dictionary, data", data);
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
        />
        <CardActions>
          <Button size="small" onClick={handleOpenWord}>
            Add a new word
          </Button>
          <Button size="small" onClick={() => navigate(`/test/${data.dictId}`)}>
            Start a test
          </Button>
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
      />

      <NewWordModal
        handleCloseWord={handleCloseWord}
        newWordOpen={newWordOpen}
        data={data}
        userId={userId}
        userDictionaries={userDictionaries}
      />
    </Box>
  );
}
