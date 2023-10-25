import React from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import InvitationCard from "./InvitationCard";

function InvitationList({ invitations, fetchInvitations, userName, socket }) {
  return (
    <Container sx={{ marginTop: 1 }}>
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{
          backgroundColor: "whitesmoke",
          padding: "1rem",
          color: "#4caf50",
        }}
      >
        Invitations to Join the Groups
      </Typography>
      <Box sx={{ overflowY: "auto", height: "70vh" }}>
        <Grid container spacing={2}>
          {invitations
            ?.filter((invitation) => invitation.invitationStatus === "pending")
            ?.map((invitation) => (
              <Grid item xs={12} md={6} lg={4}>
                <InvitationCard
                  key={invitation.invitationId}
                  groupName={invitation.groupName}
                  invitationId={invitation.invitationId}
                  fetchInvitations={fetchInvitations}
                  userId={invitation.recieverId}
                  groupId={invitation.groupId}
                  userName={userName}
                  socket={socket}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default InvitationList;
