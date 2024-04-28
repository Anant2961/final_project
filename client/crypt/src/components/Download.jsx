import React from "react";
import axios from "axios";

const handleDownload = async () => {
  const newFilename = "new_image.jpg"; // Specify the desired new filename
  const downloadUrl = "http://127.0.0.1:8080/download";

  try {
    const response = await axios.post(
      downloadUrl,
      { new_filename: newFilename },
      {
        responseType: "blob", // Ensure response type is blob for file download
      }
    );

    // Create a temporary link to initiate the download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", newFilename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading image:", error);
  }
};

const DownloadButton = () => {
  return <button onClick={handleDownload}>Download Modified Image</button>;
};

export default DownloadButton;
