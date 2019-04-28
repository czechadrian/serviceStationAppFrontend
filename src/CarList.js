import React, { Component } from "react";
import Popup from "reactjs-popup";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import AppNavbar from "./AppNavbar";
import { Link } from "react-router-dom";
import "./App.css";

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
    await fetch(`/api/car/${id}`, {
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
      return (
        <tr key={car.id}>
          <td style={{ whiteSpace: "nowrap" }}>{car.model}</td>
          <td>{car.brand}</td>
          <td>{car.registrationNumber}</td>
          <td>
            <Popup
              trigger={
                <Button color="info" className="button">
                  {" "}
                  Show Information{" "}
                </Button>
              }
              modal
            >
              {close => (
                <div className="carPopup">
                  <a className="close" onClick={close}>
                    &times;
                  </a>
                  <div className="header"> Damage/Amendments </div>
                  <div className="content">
                    {" "}
                    <h1>Damage</h1>
                    <div className="textFrame">{car.damage}</div>
                    <h1>Amendments</h1>
                    <br />
                    <div className="textFrame">{car.amendments}</div>
                  </div>
                  <div className="actions">
                    <Button
                      className="button"
                      onClick={() => {
                        console.log("popup windows closed ");
                        close();
                      }}
                    >
                      Close popup window
                    </Button>
                  </div>
                </div>
              )}
            </Popup>
          </td>
          <td>{car.phoneNumber}</td>
          <td>{car.client}</td>
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
                <th width="17.5%">Model</th>
                <th width="17.5%">Brand</th>
                <th>Registration Number</th>
                <th width="12.5%">Naprawa/Uszkodzenia</th>
                <th width="10%">Phone Number</th>
                <th width="10%">Client</th>
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
