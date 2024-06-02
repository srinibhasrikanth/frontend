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
  const handleLogoLogin = () => {
    navigate("/login");
  };
  const handleLogo = () => {
    if (userRole == 0) navigate("/admin/dashboard");
    else navigate("/volunteer/dashboard");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#3893c2" }}>
        <Toolbar>
          {!userRole ? (
            <>
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
                  onClick={handleLogoLogin}
                />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                ACM VNRVJIET
              </Typography>
              <Link to="/login">
                <Button color="inherit">Login</Button>
              </Link>
            </>
          ) : userRole === "0" ? (
            <>
              {/* <Link to="/admin/core">
                <Button color="inherit">Core</Button>
              </Link>
              <Link to="/admin/membership">
                <Button color="inherit">Memberships</Button>
              </Link>
              <Link to="/admin/volunteers">
                <Button color="inherit">Volunteers</Button>
              </Link> */}
              <Link to="/volunteer/send-email">
                <Button color="inherit">Send Email</Button>
              </Link>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
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
              {/* <Link to="/volunteer/core">
                <Button color="inherit"> Core</Button>
              </Link>
              <Link to="/volunteer/volunteer">
                <Button color="inherit"> Volunteer</Button>
              </Link>
              <Link to="/volunteer/membership">
                <Button color="inherit"> Membership</Button>
              </Link> */}
              <Link to="/volunteer/send-email">
                <Button color="inherit">Send Email</Button>
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
