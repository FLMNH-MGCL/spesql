import React, { useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
import VirtualizedTable from '../components/VirtualizedTable';
import SpecimenView from '../components/SpecimenView';
// import { testSpecimen } from '../components/utils/TESTDATA';

export default function () {
  // const navigate = useNavigate();
  // const store = useMst();

  useEffect(() => {
    // if (!store.session.user) {
    //   // navigate("signin");
    // }
  });

  return (
    <div>
      <div className="flex justify-center items-center space-x-4 mx-4 h-minus-header">
        {/* left half */}
        <div className="bg-white dark:bg-dark-800 rounded-md shadow-around-lg w-3/4 h-main">
          <VirtualizedTable />
        </div>

        {/* right half */}
        <div className="bg-white dark:bg-dark-800 rounded-md shadow-around-lg w-1/4 h-main">
          <SpecimenView />
        </div>
      </div>
    </div>
  );
}
