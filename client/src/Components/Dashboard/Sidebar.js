import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { stateModifier } from "../../features/reducers/state-slice";

import { useMediaQuery } from "@material-ui/core";
import Avatar from "../../assets/cartoon_images/1.png";
import Logo from "../../assets/png/EduMeetLogo.png";
import VideocamIcon from "@mui/icons-material/Videocam";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import LogoutIcon from "@mui/icons-material/Logout";
import { Icon } from "@mui/material";
import { useSelector } from "react-redux";
import { authModifier } from "../../features/reducers/auth-slice";

function Sidebar() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const isLaptopScreen = useMediaQuery("(min-width: 1280px)");
  const state = useSelector((state) => state.currState.value);
  console.log(state);
  const handleStateModification = (val) => {
    dispatch(stateModifier(val));
    setIsOpen(false);
  };

  useEffect(() => {
    dispatch(stateModifier("stream"));
  }, []);

  if (isLaptopScreen) {
    return (
      <div
        className="h-full w-16 bg-neutral-content rounded-2xl flex flex-col 
      justify-center items-center justify-around "
      >
        <img src={Logo} alt="" style={{ width: "20px" }} />
        <div className="flex-items flex flex-col justify-evenly items-center h-4/6">
          <Icon
            component={VideocamIcon}
            className={`${
              state == "stream" ? "text-secondary" : "text-base-300"
            }`}
            onClick={() => handleStateModification("stream")}
          />
          <Icon
            component={CloudDownloadIcon}
            className={`${
              state == "upload" ? "text-secondary" : "text-base-300"
            }`}
            onClick={() => handleStateModification("upload")}
          />
          <Icon
            component={DateRangeIcon}
            className={`${
              state == "schedule" ? "text-secondary" : "text-base-300"
            }`}
            onClick={() => handleStateModification("schedule")}
          />
          <Icon
            component={ShowChartIcon}
            className={`${
              state == "attendance" ? "text-secondary" : "text-base-300"
            }`}
            onClick={() => handleStateModification("attendance")}
          />
        </div>
        <div className="logout" onClick={() => dispatch(authModifier(false))}>
          <Icon component={LogoutIcon} className="text-base-500" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="navbar bg-base-100 sidebar-container w-screen ">
        <div className="navbar-start">
          <div className="dropdown" onClick={() => setIsOpen(!isOpen)}>
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            {isOpen && (
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a onClick={() => handleStateModification("stream")}>
                    Stream
                  </a>
                </li>
                <li>
                  <a onClick={() => handleStateModification("upload")}>
                    Uploads
                  </a>
                </li>
                <li>
                  <a onClick={() => handleStateModification("schedule")}>
                    Schedule
                  </a>
                </li>
                <li>
                  <a onClick={() => handleStateModification("attendance")}>
                    Attendance
                  </a>
                </li>

                <li id="lol">
                  <a onClick={() => dispatch(authModifier(false))}>Logout</a>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="navbar-center  w-48">
          <a className="btn btn-ghost normal-case text-xl">
            <span className="text-blue-600 text-xl">Edu</span>Meet
          </a>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={Avatar} />
            </div>
          </label>
        </div>
      </div>
    );
  }
}

export default Sidebar;
