const db = require("../db/db");
const uuid = require("uuid");

const Video = {};

Video.saveVideo = (data) => {
  const id = uuid.v4();
  return db.query(
    `INSERT INTO Video_Stream VALUES (${id},${data.title},${data.description},${data.start_time},${data.end_time},${data.host_id},${data.path})`
  );
};

Video.saveAttendance = async (data) => {
  const { stream_id, users_attended } = data;
  const attendanceRecords = [];

  for (const user_id of users_attended) {
    const uuid = uuidv4();
    const query = `INSERT INTO Attendance (uuid, user_id, stream_id) VALUES (?, ?, ?)`;
    const values = [uuid, user_id, stream_id];

    try {
      const result = await db.query(query, values);
      attendanceRecords.push(result);
    } catch (err) {
      console.error(err);
      return "Error while saving attendance.";
    }
  }

  return attendanceRecords;
};

Video.saveComment = (data) => {
  const id = uuid.v4();
  return db.query(
    `INSERT INTO Comment VALUES ('${id}','${data.user_id}','${data.video_stream_id}','${data.comment_text}','${data.timestamp}')`
  );
};

Video.saveReplies = (data) => {
  const id = uuid.v4();
  return db.query(
    `INSERT INTO Reply VALUES ('${id}','${data.user_id}','${data.comment_id}','${data.reply_text}','${data.timestamp}')`
  );
};

Video.getVideos = (id) => {
  return db.query(`select * from Video_Stream where host_id='${id}'`);
};

Video.getComments = (id) => {
  return db.query(`select * from Comment where video_stream_id ='${id}'`);
};

Video.getReplies = (id) => {
  return db.query(`select * from Reply where comment_id='${id}'`);
};

module.exports = Video;
