import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const EventTable = () => {
  const storedAuth = localStorage.getItem("auth");
  const userRole = storedAuth ? JSON.parse(storedAuth).user.role : null;

  const [rowData, setRowData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRows = async () => {
      try {
        const res = await axios.get(
          "https://backend-production-c697.up.railway.app/api/v1/events/get-all-events"
        );
        setRowData(res.data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };
    fetchRows();
  }, []);

  // Function to handle navigation to view registrations
  const handleViewRegistrations = (event) => {
    console.log(event);
    if (userRole === "1") navigate(`/volunteer/registration-list/${event._id}`);
    else navigate(`/admin/registration-list/${event._id}`);
  };

  // Custom cell renderer for the button
  const CustomButtonComponent = (props) => {
    const event = props.data; // Assuming props.data contains the event object
    return (
      <Button
        style={{ width: 90, height: 30 }}
        variant="contained"
        onClick={() => handleViewRegistrations(event)}
      >
        View
      </Button>
    );
  };

  const colDefs = [
    { headerName: "Title", field: "title", cellStyle: { textAlign: "center" } },
    { headerName: "Type", field: "type", cellStyle: { textAlign: "center" } },
    {
      headerName: "To Whom",
      field: "to_whom",
      cellStyle: { textAlign: "center" },
    },
    { headerName: "Date", field: "date", cellStyle: { textAlign: "center" } },
    { headerName: "Time", field: "time", cellStyle: { textAlign: "center" } },
    { headerName: "Venue", field: "venue", cellStyle: { textAlign: "center" } },
    {
      headerName: "No of Volunteer",
      field: "no_of_volunteers",
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: "Registrations",
      field: "button",
      cellRenderer: CustomButtonComponent,
      flex: 1,
    },
  ];

  const defaultColDef = {
    flex: 1,
  };

  let eventPath;
  if (userRole === "1") eventPath = "/volunteer/dashboard";
  else eventPath = "/admin/dashboard";

  return (
    <div
      className={"ag-theme-quartz"}
      style={{ width: "100%", height: "75vh", marginTop: 3 }}
    >
      <Typography>
        <Link to={eventPath}>
          <KeyboardDoubleArrowLeftIcon />
          <span>Back to dashboard</span>
        </Link>
      </Typography>
      <Typography
        variant="h4"
        component="div"
        style={{ textAlign: "center", paddingBottom: 3 }}
      >
        List of events
      </Typography>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
};

export default EventTable;
