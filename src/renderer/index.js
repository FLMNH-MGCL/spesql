import "./index.css";
// import "semantic-ui-css/semantic.min.css";
import React, { createRef } from "react";
import { render } from "react-dom";
import reducer from "./redux/reducer";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storageSession from "redux-persist/lib/storage/session";
// import Home from "./views/home/Home";
import Home from "./views/home/Home";
import NotificationSystem from "react-notification-system";
import Login from "./views/login/Login";
import Settings from "./views/settings/Settings";
import AdminPortal from "./views/admin/AdminPortal";
import NetworkError from "./views/404/NetworkError";
import fourohfour from "./views/404/404";

import { ipcRenderer } from "electron";

// NOTE: after transitioning to webpack configuration icons would not load properly
// this is a fix to *temporarily* include the links
export const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

function App() {
  const notificationSystem = createRef();

  const addNotification = (content) => {
    // alert with banner
    const notification = notificationSystem.current;
    notification.addNotification({
      title: content.title,
      message: content.message,
      level: content.type,
    });

    // create notification to store until cleared
    // {type, header, information}
  };

  ipcRenderer.on("message", function (event, information) {
    const { type, message } = information;

    addNotification({
      title: "System Notification",
      message: message,
      type: type === "logging" ? "warning" : "error",
    });
  });

  // addNotification();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => <Home {...props} notify={addNotification} />}
            />

            <Route
              exact
              path="/login"
              render={(props) => <Login {...props} notify={addNotification} />}
            />
            <Route
              exact
              path="/settings"
              render={(props) => (
                <Settings {...props} notify={addNotification} />
              )}
            />

            <Route
              exact
              path="/admin"
              render={(props) => (
                <AdminPortal {...props} notify={addNotification} />
              )}
            />

            <Route exact path="/home">
              <Redirect to="/" />
            </Route>

            <Route exact path="/404/network-issues" component={NetworkError} />
            <Route path="*" component={fourohfour} />
          </Switch>
        </HashRouter>
      </PersistGate>
      <NotificationSystem ref={notificationSystem} />
    </Provider>
  );
}

render(<App />, document.getElementById("app"));
