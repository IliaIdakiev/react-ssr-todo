import * as React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import { routes } from './routes';

import Home from './Home/Home';
import About from './About/About';
import NotFound from './NotFound';

export default class App extends React.Component<any, any> {
  render() {
    return (
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
        <Switch>
          {routes.map((route, index) => <Route {...route} key={index} />)}
        </Switch>
      </div>
    );
  }
}