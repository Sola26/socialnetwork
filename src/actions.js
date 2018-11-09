import axios from "./axios";

export async function receiveFriendsAndWanabees() {
  const { data } = await axios.get("/friendsOrWanabees");
  return {
    type: "RECEIVE_FRIENDS_AND_WANNANES",
    friendsOrWanabees: data.data
  };
}

export async function acceptRequest(opp) {
  const { data } = await axios.post("/acceptFriendship/" + opp);
  return {
    type: "ACCEPT_REQUEST",
    opp
  };
}

export async function unfriend(opp) {
  const { data } = await axios.post("/unfriend/" + opp);
  return {
    type: "END_FRIENDSHIP",
    opp
  };
}

export function onlineUsers(onlineUsers) {
  console.log("onlineUsers action fired:", onlineUsers);
  return {
    type: "ONLINEUSERS",
    onlineUsers
  };
}

export function userJoined(userJoined) {
  console.log("userJoined action fired:", userJoined);
  return {
    type: "USERJOINED",
    userJoined
  };
}

export function userLeft(userLeft) {
  console.log("userleft action fired:", userLeft);
  return {
    type: "USERLEFT",
    userLeft
  };
}

export function showChat(allMessages) {
  // console.log("showChat action fired****:", allMessages);
  return {
    type: "SHOW_CHAT",
    allMessages
  };
}

export function uploadMessage(newMessage) {
  // console.log("uploadMessage action fired****:", newMessage);
  return {
    type: "UPLOAD_MESSAGE",
    newMessage
  };
}
