import React, { useEffect, useState } from "react";
import Us_Timer from "../Hong_Us/Us_Time";
import Hong from "../Hong_Us/Hong";
import moment from "moment-timezone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

const IndianTimeDisplay = () => {
  const [indianTime, setIndianTime] = useState(
    new Date().toLocaleTimeString("en-IN")
  );



  useEffect(() => {
    const interval = setInterval(() => {
      setIndianTime(new Date().toLocaleTimeString("en-IN"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  const [hours, setHours] = useState("");

  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [period, setPeriod] = useState("AM");
  const [convertedTime, setConvertedTime] = useState("");
  const [convertedTimeUS, setConvertedTimeUS] = useState("");
  const [converter,Setconverter] = useState("")
  // const [convertedTimeIndia,setConvertedTimeIndia]=useState("")
  const [show ,setshow] = useState(false)
  let convertcombine;
  const convertTime = () => {
    
    if (hours == "" || minutes == "" || seconds == "") {
      alert("Please Fill The Field First");
    } else {
      const indianTime = moment.tz(
        `${hours}:${minutes}:${seconds} ${period}`,
        "HH:mm:ss A",
        "Asia/Kolkata"
      );
      convertcombine = hours +":"+minutes+":"+seconds+":"+period
      console.log(convertcombine)
      // setIndianTime(convertcombine)


      Setconverter(hours +":"+minutes+":"+seconds+":"+period)
    
      let dd= document.querySelector(".show-current-time")
      dd.style.display="none"
      console.log(dd)

   
      let d= document.querySelector(".converting");
      d.style.display="block"
      console.log(d)
      


      const hongKongTime = indianTime.clone().tz("Asia/Hong_Kong");
      const formattedTime = hongKongTime.format("hh:mm:ss A");

      setConvertedTime(formattedTime);

      const USTime = indianTime.clone().tz("America/New_York");
      const USformattedTime = USTime.format("hh:mm:ss A");

      setConvertedTimeUS(USformattedTime);
    }
  };

  const handleTimeSubmit = () => {
    if (hours == "" || minutes == "" || seconds == "") {
      toast.warning("Please type the time to convert and store");
    } else {
      convertTime();

      try {
        const data = {
          hours: parseInt(hours),
          minutes: parseInt(minutes),
          seconds: parseInt(seconds),
          am_pm: period,
        };

        fetch("http://localhost:8000/api/store", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        toast.success("Stored!!!");
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="container-home">
      <div className="time-container">
        <Hong convertedTime={convertedTime} />

        <div className="container">
          <h2>Indian Time</h2>
          <p className="show-current-time"> 
            {indianTime}
          </p>

          <p style={{display:"none"}}  className="converting"> 
          {converter}
          </p>
         
        </div>

        <Us_Timer convertedTimeUS={convertedTimeUS} />
      </div>
      <div className="input-wrapper-container">
        <div className="input-wrapper">
          <input
            placeholder="Hours"
            type="text"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <input
            placeholder="Minutes"
            type="text"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <input
            placeholder="Seconds"
            type="text"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
        <button onClick={handleTimeSubmit}>Convert/Store</button>
        {/* {convertedTime && <div>Converted Time: {convertedTime}</div>} */}
      </div>
      {/* <CustomInput /> */}
      <ToastContainer />
    </div>
  );
};

export default IndianTimeDisplay;
