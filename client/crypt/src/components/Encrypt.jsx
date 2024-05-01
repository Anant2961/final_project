import { useState } from "react";
import React from "react";
import "../style.css";
import axios from "axios";
import FileDownloader from "./Filedownloader";
import Rolling from "/Rolling.svg";

const Encrypt = () => {
  const [first, setfirst] = useState("");
  const [loader, setloader] = useState(false);
  const handletextchange = (e) => {
    setfirst(e.target.value);
    console.log(e.target.value);
  };
  const [selectedImage, setSelectedImage] = useState(null);
  const [filename, setFilename] = useState("");
  const handlefilechange = (e) => {
    setSelectedImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  const handlefileupload = async () => {
    const formdata = new FormData();
    const text = document.getElementById("plain-text").value;
    console.log(text);
    console.log(first);
    formdata.append("file", selectedImage);
    formdata.append("text", first);
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
      console.log(text);
    } catch (error) {
      console.error("error uploading file", error);
    }
  };
  const upload = async () => {
    setloader(true);
    console.log(filename);
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
    } finally {
      setTimeout(() => {
        setloader(false);
      }, 5000);
    }
  };
  return (
    <>
      {loader && (
        <div className="loader-container">
          <img src={Rolling} alt="Loading..." className="loader" />
        </div>
      )}
      <div className="header">
        <h1>CipherCanvas Encrypt</h1>
      </div>
      <div className="container">
        <div className="input-box">
          <textarea
            id="plain-text"
            placeholder="ENTER PLAIN TEXT"
            onChange={handletextchange}
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
          <FileDownloader type={0} filename={filename} />
        </div>
        <div className="output-box">
          <textarea id="plain-text" placeholder="ENCRYPTED TEXT"></textarea>
        </div>
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
