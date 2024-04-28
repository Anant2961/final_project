import React, { useState } from "react";

const FileDownloader = (props) => {
  const { filename, type } = props;
  const [downloaded, setDownloaded] = useState(false);

  // const handleDownload = async () => {

  //     const blob = await response.blob();

  //     // Create a temporary URL to the blob
  //     const url = window.URL.createObjectURL(blob);

  //     // Create a temporary link element to trigger the download
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = "encrypted_image.png"; // Specify the desired filename for download
  //     document.body.appendChild(link);
  //     link.click();

  //     document.body.removeChild(link);
  //     window.URL.revokeObjectURL(url);

  //     setDownloaded(true);
  // };

  return (
    <div>
      <button>
        <a
          onClick={() => setDownloaded(true)}
          href={type == 0 ? "/output_image.png" : "/extracted.txt"}
          download
        >
          Download Encrypted Image
        </a>
      </button>
      {downloaded && <p>File downloaded successfully!</p>}
    </div>
  );
};

export default FileDownloader;
