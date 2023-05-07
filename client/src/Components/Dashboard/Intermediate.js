import React, { useState, useEffect } from "react";
import Additional from "./Additional";
import Dashboard from "./Dashboard";

function Intermediate() {
  const [newUser, setNewUser] = useState(false);

  return <div>{newUser ? <Additional /> : <Dashboard />}</div>;
}

export default Intermediate;
