import React, { useState } from "react";
import { Button, Container, AppBar, Toolbar, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatScreen from "../components/ChatScreen";

axios.defaults.headers.post["Content-Type"] = "application/json";

export default function CustomizedAccordions() {
  const [userInfo, setUserInfo] = useState(JSON.parse(Cookies.get("userInfo")));
  const navigate = useNavigate();

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

          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 14 }}>
        <ChatScreen userInfo={userInfo} />
      </Container>
    </div>
  );
}
