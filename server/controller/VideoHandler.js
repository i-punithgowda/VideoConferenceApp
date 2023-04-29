const Video = require("../model/Video");

const VideoHandler = {
  SaveVideo: async (req, res) => {
    try {
      const data = req.body;
      await Video.saveVideo(data);
      res.status(200).send("Video Saved!!!");
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong while saving video!!!");
    }
  },

  getVideos: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Video.getVideos(id);
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong !");
    }
  },

  SaveAttendance: async (req, res) => {
    try {
      const data = req.body;
      await Video.saveAttendance(data);
      res.status(200).send("Attendance saved!!");
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong!!");
    }
  },

  SaveComments: async (req, res) => {
    try {
      const data = req.body;
      await Video.saveComment(data);
      res.status(200).send("Comment saved!!");
    } catch (err) {
      connsole.log(err);
      res.status(500).send("Something went wrong!!");
    }
  },

  SaveReplies: async (req, res) => {
    try {
      const data = req.body;
      await Video.saveReplies(data);
      res.status(200).send("Reply saved!!");
    } catch (err) {
      connsole.log(err);
      res.status(500).send("Something went wrong!!");
    }
  },
};

module.exports = VideoHandler;
