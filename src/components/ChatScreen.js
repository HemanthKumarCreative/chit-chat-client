import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import ChatWindow from "./ChatWindow";
import MessageInput from "./MessageInput";
import axios from "axios";
import Cookies from "js-cookie";

const ChatScreen = ({ groupInfo, groupId }) => {
  const [messages, setMessages] = useState([]);
  const userInfo = JSON.parse(Cookies.get("userInfo"));

  const handleSendMessage = (message) => {
    setMessages([...messages, message]);
  };

  const fetchAllchats = async () => {
    try {
      const response = await axios(
        `http://localhost:5000/api/chats/${groupId}`
      );
      console.log(response);
      if (response.status === 200) {
        setMessages(response.data);
      } else {
        console.error("Internal Server Error");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllchats();
  }, []);
  return (
    <Container maxWidth="lg" style={{ paddingTop: "16px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <ChatWindow messages={messages} />
        </Grid>
        <Grid item xs={12} md={12}>
          <MessageInput
            onSendMessage={handleSendMessage}
            userInfo={userInfo}
            fetchAllchats={fetchAllchats}
            groupInfo={groupInfo}
            groupId={groupId}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChatScreen;
