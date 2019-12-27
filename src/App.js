import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Dex from './components/Dex';
import Home from './components/Home';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route
            exact
            path={"/"}
            component={Home}
          />
          <Route
            exact
            path={["/dex", "/shiny", "/lucky", "/unown", "/shadow"]}
            component={Dex}
          />
          <Route>
            <h1>404!</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
