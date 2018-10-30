import axios from "./axios";
import React from "react";
import ProfilePic from "./profilepic.js";
import Uploadimage from "./uploadImage";
import Bio from "./bio.js";
import Profile from "./profile";
import { BrowserRouter, Route } from "react-router-dom";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      imgUrl: "",
      uploaderIsVisible: false
    };
    this.showUploader = this.showUploader.bind(this);
    this.hideUploader = this.hideUploader.bind(this);
    this.setImage = this.setImage.bind(this);
    this.setBio = this.setBio.bind(this);
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
  showUploader() {
    this.setState({ uploaderIsVisible: true });
  }
  hideUploader() {
    this.setState({
      uploaderIsVisible: false
    });
  }

  render() {
    if (!this.state.id) {
      return (
        <img src="https://media.giphy.com/media/xTkcF0p5afJpn9gUtG/giphy.gif" />
      );
    }
    return (
      <div>
        <ProfilePic
          image={this.state.image}
          firstname={this.state.image}
          lastname={this.state.lastname}
          id={this.state.id}
          clickHandler={this.showUploader}
        />
        <BrowserRouter>
          <div>
            <Route
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
          </div>
        </BrowserRouter>

        {this.state.uploaderIsVisible && (
          <Uploadimage setImage={this.setImage} />
        )}
      </div>
    );
  }
}

///////////////////////////////////////////////////////////////////

// set the image to null then if image = null => image = default

// <Route path="/user/:id" component={}><Route />
