import React, { useState } from "react";
import StationForm from "./components/StationForm";
import PathResult from "../components/PathResult";
import { getShortestPath } from "../utils/api";

const HomePage = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [busy, setBusy] = useState([]);
  const [result, setResult] = useState(null);

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Ensure input fields are not empty
    if (!from || !to) {
      alert("Please provide both 'From' and 'To' stations.");
      return;
    }

    const data = await getShortestPath(from, to, busy);
    console.log("Data from API:", data);  // Log API response for debugging
    setResult(data); // Set the result after fetching data
  };

  return (
    <div>
      <h1>Welcome to the Railway Optimization System</h1>
      <StationForm
        from={from}
        to={to}
        busy={busy}
        setFrom={setFrom}
        setTo={setTo}
        setBusy={setBusy}
        onSubmit={handleSubmit}
      />
      {/* Conditionally render the PathResult if data is available */}
      {result && result.path && result.path.length > 0 && (
        <PathResult path={result.path} distance={result.distance} />
      )}
    </div>
  );
};

export default HomePage;
