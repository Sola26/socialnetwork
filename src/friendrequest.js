import React from "react";
import axios from "./axios";
import Opp from "./opp.js";
import App from "./app.js";

export default class FriendButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInsideButton: ""
    };
    this.makeRequest = this.makeRequest.bind(this);
  }

  componentDidMount() {
    const otherProfileId = this.props.oppId;

    axios
      .get("/status/" + otherProfileId)
      .then(result => {
        console.log("resultin axios /status", result.data.textInsideButton);
        this.setState({ textInsideButton: result.data.textInsideButton });
      })
      .catch(err => {
        console.log("err: ", err);
      });
  }

  makeRequest() {
    console.log("Button clicked");
    const otherProfileId = this.props.oppId;
    // console.log("otherProfileId", this.props.otherProfileId);

    if (this.state.textInsideButton == "Make Friend Request") {
      console.log("add friend");

      axios.post("/makeRequest/" + otherProfileId).then(result => {
        this.setState({ textInsideButton: result.data.textInsideButton });
      });
    } else if (this.state.textInsideButton == "Cancel Friend Request") {
      console.log("cancel friend request");
      axios.post("/cancelRequest/" + otherProfileId).then(result => {
        console.log(
          "result in axios /cancelRequest",
          result.data.textInsideButton
        );
        this.setState({ textInsideButton: result.data.textInsideButton });
      });
    } else if (this.state.textInsideButton == "Accept Friend Request") {
      console.log(" friend request accepted");

      axios.post("/acceptFriendship/" + otherProfileId).then(result => {
        console.log(
          "result in axios accept Friendship",
          result.data.textInsideButton
        );
        this.setState({ textInsideButton: result.data.textInsideButton });
      });
    } else if (this.state.textInsideButton == "End Friendship") {
      console.log("EndFriendship Request ");

      axios.post("/endFriendship/" + otherProfileId).then(result => {
        console.log(
          "result in axios end friendship",
          result.data.textInsideButton
        );
        this.setState({ textInsideButton: result.data.textInsideButton });
      });
    }
  }

  render() {
    return (
      <div>
        <button className="friendbttn" onClick={this.makeRequest}>
          {this.state.textInsideButton}
        </button>
      </div>
    );
  }
}
