import { Heading, Input, Tabs, Text } from '@flmnh-mgcl/ui';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useStore } from '../../stores';
import { BACKEND_URL, RequestStatus, UserRequest } from '../types';
import AdminInboxListItem from './AdminInboxListItem';
import changeRequestStatus from './utils/changeRequestStatus';
import { useNotify } from './utils/context';

export default function AdminInbox() {
  const { notify } = useNotify();

  const user = useStore((state) => state.user);

  const [inbox, setInbox] = useState<UserRequest[]>([]);
  const [tab, setTab] = useState(0);
  const [filter, setFilter] = useState('');
  // const [sortBy, setSortBy] = useState('at');

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

  async function onReject(req: UserRequest) {
    await changeRequestStatus(req.id!, RequestStatus.REJECTED)
      .then(async () => {
        if (req.email) {
          await axios.post(BACKEND_URL + '/api/send-email', {
            from: user!.fullName,
            toName: req.from,
            toEmail: req.email,
            userRequest: {
              ...req,
              status: RequestStatus.REJECTED,
            },
          });
        }

        notify({
          title: 'Rejected Request',
          message: 'No further actions required',
          level: 'info',
        });

        fetchInbox();
      })
      .catch((err) =>
        notify({
          title: 'An unknown error occurred',
          message: `Please make a bug report on GitHub ${
            err ? JSON.stringify(err) : ''
          }`,
          level: 'error',
        })
      );
  }

  async function reopenRequest(request: UserRequest) {
    await changeRequestStatus(request.id!, RequestStatus.PENDING).then(() => {
      notify({
        title: 'Reopened Request',
        message: 'No further actions required',
        level: 'info',
      });
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
          fullWidth
        />
        {/* <Dropdown
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
        </Dropdown> */}
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
                // .sort((lhs, rhs) => {
                //   if (sortBy === 'at') {
                //     // the database will populate at
                //     return lhs.at! > rhs.at! ? 1 : -1;
                //   } else if (sortBy === 'user') {
                //     return lhs.from > rhs.from ? 1 : -1;
                //   } else {
                //     // type
                //     return lhs._type > rhs._type ? 1 : -1;
                //   }
                // })
                .map((req, i) => (
                  <AdminInboxListItem
                    key={i}
                    {...req}
                    onApprove={onApprove}
                    onReject={() => onReject(req)}
                    onOpen={() => alert('TODO')}
                    refresh={fetchInbox}
                    reopenRequest={() => reopenRequest(req)}
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
