import React, { useState } from "react";
import {
  TextField,
  FormControl,
  Button,
  Container,
  Typography,
} from "@mui/material";

const ImageUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    // Add your logic for handling the file upload here
    if (selectedFile) {
      console.log("Uploading file:", selectedFile);
      // Add your file upload logic (e.g., using FormData and sending it to the server)
    }
  };

  return (
    <Container maxWidth="xs">
      <FormControl fullWidth>
        <Typography component="h1" variant="h5" sx={{textAlign:"center"}}>
        Share Your Travel Image
        </Typography>
        <TextField
          type="file"
          id="image-upload"
          onChange={handleFileChange}
          inputProps={{
            accept: "image/*", // Specify the accepted file types (in this case, images)
          }}
        />
        <Button variant="contained" color="primary" onClick={handleUpload}>
          Upload
        </Button>
      </FormControl>
    </Container>
  );
};

export default ImageUploadForm;
