import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ZipDownloader from "./ZipDownloader";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { IconButton, Menu } from "@mui/material";
import { useState } from "react";
export default function EventCard() {
  const [result, setResult] = React.useState([]);
  const navigate = useNavigate();
  const fetchEvent = async () => {
    try {
      const res = await axios.get(
        "https://backend-production-c697.up.railway.app/api/v1/events/get-all-events"
      );
      setResult(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchEvent();
  }, []);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      className="flex flex-row flex-wrap"
      style={{ justifyContent: "space-between" }}
    >
      {Array.isArray(result) && result.length > 0 ? (
        result.map((item, index) => (
          <Card sx={{ width: 350, margin: 3 }} key={index}>
            <CardContent>
              <div className="flex" style={{ justifyContent: "space-between" }}>
                <div style={{ justifyContent: "space-between" }}>
                  <Typography variant="h6" component="div">
                    {item.title}
                    <br />
                    {item.type}
                  </Typography>
                  <Typography variant="body2">
                    Date: {item.date}
                    <br />
                    Time: {item.time}
                    <br />
                    Venue: {item.venue}
                    <br />
                  </Typography>
                </div>
                <div>
                  <CardActions>
                    <ZipDownloader item={{ item }} />
                  </CardActions>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <>
          <div className="flex flex-row" style={{ justifyContent: "center" }}>
            <img src="/images/noEventsFound.jpg" width="600vh" height="60vh" />
            <Typography
              variant="h4"
              color="text.secondary"
              style={{ textAlign: "center" }}
            >
              No events available. <br />
            </Typography>
          </div>
        </>
      )}
    </div>
  );
}
