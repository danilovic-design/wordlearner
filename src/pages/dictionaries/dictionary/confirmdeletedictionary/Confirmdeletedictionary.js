import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { deleteDict } from "../../../../database/dbfunctions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ConfirmDeleteDictionary({
  handleCloseDeletion,
  confirmDeletion,
  dict2delete,
  setDict2delete,
  userId,
  userDictionaries,
  setDeleteDictionaryAlertOpen,
  setDictionaryErrorOpen,
}) {
  // console.log("[+] - Confirm delete dictionary, userid", userId);

  const handleDeleteDict = () => {
    // console.log("Deleting", dict2delete);

    deleteDict(userDictionaries, dict2delete, userId)
      .then(() => {
        console.log("Then ok");
        setDict2delete("");
        setDeleteDictionaryAlertOpen(true);
        handleCloseDeletion();
        //   console.log("Dict is deleted");
      })
      .catch((err) => {
        console.log("Catch fired");
        console.log(err);
        setDictionaryErrorOpen(true);
        handleCloseDeletion();
      });
  };
  const handleGoBack = () => {
    setDict2delete("");
    handleCloseDeletion();
  };
  return (
    <div>
      <Modal
        open={confirmDeletion}
        onClose={handleCloseDeletion}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Do you really want to delete this dictionary?
          </Typography>

          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Button
              onClick={handleGoBack}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
            >
              Go back
            </Button>

            <Button
              onClick={handleDeleteDict}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="error"
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
