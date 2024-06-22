import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { toast } from "react-toastify";

const Register = () => {
  const { id } = useParams(); // Event ID from the URL
  const [data, setData] = useState();
  const [formData, setFormData] = useState({
    studentName: "",
    rollNumber: "",
    branch: "",
    year: "",
    section: "",
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(
          `https://backend-production-c697.up.railway.app/api/v1/events/get-event/${id}`
        );
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://backend-production-c697.up.railway.app/api/v1/register/register-student`,
        { ...formData, id }, // Include the event ID in the request body
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Successfully registered");
      console.log("Form submitted successfully", response.data);
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error submitting form", error);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        paddingTop: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" align="center">
          {data && data.title}
        </Typography>
        <form
          style={{ width: "100%", margin: "16px" }}
          noValidate
          onSubmit={handleSubmit}
        >
          <TextField
            variant="outlined"
            required
            fullWidth
            id="studentName"
            label="Student Name"
            name="studentName"
            style={{ marginBottom: "16px" }}
            size="small"
            value={formData.studentName}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            id="rollNumber"
            label="Roll Number"
            name="rollNumber"
            style={{ marginBottom: "16px" }}
            size="small"
            value={formData.rollNumber}
            onChange={handleChange}
          />
          <FormControl
            variant="outlined"
            fullWidth
            style={{ marginBottom: "16px" }}
            size="small"
          >
            <InputLabel id="branch-label">Branch</InputLabel>
            <Select
              labelId="branch-label"
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              label="Branch"
            >
              <MenuItem value="CSE">CSE</MenuItem>
              <MenuItem value="ECE">ECE</MenuItem>
              <MenuItem value="Mech">Mech</MenuItem>
              {/* Add more branches as needed */}
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            fullWidth
            style={{ marginBottom: "16px" }}
            size="small"
          >
            <InputLabel id="year-label">Year</InputLabel>
            <Select
              labelId="year-label"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              label="Year"
            >
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              {/* Adjust as per your academic year structure */}
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            fullWidth
            style={{ marginBottom: "16px" }}
            size="small"
          >
            <InputLabel id="section-label">Section</InputLabel>
            <Select
              labelId="section-label"
              id="section"
              name="section"
              value={formData.section}
              onChange={handleChange}
              label="Section"
            >
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="C">C</MenuItem>
              {/* Add more sections as needed */}
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            style={{ marginBottom: "16px" }}
            size="small"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            style={{ marginBottom: "16px" }}
            size="small"
            value={formData.email}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "8px" }}
          >
            Register Now
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Register;
