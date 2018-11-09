import React from "react";
import { connect } from "react-redux";
import { receiveFriendsAndWanabees, unfriend, acceptRequest } from "./actions";
import { Link } from "react-router-dom";
import Bio from "./bio";

class Friends extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    console.log("Friends componentDidMount!");
    !this.props.friendsOrWanabees &&
      this.props.dispatch(receiveFriendsAndWanabees());
  }

  render() {
    const {
      dispatch,
      alreadyFriends,
      wantToBeMyFriends,
      friendsOrWanabees
    } = this.props;
    if (!wantToBeMyFriends && !alreadyFriends) {
      return null;
    }

    const renderFriend = (
      <div>
        <div className="friends">
          <p>YOUR FRIENDS:</p>
          {this.props.alreadyFriends.map(result => (
            <div key={result.id} className="friend">
              {!result.image ? (
                <img
                  className="friendsImg"
                  src="https://media.giphy.com/media/xTkcF0p5afJpn9gUtG/giphy.gif"
                />
              ) : (
                <img className="friendsImg" src={result.image} />
              )}
              <p className="friendsname">
                {result.firstname} {result.lastname}
              </p>
              <button
                className="button"
                onClick={() => dispatch(unfriend(result.id))}
              >
                Unfriend
              </button>
            </div>
          ))}
        </div>

        <div className="friends">
          {this.props.wantToBeMyFriends.map(result => (
            <div key={result.id} className="friend">
              {!result.image ? (
                <img
                  className="friendsImg"
                  src="https://media.giphy.com/media/xTkcF0p5afJpn9gUtG/giphy.gif"
                />
              ) : (
                <img className="friendspic" src={result.image} />
              )}
              <p>
                {result.firstname} {result.lastname}
              </p>
              <p>{result.bio}</p>
              <button
                className="button"
                onClick={() => dispatch(acceptRequest(result.id))}
              >
                Accept Friend Request
              </button>
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <div id="friend">
        {!friendsOrWanabees.length && <h1>No Friends!</h1>}
        {!!friendsOrWanabees.length && renderFriend}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    friendsOrWanabees: state.friendsOrWanabees,
    alreadyFriends:
      state.friendsOrWanabees &&
      state.friendsOrWanabees.filter(result => result.accepted),
    wantToBeMyFriends:
      state.friendsOrWanabees &&
      state.friendsOrWanabees.filter(result => !result.accepted)
  };
}

export default connect(mapStateToProps)(Friends);
