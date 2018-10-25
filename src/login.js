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
        // console.log(result);
        if (result.data) {
          location.replace("/profile");
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
        <input name="email" placeholder="Email" onChange={this.handleChange} />

        <input
          name="password"
          placeholder="Password"
          onChange={this.handleChange}
        />
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}
