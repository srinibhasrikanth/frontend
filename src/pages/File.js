import React, { useState } from "react";
import axios from "axios";
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
        "backend-production-c697.up.railway.app/api/upload-poster",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPosterURL(response.data.filePath);
    } catch (error) {
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
