import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Dashboard from './Dashboard'

class App extends PureComponent {

  render() {
    return (
      <div className="container" id="AppComponent">
        <Router>
          <Route path="/" exact component={Dashboard} />
          <Route path="/addFlight" exact component={Dashboard} />
        </Router>
      </div>);

  }
}

export default App;
