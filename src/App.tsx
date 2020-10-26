import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Home } from "pages/Home";
import { Explorer } from "pages/Explorer";
import { GlobalStyles } from "theme/GlobalStyles";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/explorer/:address">
          <Explorer />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
