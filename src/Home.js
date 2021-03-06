import React, { Component } from "react";
import "./App.css";
import AppNavbar from "./AppNavbar";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";
import { withCookies } from "react-cookie";

class Home extends Component {
  state = {
    isLoading: true,
    isAuthenticated: false,
    user: undefined,
    isManager: false,
    isLogistician: false,
    isAccountant: false,
    isMechanic: false
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state.csrfToken = cookies.get("XSRF-TOKEN");
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    const response = await fetch("/api/login", { credentials: "include" });
    const body = await response.text();
    if (body == "") {
      this.setState({ isAuthenticated: false });
    } else {
      this.setState({ isAuthenticated: true, user: JSON.parse(body) });
      if (this.state.user.setRole === "Manager") {
        this.setState({ isManager: true });
      } else if (this.state.user.setRole === "Logistician") {
        this.setState({ isLogistician: true });
      } else if (this.state.user.setRole === "Accountant") {
        this.setState({ isAccountant: true });
      } else if (this.state.user.setRole === "Mechanic") {
        this.setState({ isMechanic: true });
      }
    }
  }

  login() {
    let port = window.location.port ? ":" + window.location.port : "";
    if (port == ":3000") {
      port = ":8080";
    }
    window.location.href = "//" + window.location.hostname + port + "/private";
  }

  logout() {
    this.setState({ isAuthenticated: false });
    this.state.csrfToken = "";
  }

  render() {
    const message = this.state.user ? (
      <h2>Welcome, {this.state.user.setRole}!</h2>
    ) : (
      <p>Please log in to Service Station App.</p>
    );

    const manager = this.state.isManager ? (
      <div>
        <Button color="link">
          <Link to="/cars">Car service app</Link>
        </Button>
        <Button color="link">
          <Link to="/employees">Employees service app</Link>
        </Button>
        <Button color="link">
          <Link to="/appointments">Make an appointment</Link>
        </Button>
        <Button color="link">
          <Link to="/histories">History</Link>
        </Button>
        <Button color="link">
          <Link to="/search">Search repairs</Link>
        </Button>
      </div>
    ) : (
      <div />
    );

    const logistician = this.state.isLogistician ? (
      <div>
        <Button color="link">
          <Link to="/cars">Car service app</Link>
        </Button>
        <Button color="link">
          <Link to="/appointments">Make an appointment</Link>
        </Button>
      </div>
    ) : (
      <div />
    );

    const accountant = this.state.isAccountant ? <div /> : <div />;

    const mechanic = this.state.isMechanic ? (
      <div>
        <Button color="link">
          <Link to="/repairs">Repairs</Link>
        </Button>
      </div>
    ) : (
      <div />
    );

    const button = this.state.isAuthenticated ? (
      <div>
        <Button color="primary" onClick={this.logout}>
          Logout
        </Button>
      </div>
    ) : (
      <Button color="primary" onClick={this.login}>
        Login
      </Button>
    );

    return (
      <div>
        <AppNavbar />
        <Container fluid>
          {message}
          {manager}
          {accountant}
          {logistician}
          {mechanic}
          {button}
        </Container>
      </div>
    );
  }
}

export default withCookies(Home);
