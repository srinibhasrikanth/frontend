import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

const EmailForm = () => {
  const [formData, setFormData] = useState({
    subject: "",
    body: "",
  });
  const [fileData, setFileData] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      setFileData(json.map((row) => ({ email: row.email })));
      setFileName(file.name);
    };

    if (file) {
      reader.readAsBinaryString(file);
    } else {
      toast.error("Please upload a valid Excel file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fileData) {
      toast.error("Please upload an Excel file.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/send-emails",
        {
          subject: formData.subject,
          body: formData.body,
          emailList: fileData,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Emails sent successfully");
    } catch (error) {
      toast.error("Error sending emails");
      console.error("Error sending emails:", error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <Box
        sx={{
          p: 4,
          boxShadow: 3,
          bgcolor: "background.paper",
          borderRadius: 2,
          width: "100%",
          maxWidth: 800,
        }}
      >
        <Typography variant="h5">Send Emails</Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "grid", gap: 2 }}>
            <TextField
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              variant="standard"
              fullWidth
              size="small"
            />
            <TextField
              label="Body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              variant="standard"
              fullWidth
              size="small"
              multiline
              rows={4}
            />
            <Button variant="contained" component="label">
              Upload Excel File
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            {fileName && (
              <Typography variant="body1" sx={{ mt: 2 }}>
                Uploaded File: {fileName}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary">
              Send Emails
            </Button>
          </Box>
        </form>
       
      </Box>
    </div>
  );
};

export default EmailForm;