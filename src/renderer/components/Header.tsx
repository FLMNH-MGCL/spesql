import React from 'react';
import CreateDownloadModal from './modals/CreateDownloadModal';
import InsertMenu from './InsertMenu';
import QueryMenu from './QueryMenu';
import UserMenu from './UserMenu';
import VisualizationToggle from './VisualizationToggle';
import { useStore } from '../../stores';
import shallow from 'zustand/shallow';

export default function Header() {
  const { disableDownload, disableCrud } = useStore(
    (state) => ({
      disableDownload: !state.queryData.data || !state.queryData.data.length,
      disableCrud:
        !state.user || !['manager', 'admin'].includes(state.user?.accessRole),
    }),
    shallow
  );

  return (
    <div className="w-full flex bg-white h-16 px-4 shadow justify-between items-center">
      {/* query interactions */}
      <div className="flex items-center space-x-4">
        <QueryMenu disableCrud={disableCrud} />
        <InsertMenu disableCrud={disableCrud} />
        <CreateDownloadModal disableDownload={disableDownload} />
        <VisualizationToggle />
      </div>
      {/* user interactions */}
      <div>
        <UserMenu />
      </div>
    </div>
  );
}
