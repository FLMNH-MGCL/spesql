import React from "react";
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
import storage from "redux-persist/lib/storage";

//const store = createStore(reducer);
const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Switch>
          {/* <Route exact path='/Login' render={props => <Login {...props} setAuthentication={setAuthentication} isLoggedIn={authenticated}/>} /> */}
          {/* <ProtectedRoute exact path='/Home' isLoggedIn={authenticated} component={HomeWrapper}/> */}
          <Route exact path="/Login" component={Login} />
          <Route exact path="/">
            <Redirect to="/Login" />
          </Route>
          <Route exact path="/Home" component={Home} />
          <Route exact path="/About" component={About} />
          <Route exact path="/Admin" component={AdminPortal} />
          <Route component={NotFound} />
        </Switch>
      </PersistGate>
    </Provider>
  );
}

export default App;
