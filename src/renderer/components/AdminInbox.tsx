import { Dropdown, Heading, Input, Tabs, Text } from '@flmnh-mgcl/ui';
import axios from 'axios';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { BACKEND_URL, RequestStatus, RequestType, UserRequest } from '../types';
import InboxDropdown from './InboxDropdown';
import CreateViewRequestModal from './modals/CreateViewRequestModal';
import changeRequestStatus from './utils/changeRequestStatus';
import { useNotify } from './utils/context';
import useToggle from './utils/useToggle';

type ListItemProps = {
  onApprove(): void;
  onReject(): void;
  onOpen(): void;
} & UserRequest;

function InboxListItem({
  onApprove,
  onReject,
  onOpen,
  ...reqDetails
}: ListItemProps) {
  const { _type, status, from, email, title, description, query } = reqDetails;

  const [viewing, { on, off }] = useToggle(false);

  function getIdentifierColor() {
    if (_type === RequestType.ACCOUNTCREATION) {
      return 'bg-green-600';
    } else if (_type === RequestType.DELETE) {
      return 'bg-red-600';
    } else {
      return 'bg-purple-600';
    }
  }

  function handleReject() {
    // TODO
    onReject();
  }

  function handleApprove() {
    // TODO
  }

  function handleViewRequest() {
    // TODO
  }

  return (
    <React.Fragment>
      <CreateViewRequestModal
        request={reqDetails}
        open={viewing}
        onClose={off}
        onApprove={onApprove}
      />
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
            <p className="text-sm font-medium text-gray-900 dark:text-dark-200 truncate">
              {title}
            </p>
            <p className="text-xs italix text-gray-500 dark:text-dark-200 truncate">
              {from}
            </p>
          </div>
          <div>
            <InboxDropdown onViewClick={on} onReject={handleReject} />
          </div>
        </div>
      </li>
    </React.Fragment>
  );
}

export default function AdminInbox() {
  const { notify } = useNotify();

  const [inbox, setInbox] = useState<UserRequest[]>([]);
  const [tab, setTab] = useState(0);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('at');

  async function fetchInbox() {
    const res = await axios.get(BACKEND_URL + '/api/admin/reqests');

    if (res && res.status === 200) {
      const { requests } = res.data;
      setInbox(requests);
    } else {
      notify({
        title: 'Could not load inbox',
        message:
          'There was an error while trying to load the user requests. Please try refreshing the application.',
        level: 'error',
      });
    }
  }

  function onApprove() {
    fetchInbox();
  }

  async function onReject(id: number) {
    await changeRequestStatus(id, RequestStatus.REJECTED).then(() => {
      fetchInbox();
    });
  }

  useEffect(() => {
    fetchInbox();
  }, []);

  const items = inbox.filter((req) => {
    if (tab === 0) {
      return req.status === RequestStatus.PENDING;
    } else {
      return req.status !== RequestStatus.PENDING;
    }
  });

  return (
    <div className="w-1/4 h-full flex flex-col">
      <div className="pb-3 flex space-x-2 items-center">
        <Heading>Requests</Heading>
        <Input
          placeholder="Filter Requests"
          disabled={!items.length}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Dropdown
          label="Sort"
          origin="right"
          disabled={!items.length}
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
            <Dropdown.Item
              text="Request Type"
              onClick={() => setSortBy('type')}
            />
            <Dropdown.Item text="Date" onClick={() => setSortBy('at')} />
            <Dropdown.Item text="User" onClick={() => setSortBy('user')} />
          </Dropdown.Section>
        </Dropdown>
      </div>

      <div className="w-full h-full bg-white dark:bg-dark-600 shadow rounded-md overflow-hidden">
        <div className="p-3">
          <Tabs
            tabs={['Pending', 'Completed']}
            selectedIndex={tab}
            fullWidth
            onChange={(i) => setTab(i)}
          />
        </div>
        <div className="flow-root mt-6">
          <ul className="-my-5 divide-y divide-gray-200 dark:divide-dark-400">
            {items.length ? (
              items
                .filter((req) => {
                  if (filter) {
                    return JSON.stringify(req).includes(filter);
                  } else return true;
                })
                .map((req, i) => (
                  <InboxListItem
                    key={i}
                    {...req}
                    onApprove={onApprove}
                    onReject={() => onReject(req.id!)}
                    onOpen={() => alert('TODO')}
                  />
                ))
            ) : (
              <div className="p-3">
                <Text>
                  No {tab === 0 ? 'Pending' : 'Completed'} requests could be
                  found.
                </Text>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
