import React from "react";
import ReactDOM from "react-dom";
import App from "./app.js";
import Welcome from "./welcome.js";
import { HashRouter, Route, Link, Switch } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import reducer from "./reducer.js";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { initSocket } from "./socket.js";

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;

if (location.pathname === "/welcome") {
  elem = <Welcome />;
} else {
  elem = (initSocket(store),
  (
    <Provider store={store}>
      <App />
    </Provider>
  ));
}
ReactDOM.render(elem, document.querySelector("main"));

// ReactDOM.render(<HelloWorld />, document.querySelector("main"));
//
// function HelloWorld() {
//   return <div>Hello, World!</div>;
// }

// if (location.pathname === "/welcome") {
//   ReactDOM.render(<Welcome />, document.querySelector("main"));
// } else {
// }
