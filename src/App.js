import React, { Component } from "react";
import "./App.css";
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CarList from "./CarList";
import CarEdit from "./CarEdit";
import EmployeeList from "./EmployeeList";
import EmployeeEdit from "./EmployeeEdit";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/cars" exact={true} component={CarList} />
          <Route path="/cars/:id" component={CarEdit} />
          <Route path="/employees" exact={true} component={EmployeeList} />
          <Route path="/employees/:id" component={EmployeeEdit} />
        </Switch>
      </Router>
    );
  }
}

export default App;
