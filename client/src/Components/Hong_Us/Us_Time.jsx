import React, { useEffect, useState } from "react";

const Us_Timer = ({ convertedTimeUS }) => {
  const [usTime, setUsTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const usTime = now.toLocaleTimeString("en-US", {
        timeZone: "America/New_York",
      });

      setUsTime(usTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="us-container container">
      <h2>US Time</h2>
      <p>{convertedTimeUS ? convertedTimeUS : usTime}</p>
    </div>
  );
};

export default Us_Timer;
