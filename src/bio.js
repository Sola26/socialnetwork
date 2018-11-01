import React from "react";
import ReactDOM from "react-dom";
import axios from "./axios";

export default class Bio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draftBio: false,
      bio: " "
    };

    this.showTextarea = this.showTextarea.bind(this);
    this.hideTextarea = this.hideTextarea.bind(this);
    this.uploadBio = this.uploadBio.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
  handleChange(e) {
    this.setState({
      bio: e.target.value
    });
  }

  uploadBio() {
    axios
      .post("/usersbio", {
        bio: this.state.bio
      })
      .then(result => {
        this.setState({
          draftBio: false
        });
        this.props.setBio(result.data.bio);
      });
  }

  render() {
    if (this.state.draftBio) {
      return (
        <div>
          <p>{this.state.bio}</p>
          <textarea
            defaultValue={this.props.bio}
            onChange={this.handleChange}
          />
          <button onClick={this.uploadBio}>save</button>
          <button onClick={this.hideTextarea}>cancle</button>
        </div>
      );
    } else {
      return (
        <div>
          <p>{this.props.bio}</p>
          <button onClick={this.showTextarea}>edit Bio</button>
        </div>
      );
    }
  }
}
