import React from "react";

import EventCard from "./EventCard";
import { Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <div>
      <h2
        style={{
          fontFamily: "Poppins",
          fontWeight: 400,
          fontStyle: "normal",
          textAlign:"center",
          margin:4,
          fontSize:"30px"
        }}
      >
        Welcome to Volunteer Dashboard.
      </h2>
      <EventCard />
    </div>
  );
};

export default Dashboard;
