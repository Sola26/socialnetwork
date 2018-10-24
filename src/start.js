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
  elem = <img src="pic.gif" />;
}

ReactDOM.render(
  elem, //the logo//
  document.querySelector("main")
);
