import React, { useRef, useEffect, useState } from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import { Icon } from "@mui/material";
import CartoonImage from "../../../assets/svg/girl.svg";
import axios from "axios";

function Createroom({ userID, email, setIsInRoom, roomID }) {
  const videoRef = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const baseAPI = process.env.REACT_APP_BASEAPI;

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const constraints = { video: isCameraOn, audio: isAudioOn };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startWebcam();
  }, [isCameraOn, isAudioOn]);

  const toggleCamera = () => {
    setIsCameraOn((prevState) => !prevState);
  };

  const toggleAudio = () => {
    setIsAudioOn((prevState) => !prevState);
  };

  const handleJoinStream = async () => {
    try {
      if (title !== "" && description !== "") {
        const { data } = await axios.post(`${baseAPI}/save-stream-details`, {
          title: title,
          description: description,
          host_id: userID,
        });

        await axios.post(`${baseAPI}/set-stream-status`, {
          hostID: userID,
          roomID: roomID,
          status: "true",
        });

        setIsInRoom(true);
      } else {
        alert("Enter both title and description");
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="w-full h-full  flex justify-center  items-center ">
      {isCameraOn ? (
        <div className="mx-5  h-6/6 w-4/12">
          <video ref={videoRef} autoPlay playsInline />
          <div className="my-5 flex justify-evenly items-center">
            <Icon
              component={!isCameraOn ? VideocamIcon : VideocamOffIcon}
              onClick={toggleCamera}
              sx={{ fontSize: "30px" }}
            />

            <Icon
              component={!isAudioOn ? MicIcon : MicOffIcon}
              onClick={toggleAudio}
              sx={{ fontSize: "30px" }}
            />
          </div>
        </div>
      ) : (
        <div className="mx-5 my-5   flex-col justify-center items-center ">
          <img src={CartoonImage} style={{ width: "300px" }} className="" />
          <div className="my-5 flex justify-evenly items-center">
            <Icon
              component={!isCameraOn ? VideocamIcon : VideocamOffIcon}
              onClick={toggleCamera}
              sx={{ fontSize: "30px" }}
            />

            <Icon
              component={!isAudioOn ? MicIcon : MicOffIcon}
              onClick={toggleAudio}
              sx={{ fontSize: "30px" }}
            />
          </div>
        </div>
      )}

      <div className="w-4/12 flex-col justify-center items-center">
        <input
          type="text"
          value={title}
          placeholder="Enter Stream Title"
          onChange={(e) => setTitle(e.target.value)}
          className="outline-none my-3 p-3"
        />
        <input
          type="text"
          value={description}
          placeholder="Enter Stream Description"
          onChange={(e) => setDescription(e.target.value)}
          className="outline-none my-3 p-3"
        />
        <button
          className="btn btn-secondary btn- btn-outline"
          onClick={handleJoinStream}
        >
          Create room
        </button>
      </div>
    </div>
  );
}

export default Createroom;
