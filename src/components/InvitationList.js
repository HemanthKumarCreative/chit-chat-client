import React from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import InvitationCard from "./InvitationCard";

function InvitationList() {
  return (
    <Container sx={{ marginTop: 1 }}>
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ backgroundColor: "whitesmoke", padding: "1rem" }}
      >
        Invitations to Join the Groups
      </Typography>
      <Box sx={{ overflowY: "auto", height: "70vh" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            <InvitationCard groupName="Hello world ! shankar" groupCount="10" />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <InvitationCard groupName="Another Group" groupCount="5" />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <InvitationCard groupName="Hello world ! shankar" groupCount="10" />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <InvitationCard groupName="Another Group" groupCount="5" />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <InvitationCard groupName="Hello world ! shankar" groupCount="10" />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <InvitationCard groupName="Another Group" groupCount="5" />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <InvitationCard groupName="Hello world ! shankar" groupCount="10" />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <InvitationCard groupName="Another Group" groupCount="5" />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <InvitationCard groupName="Hello world ! shankar" groupCount="10" />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <InvitationCard groupName="Another Group" groupCount="5" />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <InvitationCard groupName="Hello world ! shankar" groupCount="10" />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <InvitationCard groupName="Another Group" groupCount="5" />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default InvitationList;
