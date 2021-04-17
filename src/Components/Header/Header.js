import React from "react";
import { Link, Redirect } from "react-router-dom";
import { ReactComponent as Logo } from "../../Assets/crown.svg";
import { auth } from "../../Firebase/Firebase.utils";
import { connect } from "react-redux";
import "./Header.css";
const header = ({ currentUser }) => {
  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <Logo className="logo" />
      </Link>
      <div className="options">
        {currentUser ? (
          <div
            className="option"
            onClick={(e) => {
              auth.signOut();
            }}
          >
            Sign Out
          </div>
        ) : (
          <Redirect to="/">SIGN IN</Redirect>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(header);
