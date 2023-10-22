import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const BannerCard = ({ message }) => {
  return (
    <Card
      sx={{
        border: "2px solid #1976D2", // Add border styling
        textAlign: "center",
      }}
    >
      <CardContent>
        <Typography variant="body1" component="div" sx={{ marginTop: 2 }}>
          {message}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BannerCard;
