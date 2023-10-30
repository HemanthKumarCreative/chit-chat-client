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

  const handleSend = async () => {
    let formData = new FormData();
    axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

    messageInfo.senderName = userName;
    messageInfo.senderId = userId;
    messageInfo.groupId = groupId;
    messageInfo.attachmentType = selectedFile;
    formData.append("message", JSON.stringify(messageInfo));
    formData.append("file", fileToUpload);

    try {
      const response = await axios.post(
        `${URL}/api/messages/${groupId}`,
        formData
      );
      if (response.statusText === "Created") {
        const messageSent = await response.data;
        await onSendMessage(messageSent);
        setMessageInfo({ message: "", senderName: "" });
        console.log(messageSent);
        formData = new FormData();
        setSelectedFilePath(null);
        setSelectedFile(null);
        setFileToUpload(null);
      }
    } catch (err) {
      console.error(err);
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
