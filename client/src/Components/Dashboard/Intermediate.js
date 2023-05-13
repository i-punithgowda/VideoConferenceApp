import React, { useState, useEffect } from "react";
import Additional from "./Additional";
import axios from "axios";
import Dashboard from "../../Pages/Dashboard";
import { useSelector } from "react-redux";
import Verification from "./Verification";

function Intermediate() {
  const currentUser = useSelector((state) => {
    return state.currEmail[0].text;
  });
  console.log(currentUser);
  const [newUser, setNewUser] = useState(true);
  const [isVerified, setIsVerified] = useState(true);
  const baseAPI = process.env.REACT_APP_BASEAPI;
  const getUserStatus = async () => {
    const { data } = await axios.post(`${baseAPI}/get-status`, {
      email: currentUser,
    });
    console.log("data : ", data);
    if (data[0].new_user == 1 && data[0].isVerified == 1) {
      setNewUser(true);
      setIsVerified(true);
    } else if (data[0].new_user == 0 && data[0].isVerified == 1) {
      setNewUser(false);
      setIsVerified(true);
    } else if (data[0].new_user == 1 && data[0].isVerified == 0) {
      setNewUser(true);
      setIsVerified(false);
    }
  };

  useEffect(() => {
    getUserStatus();
  }, []);

  return (
    <div className="w-screen h-screen flex  justify-center items-center bg-secondary">
      {newUser && isVerified ? (
        <Additional setNewUser={setNewUser} />
      ) : !newUser && isVerified ? (
        <Dashboard />
      ) : newUser && !isVerified ? (
        <Verification />
      ) : null}
    </div>
  );
}

export default Intermediate;
