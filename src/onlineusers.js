import React from "react";
import { connect } from "react-redux";
import { onlineUsers } from "./actions";

class OnlineUsers extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log("onlineUsers componentDidMount!");
  }

  render() {
    const { onlineUsers } = this.props;
    if (!onlineUsers) {
      return null;
    }

    <h1>ONLINE FRIENDS:</h1>;
    const renderOnlineUsers = (
      <div className="onlinefriends">
        {this.props.onlineUsers.map(user => (
          <div key={user.id} className="friend">
            {!user.image ? (
              <img
                className="friendspic"
                src="/https://media.giphy.com/media/xTkcF0p5afJpn9gUtG/giphy.gif"
              />
            ) : (
              <img className="friendspic" src={user.image} />
            )}
            <p>
              {user.firstname} {user.lastname}
            </p>
          </div>
        ))}
      </div>
    );

    return (
      <div>
        {!onlineUsers.length && <h1>No one is Online!</h1>}
        {!!onlineUsers.length && renderOnlineUsers}
      </div>
    );
  }
}

const mapStateToProps = function mapStateToProps(state) {
  return {
    onlineUsers: state.onlineUsers
  };
};
export default connect(mapStateToProps)(OnlineUsers);
