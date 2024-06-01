import React from "react";
import axios from "axios";
import { useState } from "react";
const FileUploader = () => {
  const [image, setImage] = useState({
    preview: "",
    raw: "",
  });
  const handlePhotoChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const submit = async () => {
    let formData = new FormData();
    await formData.append("image", image.raw);
    await axios
      .post(`http://localhost:3001/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        return res.data;
      });
  };

  return (
    <div>
      <input
        name="image"
        type="file"
        id="upload-button"
        style={{ display: "none" }}
        onChange={handlePhotoChange}
      />
      <label htmlFor="upload-button">
        {image.preview ? (
          <img
            src={image.preview}
            alt="dummy"
            width="300"
            height="300"
            className="my-10 mx-5"
          />
        ) : (
          <>
            <p className="text-white text-1xl w-full text-left">Upload Image</p>
            {/* <div className={style.wrapper} /> */}
          </>
        )}
      </label>
      <button
        type="button"
        onClick={submit}
        className="text-white w-full mt-2 border-[1px]
             p-2 border-[#3d4f7c] rounded-full cursor-pointer "
      >
        Submit
      </button>
    </div>
  );
};

export default FileUploader;
