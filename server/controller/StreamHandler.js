const Stream = require("../model/Streaming");
const fs = require("fs");

const VideoHandler = {
  setStreamingStatus: async (req, res) => {
    try {
      const { hostID, roomID, status } = req.body;
      const data = await Stream.setStreamingStatus(hostID, roomID, status);
      res.send(data);
    } catch (err) {
      res.send("Something went wrong!");
    }
  },

  updateStreamingStatus: async (req, res) => {
    try {
      const { hostID } = req.body;
      const data = await Stream.updateStreamingStatus(hostID);
      console.log(data);
      res.send(data);
    } catch (err) {
      res.send("Something went wrong!!");
    }
  },

  saveStreamDetails: async (req, res) => {
    try {
      const { title, description, host_id, video_url } = req.body;
      const data = await Stream.saveStreamDetails(
        title,
        description,
        host_id,
        video_url
      );
      res.send(data);
    } catch (err) {
      console.log(err);
      res.send("Something went wrong!!");
    }
  },
};

module.exports = VideoHandler;
