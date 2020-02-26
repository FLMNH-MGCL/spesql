import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound";
// import Login from './views/Login/Login';
import About from "./views/About/About";
// import ProtectedRoute from './components/Auth/ProtectedRoute'
import reducer from "./redux/reducer";
import { Provider } from "react-redux";
import { createStore } from "redux";

const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <Switch>
        {/* <Route exact path='/Login' render={props => <Login {...props} setAuthentication={setAuthentication} isLoggedIn={authenticated}/>} /> */}
        {/* <ProtectedRoute exact path='/Home' isLoggedIn={authenticated} component={HomeWrapper}/> */}
        <Route exact path="/Home" component={Home} />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route exact path="/About" component={About} />
        <Route component={NotFound} />
      </Switch>
    </Provider>
  );
}

export default App;
