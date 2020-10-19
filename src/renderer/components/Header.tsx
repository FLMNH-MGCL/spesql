import React from "react";
import Download from "./Download";
import InsertMenu from "./InsertMenu";
import QueryMenu from "./QueryMenu";

export default function Header() {
  return (
    <div className="w-full flex bg-white h-16 shadow">
      <div className="flex items-center justify-between mx-4">
        {/* query interactions */}
        <QueryMenu />
        <InsertMenu />
        <Download />

        {/* user interactions */}
      </div>
    </div>
  );
}
