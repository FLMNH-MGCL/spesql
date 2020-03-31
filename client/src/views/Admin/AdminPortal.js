import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../../redux/mapFunctions";

function AdminPortal({ props }) {
  console.log(props);
  return (
    <div style={{ textAlign: "center", paddingTop: "3rem" }}>
      <h3>Wow, such empty.</h3>
      <p style={{ display: "block" }}>(Don't worry content is coming soon!)</p>
      <button onClick={() => (window.location.href = "/Home")}>
        Click to go back!
      </button>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPortal);
