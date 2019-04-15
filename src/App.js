import React, { Component } from "react";
import "./App.css";
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CarList from "./CarList";
import CarEdit from "./CarEdit";
import { CookiesProvider } from "react-cookie";
<<<<<<< HEAD
import EmployeeList from "./EmployeeList";
import EmployeeEdit from "./EmployeeEdit";
=======
>>>>>>> 324938f43c85887f54a569f8800bdc76fb3b5f66

class App extends Component {
  render() {
    return (
<<<<<<< HEAD
      <Router>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/cars" exact={true} component={CarList} />
          <Route path="/cars/:id" component={CarEdit} />
          <Route path="/employees" exact={true} component={EmployeeList} />
          <Route path="/employees/:id" component={EmployeeEdit} />
        </Switch>
      </Router>
=======
      <CookiesProvider>
        <Router>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/cars" exact={true} component={CarList} />
            <Route path="/cars/:id" component={CarEdit} />
          </Switch>
        </Router>
      </CookiesProvider>
>>>>>>> 324938f43c85887f54a569f8800bdc76fb3b5f66
    );
  }
}

export default App;
