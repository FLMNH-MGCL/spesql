import React, { useState } from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import HomeWrapper from "./views/Home/HomeWrapper"
import Home from "./views/Home/Home"
import NotFound from "./views/NotFound"
import Login from './views/Login/Login';
import About from './views/About/About';
import ProtectedRoute from './components/Auth/ProtectedRoute'


function App() {
  const [authenticated, setAuthentication] = useState(sessionStorage.getItem("authenticated") ? true : false);

  return (
    <div>
      <Switch>
        <Route exact path='/Login' render={props => <Login {...props} setAuthentication={setAuthentication} isLoggedIn={authenticated}/>} />
        <ProtectedRoute exact path='/Home' isLoggedIn={authenticated} component={HomeWrapper}/>
        <Route exact path="/">
          <Redirect to='/Home' />
        </Route>
        <Route exact path='/About' component={About} />
        <Route component={NotFound}/>
      </Switch>
    </div>
  )
}


export default App;
