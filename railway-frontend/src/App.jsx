import React, { useState } from "react";
import getShortestPath from "./utils/api.js";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LEDStatus from "./components/LEDStatus";
import "./App.css";

export default function App() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [busy, setBusy] = useState("");
  const [result, setResult] = useState({ path: [], distance: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!from || !to) {
      alert("Please enter both From and To stations.");
      return;
    }

    const busyStations = busy
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const data = await getShortestPath(from, to, busyStations);
    setResult(data);
  };

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <h2>Welcome to the Railway Optimization System</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>From: </label>
            <input
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Enter from station"
            />
          </div>
          <div>
            <label>To: </label>
            <input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Enter to station"
            />
          </div>
          <div>
            <label>Busy Stations: </label>
            <input
              value={busy}
              onChange={(e) => setBusy(e.target.value)}
              placeholder="Comma separated"
            />
          </div>
          <button type="submit">Get Shortest Path</button>
        </form>

        <h3>Result:</h3>
        {result.path.length > 1 && result.distance != null ? (
          <>
            <p>Path: {result.path.join(" → ")}</p>
            <p>Total Distance: {result.distance} km</p>
          </>
        ) : (
          <p>No valid path found</p>
        )}

        <LEDStatus />
      </main>
      <Footer />
    </div>
  );
}
