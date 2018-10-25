import React from "react";
import ReactDOM from "react-dom";
import Registration from "./registration";
import Welcome from "./welcome";

// ReactDOM.render(<HelloWorld />, document.querySelector("main"));
//
// function HelloWorld() {
//   return <div>Hello, World!</div>;
// }

let elem;
if (location.pathname == "/welcome") {
  elem = <Welcome />;
} else {
  elem = <a href="/logout">log out</a>;
}

ReactDOM.render(
  elem, //the logo//
  document.querySelector("main")
);
