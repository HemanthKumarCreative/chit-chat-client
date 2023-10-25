import React, { useState } from "react";
import { TextField, IconButton, Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import content from "../assets/content.json";

const MessageInput = ({ onSendMessage, userId, userName, groupId }) => {
  const [messageInfo, setMessageInfo] = useState({});
  const { URL } = content;

  const handleSend = async () => {
    if (messageInfo.message.trim() !== "") {
      messageInfo.senderName = userName;
      messageInfo.senderId = userId;
      messageInfo.groupId = groupId;
      try {
        const response = await axios.post(`${URL}/api/messages/${groupId}`, {
          ...messageInfo,
        });
        if (response.statusText === "Created") {
          const messageSent = await response.data;
          onSendMessage(messageSent);
          setMessageInfo({ message: "", senderName: "" });
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={10}>
        <TextField
          fullWidth
          variant="outlined"
          value={messageInfo.message}
          onChange={(e) =>
            setMessageInfo({ ...messageInfo, message: e.target.value })
          }
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
      </Grid>
      <Grid item xs={2}>
        <IconButton onClick={() => handleSend()} color="success">
          <SendIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default MessageInput;
