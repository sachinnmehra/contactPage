import React, { Component } from "react";
import "./Sign-in.css";
import FormInput from "../form-input/form-input";
import Button from "../Button/Button";
import { auth, signInWithGoogle } from "../../Firebase/Firebase.utils";
class SignIn extends Component {
  state = {
    email: "",
    password: "",
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      alert("enter email and password");
    }
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
    this.setState({ email: "", password: "" });
  };
  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="sign-in">
        <h2>I've already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            handleChange={this.handleChange}
            label="email"
            value={this.state.email}
            type="email"
            required
          />

          <FormInput
            name="password"
            value={this.state.password}
            label="password"
            type="password"
            required
            handleChange={this.handleChange}
          />
          <Button type="submit" onClick={this.handleSubmit}>
            Sign In
          </Button>
          <Button type="button" onClick={signInWithGoogle} isGoogleSignIn>
            Sign in with Google
          </Button>
        </form>
      </div>
    );
  }
}

export default SignIn;
