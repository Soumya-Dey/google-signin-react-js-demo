import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from './App';
import Auth from './Auth';

const Routing = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/auth/google' component={Auth} />
        <Route path='/auth/facebook' component={Auth} />
        <Route path='/auth/twitter' component={Auth} />
      </Switch>
    </Router>
  );
};

ReactDOM.render(<Routing />, document.getElementById('root'));
