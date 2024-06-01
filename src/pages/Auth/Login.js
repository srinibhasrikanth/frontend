import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);
    try {
      const res = await axios.post(
        "https://backend-production-c697.up.railway.app/api/v1/auth/login",
        {
          username,
          password,
        }
      );

      console.log(res);
      if (res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: res.data.user,
            token: res.data.token,
          })
        );

        if (res.data.user.role === "1") {
          navigate("/volunteer/dashboard");
        } else {
          navigate("/admin/dashboard");
        }
      } else {
        console.log("login failed");
      }
    } catch (error) {
      toast.error("Login error:", error);
    }
  };

  return (
    <Box>
      <Card sx={{ maxWidth: 320, margin: "auto", marginTop: 13 }}>
        <CardContent>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "100%" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit} // Move the form submission handler here
          >
            <Typography variant="h5" component="h3">
              Login Page
            </Typography>

            <TextField
              id="standard-user-input"
              label="Username"
              type="text"
              variant="standard"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginTop: 2 }}
            >
              Login
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
