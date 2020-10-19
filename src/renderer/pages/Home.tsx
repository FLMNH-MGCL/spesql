import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useMst } from "../../models";
// import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

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
      <div className="flex justify-center">
        {/* left half */}
        <div className="w-3/4"></div>

        {/* right half */}
        <div className="w-1/4"></div>
      </div>
    </div>
  );
});
