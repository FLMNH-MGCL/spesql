import React from 'react';
import { useNavigate } from 'react-router-dom';
import shallow from 'zustand/shallow';
import { useStore } from '../../stores';
import CreateConfirmModal from './modals/CreateConfirmModal';
import { Dropdown } from '@flmnh-mgcl/ui';
import axios from 'axios';
import { BACKEND_URL } from '../types';

export default function UserMenu() {
  const navigate = useNavigate();
  // const store = useMst();

  const { user, logout } = useStore(
    (state) => ({ user: state.user, logout: state.logout }),
    shallow
  );

  if (!user) {
    return null;
  }

  function handleLogout() {
    axios.post(BACKEND_URL + '/api/logout');
    logout();
    navigate('/signin');
  }

  const { username, accessRole } = user;

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
      <Dropdown.Section>
        {accessRole === 'admin' && (
          <Dropdown.Item
            text="Admin Portal"
            onClick={() => navigate('/shhhhh/secret/admin')}
          />
        )}

        <Dropdown.Item text="Settings" onClick={() => navigate('/settings')} />
        <CreateConfirmModal
          details="This action will require you to log back in to continue usage"
          trigger={<Dropdown.Item text="Logout" />}
          onConfirm={handleLogout}
        />
      </Dropdown.Section>
    </Dropdown>
  );
}
