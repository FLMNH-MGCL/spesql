import React, { createRef, useEffect } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import NotificationSystem from 'react-notification-system';
import { BACKEND_URL, NotificationContent } from './types';
import { NotificationContext } from './components/utils/context';
import CreateVerifySessionModal from './components/modals/CreateVerifySessionModal';
import useSound from 'use-sound';
import bulb from './assets/sounds/Bulb.mp3';
import crosswalk from './assets/sounds/Crosswalk.mp3';
import { ipcRenderer } from 'electron';
import Layout from './components/Layout';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';
import HomeLayoutPlaceholder from './components/placeholders/HomeLayoutPlaceholder';
import SigninPlaceholder from './components/placeholders/SigninPlaceholder';
import { usePersistedStore } from '../stores/persisted';
import axios from 'axios';
import { Notification } from '@flmnh-mgcl/ui';

const Home = React.lazy(() => import('./pages/Home'));
const Lost = React.lazy(() => import('./pages/Lost'));
const Admin = React.lazy(() => import('./pages/Admin'));
const Settings = React.lazy(() => import('./pages/Settings'));
const SignIn = React.lazy(() => import('./pages/SignIn'));
const Visualization = React.lazy(() => import('./pages/Visualization'));

function HomeStack() {
  return (
    <React.Fragment>
      <Header />
      <CreateVerifySessionModal />
      <React.Suspense fallback={<HomeLayoutPlaceholder />}>
        <Routes>
          <AuthRoute path="/" element={<Home />} />
          <AuthRoute path="/visualization" element={<Visualization />} />
        </Routes>
      </React.Suspense>
    </React.Fragment>
  );
}

export default function App() {
  const [playError] = useSound(bulb);
  const [playSuccess] = useSound(crosswalk);

  const prefersSound = usePersistedStore((state) => state.prefersSound);
  // const prefersSound = useStore((state) => state.prefersSound);

  const notificationSystem = createRef();

  function notify(
    content: NotificationContent,
    sound?: 'error' | 'success' | 'warning'
  ) {
    const notification = notificationSystem.current;
    const { title, message, level } = content;

    if (prefersSound) {
      if (level === 'error' || sound === 'error') {
        playError();
      } else if (sound === 'success') {
        playSuccess();
      }
    }

    // @ts-ignore
    notification?.addNotification({
      level,
      children: <Notification title={title} message={message} level={level} />,
      // autoDismiss: 1000, DEBUG
    });
  }

  ipcRenderer.on('message', function (_event, information) {
    const { type, message } = information;

    notify({
      title: 'System Notification',
      message: message,
      level: type === 'logging' ? 'warning' : 'error',
    });
  });

  useEffect(() => {
    async function checkConnection() {
      const res = await axios.get(BACKEND_URL + '/api/check-connection');
      if (res.status !== 200) {
        notify({
          title: 'Connection Error',
          message:
            'Could not establish a connection with the database, please check internet and VPN connections',
          level: 'error',
        });
      }
    }

    checkConnection();
  }, []);

  return (
    <MemoryRouter initialEntries={['/home']}>
      <ErrorBoundary>
        <NotificationContext.Provider value={{ notify }}>
          {/* <React.Suspense fallback={<LayoutPlaceholder />}> */}
          <Layout>
            <Routes>
              <Route path="/home/*" element={<HomeStack />} />
              <Route
                path="/shhhhh/secret/admin"
                element={
                  <React.Suspense fallback={<div>LOADING ADMIN</div>}>
                    <Admin />
                  </React.Suspense>
                }
              />
              <Route
                path="/signin"
                element={
                  <React.Suspense fallback={<SigninPlaceholder />}>
                    <SignIn />
                  </React.Suspense>
                }
              />
              <Route
                path="/settings"
                element={
                  <React.Suspense fallback={<div>LOADING SETTINGS</div>}>
                    <Settings />
                  </React.Suspense>
                }
              />
              <Route path="*" element={<Lost />} />
            </Routes>
          </Layout>
          {/* </React.Suspense> */}
        </NotificationContext.Provider>
      </ErrorBoundary>
      {/* @ts-ignore */}
      <NotificationSystem ref={notificationSystem} />
    </MemoryRouter>
  );
}
