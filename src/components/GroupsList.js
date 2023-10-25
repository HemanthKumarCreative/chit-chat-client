import React, { useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import content from "../assets/content.json";

const GroupsList = ({ groups, setGroups, userId }) => {
  const { URL } = content;
  const navigate = useNavigate();

  const loadToHomePAge = () => {
    navigate("/home");
  };

  const openTheGroup = (groupId) => {
    navigate(`/group-detailed-page/${groupId}`);
  };

  useEffect(() => {
    const fetchGroups = async (userId) => {
      try {
        const response = await axios.get(`${URL}/api/groups/u/${userId}`);
        if (response?.statusText === "OK") {
          const groups = await response.data;
          setGroups([...groups, groups]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchGroups(userId);
  }, [userId, URL, setGroups]);

  return (
    <Drawer variant="permanent" anchor="left">
      <List
        sx={{ backgroundColor: "#d7d4ec66", minHeight: "97vh", width: "25rem" }}
      >
        <ListItemButton
          sx={{
            marginBottom: "10px",
            width: "100%",
          }}
          key="1234"
        >
          <Button
            variant="contained"
            fullWidth
            onClick={loadToHomePAge}
            color="success"
          >
            <ListItemText
              primary="Chit Chat Groups"
              sx={{
                maxWidth: "20rem",
                overflowWrap: "break-word",
              }}
            />
          </Button>
        </ListItemButton>
        {groups
          ?.filter((group) => group.groupId !== undefined)
          ?.map((group) => (
            <ListItemButton
              sx={{
                marginBottom: "10px",
                width: "100%",
              }}
              key={group?.groupId}
            >
              <Button
                variant="outlined"
                fullWidth
                onClick={() => openTheGroup(group?.groupId)}
                color="success"
              >
                <ListItemText
                  primary={group?.groupName}
                  sx={{
                    maxWidth: "20rem", // Set maximum width
                    overflowWrap: "break-word", // Enable word wrapping
                    textTransform: "capitalize",
                  }}
                />
              </Button>
            </ListItemButton>
          ))}
      </List>
    </Drawer>
  );
};

export default GroupsList;
