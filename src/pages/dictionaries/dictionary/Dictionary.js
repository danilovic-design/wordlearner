import * as React from "react";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { CardHeader, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

export default function Dictionary({ handleOpenWord, handleConfirmDeletion }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card>
      <CardHeader
        action={
          <IconButton onClick={handleMenu} aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Magyar - Svéd"
        subheader="Contains 125 words"
      />
      <CardActions>
        <Button size="small" onClick={handleOpenWord}>
          Add a new word
        </Button>
        <Button size="small">Start a test</Button>
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
            navigate("/dictionary");
          }}
        >
          Show/modify words
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleConfirmDeletion();
          }}
        >
          Delete dictionary
        </MenuItem>
      </Menu>
    </Card>
  );
}
