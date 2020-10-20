import React from "react";
import CreateCountModal from "./modals/CreateCountModal";
import CreateSelectModal from "./modals/CreateSelectModal";
import CreateUpdateModal from "./modals/CreateUpdateModal";
import Dropdown from "./ui/Dropdown";

export default function QueryMenu() {
  return (
    <Dropdown
      label="Query"
      labelIcon={
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
          />
        </svg>
      }
    >
      <Dropdown.Header text="Query Menu" />
      <CreateSelectModal />
      <CreateCountModal />
      <CreateUpdateModal />
    </Dropdown>
  );
}
