import React, { useEffect, useState } from 'react';
import { AutoSizer, Column, Table } from 'react-virtualized';
import Button from './ui/Button';
import axios from 'axios';
import useWindowDimensions from './utils/useWindowDimensions';

export type User = {
  id: number;
  name: string;
  username: string;
  role: string;
  created_at: any;
};

export default function UsersTable() {
  const { width } = useWindowDimensions();
  const [users, setUsers] = useState<User[]>();

  const display = users ?? [];

  useEffect(() => {
    async function getUsers() {
      const response = await axios
        .get('/api/admin/users')
        .catch((error) => error.response);

      console.log(response);
      if (response.status !== 200) {
        // notify
        return;
      }

      const { query, users } = response.data;
      console.log(query);
      setUsers(users.map((user: any) => user as User));
    }

    if (!users || !users.length) {
      getUsers();
    }
  }, []);

  function renderHeader() {
    return <div></div>;
  }

  function getColumns() {
    const columns =
      !users || !users.length
        ? []
        : Object.keys(users[0]).map((header) => {
            return (
              <Column
                key={header}
                label={header}
                dataKey={header}
                flexGrow={1}
                flexShrink={1}
                width={width / Object.keys(users[0]).length}
                headerRenderer={renderHeader}
              />
            );
          });

    console.log(columns);
    return columns;
  }

  return (
    <React.Fragment>
      <div className="w-full align-middle overflow-x-auto overflow-hidden table-height">
        <AutoSizer>
          {({ height, width }) => (
            <Table
              height={height}
              width={width}
              rowHeight={40}
              headerHeight={60}
              rowCount={0}
              rowGetter={({ index }) => display[index]}
              // onRowClick={handleRowClick}
              // onHeaderClick={handleHeaderClick}
            >
              {getColumns()}
            </Table>
          )}
        </AutoSizer>
      </div>
      <nav className="bg-gray-50 px-4 py-3 flex items-center justify-between sm:px-6 border-t border-cool-gray-100">
        <div className="hidden sm:block">
          <p className="text-sm leading-5 text-cool-gray-700">
            Showing <span className="font-medium">1 </span>
            to <span className="font-medium">10 </span>
            of <span className="font-medium">20 </span>
            results
          </p>
        </div>
        <div className="flex-1 flex justify-between sm:justify-end">
          <Button.Group>
            <Button>Previous</Button>
            <Button>Next</Button>
          </Button.Group>
        </div>
      </nav>
    </React.Fragment>
  );

  return (
    <table className="divide-y divide-cool-gray-200">
      <thead>
        <tr>
          <th className="px-6 py-3 bg-cool-gray-50 text-left text-xs leading-4 font-medium text-cool-gray-500 uppercase tracking-wider">
            Transaction
          </th>
          <th className="px-6 py-3 bg-cool-gray-50 text-right text-xs leading-4 font-medium text-cool-gray-500 uppercase tracking-wider">
            Amount
          </th>
          <th className="hidden px-6 py-3 bg-cool-gray-50 text-left text-xs leading-4 font-medium text-cool-gray-500 uppercase tracking-wider md:block">
            Status
          </th>
          <th className="px-6 py-3 bg-cool-gray-50 text-right text-xs leading-4 font-medium text-cool-gray-500 uppercase tracking-wider">
            Date
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-cool-gray-200 table-height">
        <tr className="bg-white">
          <td className="max-w-0 w-full px-6 py-4 whitespace-no-wrap text-sm leading-5 text-cool-gray-900">
            <div className="flex">
              <a
                href="#"
                className="group inline-flex space-x-2 truncate text-sm leading-5"
              >
                {/* <!-- Heroicon name: cash --> */}
                <svg
                  className="flex-shrink-0 h-5 w-5 text-cool-gray-400 group-hover:text-cool-gray-500 transition ease-in-out duration-150"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <p className="text-cool-gray-500 truncate group-hover:text-cool-gray-900 transition ease-in-out duration-150">
                  Payment to Molly Sanders
                </p>
              </a>
            </div>
          </td>
          <td className="px-6 py-4 text-right whitespace-no-wrap text-sm leading-5 text-cool-gray-500">
            <span className="text-cool-gray-900 font-medium">$20,000 </span>
            USD
          </td>
          <td className="hidden px-6 py-4 whitespace-no-wrap text-sm leading-5 text-cool-gray-500 md:block">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-green-100 text-green-800 capitalize">
              success
            </span>
          </td>
          <td className="px-6 py-4 text-right whitespace-no-wrap text-sm leading-5 text-cool-gray-500">
            July 11, 2020
          </td>
        </tr>

        {/* <!-- More rows... --> */}
      </tbody>
    </table>
  );
}
