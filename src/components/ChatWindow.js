import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Container,
} from "@mui/material";

const ChatWindow = () => {
  const messages = [
    { text: "Hello!", sender: "me" },
    {
      text: "Hi there! Hi there! Hi there! Hi there! Hi there! Hi there! Hi there!",
      sender: "other",
    },
    {
      text: "How are you? How are you? How are you? How are you? How are you? How are you? How are you? How are you?",
      sender: "me",
    },
    { text: "I'm good, thanks!", sender: "other" },
    { text: "I'm good, thanks!", sender: "other" },
    { text: "I'm good, thanks!", sender: "other" },
    { text: "I'm good, thanks!", sender: "other" },
    { text: "I'm good, thanks!", sender: "other" },
    { text: "I'm good, thanks!", sender: "other" },
    { text: "I'm good, thanks!", sender: "other" },

    // Add more messages as needed
  ];

  return (
    <Container sx={{ marginTop: 1 }}>
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ backgroundColor: "whitesmoke", padding: "1rem" }}
      >
        Group Name will come here
      </Typography>
      <Box sx={{ overflowY: "auto", height: "70vh" }}>
        <Grid container spacing={2}>
          {messages.map((message, index) => (
            <Grid item xs={12} key={index}>
              <Card
                sx={{
                  maxWidth: "40%",
                  marginLeft: message.sender !== "other" ? "auto" : 0,
                  backgroundColor:
                    message.sender === "other" ? "#E0E0E0" : "#DCF8C6",
                }}
              >
                <CardContent>
                  <Typography variant="body1">{message.text}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ChatWindow;
