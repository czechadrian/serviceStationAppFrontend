import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import AppNavbar from "./AppNavbar";

class EmployeeEdit extends Component {
  emptyItem = {
    name: "",
    surname: "",
    experience: "",
    experienceInCompany: "",
    role: "",
    idRole: "",
    login: "",
    password: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== "new") {
      const employee = await (await fetch(
        `/api/employee/${this.props.match.params.id}`
      )).json();
      this.setState({ item: employee });
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;

    await fetch("/api/employee", {
      method: item.id ? "PUT" : "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    });
    this.props.history.push("/employees");
  }

  render() {
    const { item } = this.state;
    const title = <h2>{item.id ? "Edit Employee" : "Add Employee"}</h2>;

    return (
      <div>
        <AppNavbar />
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={item.name || ""}
                onChange={this.handleChange}
                autoComplete="name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="surname">Surname</Label>
              <Input
                type="text"
                name="surname"
                id="surname"
                value={item.surname || ""}
                onChange={this.handleChange}
                autoComplete="surname-level1"
              />
            </FormGroup>
            <FormGroup>
              <Label for="experience">Experience</Label>
              <Input
                type="value"
                name="experience"
                id="experience"
                value={item.experience || ""}
                onChange={this.handleChange}
                autoComplete="experience"
              />
            </FormGroup>
            <FormGroup>
              <Label for="experienceInCompany">Experience in company</Label>
              <Input
                type="value"
                name="experienceInCompany"
                id="experienceInCompany"
                value={item.experienceInCompany || ""}
                onChange={this.handleChange}
                autoComplete="experienceInCompany"
              />
            </FormGroup>
            <FormGroup>
              <Label for="idRole">Id role</Label>
              <Input
                type="text"
                name="idRole"
                id="idRole"
                value={item.idRole || ""}
                onChange={this.handleChange}
                autoComplete="idRole"
              />
            </FormGroup>
            <FormGroup>
              <Label for="login">Login</Label>
              <Input
                type="text"
                name="login"
                id="login"
                value={item.login || ""}
                onChange={this.handleChange}
                autoComplete="login"
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="text"
                name="password"
                id="password"
                value={item.password || ""}
                onChange={this.handleChange}
                autoComplete="password"
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit">
                Save
              </Button>{" "}
              <Button color="secondary" tag={Link} to="/employees">
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default withRouter(EmployeeEdit);
