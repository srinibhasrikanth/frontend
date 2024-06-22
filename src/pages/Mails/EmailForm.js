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
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";

const EmailForm = () => {
  const [formData, setFormData] = useState({
    subject: "",
    body: "",
  });
  const data = localStorage.getItem("auth");

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
        "https://backend-production-c697.up.railway.app/send-emails",
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

  // Retrieve the user role from local storage
  const storedAuth = localStorage.getItem("auth");
  const userRole = storedAuth ? JSON.parse(storedAuth).user.role : null;
  let event;
  if (userRole == "1") event = "/volunteer/dashboard";
  else event = "/admin/dashboard";
  return (
    <>
      <Typography>
        {" "}
        <Link to={`${event}`}>
          <KeyboardDoubleArrowLeftIcon />
          <span>Back to dashboard</span>
        </Link>
      </Typography>
      <div className="m-5 flex justify-center pt-6">
        {data ? (
          <>
            {userRole == "0" ? (
              <>
                {/* admin */}
                <>
                  <div
                    style={{
                      width: 800,
                      height: "60vh",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        p: 4,
                        boxShadow: 3,
                        bgcolor: "background.paper",
                        borderRadius: 2,
                        width: "100%",
                      }}
                    >
                      <Typography variant="h5">Send Email </Typography>
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
                          {/* <Button variant="contained" component="label">
                        Upload Excel File
                        <input type="file" hidden onChange={handleFileChange} />
                      </Button>
                      {fileName && (
                        <Typography variant="body1" sx={{ mt: 2 }}>
                          Uploaded File: {fileName}
                        </Typography>
                      )} */}
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{ width: 200 }}
                          >
                            Send Email
                          </Button>
                        </Box>
                      </form>
                    </Box>
                  </div>
                </>
              </>
            ) : (
              <>
                <div
                  style={{
                    width: 800,
                    height: "60vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
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
                        <Button
                          variant="contained"
                          component="label"
                          style={{ width: 200 }}
                        >
                          Upload Excel File
                          <input
                            type="file"
                            hidden
                            onChange={handleFileChange}
                          />
                        </Button>
                        {fileName && (
                          <Typography variant="body1" sx={{ mt: 2 }}>
                            Uploaded File: {fileName}
                          </Typography>
                        )}
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          style={{ width: 200 }}
                        >
                          Send Emails
                        </Button>
                      </Box>
                    </form>
                  </Box>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="flex flex-row justify-center items-center">
              <h1
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  fontStyle: "normal",
                  textAlign: "center",
                  margin: 4,
                  fontSize: "30px",
                }}
              >
                Please login to continue!
                <br />
                <Link
                  to="/login"
                  style={{ textDecoration: "underline", color: "#3893c2" }}
                >
                  Click here
                </Link>
              </h1>
              <img
                src="/images/login.jpg"
                alt=""
                width="500px"
                height="500px"
                style={{ margin: 10 }}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EmailForm;
