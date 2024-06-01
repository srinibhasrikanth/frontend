import React from "react";

import EventCard from "./EventCard";
import { Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <div>
      <Typography variant="h2" component={div}>
        Welcome to Volunteer Dashboard.
      </Typography>
      <EventCard />
    </div>
  );
};

export default Dashboard;
