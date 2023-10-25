import React, { useState } from "react";
import { Container, Typography, Box, Button, TextField } from "@mui/material";
import axios from "axios";
import content from "../assets/content.json";
axios.defaults.headers.post["Content-Type"] = "application/json";
function CreateNewGroup({ userId, setGroups, groups }) {
  const [groupName, setGroupName] = useState("");
  const { URL } = content;
  const handleInputChange = (e) => {
    setGroupName(e.target.value);
  };

  const updateUser = async (userId, groupId) => {
    try {
      const response = await axios.put(`${URL}/api/users/update-user-groups`, {
        userId,
        groupId,
      });
      if (response?.statusText === "OK") {
        const message = await response?.data?.message;
        console.log({ message });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    const group = { groupName, groupMembers: [], groupAdmins: [userId] };
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}/api/groups`, { ...group });
      if (response?.statusText === "Created") {
        const createGroup = await response.data;
        setGroups([...groups, createGroup]);
        const { groupId } = createGroup;
        updateUser(userId, groupId);
      }
    } catch (error) {
      console.log(error);
    }
    setGroupName("");
  };

  return (
    <Container sx={{ marginTop: 1 }}>
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{
          backgroundColor: "whitesmoke",
          padding: "1rem",
          color: "#4caf50",
        }}
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
            sx={{
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#4caf50", // Change label color to green when focused
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#4caf50",
                },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="success"
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
