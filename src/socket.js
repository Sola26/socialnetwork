import * as io from "socket.io-client";
import {
  onlineUsers,
  userJoined,
  userLeft,
  showChat,
  uploadMessage
} from "./actions.js";
let socket;

export function initSocket(store) {
  //if sentence helps to prevent sockets for one user on multiple tabs

  if (!socket) {
    socket = io.connect();

    socket.on("onlineUsers", function(listOfUsers) {
      console.log("listOfUsers:", listOfUsers);
      store.dispatch(onlineUsers(listOfUsers));
    });

    socket.on("userJoined", userWhoJoined => {
      console.log("userWhoJoined:", userWhoJoined);
      store.dispatch(userJoined(userWhoJoined));
    });

    socket.on("userLeft", userWhoLeft => {
      console.log("userWhoLeft:", userWhoLeft);
      store.dispatch(userLeft(userWhoLeft));
    });

    socket.on("newMessage", newMessage => {
      // console.log("new message:", newMessage);

      store.dispatch(uploadMessage(newMessage));
    });

    socket.on("showChat", allMessages => {
      // console.log("*****all Messages:****", allMessages);
      store.dispatch(showChat(allMessages));
    });
  }
  return socket;
}
