import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProtectedRoute from "./Components/ProtectedRoutes/ProtectedRoute";
import Intermediate from "./Components/Dashboard/Intermediate";
import Verify from "./Pages/Verify";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route
          exact
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Intermediate />
            </ProtectedRoute>
          }
        />
        <Route exact path="/verify/:email" element={<Verify />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
