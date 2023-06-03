import React, { useState, useEffect } from "react";
import axios from "axios";
import { useMediaQuery } from "@material-ui/core";
import { useSelector } from "react-redux";
import VideoStream from "./VideoStream";
import Createroom from "./Createroom";
function Stream() {
  const isLaptopScreen = useMediaQuery("(min-width: 1280px)");
  const [userType, setUserType] = useState("");
  const [isInRoom, setIsInRoom] = useState(true);
  const [roomID, setRoomID] = useState("");
  const [userID, setUserID] = useState("");
  const baseAPI = process.env.REACT_APP_BASEAPI;
  const currentUser = useSelector((state) => {
    return state.currEmail[0].text;
  });

  const fetchUserDetails = async () => {
    try {
      const { data } = await axios.get(
        `${baseAPI}/get-user-email/${currentUser}`
      );
      setUserType(data[0].type);
      setUserID(data[0].id);

      if (data[0].type == "Host") {
        const response = await axios.get(
          `${baseAPI}/get-stream-status-host/${currentUser}`
        );
        console.log(response.data);
        if (response.data.status == "true") {
          setIsInRoom(true);
        } else {
          setIsInRoom(false);
        }
        setRoomID(response.data.room_id);
      } else {
        const response = await axios.get(
          `${baseAPI}/get-stream-status-guest/${currentUser}`
        );
        console.log(response.data.status);

        if (response.data.status == "true") {
          setIsInRoom(true);
        } else {
          setIsInRoom(false);
        }
        setRoomID(response.data.room_id);
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (isLaptopScreen) {
    if (userType === "Host") {
      if (isInRoom) {
        return <VideoStream email={currentUser} userID={userID} />;
      } else {
        return (
          <div className="h-full w-full p-5 text-center">
            <h1 className="text-2xl text- font-bold">
              Welcome Host , Lets create a new Video Room
            </h1>
            <Createroom
              userID={userID}
              email={currentUser}
              setIsInRoom={setIsInRoom}
              roomID={roomID}
            />
          </div>
        );
      }
    } else if (userType === "Guest") {
      if (isInRoom) {
        return <VideoStream email={currentUser} userID={userID} />;
      } else {
        return <div>Guest is not in any room</div>;
      }
    }
  } else {
    return <div>UI for small screens</div>;
  }

  return null;
}

export default Stream;
