var app = require("express")();
var http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});
var cors = require("cors");
app.use(cors());

app.get("/", function (req, res) {
  //send the index.html file for all requests
  res.sendFile(__dirname + "/index.html");
});

http.listen(3001, function () {
  console.log("listening on *:3001");
});

//for testing, we're just going to send data to the client every second
setInterval(function () {
  /*
    our message we want to send to the client: in this case it's just a random
    number that we generate on the server
  */
  var msg = {
    user: "user" + "-" + Math.floor(Math.random() * 10000),
    message: Math.random(),
    time: Date.now(),
  };
  io.emit("message", msg);
  console.log(msg);
}, 4000);
