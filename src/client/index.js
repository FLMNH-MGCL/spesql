import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "babel-polyfill";
import "semantic-ui-css/semantic.min.css";

ReactDOM.render(<App />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept();
}
