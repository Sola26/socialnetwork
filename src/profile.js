import React from "react";
import ProfilePic from "./profilepic";
import Bio from "./bio";
import axios from "./axios";
import App from "./app.js";
import Friendrequest from "./friendrequest";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <p className="username">
          {this.props.firstname} {this.props.lastname}
        </p>
        <div className="user">
          <ProfilePic
            image={this.props.image}
            firstname={this.props.firstname}
            lastname={this.props.lastname}
            id={this.props.id}
            clickHandler={this.props.showUploader}
          />
        </div>
        <div className="bio">
          <Bio bio={this.props.bio} setBio={this.props.setBio} />
          <Friendrequest currentUserId={this.props.id} />
        </div>
      </div>
    );
  }
}
