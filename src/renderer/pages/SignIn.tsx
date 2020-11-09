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
  const [loading, { on, off }] = useToggle(false);
  const navigate = useNavigate();
  const { notify } = useNotify();
  const login = useStore((state) => state.login);

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

    // console.log(loginResponse);

    if (loginResponse.status === 200) {
      notify({
        title: `Welcome, ${username}`,
        message: 'You will be redirected shortly',
        level: 'success',
      });

      setTimeout(() => {
        const { id, accessRole } = loginResponse.data;
        // create spesql session
        // store.session.createSession(username, id, accessRole);

        login(id, username, accessRole);
        navigate('/home');
      }, 500);
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
        const { id, username, accessRole } = res.data;
        login(id, username, accessRole);
        navigate('/home');
      }
    }

    checkSession();
  }, []);

  return (
    <div className="h-screen flex items-center">
      <div className="mx-auto w-full max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex justify-center pb-4">
            <img
              className="object-scale-down max-h-24 shadow rounded-sm"
              src={flmnhLogo}
            />
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Input name="username" label="Username" required />

            <Form.Input
              className="mt-6"
              name="password"
              label="Password"
              type="password"
              required
            />

            <div className="mt-6 flex text-sm leading-5">
              <p className="font-medium mr-1">Don't have an account?</p>
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
                onClick={() => {}}
                icon={
                  <div title="Documentation">
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
