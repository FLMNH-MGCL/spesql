import React from "react";
import CreateSelectModal from "./modals/CreateSelectModal";
import Dropdown from "./ui/Dropdown";

export default function QueryMenu() {
  return (
    <Dropdown label="Query">
      <Dropdown.Header text="Query Menu" />
      <CreateSelectModal />
      {/* <Dropdown.Item>Count</Dropdown.Item>
      <Dropdown.Item>Update</Dropdown.Item> */}
    </Dropdown>
  );
}
