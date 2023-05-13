import React, { useState } from "react";
import EduMeetLogo from "../assets/png/EduMeetLogo.png";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AuthImage from "../assets/svg/auth.svg";
import TypeIt from "typeit-react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleLoginButton } from "react-social-login-buttons";
import { currentUserModifier } from "../features/reducers/current-user-slice";
import { useDispatch } from "react-redux";
import { authModifier } from "../features/reducers/auth-slice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_BASEAPI;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = useGoogleLogin({
    clientId:
      "867159813249-kjf4fe4ne3bujmvmkv4jncaeus9aanbt.apps.googleusercontent.com",
    onSuccess: async (response) => {
      console.log(response);
      const accessToken = response.access_token;
      const { data } = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
      );

      const res = await axios.post(`${baseURL}/oauth`, {
        email: email,
      });
      console.log(res);

      if (res.data.status === true) {
        dispatch(authModifier(true));
        dispatch(currentUserModifier(data.email));
        navigate("/dashboard");
      }
    },
    onError: (error) => {
      console.log("Login Failure. Error: ", error);
    },
  });

  const handleRegister = async () => {
    try {
      const { data } = await axios.post(`${baseURL}/create-user`, {
        email: email,
        password: password,
      });

      alert(data.message);
    } catch (err) {
      alert("Error : ", err);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-base-200">
      <div className="container-registration flex justify-center items-center w-full h-full">
        <div className="sidebar w-4/12 bg-secondary lg:h-4/6 rounded-tl-3xl lg:rounded-bl-3xl hidden lg:block ">
          <div className="w-full flex justify-evenly flex-col items-center h-full p-5">
            <img src={AuthImage} alt="auth image" className="w-96" />
            <TypeIt
              options={{ loop: false, speed: 10 }}
              className="text-neutral-content text-xl font-bold text-center"
            >
              No need to worry about missed sessions, Now view your video
              sessions at anytime. Much more exciting features are awaiting
              you!!
            </TypeIt>
          </div>
        </div>
        <div
          className="auth-part w-full lg:w-4/12 bg-neutral-content lg:bg-neutral-content 
        h-full lg:h-4/6 lg:rounded-tr-3xl lg:rounded-br-3xl flex flex-col justify-center items-center"
        >
          <div className="logo w-12 lg:w-16">
            <img src={EduMeetLogo} alt="logo" className="w-full" />
          </div>
          <div className="auth w-full h-4/6 flex justify-evenly items-center flex-col">
            <h1 className="text-3xl text-secondary font-bold text-center">
              Welcome to Edu Meet
            </h1>
            <div className="form-group flex flex-col justify-center items-center w-full">
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                size="small"
                sx={{ width: "300px", marginY: "10px" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                size="small"
                sx={{ width: "300px", marginY: "10px" }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                className="btn btn-secondary btn-wide my-5"
                onClick={handleRegister}
              >
                Register
              </button>

              <GoogleLoginButton
                onClick={signIn}
                style={{
                  width: "200px",
                  backgroundColor: "#000",
                  color: "#fff",
                  fontSize: "0.8rem",
                }}
                preventActiveStyles={true}
                text="Sign in with google"
              />

              <Link
                to="/login"
                className="text-neutral font-bold text-center w-full my-5"
              >
                Have an account ?{" "}
                <span className="text-secondary">Login here</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
