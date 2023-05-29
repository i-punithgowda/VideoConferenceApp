import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Stream from "./StateComponents/Stream";
import Uploads from "./StateComponents/Uploads";
import Schedule from "./StateComponents/Schedule";
import Attendance from "./StateComponents/Attendance";
import axios from "axios";

function StateArea() {
  const [userType, setUserType] = useState("");
  const currState = useSelector((state) => state.currState.value);

  console.log(currState);

  return (
    <div className="state-container w-full h-full ">
      {currState == "stream" ? (
        <Stream />
      ) : currState == "upload" ? (
        <Uploads />
      ) : currState == "schedule" ? (
        <Schedule />
      ) : currState == "attendance" ? (
        <Attendance />
      ) : null}
    </div>
  );
}

export default StateArea;
