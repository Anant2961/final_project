import { useState, useEffect } from "react";
import "./style.css";
import Encrypt from "./components/Encrypt";
import Decrypt from "./components/Decrypt";
import axios from "axios";

function App() {
  const [selectedPage, setSelectedPage] = useState("encrypt");
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "10vh",
          backgroundColor: "black",
          color: "white",
        }}
      >
        <button
          style={{
            padding: "10px",
            margin: "10px",
            color: "white",
            backgroundColor: "purple",
          }}
          onClick={() => setSelectedPage("encrypt")}
        >
          Encrypt
        </button>
        <button
          style={{
            padding: "10px",
            margin: "10px",
            color: "white",
            backgroundColor: "purple",
          }}
          onClick={() => setSelectedPage("decrypt")}
        >
          Decrypt
        </button>
      </div>
      <div>
        {selectedPage === "encrypt" && <Encrypt />}
        {selectedPage === "decrypt" && <Decrypt />}
      </div>
    </>
  );
}

export default App;
