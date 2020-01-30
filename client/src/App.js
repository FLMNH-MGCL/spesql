import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import HomeWrapper from "./views/Home/HomeWrapper"
import NotFound from "./views/NotFound"
import Login from './views/Login/Login';
import About from './views/About/About';
import ProtectedRoute from './components/Auth/ProtectedRoute'


class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <ProtectedRoute exact path='/Home' component={HomeWrapper}/>
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
