import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Container,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import GroupsIcon from "@mui/icons-material/Groups";
import UserListModal from "./Users";

function getDateFromISOString(isoString) {
  const dateObject = new Date(isoString);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(dateObject.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getTimeFromISOString(isoString) {
  const dateObject = new Date(isoString);
  let hours = dateObject.getHours();
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");
  const seconds = String(dateObject.getSeconds()).padStart(2, "0");
  const period = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12 || 12; // Convert 0 to 12

  return `${hours}:${minutes}:${seconds} ${period}`;
}

const ChatWindow = ({
  messages,
  userId,
  groupInfo,
  setGroupInfo,
  setGroups,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const { groupMembers, groupAdmins, groupName, groupId } = groupInfo;

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Container sx={{ marginTop: 1 }}>
      <Box
        sx={{
          backgroundColor: "whitesmoke",
          padding: "1rem",
          color: "#4caf50",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          {groupName}
        </Typography>
        <Box
          sx={{
            backgroundColor: "#bcddd2",
            width: "3rem",
            padding: "0.5rem",
            color: "#4caf50",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            aria-label="people"
            color="success"
            onClick={handleOpenModal}
          >
            <GroupsIcon />
          </IconButton>
          <UserListModal
            open={openModal}
            handleClose={handleCloseModal}
            members={groupMembers}
            admins={groupAdmins}
            groupName={groupName}
            groupId={groupId}
            senderId={userId}
            setGroupInfo={setGroupInfo}
            setGroups={setGroups}
          />
        </Box>
      </Box>
      <Box sx={{ overflowY: "auto", height: "65vh" }}>
        <Grid container spacing={1}>
          {messages.map((messageInfo) => (
            <Grid item xs={12} key={messageInfo.messageId}>
              <Card
                sx={{
                  maxWidth: "40%",
                  marginLeft: messageInfo.senderId === userId ? "auto" : 0,
                  backgroundColor:
                    messageInfo.senderId !== userId ? "#E0E0E0" : "#DCF8C6",
                }}
              >
                <CardContent>
                  {userId !== messageInfo.senderId && (
                    <Typography
                      variant="body1"
                      color="error"
                      sx={{ padding: 0 }}
                    >
                      {messageInfo.senderName}
                    </Typography>
                  )}
                  <Typography variant="body3" sx={{ padding: 0 }}>
                    {messageInfo.message}
                  </Typography>
                </CardContent>
                <CardContent
                  sx={{
                    paddingTop: 0,
                    textAlign: "right",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="caption" sx={{ padding: 0 }}>
                    {getDateFromISOString(messageInfo.updatedAt)}
                  </Typography>
                  <Typography variant="caption" sx={{ padding: 0 }}>
                    {getTimeFromISOString(messageInfo.updatedAt)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ChatWindow;
