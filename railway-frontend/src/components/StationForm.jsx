import { useState } from "react";
import { getShortestPath } from "../utils/api";

const StationForm = ({ setResult }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [busy, setBusy] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const busyStations = busy.split(",").map(s => s.trim());
    const result = await getShortestPath(from, to, busyStations);
    setResult(result);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <h2 className="text-xl mb-2">Railway Route Input</h2>
      <div>
        <label>From: </label>
        <input value={from} onChange={e => setFrom(e.target.value)} placeholder="e.g. Dehradun" />
      </div>
      <div>
        <label>To: </label>
        <input value={to} onChange={e => setTo(e.target.value)} placeholder="e.g. Roorkee" />
      </div>
      <div>
        <label>Busy Stations: </label>
        <input value={busy} onChange={e => setBusy(e.target.value)} placeholder="e.g. Rishikesh" />
      </div>
      <button type="submit">Get Shortest Path</button>
    </form>
  );
};

export default StationForm;
