import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound";
import Login from "./views/Login/Login";
import Settings from "./views/Settings/Settings";
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
          <Route path="/settings" component={Settings} />

          <Route path="/home" component={Home} />
          <Route path="/admin" component={AdminPortal} />
          <Route component={NotFound} />
        </Switch>
      </PersistGate>
    </Provider>
  );
}

export default App;
