import React from "react";
import ReactDOM from "react-dom";
import axios from "./axios";
import { Link } from "react-router-dom";
import Profile from "./profile";

let firstname, lastname, email, password;

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      error: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.register = this.register.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidCatch(error, info) {
    logErrorToMyService(error, info);
  }
  register() {
    axios
      .post("/welcome", {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password
      })
      .then(data => {
        if (data.data) {
          location.replace("/");
        } else {
          this.setState({
            error: true
          });
        }
      });
  }
  render() {
    return (
      <div>
        {this.state.error && <div className="error">try again</div>}
        <div className="inputs">
          <input
            className="input"
            name="firstname"
            placeholder="First name"
            onChange={this.handleChange}
          />
          <input
            className="input"
            name="lastname"
            placeholder="Last name"
            onChange={this.handleChange}
          />
          <input
            className="input"
            name="email"
            placeholder="Email"
            onChange={this.handleChange}
          />
          <input
            className="input"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
        </div>
        <div className="registerbttn">
          <button onClick={this.register}>Register</button>
        </div>
        <div className="linktologin">
          <p>
            Already a member? Click
            <Link to="/login"> here </Link> to Log in
          </p>
        </div>
      </div>
    );
  }
}

// <a href="/logout">log out</a>
