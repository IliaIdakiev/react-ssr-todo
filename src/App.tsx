import * as React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

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
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}