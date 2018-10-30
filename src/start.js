import React from "react";
import ReactDOM from "react-dom";

import Welcome from "./welcome";
import App from "./app.js";

// ReactDOM.render(<HelloWorld />, document.querySelector("main"));
//
// function HelloWorld() {
//   return <div>Hello, World!</div>;
// }

if (location.pathname === "/welcome") {
  ReactDOM.render(<Welcome />, document.querySelector("main"));
} else {
  ReactDOM.render(<App />, document.querySelector("main"));
}
