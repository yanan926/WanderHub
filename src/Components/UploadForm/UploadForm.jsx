import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputLabel,
} from "@mui/material";

const UploadForm = () => {

  const handleUpload = () => {
    if (selectedFile) {
      console.log("Uploading file:", selectedFile);
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <Box component={"form"} sx={{ margin: "auto" }}>
    <Typography
      component="h1"
      variant="h6"
      sx={{ mt: 1, mb: 1, textAlign: "center" }}
    >
      Upload Your Travel Image
    </Typography>
    <InputLabel htmlFor="file-upload">
      Select a File to Upload
    </InputLabel>
    <TextField
      type="file"
      id="image-upload"
      onChange={handleFileChange}
      inputProps={{
        accept: "image/*", // Specify the accepted file types (in this case, images)
      }}
      fullWidth
      sx={{ mb: 1 }}
      size="small"
    />
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <TextField
        type="text"
        placeholder="Or post your image's url Link here"
        size="small"
        sx={{ width: "70%", mr: 3 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        size="small"
        sx={{ width: "40%", p: 1 }}
      >
        Share Your Image
      </Button>
    </Box>
  </Box>

  )

}

export default UploadForm