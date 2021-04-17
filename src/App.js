import React, { Component } from "react";
import HomePage from "./Components/homePage/homepage";
import "./App.css";
import { Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import SignInSignUpPage from "./Pages/sign-in-sign-up/sign-in-sign-up";
import { auth, createUserProfileDocument } from "./Firebase/Firebase.utils";
import { Redirect } from "react-router-dom";
import { setCurrentUser } from "./redux/user/user.actions";
import { connect } from "react-redux";
class App extends Component {
  unsubscribeFromAuth = null;
  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      }

      setCurrentUser(userAuth);
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header />
        {auth ? <Route path="/homepage" exact component={HomePage} /> : null}
        {/* {this.state.currentUser ? <Redirect to="/homepage" /> : null} */}
        <Route
          exact
          path="/"
          render={() =>
            this.props.currentUser ? (
              <Redirect to="/homepage" />
            ) : (
              <SignInSignUpPage />
            )
          }
        />
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ currentUser: user.currentUser });
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
