import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useMst } from '../../models';
// import { useNavigate } from "react-router-dom";
import VirtualizedTable from '../components/VirtualizedTable';
import SpecimenView from '../components/SpecimenView';

export default observer(() => {
  // const navigate = useNavigate();
  const store = useMst();

  useEffect(() => {
    // if (!store.session.user) {
    //   // navigate("signin");
    // }
  });

  return (
    <div>
      <div className="flex justify-center items-center space-x-4 mx-4 h-minus-header">
        {/* left half */}
        <div className="bg-white rounded-md shadow-around-lg w-3/4 h-main">
          <VirtualizedTable
            data={[]}
            headers={new Set(['catalogNumber', 'otherCatalogNumber', 'genus'])}
          />
        </div>

        {/* right half */}
        <div className="bg-white rounded-md shadow-around-lg w-1/4 h-main">
          <SpecimenView />
        </div>
      </div>
    </div>
  );
});
