import React from "react";
import { useDispatch } from "react-redux";
import { authModifier } from "../../features/reducers/auth-slice";

function Verification() {
  const dispatch = useDispatch();
  return (
    <div className="container-verification w-screen h-screen flex justify-center items-center bg-neutral-content">
      <div className="main-verification-container flex justify-evenly items-center flex-col h-48">
        <h1 className="text-2xl text-neutral-content text-center font-bold">
          Verify your account before proceeding!!!
        </h1>
        <p className="text-xl text- text-center font-bold">
          Please check your email for verification link
        </p>
        <button
          className="btn btn-error  btn-wide"
          onClick={() => dispatch(authModifier(false))}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Verification;
