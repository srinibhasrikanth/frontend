import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  // Retrieve the user role from local storage
  const storedAuth = localStorage.getItem("auth");
  const userRole = storedAuth ? JSON.parse(storedAuth).user.role : null;

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login"); // Redirect to the login page after logout
  };

  const handleLogo = () => {
    if (userRole == 0) navigate("/admin/dashboard");
    else navigate("/volunteer/dashboard");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#3893c2" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <img
              src="/images/ACM.png"
              style={{ width: "40px", height: "40px" }}
              alt="ACM Logo"
              onClick={handleLogo}
            />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ACM VNRVJIET
          </Typography>
          {!userRole ? (
            <Link to="/login">
              <Button color="inherit">Login</Button>
            </Link>
          ) : userRole === "0" ? (
            <>
              <Link to="/admin/core">
                <Button color="inherit">Core</Button>
              </Link>
              <Link to="/admin/membership">
                <Button color="inherit">Memberships</Button>
              </Link>
              <Link to="/admin/volunteers">
                <Button color="inherit">Volunteers</Button>
              </Link>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/volunteer/add-core">
                <Button color="inherit">Add Core</Button>
              </Link>
              <Link to="/volunteer/add-volunteer">
                <Button color="inherit">Add Volunteer</Button>
              </Link>
              <Link to="/volunteer/add-membership">
                <Button color="inherit">Add Membership</Button>
              </Link>
              <Link to="/volunteer/event-creation">
                <Button color="inherit">Add Event</Button>
              </Link>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
