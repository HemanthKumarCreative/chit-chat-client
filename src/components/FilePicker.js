import React from "react";
import { Input } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";

const FilePicker = ({ onFileSelected }) => {
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const filePath = URL.createObjectURL(selectedFile);
    onFileSelected(filePath, selectedFile.name, selectedFile);
    console.log(selectedFile);
  };

  return (
    <div>
      <Input
        accept="*"
        id="file-upload"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload">
        <IconButton component="span">
          <AttachFileOutlinedIcon />
        </IconButton>
      </label>
    </div>
  );
};

export default FilePicker;
