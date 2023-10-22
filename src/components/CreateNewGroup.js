import React, { useState } from "react";
import { Container, Typography, Box, Button, TextField } from "@mui/material";

function CreateNewGroup() {
  const [groupName, setGroupName] = useState("");

  const handleInputChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission (e.g., sending data to server)
    console.log("Group Name:", groupName);
    // Reset the form
    setGroupName("");
  };
  return (
    <Container sx={{ marginTop: 1 }}>
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ backgroundColor: "whitesmoke", padding: "1rem" }}
      >
        Create a New Group
      </Typography>
      <Box
        sx={{
          overflowY: "auto",
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Group Name"
            variant="outlined"
            value={groupName}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
          >
            Create Group
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default CreateNewGroup;
