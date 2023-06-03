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
      const { title, description, host_id } = req.body;
      const data = await Stream.saveStreamDetails(title, description, host_id);
      res.send(data);
    } catch (err) {
      console.log(err);
      res.send("Something went wrong!!");
    }
  },

  endStream: async (req, res) => {
    try {
      const { id, video_url } = req.body;
      const data = await Stream.endStream(id, video_url);
      res.send(data);
    } catch (err) {
      console.log(err);
      res.send("Something went wrong!!");
    }
  },

  getCurrentStreamingStatusofHost: async (req, res) => {
    try {
      const { email } = req.params;
      const data = await Stream.getCurrentStreamingStatusofHost(email);
      res.send(data);
    } catch (err) {
      res.send("Something went wrong!!");
    }
  },

  getCurrentStreamingStatusforGuest: async (req, res) => {
    try {
      const { email } = req.params;
      const data = await Stream.getCurrentStreamingStatusforGuest(email);
      res.send(data);
    } catch (err) {
      res.send("Something went wrong!!");
    }
  },
};

module.exports = VideoHandler;
