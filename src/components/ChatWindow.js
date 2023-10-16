import React from "react";
import { Paper, Typography } from "@mui/material";

const ChatWindow = ({ messages }) => {
  return (
    <Paper
      elevation={3}
      style={{
        minHeight: "65vh",
        maxHeight: "65vh",
        overflowY: "auto",
        padding: "16px",
      }}
    >
      {messages.map((message, index) => (
        <div key={index} style={{ marginBottom: "8px" }}>
          <Typography variant="body1">{`${message.user} : ${message.message}`}</Typography>
        </div>
      ))}
    </Paper>
  );
};

export default ChatWindow;
