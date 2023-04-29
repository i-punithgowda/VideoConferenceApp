const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db/db");
const UserHandler = require("./controller/UserHandler");
const VideoHandler = require("./controller/VideoHandler");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("API working...");
});

//routes

//colleges

app.get("/get-colleges", UserHandler.getColleges);
app.get("/get-college-by-id/:collegeID", UserHandler.getCollegeById);
app.get("/get-dept/:collegeID", UserHandler.getDepartments);
app.get("/get-dept-by-id/:deptID", UserHandler.getDepartmentByID);
app.post("/save-college", UserHandler.saveColleges);
app.post("/save-dept", UserHandler.saveDepartment);
app.get("/get-college-dept/:userID", UserHandler.getCollegeAndDepartmentOfUser);

//user
app.post("/save-user", UserHandler.createUser);
app.get("/get-all-users", UserHandler.getAllUser);
app.get("/get-user/:id", UserHandler.getSpecificUser);
app.post("/login", UserHandler.login);

//Video related routes

app.post("/save-video", VideoHandler.SaveVideo);
app.post("/save-attendance", VideoHandler.SaveAttendance);
app.post("/save-comment", VideoHandler.SaveComments);
app.post("/save-reply", VideoHandler.SaveReplies);

db.connect((err) => {
  if (!err) {
    console.log("Database connected...");
    app.listen(PORT || 4001, () => {
      console.log(`Server running on PORT ${PORT}`);
    });
  } else {
    console.log("Error occured while connecting to database");
  }
});
