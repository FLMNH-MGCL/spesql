import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useMst } from "../../models";
// import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import VirtualizedTable from "../components/VirtualizedTable";

export default observer(() => {
  // const navigate = useNavigate();
  const store = useMst();

  useEffect(() => {
    if (!store.session.user) {
      // navigate("signin");
    }
  });

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center space-x-4 mx-4 h-minus-header">
        {/* left half */}
        <div className="bg-white rounded-md shadow-around-lg w-3/4 h-main">
          <VirtualizedTable data={[]} headers={new Set(["catalogNumber"])} />
        </div>

        {/* right half */}
        <div className="bg-white rounded-md shadow-around-lg w-1/4 h-main"></div>
      </div>
    </div>
  );
});
