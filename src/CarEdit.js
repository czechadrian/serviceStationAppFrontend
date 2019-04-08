import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import AppNavbar from "./AppNavbar";

class CarEdit extends Component {
  emptyItem = {
    // id_owner: '',
    model: "",
    brand: "",
    registration_number: ""
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
      const car = await (await fetch(
        "/car/${this.props.match.params.id}"
      )).json();
      this.setState({ item: car });
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
    await fetch("/car", {
      method: item.id ? "PUT" : "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    });
    this.props.history.push("/cars");
  }
  render() {
    const { item } = this.state;
    const title = <h2>{item.id ? "Edit Car" : "Add Car"}</h2>;

    return (
      <div>
        <AppNavbar />
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="model">Model</Label>
              <Input
                type="text"
                name="model"
                id="model"
                value={item.model || ""}
                onChange={this.handleChange}
                autoComplete="model"
              />
            </FormGroup>
            <FormGroup>
              <Label for="brand">Brand</Label>
              <Input
                type="text"
                name="brand"
                id="brand"
                value={item.brand || ""}
                onChange={this.handleChange}
                autoComplete="brand-level1"
              />
            </FormGroup>
            <FormGroup>
              <Label for="registration_number">Registration Number</Label>
              <Input
                type="text"
                name="registration_number"
                id="registration_number"
                value={item.registration_number || ""}
                onChange={this.handleChange}
                autoComplete="registration_number-level1"
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit">
                Save
              </Button>{" "}
              <Button color="secondary" tag={Link} to="/groups">
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default withRouter(CarEdit);
