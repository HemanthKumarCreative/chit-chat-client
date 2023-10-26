import React from "react";
import { Container, Typography, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const FilePreview = ({ selectedFilePath, selectedFile, onClose }) => {
  const fileExtensions = [
    ".png",
    ".jpg",
    ".mp3",
    ".mp4",
    ".pdf",
    ".doc",
    ".xls",
  ];

  return (
    <Container sx={{ marginTop: "1rem" }}>
      {selectedFilePath && (
        <Box>
          <Box sx={{ display: "flex" }}>
            <Typography variant="h5" align="center" gutterBottom>
              Preview
            </Typography>
            <Box>
              <IconButton onClick={onClose}>
                <CloseIcon color="error" />
              </IconButton>
            </Box>
          </Box>
          <Box>
            {fileExtensions.some((ext) => selectedFile.endsWith(ext)) ? (
              selectedFile.endsWith(".png") || selectedFile.endsWith(".jpg") ? (
                <img
                  src={selectedFilePath}
                  alt="Preview"
                  style={{ width: "40%", maxHeight: "40vh" }}
                />
              ) : selectedFile.endsWith(".mp3") ? (
                <audio controls src={selectedFilePath}></audio>
              ) : selectedFile.endsWith(".mp4") ? (
                <video
                  controls
                  src={selectedFilePath}
                  style={{ width: "100%", maxHeight: "80vh" }}
                ></video>
              ) : selectedFile.endsWith(".pdf") ||
                selectedFile.endsWith(".doc") ||
                selectedFile.endsWith(".xls") ? (
                <iframe
                  src={selectedFilePath}
                  title="Document Preview"
                  style={{ width: "100%", height: "80vh", border: "none" }}
                />
              ) : (
                <Typography variant="body1">Unsupported file type</Typography>
              )
            ) : (
              <Typography variant="body1">Unsupported file type</Typography>
            )}
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default FilePreview;
