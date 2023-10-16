import React, { useState } from "react";
import { TextField, IconButton, Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

const MessageInput = ({ onSendMessage, userInfo, fetchAllchats }) => {
  const [messageObj, setMessage] = useState({});

  const handleSend = async () => {
    if (messageObj.message.trim() !== "") {
      messageObj.user = userInfo.name;
      onSendMessage(messageObj);
      try {
        const response = await axios.post("http://localhost:5000/api/chats", {
          ...messageObj,
        });
        console.log(response);
        fetchAllchats();
      } catch (err) {
        console.error(err);
      }
      setMessage({ message: "", user: "" });
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={10}>
        <TextField
          fullWidth
          variant="outlined"
          value={messageObj.message}
          onChange={(e) =>
            setMessage({ ...messageObj, message: e.target.value })
          }
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
      </Grid>
      <Grid item xs={2}>
        <IconButton onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default MessageInput;
