import React from "react";

const PathResult = ({ path, distance }) => {
  if (!path || path.length === 0) {
    return <p>No valid path found</p>;
  }

  return (
    <div>
      <h2>Shortest Path</h2>
      <p>Path: {path.join(" -> ")}</p>
      <p>Distance: {distance} km</p>
    </div>
  );
};

export default PathResult;
