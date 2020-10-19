import "core-js";
import "./index.css";
// import "semantic-ui-css";
import React from "react";
import { render } from "react-dom";
import App from "./App";

// NOTE: after transitioning to webpack configuration icons would not load properly
// this is a fix to *temporarily* include the links
// export const styleLink = document.createElement("link");
// styleLink.rel = "stylesheet";
// styleLink.href =
//   "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
// document.head.appendChild(styleLink);

render(<App />, document.getElementById("app"));
