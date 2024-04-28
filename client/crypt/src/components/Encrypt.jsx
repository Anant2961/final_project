import { useState } from "react";
import React from "react";
import "../style.css";
import axios from "axios";
import FileDownloader from "./Filedownloader";

const Encrypt = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filename, setFilename] = useState("");
  const handlefilechange = (e) => {
    setSelectedImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  const handlefileupload = async () => {
    const formdata = new FormData();
    formdata.append("file", selectedImage);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/upload/encrypt",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("file uploaded successfully", response.data);
      setFilename(response.data["file_path"]);
    } catch (error) {
      console.error("error uploading file", error);
    }
  };
  const upload = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/encrypt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename }),
      });

      if (!response.ok) {
        throw new Error("Failed to download file");
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  return (
    <>
      <div className="header">
        <h1>CipherCanvas</h1>
      </div>
      <div className="container">
        <div className="input-box">
          <textarea
            id="plain-text"
            placeholder="ENTER PLAIN TEXT"
            inputMode="text"
          ></textarea>
        </div>
        <div className="buttons">
          <button id="encrypt-btn" onClick={upload}>
            Encrypt
          </button>
          <input
            type="file"
            onChange={handlefilechange}
            accept="image/*"
            className="upload-btn"
          />
          <button id="upload-btn" onClick={handlefileupload}>
            Upload Image
          </button>
        </div>
        <div className="output-box">
          <textarea id="plain-text" placeholder="ENCRYPTED TEXT"></textarea>
        </div>
        <FileDownloader type={0} filename={filename} />
      </div>
      {/* <div className="wrapper">
        <form>
          <input type="file" onChange={handlefilechange} accept="image/*" />
        </form>
      </div>
      <button onClick={handlefileupload}>Upload-Main</button> */}
    </>
  );
};

export default Encrypt;
