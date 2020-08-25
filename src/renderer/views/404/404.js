import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";

export default function fourohfour() {
  const [showEscape, setShowEscape] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count === 6) {
      setShowEscape(true);
    }
  }, [count]);

  return (
    <div
      style={{
        maxWidth: "80vw",
        margin: "auto",
        textAlign: "center",
        paddingTop: "5rem",
      }}
    >
      <h3 style={{ fontWeight: 900, fontSize: "3rem" }}>Uh oh.</h3>
      <br />
      <p style={{ fontSize: "1.3rem" }}>
        You requested a resource that doesn't exist (and landed here, at the 404
        page!) I know it's not pretty, but honestly I wasn't really expecting
        any guests here (like ever) so sorry for the mess!!
      </p>

      <br />
      <br />
      <p>
        I assume you don't want to stay though?{" "}
        <span role="img" aria-label="sad computer man">
          😞
        </span>
        ... It's okay.... I figured.... You can click one of those buttons to go
        back to your own stuff (or whatever you were doing before...).{" "}
        <span style={{ fontSize: ".7rem" }}>
          Which one? I dunno, you're the one that wants to leave soooo.
        </span>
      </p>
      <br />
      <br />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={() => setCount(count + 1)}
          style={{ marginRight: "1.75rem" }}
        >
          leave
        </Button>
        <Button
          onClick={() => setCount(count + 1)}
          style={{ marginRight: "1.75rem" }}
        >
          leave
        </Button>
        <Button onClick={() => setCount(count + 1)}>leave</Button>
      </div>

      {showEscape && (
        <div style={{ paddingTop: "5rem" }}>
          <p>
            I'm sorry........ I just didn't want you to go... Here you go, this
            one is real I promise... I'll miss you! Come again any time!!
          </p>
          <br />
          <br />

          <Button onClick={() => (window.location.hash = "/")}>leave</Button>
        </div>
      )}
    </div>
  );
}
