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

Stream.saveStreamDetails = (title, description, host_id) => {
  const id = uuid.v4();
  const date = dateGenerator();
  const timeStamp = new Date().getTime();
  return new Promise((resolve, reject) => {
    db.query(
      `insert into  Video_Stream (id,title, description, start_time, host_id,date) 
      values ('${id}','${title}','${description}','${timeStamp}','${host_id}','${date}')`,
      (err, results) => {
        if (err) {
          resolve({ status: false });
          console.log(err);
        } else {
          resolve({ status: true, id: id });
        }
      }
    );
  });
};

Stream.endStream = (id, video_url) => {
  const timeStamp = new Date().getTime();
  return new Promise((resolve, reject) => {
    db.query(
      `update  Video_Stream set end_time='${timeStamp}' , video_url='${video_url}' where id='${id}'`,
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

Stream.getCurrentStreamingStatusofHost = (email) => {
  return new Promise((resolve, reject) => {
    db.query(`select * from User where email='${email}'`, (err, results) => {
      if (err || results.length <= 0) {
        resolve({ status: "Invalid emailID" });
      } else {
        db.query(
          `SELECT status,room_id
          FROM StreamingStatus
          WHERE host_id = '${results[0].id}'
          ORDER BY id DESC
          LIMIT 1;
          `,
          (error, data) => {
            if (error) {
              console.log(error);
            } else {
              console.log(data[0]);
              resolve(data[0]);
            }
          }
        );
      }
    });
  });
};

Stream.getCurrentStreamingStatusforGuest = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      `select college_id, department_id from User where email='${email}'`,
      (err, results) => {
        if (err || results.length <= 0) {
          resolve({ status: "Invalid emailID" });
        } else {
          db.query(
            `SELECT U.id, U.name, S.status, S.room_id FROM User AS U INNER JOIN StreamingStatus AS S ON U.id = S.host_id
            INNER JOIN Department AS D ON S.room_id = D.room_id WHERE U.type = 'Host'
            AND U.college_id = '${results[0].college_id}'
            AND U.department_id = '${results[0].department_id}'
            AND S.status = 'true';
          `,
            (error, data) => {
              if (error) {
                console.log(error);
              } else {
                console.log(data);
                resolve(data[0]);
              }
            }
          );
        }
      }
    );
  });
};

module.exports = Stream;
