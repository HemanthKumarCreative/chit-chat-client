import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";

const InvitationCard = ({ groupName, groupCount }) => {
  const handleAccept = () => {
    // Add logic for accepting group invitation
  };

  const handleReject = () => {
    // Add logic for rejecting group invitation
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
          Group Count: {groupCount}
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleAccept}>
              Accept
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleReject}
            >
              Reject
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default InvitationCard;
