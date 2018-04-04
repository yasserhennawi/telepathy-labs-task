import React from "react";
import "whatwg-fetch";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import history from "./history";
import store from "./store";
import Homepage from "./containers/Homepage";
import Loginpage from "./containers/Loginpage";
import RedirectPage from "./RedirectPage";

import { Switch, Route } from "react-router-dom";

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/login" component={Loginpage} />
        <Route exact path="/redirect" component={RedirectPage} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

App.displayName = "App";

export default App;
