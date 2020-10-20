import React from "react";
import CreateDownloadModal from "./modals/CreateDownloadModal";
import InsertMenu from "./InsertMenu";
import QueryMenu from "./QueryMenu";
import UserMenu from "./UserMenu";

export default function Header() {
  return (
    <div className="w-full flex bg-white h-16 px-4 shadow justify-between items-center">
      {/* query interactions */}
      <div className="flex items-center space-x-4">
        <QueryMenu />
        <InsertMenu />
        <CreateDownloadModal />
      </div>
      {/* user interactions */}
      <div>
        <UserMenu />
      </div>
    </div>
  );
}
