// Dashboard.js
import React from "react";
import EventCard from "./EventCard";
import { useAuth } from "../../context/auth";
import { Link, Redirect, useNavigate } from "react-router-dom"; // Ensure you have react-router-dom installed

const Dashboard = () => {
  const navigate = useNavigate();
  const data = localStorage.getItem("auth");
  console.log(data);
  return (
    <>
      {data ? (
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
      ) : (
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
          <img src="/images/login.jpg" alt="" width="500px" height="500px" style={{margin:10}} />
        </div>
      )}
    </>
  );
};

export default Dashboard;
