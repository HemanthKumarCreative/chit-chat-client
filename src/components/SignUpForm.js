import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

function SignUpForm() {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userMobile: "",
    userPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        ...formData,
      });
      if (response.statusText === "Created") {
        const data = await response.data;
        Cookies.set("userInfo", JSON.stringify(data.user));
        Cookies.set("token", data.token);
        navigate("/Home");
        window.location.reload(true);
      } else {
        const errorData = await response.data;
        console.error("Error:", errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box className="signup-container" component="form" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Name"
        variant="outlined"
        name="userName"
        value={formData.userName}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        type="email"
        name="userEmail"
        value={formData.userEmail}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Phone Number"
        variant="outlined"
        type="tel"
        name="userMobile"
        value={formData.userMobile}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Password"
        variant="outlined"
        type="password"
        name="userPassword"
        value={formData.userPassword}
        onChange={handleChange}
        margin="normal"
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
      >
        Sign Up
      </Button>
    </Box>
  );
}

export default SignUpForm;
