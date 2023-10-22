import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";

const GroupsList = () => {
  const navigate = useNavigate();

  const loadToHomePAge = () => {
    navigate("/home");
  };

  const openTheGroup = () => {
    navigate("/group-detailed-page/ugfhgf");
  };
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
        >
          <Button variant="contained" fullWidth onClick={loadToHomePAge}>
            <ListItemText
              primary="Chit Chat"
              sx={{
                maxWidth: "20rem",
                overflowWrap: "break-word",
              }}
            />
          </Button>
        </ListItemButton>
        <ListItemButton
          sx={{
            marginBottom: "10px",
            width: "100%",
          }}
        >
          <Button variant="outlined" fullWidth onClick={openTheGroup}>
            <ListItemText
              primary="Vande barath momentum of Indian constitution is great"
              sx={{
                maxWidth: "20rem", // Set maximum width
                overflowWrap: "break-word", // Enable word wrapping
              }}
            />
          </Button>
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default GroupsList;
