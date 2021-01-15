import React from 'react';
import { TableStats } from '../types';
import CreateDeleteTableModal from './modals/CreateDeleteTableModal';
import CreateEditTableModal from './modals/CreateEditTableModal';
import { Heading } from '@flmnh-mgcl/ui';
import numeral from 'numeral';
import CreateTableLogModal from './modals/CreateTableLogModal';

type Props = {
  refresh(): void;
};

export default function TableCard({
  table_name,
  rows,
  size,
  refresh,
}: TableStats & Props) {
  return (
    <div className="bg-white dark:bg-dark-400 overflow-hidden shadow rounded-lg w-1/3 flex-shrink-0">
      <Heading className="pl-5 pt-3 pb-1">{table_name}</Heading>

      <div className="px-5 py-1">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg
              className="w-6 h-6 text-gray-400 dark:text-dark-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 dark:text-dark-200 truncate">
                Number of Entries
              </dt>
              <dd>
                <div className="text-md font-medium text-gray-800 dark:text-dark-200">
                  {rows}
                </div>
              </dd>
            </dl>
          </div>

          <div className="flex-shrink-0">
            <svg
              className="w-6 h-6 text-gray-400 dark:text-dark-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
              />
            </svg>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-600 dark:text-dark-200 truncate">
                Disk Size
              </dt>
              <dd>
                <div className="text-md font-medium text-gray-800 dark:text-dark-200">
                  {numeral(size).format('0.00b')}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="flex justify-between bg-gray-50 dark:bg-dark-500 px-5 py-3 mt-1">
        <CreateTableLogModal table={table_name} />

        <div className="flex space-x-2 items-center">
          <CreateEditTableModal table={table_name} refresh={refresh} />
          <CreateDeleteTableModal table={table_name} refresh={refresh} />
        </div>
      </div>
    </div>
  );
}
