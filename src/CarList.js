import React, { Component } from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import AppNavbar from "./AppNavbar";
import { Link } from "react-router-dom";

class CarList extends Component {
  constructor(props) {
    super(props);
    this.state = { cars: [], isLoading: true };
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("api/cars")
      .then(response => response.json())
      .then(data => this.setState({ cars: data, isLoading: false }));
  }
  async remove(id) {
    await fetch(`/api/cars/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(() => {
      let updatedCars = [...this.state.cars].filter(i => i.id !== id);
      this.setState({ cars: updatedCars });
    });
  }
  render() {
    const { cars, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    const carList = cars.map(car => {
      const information = `${car.model || ""} ${car.brand ||
        ""} ${car.registration_number || ""}`;
      return (
        <tr key={car.id}>
          <td style={{ whiteSpace: "nowrap" }}>{car.model}</td>
          <td>{car.brand}</td>
          <td>{car.registration_number}</td>
          <td>
            <ButtonGroup>
              <Button
                size="sm"
                color="primary"
                tag={Link}
                to={"/cars/" + car.id}
              >
                Edit
              </Button>
              <Button
                size="sm"
                color="danger"
                onClick={() => this.remove(car.id)}
              >
                Delete
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });
    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/cars/new">
              Add Car
            </Button>
          </div>
          <h3>Service cars app</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Model</th>
                <th width="20%">Brand</th>
                <th>registration_number</th>
                <th width="10%">Actions</th>
              </tr>
            </thead>
            <tbody>{carList}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default CarList;
