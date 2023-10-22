import React, { useState } from "react";
import GroupsList from "../components/GroupsList";
import Header from "../components/Header";
import Cookies from "js-cookie";
import { Container } from "@mui/material";
import InvitationList from "../components/InvitationList";
import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";

export default function InvitationsPage() {
  const userData = JSON.parse(Cookies.get("userInfo"));
  const [userInfo, setUserInfo] = useState(userData);
  console.log(userInfo);
  return (
    <div>
      <Header />
      <GroupsList />
      <Container
        sx={{
          marginLeft: "27vw",
          width: "73vw",
          height: "91vh",
          backgroundColor: "#d7d4ec66",
        }}
      >
        <InvitationList />
      </Container>
    </div>
  );
}
