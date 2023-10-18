import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, AppBar, Toolbar, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ChatScreen from "../components/ChatScreen";
import axios from "axios";

function ChatDetailedPage() {
  const { groupId } = useParams();
  const [groupInfo, setGroupInfo] = useState({});
  const [userInfo, setUserInfo] = useState(JSON.parse(Cookies.get("userInfo")));
  const navigate = useNavigate();

  const fetchGroupInfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/groups/g/${groupId}`
      );
      console.log(response);
      setGroupInfo(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBack = () => {
    navigate("/Home");
  };

  useEffect(() => {
    fetchGroupInfo();
  }, []);

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {`Welcome ${userInfo.name}`}
          </Typography>
          <Button color="inherit" onClick={handleBack}>
            Back
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 14 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {groupInfo.name}
        </Typography>
        <ChatScreen
          groupInfo={groupInfo}
          groupId={groupId}
          userInfo={userInfo}
        />
      </Container>
    </div>
  );
}

export default ChatDetailedPage;
