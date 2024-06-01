import React, { useState } from "react";
import { Card, CardContent, Button, Typography } from "@mui/material";
import * as XLSX from "xlsx";

const AddCoreList = () => {
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
        setJsonData(JSON.stringify(json, null, 2));
      };
      reader.readAsBinaryString(selectedFile);
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
        >
          Convert
        </Button>
        {jsonData && <pre style={{ marginTop: "1rem" }}>{jsonData}</pre>}
      </CardContent>
    </Card>
  );
};

export default AddCoreList;
