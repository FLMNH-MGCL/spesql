import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home"
import NotFound from "./views/NotFound"
import Login from './views/Login/Login';
import About from './views/About/About';
import decode from 'jwt-decode'
import axios from 'axios'
import ProtectedRoute from './components/Auth/ProtectedRoute'


class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <ProtectedRoute exact path='/Home' component={Home}/>
          <Route exact path='/Login' render={(props) => <Login {...props} />} />
          <Route exact path="/">
            <Redirect to="/Home" />
          </Route>
          <Route exact path='/About' component={About} />
          <Route component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

export default App;
