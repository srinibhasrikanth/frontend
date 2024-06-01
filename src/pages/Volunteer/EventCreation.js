import React, { useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import { toast } from "react-toastify";

const EventCreation = () => {
  const navigate = useNavigate();
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    to_whom: "",
    date: "",
    time: "",
    venue: "",
    resourcePerson: "",
    modeOfConduct: "",
    resourcesRequired: "",
    conductedBy: "",
    no_of_volunteers: "",
    prize_money: "",
    budget: "",
    remarks: "",
    current: `${month}/${date}/${year}`,
    registration_link: "",
    feedback_link: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://backend-production-c697.up.railway.app/api/v1/events/create-event",
        formData
      );

      toast.success("Event is successfully created");
      navigate("/volunteer/event-creation");
      setFormData({
        title: "",
        type: "",
        to_whom: "",
        date: "",
        time: "",
        venue: "",
        resourcePerson: "",
        modeOfConduct: "",
        resourcesRequired: "",
        conductedBy: "",
        no_of_volunteers: "",
        prize_money: "",
        budget: "",
        remarks: "",
      });
    } catch (error) {
      toast.error("Error in creating an event");
      console.error("Error saving event:", error);
    }
    console.log(formData);
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
        <Typography variant="h5">Create Event</Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "grid", gap: 2 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Event Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                variant="standard"
                fullWidth
                size="small"
              />
              <TextField
                label="Type of Event"
                name="type"
                value={formData.type}
                onChange={handleChange}
                variant="standard"
                fullWidth
                size="small"
              />
              <TextField
                label="Target Audience"
                name="to_whom"
                value={formData.to_whom}
                onChange={handleChange}
                variant="standard"
                fullWidth
                size="small"
              />
              <TextField
                label="Conducted By"
                name="conductedBy"
                value={formData.conductedBy}
                onChange={handleChange}
                variant="standard"
                fullWidth
                size="small"
              />
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Date of Event"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                variant="standard"
                fullWidth
                size="small"
              />
              <TextField
                label="Time"
                type="time"
                name="time"
                fullWidth
                value={formData.time}
                onChange={handleChange}
                variant="standard"
                size="small"
              />

              <TextField
                label="Venue"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                variant="standard"
                fullWidth
                size="small"
              />
              <TextField
                label="Resource Person"
                name="resourcePerson"
                value={formData.resourcePerson}
                onChange={handleChange}
                variant="standard"
                fullWidth
                size="small"
              />
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Mode of Conduct"
                name="modeOfConduct"
                value={formData.modeOfConduct}
                onChange={handleChange}
                variant="standard"
                fullWidth
                size="small"
              />

              <TextField
                label="Resources Required"
                name="resourcesRequired"
                value={formData.resourcesRequired}
                onChange={handleChange}
                variant="standard"
                fullWidth
                size="small"
              />
              <TextField
                label="Number of Volunteers"
                type="number"
                name="no_of_volunteers"
                value={formData.no_of_volunteers}
                fullWidth
                onChange={handleChange}
                variant="standard"
                size="small"
              />
              <TextField
                label="Prize Money"
                type="number"
                name="prize_money"
                value={formData.prize_money}
                onChange={handleChange}
                variant="standard"
                size="small"
                fullWidth
              />
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Budget"
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                variant="standard"
                size="small"
              />
              <TextField
                label="Registration Link"
                type="text"
                name="registration_link"
                value={formData.registration_link}
                onChange={handleChange}
                variant="standard"
                size="small"
              />
              <TextField
                label="Feedback Link"
                type="text"
                name="feedback_link"
                value={formData.feedback_link}
                onChange={handleChange}
                variant="standard"
                size="small"
              />
              <TextField
                label="Created Date"
                type="text"
                name="feedback_link"
                value={formData.current}
                onChange={handleChange}
                variant="standard"
                size="small"
              />
            </Box>

            <TextField
              label="Remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              variant="standard"
              fullWidth
              size="small"
              multiline
              rows={2}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<FaLocationArrow />}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default EventCreation;
