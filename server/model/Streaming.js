const db = require("../db/db");
const uuid = require("uuid");
const dateGenerator = require("../utils/DateGenerator");

const Stream = {};

Stream.setStreamingStatus = (hostID, roomID, status) => {
  return new Promise((resolve, reject) => {
    db.query(
      `insert into  StreamingStatus (host_id,room_id,status) values ('${hostID}','${roomID}','${status}')`,
      (err, results) => {
        if (err) {
          resolve({ status: false });
          console.log(err);
        } else {
          resolve({ status: true });
        }
      }
    );
  });
};

Stream.updateStreamingStatus = (hostID) => {
  console.log(hostID);
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE StreamingStatus
        SET status = 'false'
        WHERE host_id = '${hostID}' AND status='true';
        `,
      (err, results) => {
        if (err) {
          resolve({ status: false });
          console.log(err);
        } else {
          resolve({ status: true });
        }
      }
    );
  });
};

Stream.saveStreamDetails = (title, description, host_id, video_url) => {
  const id = uuid.v4();
  const date = dateGenerator();
  const timeStamp = new Date().getTime();
  return new Promise((resolve, reject) => {
    db.query(
      `insert into  Video_Stream (id,title, description, start_time, host_id,date,video_url) 
      values ('${id}','${title}','${description}','${timeStamp}','${host_id}','${date}','${video_url}')`,
      (err, results) => {
        if (err) {
          resolve({ status: false });
          console.log(err);
        } else {
          resolve({ status: true });
        }
      }
    );
  });
};

Stream.endStream = () => {
  const timeStamp = new Date().getTime();
  return new Promise((resolve, reject) => {
    db.query(
      `update  Video_Stream set end_time='${timeStamp}'`,
      (err, results) => {
        if (err) {
          resolve({ status: false });
          console.log(err);
        } else {
          resolve({ status: true });
        }
      }
    );
  });
};

module.exports = Stream;
