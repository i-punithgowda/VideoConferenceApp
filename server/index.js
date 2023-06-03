const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db/db");
const UserHandler = require("./controller/UserHandler");
const StreamHandler = require("./controller/StreamHandler");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");

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

//normal-auth

app.post("/create-user", UserHandler.createUser);
app.post("/login", UserHandler.login);
//oauth
app.post("/oauth", UserHandler.oauth);

app.post("/save-user-details", UserHandler.createUser);
app.get("/get-all-users", UserHandler.getAllUser);
app.get("/get-user/:id", UserHandler.getSpecificUser);
app.get("/get-user-email/:email", UserHandler.getSpecificUserByEmail);
app.post("/get-status", UserHandler.userStatus);
app.put("/verify", UserHandler.verifyUser);
app.put("/additional-info", UserHandler.additionalInfo);
app.put("/forgot-password", UserHandler.forgotPassword);

//Stream related routes

app.post("/set-stream-status", StreamHandler.setStreamingStatus);
app.put("/update-stream-status", StreamHandler.updateStreamingStatus);
app.post("/save-stream-details", StreamHandler.saveStreamDetails);
app.put("/end-stream", StreamHandler.endStream);
app.get(
  "/get-stream-status-host/:email",
  StreamHandler.getCurrentStreamingStatusofHost
);
app.get(
  "/get-stream-status-guest/:email",
  StreamHandler.getCurrentStreamingStatusforGuest
);

app.post("/save-video", upload.single("file"), (req, res) => {
  try {
    console.log(req.file);
    const fileData = req.file;

    // Create a new file stream to save the uploaded file as an MP4
    const fileStream = fs.createWriteStream(`uploads/${fileData.filename}.mp4`);

    // Pipe the uploaded file data to the file stream
    fs.createReadStream(fileData.path).pipe(fileStream);

    // Respond to the client with a success message
    res.send({ status: true, video_url: `uploads/${fileData.filename}.mp4` });
  } catch (err) {
    res.send(err);
  }
});

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
