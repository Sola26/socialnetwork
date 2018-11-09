import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";

export default function Welcome() {
  return (
    <div>
      <h1 className="welcome">Welcome!</h1>
      <img
        className="logo"
        src="https://media.giphy.com/media/xTkcF0p5afJpn9gUtG/giphy.gif"
      />

      <HashRouter>
        <div>
          <Route exact path="/" component={Registration} />
          <Route path="/login" component={Login} />
        </div>
      </HashRouter>
    </div>
  );
}
