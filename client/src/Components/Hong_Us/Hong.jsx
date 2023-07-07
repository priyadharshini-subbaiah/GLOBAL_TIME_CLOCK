import React, { useEffect, useState } from "react";
import "./hong_us.css";
const Hong = ({ convertedTime }) => {
  const [hongKongTime, setHongKongTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hongKongTime = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Hong_Kong" })
      ).toLocaleTimeString();

      setHongKongTime(hongKongTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="Hong-container container">
      <h2>Hong Kong Time</h2>

      <p>{convertedTime ? convertedTime : hongKongTime}</p>
    </div>
  );
};

export default Hong;
