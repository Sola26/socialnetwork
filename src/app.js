import axios from "./axios";
import React from "react";
import ProfilePic from "./profilepic.js";
import Uploadimage from "./uploadimage";
import Bio from "./bio.js";
import Profile from "./profile";
import Opp from "./opp";
import FriendButton from "./friendrequest";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Friends from "./friends.js";
import OnlineUsers from "./onlineusers.js";
import Chat from "./chat";
import Login from "./login";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      imgUrl: "",
      bio: "",
      uploaderIsVisible: false
    };
    this.showUploader = this.showUploader.bind(this);
    this.hideUploader = this.hideUploader.bind(this);
    this.setImage = this.setImage.bind(this);
    this.setBio = this.setBio.bind(this);
    this.myFunction = this.myFunction.bind(this);
  }
  showUploader() {
    this.setState({ uploaderIsVisible: true });
  }
  hideUploader() {
    this.setState({ uploaderIsVisible: false });
  }
  setBio(bio) {
    this.setState({
      bio: bio
    });
  }
  setImage(image) {
    console.log("words");
    this.setState({
      image: image,
      uploaderIsVisible: false
    });
  }
  componentDidMount() {
    axios
      .get("/user")
      .then(({ data }) => {
        this.setState({
          ...data
        });
      })
      .catch(err => {
        console.log("err in componentDidMount: ", err);
      });
  }
  myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "navbar") {
      x.className += " responsive";
    } else {
      x.className = "navbar";
    }
  }

  render() {
    if (!this.state.id) {
      return (
        <img src="https://media.giphy.com/media/xTkcF0p5afJpn9gUtG/giphy.gif" />
      );
    }
    return (
      <div>
        <div className="profilepic">
          <ProfilePic
            image={this.state.image}
            firstname={this.state.image}
            lastname={this.state.lastname}
            id={this.state.id}
            clickHandler={this.showUploader}
          />
        </div>
        <BrowserRouter>
          <div>
            <Route
              exact
              path="/"
              render={props => (
                <Profile
                  firstname={this.state.firstname}
                  lastname={this.state.lastname}
                  id={this.state.id}
                  bio={this.state.bio}
                  image={this.state.image}
                  clickHandler={this.showUploader}
                  setBio={this.setBio}
                />
              )}
            />
            <div className="navbar" id="myTopnav">
              <Link to="/">My profile</Link>
              <Link to="/Online">Online friends </Link>
              <Link to="/Friends">Friends </Link>
              <Link to="/Chat">Chat</Link>
              <a
                href="javascript:void(0);"
                className="icon"
                onClick={this.myFunction}
              >
                <i className="fa fa-bars" />
              </a>
              <Logout />
            </div>
            <Route
              exact
              path="/user/:id"
              render={props => (
                <Opp
                  {...props}
                  currentUserId={this.state.id}
                  key={props.match.url}
                />
              )}
            />

            <Route exact path="/friends" component={Friends} />
            <Route exact path="/online" component={OnlineUsers} />
            <Route exact path="/chat" component={Chat} />
          </div>
        </BrowserRouter>

        {this.state.uploaderIsVisible && (
          <Uploadimage
            setImage={this.setImage}
            hideUploader={this.hideUploader}
          />
        )}
      </div>
    );
  }
}

///////////////////////////////////////////////////////////////////

export function Logo() {
  return (
    <div>
      <img
        className="logo"
        src="https://media.giphy.com/media/xTkcF0p5afJpn9gUtG/giphy.gif"
      />
    </div>
  );
}

export function Logout(props) {
  return (
    <a className="logoutbutton" href="/logout">
      Log out
    </a>
  );
}

export function LinkToProfile(props) {
  return (
    <a className="my-profile" href="/">
      My Profile
    </a>
  );
}
