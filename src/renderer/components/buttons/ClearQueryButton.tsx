import { observer } from "mobx-react-lite";
import React from "react";
import Button from "../ui/Button";

export default observer(() => {
  const disabled = true;
  return (
    <div>
      <Button variant="danger" disabled={disabled}>
        Clear Query
      </Button>
    </div>
  );
});
