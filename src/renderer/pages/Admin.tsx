import React, { useState, useEffect } from 'react';
import { useStore } from '../../stores';
import shallow from 'zustand/shallow';
import BackButton from '../components/buttons/BackButton';
import UsersTable from '../components/UsersTable';
import TableCard from '../components/TableCard';
import { TableStats } from '../types';
import useQuery from '../components/utils/useQuery';
import CreateCreateTableModal from '../components/modals/CreateCreateTableModal';
import { Heading } from '@flmnh-mgcl/ui';

function AdminHeader({ username }: { username?: string }) {
  return (
    <div className="w-full flex h-16 items-center px-4 mb-4 bg-white dark:bg-dark-500 shadow">
      <BackButton to="/home" />
      <Heading className="flex-1" centered>
        Welcome, @{username}
      </Heading>
    </div>
  );
}

export default function Admin() {
  const { user } = useStore((state) => ({ user: state.user }), shallow);
  const { queriablesStats } = useQuery();

  const [tableStats, setTableStats] = useState<TableStats[]>();

  useEffect(() => {
    if (!user || user.accessRole !== 'admin') {
      throw new Error("WOAH! Now that's not allowed!");
    }
  }, [user]);

  useEffect(() => {
    if (!tableStats) {
      getStats();
    }
  }, []);

  async function getStats() {
    const stats = await queriablesStats();
    setTableStats(stats);
  }

  return (
    <React.Fragment>
      <AdminHeader username={user?.username} />

      <div className="h-minus-header flex flex-col px-4">
        <div className="flex space-x-1">
          <Heading>
            Tables {tableStats && <span>({tableStats.length})</span>}
          </Heading>
          <span className="flex pl-3">
            <CreateCreateTableModal refresh={getStats} />
          </span>
        </div>
        <div className="flex space-x-3 flex-nowrap overflow-x-auto pt-3 pb-6">
          {tableStats?.map((props) => (
            <TableCard key={props.table_name} {...props} refresh={getStats} />
          ))}
        </div>

        <Heading className="pb-3">Users</Heading>
        <div className="bg-white dark:bg-dark-500 rounded-md overflow-hidden shadow-around-lg w-full flex-1 mb-16">
          <UsersTable />
        </div>
      </div>
    </React.Fragment>
  );
}
