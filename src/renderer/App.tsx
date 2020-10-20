import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Lost from "./pages/Lost";
import Settings from "./pages/Settings";
import SignIn from "./pages/SignIn";
import Visualization from "./pages/Visualization";
import { Provider } from "../models";
import Layout from "./components/Layout";
import AuthRoute from "./components/AuthRoute";

export default function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <AuthRoute path="/" element={<Home />} />
            <AuthRoute path="visualization" element={<Visualization />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*">
              <Lost />
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}
