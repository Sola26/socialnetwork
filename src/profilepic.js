import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import App from "./app";

export default function ProfilePic(props) {
  // if (!props.id) {
  //   return null;
  // }
  const image =
    props.image || "https://media.giphy.com/media/xTkcF0p5afJpn9gUtG/giphy.gif";
  return <img onClick={props.clickHandler} src={image} />;
}
