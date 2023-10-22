import React from "react";
import { Container } from "@mui/material";
import Header from "../components/Header";
import GroupsList from "../components/GroupsList";
import CreateNewGroup from "../components/CreateNewGroup";

function CreateNewGroupPage() {
  return (
    <div>
      <Header />
      <GroupsList />
      <Container
        sx={{
          marginLeft: "27vw",
          width: "70vw",
          height: "90vh",
          backgroundColor: "#d7d4ec66",
        }}
      >
        <CreateNewGroup />
      </Container>
    </div>
  );
}

export default CreateNewGroupPage;
