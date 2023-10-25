import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import ChatWindow from "./ChatWindow";
import MessageInput from "./MessageInput";
import axios from "axios";
import content from "../assets/content.json";

const ChatScreen = ({ userId, groupId, userName }) => {
  const [messages, setMessages] = useState([]);
  const { URL } = content;
  const [groupInfo, setGroupInfo] = useState({});

  const handleSendMessage = (message) => {
    setMessages([...messages, message]);
  };

  useEffect(() => {
    const fetchGroupInfo = async () => {
      if (groupId !== undefined) {
        try {
          const response = await axios.get(`${URL}/api/groups/g/${groupId}`);
          if (response.statusText === "OK") {
            const groupInfo = await response.data;
            setGroupInfo(groupInfo);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    const fetchAllchats = async () => {
      try {
        const response = await axios.get(`${URL}/api/messages/${groupId}`);
        if (response.statusText === "OK") {
          const { data } = response;
          setMessages(data);
        } else {
          console.error("Internal Server Error");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchGroupInfo();
    fetchAllchats();
  }, [groupId, URL]);

  return (
    <Container maxWidth="lg" style={{ paddingTop: "16px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <ChatWindow
            messages={messages}
            userId={userId}
            groupId={groupId}
            groupInfo={groupInfo}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <MessageInput
            onSendMessage={handleSendMessage}
            userId={userId}
            userName={userName}
            groupInfo={groupInfo}
            groupId={groupId}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChatScreen;
