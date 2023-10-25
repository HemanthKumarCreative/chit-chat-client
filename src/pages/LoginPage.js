import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Box, Paper } from "@mui/material";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Login Page
          </Typography>
          <LoginForm />
        </Box>
        <Typography variant="body1" align="center">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </Typography>
        <Typography variant="body1" align="center">
          Forgot your password? <Link to="/forget-password">Click here</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default LoginPage;
