import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Typography, Container } from "@mui/material";
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
          <TextField
            variant="outlined"
            required
            fullWidth
            id="branch"
            label="Branch"
            name="branch"
            style={{ marginBottom: "16px" }}
            size="small"
            value={formData.branch}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            id="year"
            label="Year"
            name="year"
            style={{ marginBottom: "16px" }}
            size="small"
            value={formData.year}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            id="section"
            label="Section"
            name="section"
            style={{ marginBottom: "16px" }}
            size="small"
            value={formData.section}
            onChange={handleChange}
          />
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
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Register;
