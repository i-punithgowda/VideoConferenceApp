import React, { useState, useEffect, useRef, useMemo } from "react";
import { useMediaQuery } from "@material-ui/core";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicIcon from "@mui/icons-material/Mic";
import { makeStyles } from "@material-ui/core/styles";
import MicOffIcon from "@mui/icons-material/MicOff";
import TextField from "@material-ui/core/TextField";
import CallEndIcon from "@mui/icons-material/CallEnd";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@material-ui/core/IconButton";
import { faComment } from "@fortawesome/free-solid-svg-icons/faComment";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";
import axios from "axios";
import io from "socket.io-client";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
  textField: {
    width: "80%",
    marginRight: theme.spacing(1),
  },
  sendButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

function Stream() {
  // const socket = io("http://localhost:3001");
  const isLaptopScreen = useMediaQuery("(min-width: 1280px)");
  const messagesContainerRef = useRef();
  const [userType, setUserType] = useState("");
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [recordOn, setRecordOn] = useState(true);
  const [messageText, setMessageText] = useState("");
  const [ScreenShareOn, setScreenShareOn] = useState(true);
  const [messages, setMessages] = useState([]);
  const classes = useStyles();

  const currentUser = useSelector((state) => {
    return state.currEmail[0].text;
  });
  console.log("Current user email : ", currentUser);

  const baseAPI = process.env.REACT_APP_BASEAPI;

  const fetchUserDetails = async () => {
    const { data } = await axios.get(
      `${baseAPI}/get-user-email/${currentUser}`
    );
    console.log(data);
    setUserType(data[0].type);
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const renderedMessages = useMemo(() => {
    return messages.map((message, index) => (
      <div key={index} className="w-full">
        <p className="">{message.user}</p>
        <div className=" bg-blue-500 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl my-3 p-5 text-neutral-content font-bold w-full">
          <p className="">{message.message}</p>
        </div>
      </div>
    ));
  }, [messages]);

  // useEffect(() => {
  //   socket.on("message", (message) => {
  //     setMessages([...messages, message]);
  //     console.log(message);
  //   });

  //   const container = messagesContainerRef.current;
  //   if (container) {
  //     container.scrollTop = container.scrollHeight;
  //   }
  // }, [messages]);

  if (isLaptopScreen) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="video-stream-container  h-full flex flex-col justify-around items-center w-9/12 ">
          <div className="remote-users-container flex  w-full h-2/6 items-center  overflow-x-scroll">
            <div className="h-40 w-56 rounded-2xl flex justify-center items-center bg-neutral mx-3 text-neutral-content p-16">
              Punith Gowda
            </div>

            <div className="h-40 w-56 rounded-2xl flex justify-center items-center bg-neutral mx-3 text-neutral-content p-16">
              Punith Gowda
            </div>

            <div className="h-40 w-56 rounded-2xl flex justify-center items-center bg-neutral mx-3 text-neutral-content p-16">
              Punith Gowda
            </div>

            <div className="h-40 w-56 rounded-2xl flex justify-center items-center bg-neutral mx-3 text-neutral-content p-16">
              Punith Gowda
            </div>

            <div className="h-40 w-56 rounded-2xl flex justify-center items-center bg-neutral mx-3 text-neutral-content p-16">
              Punith Gowda
            </div>

            <div className="h-40 w-56 rounded-2xl flex justify-center items-center bg-neutral mx-3 text-neutral-content p-16">
              Punith Gowda
            </div>

            <div className="h-40 w-56 rounded-2xl flex justify-center items-center bg-neutral mx-3 text-neutral-content p-16">
              Punith Gowda
            </div>

            <div className="h-40 w-56 rounded-2xl flex justify-center items-center bg-neutral mx-3 text-neutral-content p-16">
              Punith Gowda
            </div>

            <div className="h-40 w-56 rounded-2xl flex justify-center items-center bg-neutral mx-3 text-neutral-content p-16">
              Punith Gowda
            </div>

            <div className="h-40 w-56 rounded-2xl flex justify-center items-center bg-neutral mx-3 text-neutral-content p-16">
              Punith Gowda
            </div>

            <div className="h-40 w-56 rounded-2xl flex justify-center items-center bg-neutral mx-3 text-neutral-content p-16">
              Punith Gowda
            </div>

            <div className="h-40 w-56 rounded-2xl flex justify-center items-center bg-neutral mx-3 text-neutral-content p-16">
              Punith Gowda
            </div>

            <div className="h-40 w-56 rounded-2xl flex justify-center items-center bg-neutral mx-3 text-neutral-content p-16">
              Punith Gowda
            </div>

            <div className="h-40 w-56 rounded-2xl flex justify-center items-center bg-neutral mx-3 text-neutral-content p-16">
              Punith Gowda
            </div>

            <div className="h-40 w-56 rounded-2xl flex justify-center items-center bg-neutral mx-3 text-neutral-content p-16">
              Punith Gowda
            </div>

            <div className="h-40 w-56 rounded-2xl flex justify-center items-center bg-neutral mx-3 text-neutral-content p-16">
              Punith Gowda
            </div>
          </div>
          <div className="host-user-container h-3/6 w-full bg-neutral-content my-3 rounded-3xl border-2 border-red-500"></div>
          <div className="controls-container h-1/6 w-full flex justify-evenly items-center ">
            <div style={{ backgroundColor: "#E3E0DB", borderRadius: "50%" }}>
              <IconButton style={{ color: "#000" }}>
                {micOn ? <MicIcon /> : <MicOffIcon />}
              </IconButton>
            </div>

            <div style={{ backgroundColor: "#E3E0DB", borderRadius: "50%" }}>
              <IconButton style={{ color: "#000" }}>
                {videoOn ? <VideocamIcon /> : <VideocamOffIcon />}
              </IconButton>
            </div>
            <div style={{ backgroundColor: "", borderRadius: "50%" }}>
              <IconButton style={{ color: "#000" }}>
                <CallEndIcon />
              </IconButton>
            </div>

            <div style={{ backgroundColor: "#E3E0DB", borderRadius: "50%" }}>
              <IconButton
                disabled={userType && userType === "Host" ? false : true}
                style={{ color: userType === "Host" ? "#000" : "grey" }}
              >
                {!ScreenShareOn ? <ScreenShareIcon /> : <StopScreenShareIcon />}
              </IconButton>
            </div>
          </div>
        </div>
        <div className="chats-container h-full w-3/12 bg-neutral-content ml-3  py-8 flex justify-between items-center flex-col">
          <div className="chats-container-header w-full text-center flex justify-center items-center ">
            <FontAwesomeIcon icon={faComment} />
            <h1 className="mx-3 text-xl ">Conversation</h1>
          </div>
          <div
            className="messages-container  h-5/6 w-full p-5 overflow-scroll text-neutral"
            ref={messagesContainerRef}
          >
            {renderedMessages}
          </div>
          <div className="chat-form-container p-3 flex justify-evenly items-center">
            <div className={classes.container}>
              <TextField
                id="chat-input"
                label="Type your message"
                variant="outlined"
                className={classes.textField}
              />
              <IconButton
                color="primary"
                aria-label="send message"
                className={classes.sendButton}
              >
                <SendIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Wait for mobile screen !</h1>;
  }
}

export default Stream;
