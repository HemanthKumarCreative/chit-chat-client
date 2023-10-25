import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import axios from "axios";
import content from "../assets/content.json";

const InvitationCard = ({
  groupName,
  invitationId,
  fetchInvitations,
  userId,
  groupId,
  userName,
  setGroups,
}) => {
  const { URL } = content;

  const updateJoiningMessage = async () => {
    const message = {
      groupId,
      senderId: userId,
      senderName: userName,
      message: `${userName} joined the group`,
    };
    try {
      const response = await axios.post(
        `${URL}/api/messages/${groupId}`,
        message
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const updateGroupMembers = async () => {
    try {
      const response = await axios.put(`${URL}/api/groups/g/${groupId}`, {
        userId,
        role: "member",
      });
      console.log({ response });
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserGroups = async () => {
    try {
      const response = await axios.put(`${URL}/api/users/update-user-groups`, {
        userId,
        groupId,
      });
      if (response?.statusText === "OK") {
        const message = await response?.data?.message;
        console.log({ message });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await axios.get(`${URL}/api/groups/u/${userId}`);
      if (response?.statusText === "OK") {
        const groups = await response.data;
        console.log({ groups });
        setGroups(groups);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = async () => {
    try {
      const response = await axios.put(
        `${URL}/api/invitations/${invitationId}`,
        { invitationStatus: "accepted" }
      );
      if (response.statusText === "OK") {
        const invitationStatus = response.data;
        console.log(invitationStatus);
        await fetchInvitations();
        await updateGroupMembers();
        await updateUserGroups();
        await updateJoiningMessage();
        await fetchGroups();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async () => {
    try {
      const response = await axios.put(
        `${URL}/api/invitations/${invitationId}`,
        { invitationStatus: "rejected" }
      );
      if (response.statusText === "OK") {
        const invitationStatus = response.data;
        console.log(invitationStatus);
        fetchInvitations();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ marginBottom: 1 }}>
          {groupName}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: 2 }}
        >
          Group Count: 10
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Button variant="outlined" color="success" onClick={handleAccept}>
              Accept
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="secondary" onClick={handleReject}>
              Reject
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default InvitationCard;
