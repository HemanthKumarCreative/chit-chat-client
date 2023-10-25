import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Box, Paper } from "@mui/material";
import SignUpForm from "../components/SignUpForm";

const SignUpPage = () => {
  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Sign Up
          </Typography>
          <SignUpForm />
        </Box>
        <Typography variant="body1" align="center">
          Already have an account? <Link to="/">Login</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default SignUpPage;
