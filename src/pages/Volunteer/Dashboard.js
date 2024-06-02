// Dashboard.js
import React from "react";
import EventCard from "./EventCard";
import { useAuth } from "../../context/auth";
import { Redirect, useNavigate } from "react-router-dom"; // Ensure you have react-router-dom installed

const Dashboard = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  if (!auth.token) {
    navigate("/login"); // Redirect to login page if not authenticated
  }

  return (
    <div>
      <h2
        style={{
          fontFamily: "Poppins",
          fontWeight: 400,
          fontStyle: "normal",
          textAlign: "center",
          margin: 4,
          fontSize: "30px",
        }}
      >
        Welcome to Volunteer Dashboard.
      </h2>
      <EventCard />
    </div>
  );
};

export default Dashboard;
