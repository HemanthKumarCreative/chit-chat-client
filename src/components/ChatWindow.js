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

const ChatWindow = ({ messages, userId, groupInfo }) => {
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
          />
        </Box>
      </Box>
      <Box sx={{ overflowY: "auto", height: "65vh" }}>
        <Grid container spacing={2}>
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
                  <Typography variant="body1">{messageInfo.message}</Typography>
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
