import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMst } from '../../models';
import CreateConfirmModal from './modals/CreateConfirmModal';
import Dropdown from './ui/Dropdown';

export default function UserMenu() {
  const navigate = useNavigate();
  const store = useMst();

  if (!store.session.user) {
    return null;
  }

  const { username } = store.session.user;

  return (
    <Dropdown
      origin="right"
      icon={
        <div>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
      }
      rounded
    >
      <Dropdown.Header text={`Hello, @${username}`} />
      <Dropdown.Item text="Admin Portal" />
      <Dropdown.Item text="Settings" onClick={() => navigate('/settings')} />
      <CreateConfirmModal
        details="This action will require you to log back in to continue usage"
        trigger={<Dropdown.Item text="Logout" />}
        onConfirm={() => {
          store.session.destroySession();
          navigate('/signin');
        }}
      />
    </Dropdown>
  );
}
