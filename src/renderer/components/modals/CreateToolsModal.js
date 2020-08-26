import React, { useState } from "react";
import { Modal, Button, Icon, Accordion } from "semantic-ui-react";
import useBoolean from "../../utils/useBoolean";

export default function CreateToolsModal(props) {
  const [open, { on, off }] = useBoolean(false);
  const [active, setActive] = useState(-1);

  function handleClick(e, titleProps) {
    const { index } = titleProps;
    const newIndex = active === index ? -1 : index;

    setActive(newIndex);
  }

  return (
    <Modal
      open={open}
      size="small"
      centered
      trigger={
        <Button icon basic onClick={on}>
          <Icon name="wrench" />
        </Button>
      }
    >
      <Modal.Header>Additional Tools</Modal.Header>
      <Modal.Content>
        <p style={{ paddingBottom: "1rem" }}>
          Sometimes, stuff just breaks or glitches. Maybe it was a slight patch
          of slow connection that created a disconnect, who knows! As I find
          them, I'll add more tools. Feel free to use some of them to manually
          reset a functionality within spesql
        </p>

        <Accordion styled>
          <Accordion.Title
            active={active === 0}
            index={0}
            onClick={handleClick}
          >
            <Icon name="dropdown" />
            Reset the selected specimen
          </Accordion.Title>
          <Accordion.Content active={active === 0}>
            <p style={{ paddingBottom: "1rem" }}>
              Sometimes when running a certain kind of query while there is a
              selected specimen, the selection logic glitches out and reverses
              the clicks. This will reset that!
            </p>
            <Button onClick={() => props.updateSelectedSpecimen(undefined)}>
              Reset
            </Button>
          </Accordion.Content>
        </Accordion>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={off}>Close</Button>
      </Modal.Actions>
    </Modal>
  );
}
