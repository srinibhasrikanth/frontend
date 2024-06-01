import {
  Button,
  Box,
  Modal,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import ApprovalForm from "./ApprovalForm";

const EventDescription = () => {
  const { id } = useParams();
  const [result, setResult] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  useEffect(() => {
    const getEvent = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/events/get-event/${id}`
        );
        setResult(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getEvent();
  }, [id]);

  return (
    <Box sx={{ p: 4 }}>
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Typography variant="h3">
                {result.title}
                <Link onClick={handleOpen} style={{ marginLeft: 8 }}>
                  <FaEdit />
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Event
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You can edit the event details here.
          </Typography>
          {/* Add your form or inputs here */}
        </Box>
      </Modal>

      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5">Registration Link:</Typography>
          <a
            href={result.registration_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {result.registration_link}
          </a>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5">Feedback Link:</Typography>
          <a
            href={result.feedback_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {result.feedback_link}
          </a>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5">After Event Report:</Typography>
          <Typography variant="body1">{result.after_event_report}</Typography>
        </CardContent>
      </Card>

      <Box sx={{ mb: 4 }}>
        <Button variant="contained" color="primary">
          Send Emails
        </Button>
      </Box>

      <Card variant="outlined">
        <CardContent>
          <ApprovalForm result={{ result }} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default EventDescription;
