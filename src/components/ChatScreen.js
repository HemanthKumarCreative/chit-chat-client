import React, { useState } from "react";
import { Container, Grid } from "@mui/material";
import ChatWindow from "./ChatWindow";
import MessageInput from "./MessageInput";

const ChatScreen = ({ userInfo }) => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <Container maxWidth="lg" style={{ paddingTop: "16px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <ChatWindow messages={messages} />
        </Grid>
        <Grid item xs={12} md={12}>
          <MessageInput onSendMessage={handleSendMessage} userInfo={userInfo} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChatScreen;
