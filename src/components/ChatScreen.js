import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import ChatWindow from "./ChatWindow";
import MessageInput from "./MessageInput";
import axios from "axios";

const ChatScreen = ({ userInfo }) => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message) => {
    setMessages([...messages, message]);
  };

  const fetchAllchats = async () => {
    try {
      const response = await axios("http://localhost:5000/api/chats");
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
    setInterval(() => fetchAllchats(), 1000);
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
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChatScreen;
