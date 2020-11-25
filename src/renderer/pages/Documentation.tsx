import React from 'react';
import BackButton from '../components/buttons/BackButton';
import Heading from '../components/ui/Heading';

export default function Documentation() {
  return (
    <div className="relative">
      <div className="absolute top-4 left-4">
        <BackButton to="/home" />
      </div>

      <div className="h-screen flex items-center">
        <div className="mx-auto w-full max-w-lg py-8 px-10 bg-white shadow rounded-lg">
          <Heading className="pb-2.5">Documentation</Heading>
        </div>
      </div>
    </div>
  );
}
