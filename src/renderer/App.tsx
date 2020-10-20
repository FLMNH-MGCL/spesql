import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Lost from './pages/Lost';
import Settings from './pages/Settings';
import SignIn from './pages/SignIn';
import Visualization from './pages/Visualization';
import { Provider } from '../models';
import Layout from './components/Layout';
import Header from './components/Header';

function MainLayout() {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
    </React.Fragment>
  );
}

export default function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="/">
                <Home />
              </Route>
              <Route path="/visualization">
                <Visualization />
              </Route>
            </Route>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*">
              <Lost />
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}
