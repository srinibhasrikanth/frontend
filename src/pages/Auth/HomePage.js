import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    // Use navigate function to redirect to the login page
    navigate("/login");
  };
  return (
    <div>
      <div className="hero  bg-white">
        <div className="hero-content flex-col lg:flex-row">
          <img src="/images/ACM.png" className="max-w-sm " />
          <div>
            <h1 className="text-5xl font-bold">ACM VNRVJIET</h1>
            <p className="py-6">
              ASSOCIATION FOR COMPUTING MACHINERY STUDENT CHAPTER OF VNRVJIET
            </p>
            <Button variant="contained" onClick={handleGetStartedClick}>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
