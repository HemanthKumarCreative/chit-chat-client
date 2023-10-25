import InvitationList from "../components/InvitationList";
import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import Header from "../components/Header";
import GroupsList from "../components/GroupsList";
import content from "../assets/content.json";
import axios from "axios";

function ShowInvitationsPage({ groups, setGroups, recieverId, userName }) {
  const [invitations, setInvitations] = useState([]);
  const { URL } = content;

  const fetchInvitations = async () => {
    try {
      const response = await axios.get(`${URL}/api/invitations/${recieverId}`);
      if (response.statusText === "OK") {
        const invitations = await response.data;
        setInvitations(invitations);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, [URL, recieverId]);

  return (
    <div>
      <Header />
      <GroupsList userId={recieverId} groups={groups} setGroups={setGroups} />
      <Container
        sx={{
          marginLeft: "27vw",
          width: "70vw",
          height: "90vh",
          backgroundColor: "#d7d4ec66",
        }}
      >
        <InvitationList
          invitations={invitations}
          fetchInvitations={fetchInvitations}
          userName={userName}
        />
      </Container>
    </div>
  );
}

export default ShowInvitationsPage;
