import InvitationList from "../components/InvitationList";
import React, { useState, useEffect } from "react";
import { Button, AppBar, Toolbar, Typography, Container } from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function ShowInvitationsPage() {
  const [userInfo, setUserInfo] = useState(JSON.parse(Cookies.get("userInfo")));

  const [invitations, setInvitations] = useState([]);
  const fetchInvitations = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/invitations/${userInfo.id}`
      );
      console.log(response.data);
      setInvitations(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

  const navigate = useNavigate();

  const handleAccept = async (invitationId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/invitations/accept/${invitationId}`,
        { status: "accepted" }
      );
      console.log(response);
      fetchInvitations();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (invitationId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/invitations/reject/${invitationId}`,
        { status: "rejected" }
      );
      console.log(response);
      fetchInvitations();
    } catch (err) {
      console.error(err);
    }
  };

  const handleBack = () => {
    navigate("/Home");
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {`Welcome ${userInfo.name}`}
          </Typography>

          <Button color="inherit" onClick={handleBack}>
            Back
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 14 }}>
        <InvitationList
          invitations={invitations}
          handleAccept={handleAccept}
          handleReject={handleReject}
        />
      </Container>
    </div>
  );
}

export default ShowInvitationsPage;
