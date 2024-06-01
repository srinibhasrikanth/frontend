import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ZipDownloader from "./ZipDownloader";

export default function EventCard() {
  const [result, setResult] = React.useState([]);
  const navigate = useNavigate();

  const fetchEvent = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/events/get-all-events"
      );
      setResult(res.data); // Set state with the data, not the entire response
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchEvent(); // Fetch data on component mount
  }, []); // Empty dependency array to avoid infinite loop

  console.log(result); // Log the result to debug

  return (
    <div className="flex flex-row flex-wrap">
      {Array.isArray(result) && result.length > 0 ? (
        result.map((item, index) => (
          <Card sx={{ width: 300, margin: 3 }} key={index}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }}></Typography>
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
                {/* Mode of Conduct: {item.modeOfConduct} */}
              </Typography>
              {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {item.to_whom}
              </Typography> */}
              {/* <Typography variant="body2">
                Date: {item.date}
                <br />
                Time: {item.time}
                <br />
                Venue: {item.venue}
                <br />
                Resource Person: {item.resourcePerson}
                <br />
                Mode of Conduct: {item.modeOfConduct}
                <br />
                Resources Required: {item.resourcesRequired}
                <br />
                Conducted By: {item.conductedBy}
                <br />
                Number of Volunteers: {item.no_of_volunteers}
                <br />
                Prize Money: {item.prize_money}
                <br />
                Budget: {item.budget}
                <br />
                Remarks: {item.remarks}
              </Typography> */}
              <CardActions>
                <ZipDownloader item={{ item }} />
              </CardActions>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary">
          No events available
        </Typography>
      )}
    </div>
  );
}
