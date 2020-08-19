import React from "react";
import { Segment, Grid } from "semantic-ui-react";
import Background from "./errorcat.png";
import "./NotFound.css";

const NotFound = () => (
  // <div style={{ textAlign: "center", paddingTop: "3rem" }}>
  //   <h5>404</h5>
  //   <h3>Wow, such empty.</h3>
  //   <p style={{ display: "block" }}>
  //     (The page you requested could not be located.)
  //   </p>
  // </div>

  <div className="fourohfour-container">
    {/* <div className="login-container"> */}
    {/* <Segment
        style={{
          display: "grid",
          minWidth: "30%",
          justifyContent: "center",
          padding: "2rem",
        }}
      > */}
    <Segment
      style={{
        display: "grid",
        minWidth: "30%",
        maxWidth: "80%",
        minHeight: "80%",
        justifyContent: "center",
        padding: "3rem",
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        // backgroundColor: "#fcb82f",
      }}
    >
      <Grid style={{ padding: "5rem" }}>
        <Grid.Column width="7">
          <h1
            style={{
              fontWeight: "900",
              fontSize: "8rem",
              lineHeight: "1",
              color: "#111111",
            }}
          >
            <b>uh-oh!</b>
          </h1>
          <h1
            style={{
              fontWeight: "900",
              fontSize: "3rem",
              lineHeight: ".8",
              marginTop: 0,
              color: "#111111",
            }}
          >
            you got lost!
          </h1>
          <p
            style={{
              width: "65%",
              padding: ".5%",
              marginTop: ".5rem",
              lineHeight: 1.5,
              color: "#222222",
              fontWeight: 500,
            }}
          >
            Seems like you have some connectivity issues right now. The most
            likely causes are a lack of internet connection or the UF VPN is not
            up and running properly (or both!). Be sure to check both and
            relaunch the app!
          </p>
          <p
            style={{
              width: "65%",
              padding: ".5%",

              lineHeight: 1.5,
              color: "#222222",
              fontWeight: 500,
            }}
          >
            P.S. Do you like the art? Be sure to thank{" "}
            <a
              href="https://www.freepik.com/free-photos-vectors/business"
              target="_blank"
              rel="noopener noreferrer"
            >
              this guy
            </a>
            !
          </p>
        </Grid.Column>
        <Grid.Column width="9">
          {/* <Image src={require("./errorcat.png")} /> */}
        </Grid.Column>
      </Grid>
    </Segment>
    {/* </Segment> */}
    {/* </div> */}
  </div>
);

export default NotFound;
