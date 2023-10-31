import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Box, Paper } from "@mui/material";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

const ForgetPasswordPage = () => {
  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Forgot Password
          </Typography>
          <ForgotPasswordForm />
        </Box>
        <Typography variant="body1" align="center">
          Remembered your password? <Link to="/">Login</Link>
        </Typography>
        <Typography variant="body1" align="center">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default ForgetPasswordPage;
