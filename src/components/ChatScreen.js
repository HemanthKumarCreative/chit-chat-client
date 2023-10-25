import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import ChatWindow from "./ChatWindow";
import MessageInput from "./MessageInput";
import axios from "axios";
import content from "../assets/content.json";
import io from "socket.io-client";

const ChatScreen = ({ userId, groupId, userName }) => {
  const [messages, setMessages] = useState([]);
  const { URL } = content;
  const [groupInfo, setGroupInfo] = useState({});
  const [socket, setSocket] = useState(null);

  const handleSendMessage = (message) => {
    setMessages([...messages, message]);
    socket.emit("message", message);
  };

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    newSocket.on("connect", () => {
      console.log("Connected to server");
      setSocket(newSocket);
    });

    newSocket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

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
