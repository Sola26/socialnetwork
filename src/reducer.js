import * as io from "socket.io-client";
import { onlineUsers, userJoined, userLeft } from "./actions";
let socket;

export default function(state = {}, action) {
  if (action.type == "RECEIVE_FRIENDS_AND_WANNANES") {
    state = {
      ...state,
      friendsOrWanabees: action.friendsOrWanabees
    };
  }

  if (action.type == "ACCEPT_REQUEST") {
    state = {
      ...state,
      friendsOrWanabees: state.friendsOrWanabees.map(result => {
        if (result.id == action.otherProfileId) {
          return {
            ...result,
            accepted: true
          };
        } else {
          return result;
        }
      })
    };
  }

  if (action.type == "END_FRIENDSHIP") {
    console.log("action end friendship:", action);

    state = {
      ...state,
      friendsOrWanabees: state.friendsOrWanabees.filter(
        result => result.id != action.otherProfileId
      )
    };
  }

  if (action.type == "ONLINEUSERS") {
    state = {
      ...state,
      onlineUsers: action.onlineUsers
    };
  }

  if (action.type == "USERJOINED") {
    state = {
      ...state,
      onlineUsers: [...state.onlineUsers, action.userJoined]
    };
  }

  if (action.type == "USERLEFT") {
    state = {
      ...state,
      onlineUsers: state.onlineUsers.filter(
        user => user.id != action.userLeft.id
      )
    };
  }

  if (action.type == "SHOW_CHAT") {
    state = {
      ...state,
      allMessages: action.allMessages
    };
  }

  if (action.type == "UPLOAD_MESSAGE") {
    state = {
      ...state,
      allMessages: [...state.allMessages, action.newMessage]
    };
  }
  return state;
}
