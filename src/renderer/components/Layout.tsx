import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-hidden bg-gray-50 dark:bg-dark-900">
      {children}
    </div>
  );
}
