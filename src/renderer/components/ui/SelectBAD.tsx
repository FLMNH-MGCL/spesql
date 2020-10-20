import React from "react";

import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

// TODO: I don't like this library so I wont waste my time
export default () => (
  <Select
    styles={{
      // Fixes the overlapping problem of the component
      menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
    }}
    isMulti
    name="colors"
    options={options}
    className="basic-multi-select"
    classNamePrefix="select"
  />
);

// export default function Select() {}
