import { observer } from "mobx-react-lite";
import React from "react";
import DeleteButton from "./buttons/DeleteButton";
import EditSpecimen from "./buttons/EditSpecimen";
import Heading from "./ui/Heading";

function SpecimenOverview() {
  return <div></div>;
}

export default observer(() => {
  // TODO: get selected from store!

  const selected = undefined;

  return (
    <React.Fragment>
      <div className="table-height px-4 pt-4">
        {selected ? (
          <SpecimenOverview />
        ) : (
          <Heading tag="h3">No specimen selected</Heading>
        )}
      </div>
      <div className="bg-gray-50 h-16 flex items-center px-4 space-x-2">
        <EditSpecimen />
        <DeleteButton />
      </div>
    </React.Fragment>
  );
});
