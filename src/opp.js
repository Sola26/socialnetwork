import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import ProfilePic from "./profilepic.js";
import FriendButton from "./friendrequest";
import App from "./app.js";

export default class Opp extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    const oppId = this.props.match.params.id;
    console.log("Id: ", oppId);
    axios
      .get("/api-user-id/" + oppId)
      .then(result => {
        // console.log("result ..: ", result.data);
        if (result.data == "false") {
          this.props.history.push("/");
          return;
        } else {
          this.setState({
            id: result.data.id,
            firstname: result.data.firstname,
            lastname: result.data.lastname,
            image: result.data.image,
            bio: result.data.bio
          });
        }
      })
      .catch(err => {
        console.log("err in : ", err);
      });
  }

  render() {
    return (
      <div>
        <ProfilePic image={this.state.image} />

        <p className="friendsname">
          Name: {this.state.firstname} {this.state.lastname}
        </p>
        <p className="friendsbio">BIO: {this.state.bio}</p>
        <FriendButton
          className="friendbttn"
          oppId={this.props.match.params.id}
        />
      </div>
    );
  }
}

export function MyProfile() {
  return (
    <div>
      <Link to="/">My Profile</Link>
    </div>
  );
}

// if user1 path = user1 => redirect to profile (  this.props.history.push('/');  )
