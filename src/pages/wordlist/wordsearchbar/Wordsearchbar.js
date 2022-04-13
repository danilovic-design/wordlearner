import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function WordSearchbar({ handleSearchChange }) {
  return (
    <Box
      sx={{
        width: "100%",
        paddingBottom: "25px",
      }}
    >
      <TextField
        fullWidth
        onChange={handleSearchChange}
        variant="filled"
        label="Search"
        id="fullWidth"
        color="secondary"
        size="small"
        sx={{ borderRadius: "10px" }}
      />
    </Box>
  );
}
