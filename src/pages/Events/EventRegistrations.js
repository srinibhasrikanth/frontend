import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { Typography } from "@mui/material";
import { AgGridReact } from "ag-grid-react";

const EventRegistrations = () => {
  const [eventData, setEventData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `https://backend-production-c697.up.railway.app/api/v1/register/get-student/${id}`
        );
        console.log(res.data);
        setEventData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  // Retrieve the user role from local storage
  const storedAuth = localStorage.getItem("auth");
  const userRole = storedAuth ? JSON.parse(storedAuth).user.role : null;
  let event;
  if (userRole == "1") event = "/volunteer/dashboard";
  else event = "/admin/dashboard";

  const rowData = eventData;
  const [colDefs, setColDefs] = useState([
    { field: "studentName" },
    { field: "rollNumber" },
    { field: "branch" },
    { field: "year" },
    { field: "section" },
    { field: "phoneNumber" },
    { field: "email" },
  ]);

  const defaultColDef = {
    flex: 1,
  };

  return (
    <>
      <Typography>
        {" "}
        <Link to={`${event}`}>
          <KeyboardDoubleArrowLeftIcon />
          <span>Back to dashboard</span>
        </Link>
      </Typography>

      <div
        className={"ag-theme-quartz"}
        style={{ width: "100%", height: "75vh" }}
      >
        <Typography style={{ textAlign: "center" }} variant="h5">
          Event Registration Details
        </Typography>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
        />
      </div>
    </>
  );
};

export default EventRegistrations;
