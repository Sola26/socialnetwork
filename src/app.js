import axios from "./axios";
import React from "react";
import ProfilePic from "./profilepic.js";
import Uploadimage from "./uploadimage";
import Bio from "./bio.js";
import Profile from "./profile";
import Opp from "./opp";
import { BrowserRouter, Route } from "react-router-dom";

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
  }
  showUploader() {
    this.setState({ uploaderIsVisible: true });
  }
  hideUploader() {
    this.setState({
      uploaderIsVisible: false
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
            bio={this.state.bio}
            clickHandler={this.showUploader}
          />
        </div>
        <BrowserRouter>
          <div className="profilepic">
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

{
  /*set the image to null then if image = null => image = default*/
}

{
  /*<Route path="/user/:id" component={}><Route />*/
}

{
  /*the state of one componet is gonna be the props of another componet*/
}
