import { useState } from "react";
import axios from "axios";
import { Box, Typography, TextField, Button, InputLabel } from "@mui/material";

const UploadForm = ({cityId, fetchData}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [urlLink, setUrlLink] = useState("");
  const [error, setError] = useState("");

  const validCheck = () => {
    if (selectedFile && (urlLink != "")) {
      setError("Please select only one option: file or URL.");
      return false
    } 
    return true;
  };

  const handleBlur = () => {
    // Perform validation when the user stops typing
    validCheck();
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!validCheck()) {
      return;
    }
    if (selectedFile) {
      console.log("Uploading file:", selectedFile);
      // Add your file upload logic here
    } else if (urlLink) {
    const postUrl = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8080/destinations/${cityId}`,
          {url: `${urlLink}`}
        );
        const data = response.data;
        console.log(data)
        fetchData()
      } catch (err) {
        console.log(err);
      }
    };
    postUrl()
    setUrlLink("")
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
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextField
          type="text"
          id="image-upload"
          value={selectedFile ? selectedFile.name : ""}
          fullWidth
          size="small"
          error={Boolean(error)}
          helperText={error}
          onBlur={handleBlur}
          disabled
        />
        <label htmlFor="file-upload" style={{ marginLeft: "8px" }}>
          <Button
            variant="outlined"
            component="span"
          >
            Browse
          </Button>
        </label>
        <input
          type="file"
          id="file-upload"
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: "none" }}
        />
      </div>
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
        >
          Share Your Image
        </Button>
      </Box>
    </Box>
  );
};

export default UploadForm;
