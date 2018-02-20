import * as React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

export default class AppShell extends React.Component<any, any> {
  render() {
    return (
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
        <Switch>

        </Switch>
      </div>
    );
  }
}