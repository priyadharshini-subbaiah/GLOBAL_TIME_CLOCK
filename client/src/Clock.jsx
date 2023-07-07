import React, { useState } from "react";
import moment from "moment-timezone";

const IndianToHongKongTimeConverter = () => {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [period, setPeriod] = useState("AM");
  const [convertedTime, setConvertedTime] = useState("");

  const convertTime = () => {
    const indianTime = moment.tz(
      `${hours}:${minutes}:${seconds} ${period}`,
      "HH:mm:ss A",
      "Asia/Kolkata"
    );
    const hongKongTime = indianTime.clone().tz("Asia/Hong_Kong");
    const formattedTime = hongKongTime.format("hh:mm:ss A");

    setConvertedTime(formattedTime);
  };

  return (
    <div>
      <div>
        <label>Hours:</label>
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />
      </div>
      <div>
        <label>Minutes:</label>
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />
      </div>
      <div>
        <label>Seconds:</label>
        <input
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
        />
      </div>
      <div>
        <label>AM/PM:</label>
        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
      <button onClick={convertTime}>Convert</button>
      {convertedTime && <div>Converted Time: {convertedTime}</div>}
    </div>
  );
};

export default IndianToHongKongTimeConverter;
