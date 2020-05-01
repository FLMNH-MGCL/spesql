import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound";
import Login from "./views/Login/Login";
import About from "./views/About/About";
// import ProtectedRoute from './components/Auth/ProtectedRoute'
import reducer from "./redux/reducer";
import { Provider } from "react-redux";
import { createStore } from "redux";
import AdminPortal from "./views/Admin/AdminPortal";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storageSession from "redux-persist/lib/storage/session";

//const store = createStore(reducer);
const persistConfig = {
  key: "root",
  storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login" component={Login} />

          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/admin" component={AdminPortal} />
          <Route component={NotFound} />
        </Switch>
      </PersistGate>
    </Provider>
  );
}

export default App;
