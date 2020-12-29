import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import flmnhLogo from '../assets/flmnhLogo.png';
import CircleButton from '../components/buttons/CircleButton';
import Divider from '../components/ui/Divider';
import Form, { Values } from '../components/ui/Form';
import axios from 'axios';
import { BACKEND_URL } from '../types';
import { useStore } from '../../stores';
import { useNotify } from '../components/utils/context';
import useToggle from '../components/utils/useToggle';
import Button from '../components/ui/Button';

export default function SignIn() {
  const { notify } = useNotify();
  const navigate = useNavigate();

  const [loading, { on, off }] = useToggle(false);

  const login = useStore((state) => state.login);

  useEffect(() => {
    async function checkConfig() {
      const config = await axios.get(BACKEND_URL + '/api/config/get');

      if (config.status === 201) {
        // file did not exist, created it
        notify({
          title: 'Config Created',
          message:
            'A spesql config file was created, please complete it in Settings',
          level: 'warning',
        });
      } else if (config.status === 500) {
        // server error
        notify({
          title: 'Server Error',
          message: `Error when trying to access spesql config: ${config.data}`,
          level: 'error',
        });
      }
    }

    checkConfig();
  }, []);

  async function handleSubmit(values: Values) {
    on();
    const { username, password } = values;

    const loginResponse = await axios
      .post(BACKEND_URL + '/api/login', {
        username,
        password,
      })
      .catch((error) => error.response);

    off();

    if (loginResponse.status === 200) {
      notify({
        title: `Welcome, ${username}`,
        message: 'You will be redirected shortly',
        level: 'success',
      });

      setTimeout(() => {
        const { id, fullName, accessRole } = loginResponse.data;

        login(id, fullName, username, accessRole);
        navigate('/home');
      }, 500);
    } else if (loginResponse.status === 401) {
      notify({
        title: 'Could not authenticate',
        message:
          'The username or password combination you entered is either invalid or does not exist',
        level: 'error',
      });
    } else if (loginResponse.status === 500 || loginResponse.status === 504) {
      notify({
        title: 'Server error',
        message:
          'It is possible you lost connection to the database, please check your internet and VPN status.',
        level: 'error',
      });
    } else {
      notify({
        title: 'Unhandled error!',
        message:
          'Please (on the top tool bar) go to View > Toggle Developer Tools > Console and then copy/screenshot what you see and send it to Aaron',
        level: 'error',
      });
    }
  }

  useEffect(() => {
    async function checkSession() {
      const res = await axios
        .get(BACKEND_URL + '/api/viewer')
        .catch((error) => {
          return error.response;
        });

      if (res.data) {
        const { id, fullName, username, accessRole } = res.data;
        login(id, fullName, username, accessRole);
        navigate('/home');
      }
    }

    checkSession();
  }, []);

  return (
    <div className="h-screen flex items-center">
      <div className="mx-auto w-full max-w-md">
        <div className="bg-white dark:bg-dark-700 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex justify-center pb-4">
            <img
              className="object-scale-down max-h-24 shadow rounded-sm"
              src={flmnhLogo}
            />
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              name="username"
              label="Username"
              placeholder="Username"
              required
              icon="atMention"
            />

            <Form.Input
              className="mt-6"
              name="password"
              label="Password"
              placeholder="••••••••••"
              type="password"
              required
              icon="password"
            />

            <div className="mt-6 flex text-sm leading-5">
              <p className="font-medium mr-1 dark:text-dark-200">
                Don't have an account?
              </p>
              <a
                href="mailto:kawahara@flmnh.ufl.edu"
                target="_blank"
                rel="noopener"
                className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
              >
                Request one here
              </a>
            </div>

            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                {/* TODO: change to UI button */}
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  loading={loading}
                >
                  Sign in
                </Button>
              </span>
            </div>
          </Form>

          <div className="mt-6">
            <Divider text="Or view" />

            <div className="pt-4 flex justify-center items-center space-x-6">
              <CircleButton
                onClick={() => navigate('/settings')}
                icon={
                  <div title="Settings">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                }
              />
              <CircleButton
                onClick={() =>
                  open('https://flmnh-mgcl.github.io/spesql/docs/')
                }
                icon={
                  <div title="View Documentation">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
