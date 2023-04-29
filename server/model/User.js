const db = require("../db/db");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const fs = require("fs");
const { parse } = require("csv-parse");
const path = require("path");
const imagesDir = path.join(__dirname, "../cartoon_images");
const User = {};

User.create = async (user) => {
  const id = uuid.v4();
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);

  return new Promise((resolve, reject) => {
    db.query(
      `insert into User (id,name,email,password,user_image,type,college_id,department_id) values ('${id}','${user.name}','${user.email}','${hashedPassword}','${user.img_path}','${user.type}','${user.college_id}','${user.dept_id}')`,
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
};

User.getAll = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "select id , name , college_id, department_id , email , type, user_image from User",
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
};

User.getSpecificUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `select id,name,email,user_image,type from User where id='${id}'`,
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
};

User.login = (data) => {
  return new Promise((resolve, reject) => {
    const email = data.email;
    const password = data.password;

    db.query(
      `SELECT * FROM User WHERE email = ?`,
      [email],
      async (err, results) => {
        if (err) {
          reject(err);
        } else if (results.length === 0) {
          resolve({ status: "User does not exist" });
        } else {
          const hashedPassword = results[0].password;
          const match = await bcrypt.compare(password, hashedPassword);
          if (match) {
            resolve({ status: true });
          } else {
            resolve({ status: false });
          }
        }
      }
    );
  });
};

User.getColleges = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`select * from College`, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

User.getDepartments = (collegeID) => {
  return new Promise((resolve, reject) => {
    db.query(
      `select * from Department where college_id=${collegeID}`,
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
};

User.getCollegeByID = (collegeID) => {
  return new Promise((resolve, reject) => {
    db.query(`select * from College where id=${collegeID}`, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

User.getDepartmentByID = (deptID) => {
  return new Promise((resolve, reject) => {
    db.query(`select * from Department where id=${deptID}`, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

User.saveColleges = (collegeName) => {
  try {
    return new Promise((resolve, reject) => {
      db.query(
        `insert into College (college_name) values('${collegeName}')`,
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  } catch (err) {
    reject(err);
  }
};

User.saveDepartment = (data) => {
  try {
    return new Promise((resolve, reject) => {
      db.query(
        `insert into Department (department_name,college_id) values('${data.departmentName}','${data.collegeID}')`,
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  } catch (err) {
    reject(err);
  }
};

User.getCollegeAndDepartmentOfUser = (userID) => {
  try {
    return new Promise((resolve, reject) => {
      db.query(
        `select college_id,department_id from User where id='${userID}'`,
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            db.query(
              `select * from College where id='${results[0].college_id}'`,
              (error, collegeData) => {
                collegeName = collegeData[0].college_name;
                db.query(
                  `select * from Department where id='${results[0].department_id}'`,
                  (error, departmentData) => {
                    deptName = departmentData[0].department_name;
                    resolve({ collegeName: collegeName, deptName: deptName });
                  }
                );
              }
            );
          }
        }
      );
    });
  } catch (err) {
    reject(err);
  }
};

module.exports = User;
