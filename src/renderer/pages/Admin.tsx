import React, { useEffect } from 'react';
import { useStore } from '../../stores';
import shallow from 'zustand/shallow';
import BackButton from '../components/buttons/BackButton';
import UsersTable from '../components/UsersTable';
import Heading from '../components/ui/Heading';

function AdminHeader({ username }: { username?: string }) {
  return (
    // TODO: fix styles, make grid please
    <div className="w-full flex h-16 px-4 justify-between items-center">
      <BackButton to="/home" />
      <Heading className="mt-4" centered>
        Welcome, @{username}
      </Heading>
    </div>
  );
}

export default function Admin() {
  const { user } = useStore((state) => ({ user: state.user }), shallow);

  useEffect(() => {
    if (!user || user.accessRole !== 'admin') {
      throw new Error("WOAH! Now that's not allowed!");
    }
  }, [user]);

  return (
    <React.Fragment>
      <AdminHeader username={user?.username} />
      <div className="-mt-6">
        <div className="flex justify-center items-center space-x-4 mx-4 h-minus-header">
          {/* left half */}
          <div className="bg-white rounded-md shadow-around-lg w-3/4 h-main">
            <UsersTable />
          </div>

          {/* right half */}
          <div className="bg-white rounded-md shadow-around-lg w-1/4 h-main"></div>
        </div>
      </div>
    </React.Fragment>
  );
}
