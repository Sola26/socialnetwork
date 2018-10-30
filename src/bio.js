import axios from "./axios";
import React from "react";
import App from "./app";
import Profile from "./profile";

export default class Bio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draftBio: false,
      bio: " "
    };

    this.uploadBio = this.uploadBio.bind(this);
    this.handleBioInput = this.handleBioInput.bind(this);
  }
  handleBioInput(e) {
    console.log("e.target.value", e.target.value);
    this.setState({
      draftBio: e.target.value
    });
  }
  uploadBio() {
    axios
      .post("/usersbio", {
        usersbio: this.state.draftBio
      })
      .then(response => {
        this.props.setBio(response.data.result);
      });
  }

  render() {
    if (this.state.mode == "edit") {
      return (
        <div>
          <texarea defaultValue={this.props.bio} onChange={this.handleChange} />
          <button>save</button>
          <button>cancle</button>
        </div>
      );
    } else {
      return (
        <div>
          <p>{this.props.bio}</p>
          <button>edit</button>
        </div>
      );
    }
  }
}
