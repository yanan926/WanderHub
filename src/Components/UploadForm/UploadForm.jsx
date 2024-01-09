import { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputLabel,
  CircularProgress,
} from "@mui/material";

const UploadForm = ({ cityId, fetchData }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [urlLink, setUrlLink] = useState("");
  const [error, setError] = useState("");
 

  const validCheck = () => {
    if (selectedFile && urlLink) {
      setError("Please select only one option: file or URL.");
      return false;
    }
    return true;
  };

  const [loading, setLoading] = useState(false);

  const handleBlur = () => {
    validCheck();
  };

  const postUrl = async (url) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/destinations/${cityId}`,
        { url: `${url}` }
      );
      const data = response.data;

      fetchData();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Set loading to false after API call completes
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validCheck()) {
      return;
    }
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        // Upload file to Cloudinary
        const response = await axios.post(
          "https://wanderhubserver.onrender.com/upload",
          formData
        );
        console.log("Image uploaded to Cloudinary:", response.data.imageUrl);
        postUrl(response.data.imageUrl);
        setSelectedFile(null);
      } catch (err) {
        console.error("Error uploading image to Cloudinary:", err);
      }
    } else if (urlLink) {
      console.log(urlLink);
      postUrl(`${urlLink}`);
      setUrlLink("");
    } else {
      console.log("Please select a file or provide a URL.");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setUrlLink(""); // Reset URL when a file is selected
  };

  const handleUrlChange = (event) => {
    const url = event.target.value;
    setUrlLink(url);
    setSelectedFile(null); // Reset file when a URL is provided
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
      <InputLabel htmlFor="file-upload">Select a File to Upload</InputLabel>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <TextField
          type="text"
          id="image-upload"
          value={selectedFile ? selectedFile.name : "No File is Selected"}
          fullWidth
          size="small"
          error={Boolean(error)}
          helperText={error}
          onBlur={handleBlur}
          disabled
        />
        <label htmlFor="file-upload" style={{ marginLeft: "8px" }}>
          <Button variant="outlined" component="span">
            Browse
          </Button>
        </label>
        <input
          type="file"
          id="file-upload"
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: "none" }}
        ></input>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          type="text"
          placeholder="Or post your image's URL Link here"
          value={urlLink}
          onChange={handleUrlChange}
          size="small"
          sx={{ width: "70%", mr: 3 }}
          error={Boolean(error)}
          helperText={error}
          onBlur={handleBlur}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          size="small"
          sx={{ width: "40%", p: 1 }}
          disabled={loading}
        >
          {loading ? <CircularProgress /> : "Share Your Image"}
        </Button>
      </Box>
    </Box>
  );
};

export default UploadForm;
