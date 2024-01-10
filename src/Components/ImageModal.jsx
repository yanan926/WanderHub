import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 1,
  display: "flex",
  flexDirection: "column",
};

export default function ImageModal({ open, handleClose, image }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        {" "}
        <Button onClick={handleClose} sx={{ alignSelf: "flex-end" }} size="small">
          Close
        </Button>
        <img
          src={image}
          alt={"travel image"}
          style={{ width: "100%", height: "85vh", objectFit: "cover" }}
        />
      </Box>
    </Modal>
  );
}
