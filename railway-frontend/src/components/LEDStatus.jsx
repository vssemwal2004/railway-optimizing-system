import React from "react";

function LEDStatus({ path, busy }) {
  const greenLED = path || [];
  const redLED = busy || [];

  return (
    <div>
      <h3>IoT LED Status</h3>
      <p>🟢 Green (Train Route): {greenLED.join(", ")}</p>
      <p>🔴 Red (Busy): {redLED.join(", ")}</p>
    </div>
  );
}

export default LEDStatus;
