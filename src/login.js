import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  login() {
    axios
      .post("/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(result => {
        console.log(result);
        if (result.data) {
          location.replace("/");
        } else {
          console.log("else in axios in login");
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
        <div className="inputsforlogin">
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
        <div className="loginbttn">
          <button onClick={this.login}>Login</button>
        </div>
        <div className="linktoregister">
          <p>
            You are new? Click
            <Link to="/"> here </Link>
            to Register
          </p>
        </div>
      </div>
    );
  }
}
