import React from "react";
import { Icon, Modal, Button, Segment } from "semantic-ui-react";
import useBoolean from "../../utils/useBoolean";

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
        color: "white",
      }}
    >
      <Segment textAlign="center" style={{ backgroundColor: "#53596c" }}>
        Error Log: {errorLog.length}
      </Segment>
      <Segment.Group
        style={{
          minHeight: "25vh",
          maxHeight: "30vh",
          backgroundColor: "#353c51",
        }}
      >
        <Segment
          textAlign="center"
          style={{
            minHeight: "25vh",
            maxHeight: "30vh",
            backgroundColor: "#353c51",
            paddingTop: "3vh",
            overflowY: "scroll",
          }}
        >
          {errors}
        </Segment>
      </Segment.Group>
    </Segment.Group>
  );
};

export default function CreateErrorLogModal({ type, errors, updateError }) {
  const [open, { on, off }] = useBoolean(false);
  // const [hasError, setHasError] = useState(errors ? true : false);

  // useEffect(() => {}, [errors]);

  return (
    <Modal
      open={open}
      size="small"
      centered
      trigger={
        <Button
          icon
          basic
          floated="left"
          color={!errors ? "" : "red"}
          onClick={on}
          disabled={!errors}
        >
          <Icon name="warning sign" />
        </Button>
      }
    >
      <Modal.Header>{`${type} Error Log`}</Modal.Header>
      <Modal.Content>
        <ErrorTerminal errorLog={!errors ? [] : errors} />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={off}>Close</Button>
        <Button color="yellow" onClick={() => updateError(null)}>
          Clear Error
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
