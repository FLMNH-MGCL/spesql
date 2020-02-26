import React from "react";
import { Segment } from "semantic-ui-react";

const ErrorTerminal = ({ errorLog }) => {
  const errors = errorLog.map((error, index) => {
    return (
      <p key={index} style={{ display: "block" }}>
        {error}
      </p>
    );
  });
  return (
    <Segment.Group
      style={{
        minHeight: "35vh",
        maxHeight: "40vh",
        backgroundColor: "#53596c",
        color: "white"
      }}
    >
      <Segment textAlign="center" style={{ backgroundColor: "#53596c" }}>
        Error Log: {errorLog.length}
      </Segment>
      <Segment.Group
        style={{
          minHeight: "25vh",
          maxHeight: "30vh",
          backgroundColor: "#353c51"
        }}
      >
        <Segment
          textAlign="center"
          style={{
            minHeight: "25vh",
            maxHeight: "30vh",
            backgroundColor: "#353c51",
            paddingTop: "3vh",
            overflowY: "scroll"
          }}
        >
          {errors}
        </Segment>
      </Segment.Group>
    </Segment.Group>
  );
};

export default ErrorTerminal;
