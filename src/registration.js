import React from "react";
import axios from "axios";

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.register = this.register.bind(this);
  }
  handleChange(e) {
    this[e.target.name] = e.target.value;
  }
  register() {
    axios
      .post("/welcome", {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password
      })
      .then(({ data }) => {
        console.log("yeah!");
        if (data.success) {
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
        <input
          name="firstname"
          placeholder="First name"
          onChange={this.handleChange}
        />
        <input name="lastname" placeholder="Last name" />
        <input name="email" placeholder="Email" />
        <input name="password" placeholder="Password" />
        <button onClick={this.register}>submit</button>
      </div>
    );
  }
}
