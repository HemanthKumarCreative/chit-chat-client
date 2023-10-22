import React, { useState } from "react";
import GroupsList from "../components/GroupsList";
import Header from "../components/Header";
import Cookies from "js-cookie";
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Box,
} from "@mui/material";
import BannerCard from "../components/BannerCard";

import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";

export default function HomePage() {
  const userData = JSON.parse(Cookies.get("userInfo"));
  const [userInfo, setUserInfo] = useState(userData);
  const message =
    "click on the group name visible on the side panel, to enter the group's detailed page";
  const messages = {
    detailedGroup:
      "Click on the group name visible on the side panel, to enter the group's detailed page",
    encryptNote: "The Information was end to end encrypted",
  };
  console.log(userInfo);
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
        <Container sx={{ marginTop: 1 }}>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ backgroundColor: "whitesmoke", padding: "1rem" }}
          >
            Important Notes
          </Typography>
          <Box sx={{ overflowY: "auto", height: "70vh" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <BannerCard message={messages.encryptNote} />
              </Grid>
              <Grid item xs={12}>
                <BannerCard message={messages.detailedGroup} />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Container>
    </div>
  );
}
