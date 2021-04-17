import React from "react";
import "./Button.css";

const Button = ({ children, isGoogleSignIn, ...otherProps }) => {
  return (
    <div
      className={`${isGoogleSignIn ? "google-sign-in" : ""} custom-button`}
      {...otherProps}
    >
      {children}
    </div>
  );
};

export default Button;
