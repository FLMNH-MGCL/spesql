import axios from 'axios';
import clsx from 'clsx';
import React from 'react';
import { BACKEND_URL, RequestStatus, RequestType, UserRequest } from '../types';
import InboxDropdown from './InboxDropdown';
import CreateViewRequestModal from './modals/CreateViewRequestModal';
import changeRequestStatus from './utils/changeRequestStatus';
import useLogError from './utils/useLogError';
import useQuery from './utils/useQuery';
import useToggle from './utils/useToggle';

type ListItemProps = {
  onApprove(): void;
  onReject(): void;
  onOpen(): void;
  refresh(): void;
  reopenRequest(): void;
} & UserRequest;

export default function AdminInboxListItem({
  onApprove,
  onReject,
  onOpen,
  refresh,
  reopenRequest,
  ...reqDetails
}: ListItemProps) {
  const { _type, from, title, status } = reqDetails;

  const [viewing, { on, off }] = useToggle(false);

  const { createUser } = useQuery();

  const { logAdminUserError } = useLogError();

  function getIdentifierColor() {
    if (_type === RequestType.ACCOUNTCREATION) {
      return 'bg-green-600';
    } else if (_type === RequestType.DELETE) {
      return 'bg-red-600';
    } else {
      return 'bg-purple-600';
    }
  }

  const quickApproveUserCreation = async () => {
    const { username, password } = reqDetails;

    const newUser = {
      name: from,
      username,
      password,
      access_role: 'guest',
    };

    const ret = await createUser(newUser);

    if (ret) {
      const { status, data } = ret;

      if (status !== 201) {
        logAdminUserError({ status, data: data.err });
        changeRequestStatus(reqDetails.id!, RequestStatus.FAILED);
      }
    } else {
      await changeRequestStatus(reqDetails.id!, RequestStatus.ACCEPTED).then(
        () => {
          onApprove();
        }
      );

      await axios.post(BACKEND_URL + '/api/send-email', {
        from: from,
        toName: reqDetails.from,
        toEmail: reqDetails.email!,
        userRequest: {
          ...reqDetails,
          status: RequestStatus.ACCEPTED,
        },
      });
    }
  };

  // based on the request type, returns one of the functions above
  function getQuickApproveFunction() {
    if (status !== RequestStatus.PENDING) {
      return undefined;
    } else if (_type === RequestType.ACCOUNTCREATION) {
      return quickApproveUserCreation;
    } else {
      return undefined;
    }
  }

  // based on the request type, returns one of the functions above
  function getQuickRejectFunction() {
    if (status !== RequestStatus.PENDING) {
      return undefined;
    } else {
      return onReject;
    }
  }

  return (
    <React.Fragment>
      <CreateViewRequestModal
        request={reqDetails}
        open={viewing}
        onClose={off}
        onApprove={onApprove}
        refresh={refresh}
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
            <InboxDropdown
              status={status}
              onViewClick={on}
              onQuickAccept={getQuickApproveFunction()}
              onQuickReject={getQuickRejectFunction()} // onReject is handled in the AdminInbox
              reopenRequest={reopenRequest}
            />
          </div>
        </div>
      </li>
    </React.Fragment>
  );
}
