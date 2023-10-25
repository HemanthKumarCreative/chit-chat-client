import React from "react";
import GroupsList from "../components/GroupsList";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import ChatScreen from "../components/ChatScreen";
import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";

export default function ChatDetailedPage({
  groups,
  setGroups,
  userId,
  userName,
}) {
  let { groupId } = useParams();
  return (
    <div>
      <Header userName={userName} />
      <GroupsList userId={userId} groups={groups} setGroups={setGroups} />
      <Container
        sx={{
          marginLeft: "27vw",
          width: "73vw",
          height: "91vh",
          backgroundColor: "#d7d4ec66",
        }}
      >
        <ChatScreen userId={userId} groupId={groupId} userName={userName} />
      </Container>
    </div>
  );
}
