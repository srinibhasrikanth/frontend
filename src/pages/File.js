import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const File = () => {
  const [poster, setPoster] = useState(null);
  const [posterURL, setPosterURL] = useState("");

  const handleFileChange = (e) => {
    setPoster(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("poster", poster);

    try {
      const response = await axios.post(
        "https://backend-production-c697.up.railway.app/api/upload-poster",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Successfully uploaded");
      setPosterURL(response.data.filePath);
    } catch (error) {
      toast.error("Error in uploading file");
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Poster</button>
      {posterURL && (
        <div>
          <h3>Uploaded Poster:</h3>
          <img
            src={posterURL}
            alt="Uploaded Poster"
            style={{ maxWidth: "500px", maxHeight: "500px" }}
          />
        </div>
      )}
    </div>
  );
};

export default File;
