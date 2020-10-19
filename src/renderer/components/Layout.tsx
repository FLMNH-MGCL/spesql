import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="h-screen overflow-hidden bg-gray-100">{children}</div>;
}
