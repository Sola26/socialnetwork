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
    this.showTextarea = this.showTextarea.bind(this);
    this.hideTextarea = this.hideTextarea.bind(this);
    this.uploadBio = this.uploadBio.bind(this);
  }
  handleChange(e) {
    this.setState({
      bio: e.target.value
    });
  }

  showTextarea() {
    this.setState({
      draftBio: true
    });
  }
  hideTextarea() {
    this.setState({
      draftBio: false
    });
  }
  // handleBioInput(e) {
  //   console.log("e.target.value", e.target.value);
  //   this.setState({
  //     draftBio: e.target.value
  //   });
  // }
  uploadBio() {
    axios
      .post("/usersbio", {
        usersbio: this.state.bio
      })
      .then(response => {
        this.setState({
          draftBio: false
        });
        this.props.setBio(response.data.bio);
      });
  }

  render() {
    if (this.state.mode == "edit") {
      return (
        <div>
          <texarea defaultValue={this.props.bio} onChange={this.handleChange} />
          <button onClick={this.handleSubmit}>save</button>
          <button onClick={this.hideTextarea}>cancle</button>
        </div>
      );
    } else {
      return (
        <div>
          <p>{this.props.bio}</p>
          <button onClick={this.showTextarea}>edit</button>
        </div>
      );
    }
  }
}
