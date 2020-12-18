import React, { createRef } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import NotificationSystem from 'react-notification-system';
import { NotificationContent } from './types';
import { NotificationContext } from './components/utils/context';
import Admin from './pages/Admin';
import CreateVerifySessionModal from './components/modals/CreateVerifySessionModal';
import useSound from 'use-sound';
import bulb from './assets/sounds/Bulb.mp3';
import crosswalk from './assets/sounds/Crosswalk.mp3';
import { useStore } from '../stores';
import Notification from './components/ui/Notification';
import { ipcRenderer } from 'electron';

import Layout from './components/Layout';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';
import Spinner from './components/ui/Spinner';

const Home = React.lazy(() => import('./pages/Home'));
const Lost = React.lazy(() => import('./pages/Lost'));
const Settings = React.lazy(() => import('./pages/Settings'));
const SignIn = React.lazy(() => import('./pages/SignIn'));
const Visualization = React.lazy(() => import('./pages/Visualization'));

function HomeStack() {
  return (
    <React.Fragment>
      <Header />
      <CreateVerifySessionModal />
      <React.Suspense fallback={<div>...LOADING</div>}>
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

  const prefersSound = useStore((state) => state.prefersSound);

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

  return (
    <MemoryRouter initialEntries={['/home']}>
      <ErrorBoundary>
        <NotificationContext.Provider value={{ notify }}>
          <React.Suspense fallback={<Spinner />}>
            <Layout>
              <Routes>
                <Route path="/home/*" element={<HomeStack />} />
                <Route path="/shhhhh/secret/admin" element={<Admin />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Lost />} />
              </Routes>
            </Layout>
          </React.Suspense>
        </NotificationContext.Provider>
      </ErrorBoundary>
      {/* @ts-ignore */}
      <NotificationSystem ref={notificationSystem} />
    </MemoryRouter>
  );
}
