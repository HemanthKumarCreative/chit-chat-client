import React, { useState } from "react";
import { Button, Modal, Box, TextField } from "@mui/material";

const CreateGroupModal = ({ open, handleClose, handleCreate }) => {
  const [groupName, setGroupName] = useState("");

  const handleInputChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleCreateClick = () => {
    // Call the create group function and pass the group name
    handleCreate(groupName);
    // Reset the input field
    setGroupName("");
    // Close the modal
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <TextField
          label="Group Name"
          variant="outlined"
          fullWidth
          value={groupName}
          onChange={handleInputChange}
          mb={2}
        />
        <Button variant="contained" color="primary" onClick={handleCreateClick}>
          Create
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateGroupModal;
