import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Lost from './pages/Lost';
import Settings from './pages/Settings';
import SignIn from './pages/SignIn';
import Visualization from './pages/Visualization';
import { Provider } from '../models';
import Layout from './components/Layout';
import Header from './components/Header';
import AuthRoute from './components/AuthRoute';

function HomeStack() {
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <AuthRoute path="/" element={<Home />} />
        <AuthRoute path="/visualization" element={<Visualization />} />
      </Routes>
    </React.Fragment>
  );
}

export default function App() {
  return (
    <Provider>
      <MemoryRouter initialEntries={['/home']}>
        <Layout>
          <Routes>
            <Route path="/home/*" element={<HomeStack />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*">
              <Lost />
            </Route>
          </Routes>
        </Layout>
      </MemoryRouter>
    </Provider>
  );
}
