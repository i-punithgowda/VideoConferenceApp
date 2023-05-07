import React, { useState, useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";
import axios from "axios";
import Image4 from "../../assets/cartoon_images/4.png";
import Image6 from "../../assets/cartoon_images/6.png";
import Image7 from "../../assets/cartoon_images/7.png";
import Image8 from "../../assets/cartoon_images/8.png";
import Image9 from "../../assets/cartoon_images/9.png";
import Image10 from "../../assets/cartoon_images/10.png";
import Image12 from "../../assets/cartoon_images/12.png";
import Image13 from "../../assets/cartoon_images/13.png";
import Image14 from "../../assets/cartoon_images/14.png";
import Image15 from "../../assets/cartoon_images/15.png";

function Additional() {
  const [colleges, setColleges] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [userType, setUserType] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const images = [
    Image4,
    Image6,
    Image7,
    Image8,
    Image9,
    Image10,
    Image12,
    Image13,
    Image14,
    Image15,
  ];
  const types = [
    {
      id: "1",
      type: "Host",
    },
    {
      id: "2",
      type: "Guest",
    },
  ];
  const baseAPI = process.env.REACT_APP_BASEAPI;

  const fetchColleges = async () => {
    try {
      const { data } = await axios.get(`${baseAPI}/get-colleges`);
      setColleges(data);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  const handleChange = async (e) => {
    try {
      const val = e.target.value;
      const { data } = await axios.get(`${baseAPI}/get-dept/${val}`);
      console.log(data);
      setSelectedCollege(val);
      setDepartments(data);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="additional-details-container h-screen w-screen flex justify-center items-center lg:bg-secondary ">
      <div className="user-info w-full h-full lg:w-8/12 bg-neutral-content  lg:h-5/6 lg:rounded-2xl p-5 flex justify-center items-center flex-col">
        <h1 className="text text-secondary text-xl lg:text-3xl font-bold">
          {" "}
          New here ? we need few more details
        </h1>

        <div className="fields-container  flex flex-col lg:flex-row lg:flex-wrap h-5/6 lg:h-5/6 justify-evenly items-center w-10/12">
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            size="small"
            sx={{
              width: { xs: "300px", sm: "300px", md: "500px", lg: "600px" },
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            id="outlined-basic"
            label="Email"
            disabled
            variant="outlined"
            size="small"
            sx={{
              width: { xs: "300px", sm: "300px", md: "500px", lg: "600px" },
            }}
            value={email}
          />

          <TextField
            select
            onChange={handleChange}
            id="outlined-basic"
            label="College name"
            variant="outlined"
            size="small"
            sx={{
              width: { xs: "300px", sm: "300px", md: "500px", lg: "600px" },
            }}
          >
            {colleges.length > 0
              ? colleges.map((college) => (
                  <MenuItem key={college.id} value={college.id}>
                    {college.college_name}
                  </MenuItem>
                ))
              : null}
          </TextField>

          <TextField
            select
            onChange={(e) => {
              setSelectedDepartment(e.target.value);
              console.log(e.target.value);
            }}
            id="outlined-basic"
            label="Department name"
            variant="outlined"
            size="small"
            sx={{
              width: { xs: "300px", sm: "300px", md: "500px", lg: "600px" },
            }}
          >
            {departments.length > 0
              ? departments.map((department) => (
                  <MenuItem key={department.id} value={department.id}>
                    {department.department_name}
                  </MenuItem>
                ))
              : null}
          </TextField>

          <TextField
            select
            onChange={(e) => {
              setUserType(e.target.value);
              console.log(e.target.value);
            }}
            id="outlined-basic"
            label="User Type"
            variant="outlined"
            size="small"
            sx={{
              width: { xs: "300px", sm: "300px", md: "500px", lg: "600px" },
            }}
          >
            {types.length > 0
              ? types.map((type) => (
                  <MenuItem key={type.id} value={type.type}>
                    {type.type}
                  </MenuItem>
                ))
              : null}
          </TextField>

          <div className="flex flex-wrap w-full justify-center items-center">
            {images.map((image, index) => (
              <img
                className={`${selectedImage === index ? "selected" : ""} w-16`}
                src={image}
                alt={`image-${index + 1}`}
                key={`image-${index + 1}`}
                onClick={() => {
                  setSelectedImage(index);
                  console.log(images[0]);
                }}
              />
            ))}
          </div>

          <div className="flex w-full justify-center lg:justify-end items-center">
            <button className="btn btn-secondary">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Additional;
