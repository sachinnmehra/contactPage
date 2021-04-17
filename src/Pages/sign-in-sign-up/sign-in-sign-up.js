import React from "react";
import "./sign-in-sign-up.css";
import SignIn from "../../Components/Sign-in/Sign-in";
import SignUp from "../../Components/sign-up/sign-up";
const signInSignUpPage = () => {
  return (
    <div className="sign-in-and-sign-up">
      <SignIn />
      <SignUp />
    </div>
  );
};

export default signInSignUpPage;
