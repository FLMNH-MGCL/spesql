import React from 'react';
import VirtualizedTable from '../components/VirtualizedTable';
import SpecimenView from '../components/SpecimenView';
// import useWindowDimensions from '../components/utils/useWindowDimensions';
// import Resizable from '../components/Resizable';

// function NewSidebar() {
//   const { width } = useWindowDimensions();

//   return (
//     <div className="h-full overflow-hidden bg-white dark:bg-dark-800 shadow-around-lg rounded-md min-w-12">
//       <Resizable
//         defaultWidth={width * 0.25}
//         leftConstraint={100}
//         dragTo="left"
//         bg="bg-gray-100 dark:bg-dark-800"
//       >
//         <div className="p-2 flex flex-col space-y-4 justify-center">
//           annotation
//         </div>
//       </Resizable>
//     </div>
//   );
// }

export default function () {
  return (
    <div>
      <div className="flex justify-center items-center space-x-4 p-4 h-minus-header">
        {/* left half */}
        <div className="bg-white dark:bg-dark-800 rounded-md shadow-around-lg flex-1 h-full overflow-hidden">
          <VirtualizedTable />
        </div>

        {/* right half */}
        {/* <div className="bg-white dark:bg-dark-800 rounded-md shadow-around-lg w-1/4 h-full overflow-hidden"> */}
        <SpecimenView />
        {/* <NewSidebar /> */}
        {/* </div> */}
      </div>
    </div>
  );
}
