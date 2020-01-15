import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Home from "./views/Home/Home"
import NotFound from "./views/NotFound"
import Login from './views/Login/Login';
// import About from './views/About/About';
//import Header from "./components/Header/Header"


const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/Login' component={Login} />
        <Route exact path="/Home" component={Home} />
        <Route exact path="/">
          <Redirect to="/Login" />
        </Route>
        {/* <Route exact path='/About' component={About} /> */}
        <Route component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;
