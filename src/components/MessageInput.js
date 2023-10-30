import React, { useState } from "react";
import { TextField, IconButton, Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import content from "../assets/content.json";
import FilePicker from "./FilePicker";

const MessageInput = ({
  onSendMessage,
  userId,
  userName,
  groupId,
  setSelectedFilePath,
  selectedFilePath,
  setSelectedFile,
  selectedFile,
  setFileToUpload,
  fileToUpload,
}) => {
  const [messageInfo, setMessageInfo] = useState({});
  const { URL } = content;

  const handleFileSelected = (filePath, file, fileToUpload) => {
    setSelectedFilePath(filePath);
    setSelectedFile(file);
    setFileToUpload(fileToUpload);
  };

  const handleSendFile = async (fileToUpload) => {
    const text = "Hello";
    const formData = new FormData();
    formData.append("text", text);
    formData.append("file", fileToUpload);
    axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

    try {
      const response = await axios.post(`${URL}/api/attachments`, formData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSend = async () => {
    const messageText = messageInfo?.message?.trim();
    if (messageText !== "" && messageText !== undefined) {
      messageInfo.senderName = userName;
      messageInfo.senderId = userId;
      messageInfo.groupId = groupId;
    }

    if (selectedFilePath) {
      handleSendFile(fileToUpload);
    }
  };

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={8}>
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
      <Grid item xs={1}>
        <FilePicker onFileSelected={handleFileSelected} />
      </Grid>
      <Grid item xs={3}>
        <IconButton onClick={() => handleSend()} color="success">
          <SendIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default MessageInput;
