import React from "react";
import Sidebar from "../Components/Dashboard/Sidebar";
import StateArea from "../Components/Dashboard/StateArea";
import { useMediaQuery } from "@material-ui/core";

function Dashboard() {
  const isLaptopScreen = useMediaQuery("(min-width: 1280px)");

  if (isLaptopScreen) {
    return (
      <div
        className=" flex justify-center items-center w-10/12 h-5/6 "
        style={{ backgroundColor: "gainsboro" }}
      >
        <div className="h-full p-5 w-1/12">
          <Sidebar />
        </div>
        <div className="h-full w-11/12 p-5">
          <StateArea />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex w-screen h-screen  bg-secondary">
        <div className="main-container flex flex-col">
          <Sidebar />
          <StateArea />
        </div>
      </div>
    );
  }
}

export default Dashboard;
