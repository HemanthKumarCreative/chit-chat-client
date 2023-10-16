import React, { useState, useEffect } from "react";
import { Button, Container, AppBar, Toolbar, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import CreateGroupModal from "../components/CreateGroupModal";
import GroupsListingTable from "../components/GroupsListingTable";

import axios from "axios";
// import ChatScreen from "../components/ChatScreen";

axios.defaults.headers.post["Content-Type"] = "application/json";
export default function CustomizedAccordions() {
  const [userInfo, setUserInfo] = useState(JSON.parse(Cookies.get("userInfo")));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groups, setGroups] = useState([]);

  const navigate = useNavigate();
  const fetchGroups = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/groups");
      setGroups(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchGroups();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateGroup = async (groupName) => {
    // Implement the logic to create the group here
    try {
      const response = await axios.post("http://localhost:5000/api/groups", {
        name: groupName,
        members: [],
      });
      console.log(response);
      fetchGroups();
    } catch (err) {
      console.error(err);
    }
    console.log(`Creating group with name: ${groupName}`);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userInfo");
    navigate("/");
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {`Welcome ${userInfo.name}`}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            Create Group
          </Button>
          <CreateGroupModal
            open={isModalOpen}
            handleClose={handleCloseModal}
            handleCreate={handleCreateGroup}
          />
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 14 }}>
        <GroupsListingTable groups={groups} />
      </Container>
    </div>
  );
}
