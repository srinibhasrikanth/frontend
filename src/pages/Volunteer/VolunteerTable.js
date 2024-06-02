import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CoreList from "./CoreList";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import axios from "axios";
import MembershipList from "./MembershipList";
import VolunteerList from "./VolunteerList";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AddMembershipData = ({ onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [jsonData, setJsonData] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleConvert = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        setJsonData(JSON); // Corrected JSON.stringify
      };
      reader.readAsBinaryString(selectedFile);
    }
  };

  const handleSubmit = async () => {
    try {
      // Handle the submission logic here, e.g., send data to server
      const res = await axios.post(
        "https://backend-production-c697.up.railway.app/api/v1/members/add-membership",
        jsonData
      );

      toast.success("File uploaded and processed successfully");
      onClose();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Upload File
        </Typography>
        <input
          type="file"
          accept=".xls,.xlsx"
          onChange={handleFileChange}
          style={{ marginBottom: "1rem" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleConvert}
          disabled={!selectedFile}
          style={{ marginRight: "1rem" }}
        >
          Convert
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
          disabled={!selectedFile}
        >
          Submit
        </Button>
        {jsonData && <pre style={{ marginTop: "1rem" }}>{jsonData}</pre>}
      </CardContent>
    </Card>
  );
};

AddMembershipData.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default function VolunteerTable() {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAdd = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="2023-24" {...a11yProps(0)} />
          <Tab label="2024-25" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <VolunteerList batch="2024-25" />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <VolunteerList batch="2024-25" />
      </CustomTabPanel>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Item</DialogTitle>
        <DialogContent>
          <AddMembershipData onClose={handleClose} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
