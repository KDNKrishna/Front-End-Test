import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";

import ButtonComponent from "./components/button";
import SearchBar from "./components/searchBar";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={SearchBar} />
          <Route exact path="/task1" component={ButtonComponent} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
