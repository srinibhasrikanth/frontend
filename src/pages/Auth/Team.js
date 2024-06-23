import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const Team = () => {
  const [selectedTeam, setSelectedTeam] = useState("Core");
  const [selectedYear, setSelectedYear] = useState("2024-25");
  const [rowData, setRowData] = useState([]);
  const [core, setCore] = useState([]);
  const [membership, setMembership] = useState([]);
  const [volunteer, setVolunteer] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCore = async () => {
      const res = await axios.get(
        "https://backend-production-c697.up.railway.app/api/v1/core/get-core"
      );
      setCore(res.data.coreMembers);
    };
    fetchCore();

    const fetchMembership = async () => {
      const res = await axios.get(
        "https://backend-production-c697.up.railway.app/api/v1/members/get-membership"
      );
      setMembership(res.data.members);
    };
    fetchMembership();

    const fetchVolunteer = async () => {
      const res = await axios.get(
        "https://backend-production-c697.up.railway.app/api/v1/volunteer/get-volunteer"
      );
      setVolunteer(res.data.coreMembers);
    };
    fetchVolunteer();
  }, []);

  useEffect(() => {
    // Filter the data based on the selected team and year
    let filteredData = [];
    if (selectedTeam && selectedYear) {
      switch (selectedTeam) {
        case "Core":
          filteredData = core.filter((member) => member.batch === selectedYear);
          break;
        case "Membership":
          // filteredData = membership.filter(
          //   (member) => member.batch === selectedYear
          // );
          filteredData = membership;
          break;
        case "Volunteer":
          // filteredData = volunteer.filter(
          //   (member) => member.batch === selectedYear
          // );
          console.log(volunteer);
          break;
        default:
          break;
      }
    }
    setRowData(filteredData);
  }, [selectedTeam, selectedYear, core, membership, volunteer]);

  const handleChangeTeam = (event) => {
    setSelectedTeam(event.target.value);
  };

  const handleChangeYear = (event) => {
    setSelectedYear(event.target.value);
  };

  const coreColDefs = [
    { field: "rollNumber" },
    { field: "studentName" },
    { field: "acmMembershipId" },
    { field: "position" },
    { field: "email" },
    { field: "phoneNumber" },
    { field: "section" },
    { field: "batch" },
  ];

  const membershipColDefs = [
    { field: "rollNumber" },
    { field: "year" },
    { field: "firstName" },
    { field: "lastName" },
    { field: "department" },
    { field: "section" },
    { field: "phoneNumber" },
    { field: "paymentMode" },
    { field: "paidTo" },
    { field: "paymentDate" },
  ];

  const volunteerColDefs = [
    { field: "rollNumber" },
    { field: "studentName" },
    { field: "position" },
    { field: "email" },
    { field: "phoneNumber" },
    { field: "section" },
    { field: "batch" },
  ];

  const getColumnDefs = () => {
    switch (selectedTeam) {
      case "Core":
        return coreColDefs;
      case "Membership":
        return membershipColDefs;
      case "Volunteer":
        return volunteerColDefs;
      default:
        return [];
    }
  };

  const defaultColDef = {
    flex: 1,
  };
  const storedAuth = localStorage.getItem("auth");
  const userRole = storedAuth ? JSON.parse(storedAuth).user.role : null;
  const data = localStorage.getItem("auth");
  let event;
  if (userRole == "1") event = "/volunteer/dashboard";
  else event = "/admin/dashboard";
  console.log(membership);
  return (
    <>
      <Typography style={{ margin: 5 }}>
        {" "}
        <Link to={`${event}`}>
          <KeyboardDoubleArrowLeftIcon />
          <span>Back to dashboard</span>
        </Link>
      </Typography>
      <div className="m-10 flex justify-between">
        <FormControl style={{ width: "200px" }}>
          <InputLabel id="demo-simple-select-label">Team</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedTeam}
            label="Team"
            onChange={handleChangeTeam}
          >
            <MenuItem value={"Core"}>Core</MenuItem>
            {/* <MenuItem value={"Volunteer"}>Volunteer</MenuItem> */}
            <MenuItem value={"Membership"}>Membership</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="h4">
          {selectedTeam} Details - {selectedYear}
        </Typography>
        {selectedTeam !== "Membership" ? (
          <>
            <FormControl style={{ width: "200px" }}>
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedYear}
                label="Year"
                onChange={handleChangeYear}
              >
                <MenuItem value={"2024-25"}>2024-25</MenuItem>
                <MenuItem value={"2023-24"}>2023-24</MenuItem>
              </Select>
            </FormControl>
          </>
        ) : (
          <>
            <Typography style={{ color: "white" }}>hello</Typography>
          </>
        )}
      </div>
      <div
        className="ag-theme-quartz"
        style={{ height: "75vh", width: "100%" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={getColumnDefs()}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </>
  );
};

export default Team;
