import { useState, useEffect } from "react";
import "./style.css";
import Encrypt from "./components/Encrypt";
import Decrypt from "./components/Decrypt";
import axios from "axios";

function App() {
  // const cors = require("cors");
  // App.use(cors());
  const [selectedPage, setSelectedPage] = useState("encrypt");
  return (
    <>
      <div>
        <button onClick={() => setSelectedPage("encrypt")}>Encrypt</button>
        <button onClick={() => setSelectedPage("decrypt")}>Decrypt</button>
      </div>
      <div>
        {selectedPage === "encrypt" && <Encrypt />}
        {selectedPage === "decrypt" && <Decrypt />}
      </div>
    </>
  );
}

export default App;
