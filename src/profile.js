import React from "react";
import ProfilePic from "./profilepic";
import Bio from "./bio";

import axios from "./axios";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="profile">
        <h1>
          {this.props.firstname} {this.props.lastname}
        </h1>
        <ProfilePic
          image={this.props.image}
          firstname={this.props.firstname}
          lastname={this.props.lastname}
          id={this.props.id}
          clickHandler={this.props.showUploader}
        />
      </div>
    );
  }
}
