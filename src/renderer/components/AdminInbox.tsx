import { Dropdown, Heading, Input } from '@flmnh-mgcl/ui';
import clsx from 'clsx';
import React from 'react';
import { TableRowProps } from 'react-virtualized';
import InboxDropdown from './InboxDropdown';

enum RequestType {
  UPDATE,
  DELETE,
  // INSERT,
  ACCOUNTCREATION,
}

enum RequestStatus {
  PENDING,
  COMPLETED,
  FAILED,
}

type UserRequest = {
  _type: RequestType;
  status: RequestStatus;
  from: string; // username OR name (if not registered user)
  email?: string;
  title: string; // title of request
  description?: string; // optional explanation for request
  query?: string;
};

type ListItemProps = {
  onApprove(): void;
  onDelete(): void;
  onOpen(): void;
} & UserRequest;

function InboxListItem({
  onApprove,
  onDelete,
  onOpen,
  ...reqDetails
}: ListItemProps) {
  const { _type, status, from, email, title, description, query } = reqDetails;

  function getIdentifierColor() {
    if (_type === RequestType.ACCOUNTCREATION) {
      return 'bg-green-600';
    } else if (_type === RequestType.DELETE) {
      return 'bg-red-600';
    } else {
      return 'bg-purple-600';
    }
  }

  return (
    <li className="py-2 px-4">
      <div className="flex items-center space-x-4">
        <div
          className={clsx(
            'flex-shrink-0 w-2.5 h-2.5 rounded-full',
            getIdentifierColor()
          )}
          aria-hidden="true"
        ></div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{title}</p>
          <p className="text-xs italix text-gray-500 truncate">{from}</p>
        </div>
        <div>
          <InboxDropdown />
        </div>
      </div>
    </li>
  );
}

const dummyData: UserRequest[] = [
  {
    _type: RequestType.ACCOUNTCREATION,
    status: RequestStatus.PENDING,
    from: 'Frodo Baggins',
    email: 'misterfrodo@hotmail.com',
    title: 'New Account Request',
    description:
      'I work at X institution and would like to collect data for my research.',
  },
  {
    _type: RequestType.UPDATE,
    status: RequestStatus.PENDING,
    from: 'lkaminsky',
    title: 'Update LEP123456',
    description:
      'I found an incorrect field in LEP1234567. There was a simple spelling error in the specificEpithet field. I have constructed the tentative update query to correct this.',
  },
  {
    _type: RequestType.UPDATE,
    status: RequestStatus.PENDING,
    from: 'bflyuser',
    title: 'Update LEP9376183',
    description:
      'I found an incorrect field in LEP9376183. There was a simple spelling error in the genus field. I have constructed the tentative update query to correct this.',
  },
  {
    _type: RequestType.DELETE,
    status: RequestStatus.PENDING,
    from: 'aarondev',
    title: 'Delete LEP93819273',
    description:
      'I found a specimen that is no longer a part of the collection: LEP93819273. I have constructed the tentative delete query to correct this.',
  },
  {
    _type: RequestType.ACCOUNTCREATION,
    status: RequestStatus.PENDING,
    from: 'Samwise Gamgee',
    email: 'samthewise@mordorexpress.com',
    title: 'New Account Request',
    description:
      'I work at X institution along with Mister Frodo and would like to collect data for my research.',
  },
];

export default function AdminInbox() {
  return (
    <div className="w-1/4 h-full flex flex-col">
      <div className="pb-3 flex space-x-2 items-center">
        <Heading>Requests</Heading>
        <Input placeholder="Filter Requests" />
        <Dropdown
          label="Sort"
          origin="right"
          labelIcon={
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
              />
            </svg>
          }
        >
          <Dropdown.Section>
            <Dropdown.Item text="Request Type" />
            <Dropdown.Item text="Date" />
            <Dropdown.Item text="User" />
          </Dropdown.Section>
        </Dropdown>
      </div>

      <div className="w-full h-full bg-white dark:bg-dark-600 shadow rounded-md overflow-hidden">
        <div className="flow-root mt-6">
          <ul className="-my-5 divide-y divide-gray-200">
            {dummyData.map((req, i) => (
              <InboxListItem
                key={i}
                {...req}
                onApprove={() => alert('TODO')}
                onDelete={() => alert('TODO')}
                onOpen={() => alert('TODO')}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
