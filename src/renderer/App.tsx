import React, { createRef } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Lost from './pages/Lost';
import Settings from './pages/Settings';
import SignIn from './pages/SignIn';
import Visualization from './pages/Visualization';
import Layout from './components/Layout';
import Header from './components/Header';
import AuthRoute from './components/AuthRoute';
import NotificationSystem from 'react-notification-system';
import { NotificationContent } from './types';
import { NotificationContext } from './components/utils/context';
import Admin from './pages/Admin';
import ErrorBoundary from './components/ErrorBoundary';
import CreateVerifySessionModal from './components/modals/CreateVerifySessionModal';
import say from 'say';

function HomeStack() {
  return (
    <React.Fragment>
      <Header />
      <CreateVerifySessionModal />
      <Routes>
        <AuthRoute path="/" element={<Home />} />
        <AuthRoute path="/visualization" element={<Visualization />} />
      </Routes>
    </React.Fragment>
  );
}

export default function App() {
  const notificationSystem = createRef();

  function notify(content: NotificationContent) {
    const notification = notificationSystem.current;
    const { title, message, level } = content;

    // TODO: REPLACE ME WITH SOUND NOT SAY
    if (level === 'error') {
      say.speak('Error Occurred');
    }

    // @ts-ignore
    notification.addNotification({
      title,
      message,
      level,
    });
  }

  return (
    <MemoryRouter initialEntries={['/home']}>
      <ErrorBoundary>
        <NotificationContext.Provider value={{ notify }}>
          <Layout>
            <Routes>
              <Route path="/home/*" element={<HomeStack />} />
              <Route path="/shhhhh/secret/admin" element={<Admin />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Lost />} />
            </Routes>
          </Layout>
        </NotificationContext.Provider>
      </ErrorBoundary>

      {/* @ts-ignore */}
      <NotificationSystem ref={notificationSystem} />
    </MemoryRouter>
  );
}
