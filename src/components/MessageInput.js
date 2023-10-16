import React, { useState } from "react";
import { TextField, IconButton, Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Cookies from "js-cookie";

const MessageInput = ({ onSendMessage, userInfo }) => {
  const [messageObj, setMessage] = useState({});

  const handleSend = () => {
    if (messageObj.message.trim() !== "") {
      messageObj.user = userInfo.name;
      onSendMessage(messageObj);
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
