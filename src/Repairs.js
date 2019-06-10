import AppNavbar from "./AppNavbar";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Repairs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      isLoading: true,
      repairs: [],
      user: undefined
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("api/appointments")
      .then(response => response.json())
      .then(data => this.setState({ appointments: data, isLoading: false }));

    fetch("api/repairs")
      .then(response => response.json())
      .then(dataRepairs => this.setState({ repairs: dataRepairs }));

    fetch("api/login")
      .then(response => response.json())
      .then(data => this.setState({ user: data }));
  }

  render() {
    const { user, appointments, isLoading, repairs } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }

    const appointmentList = appointments.map(appointment => {
      if (user.surname === appointment.nameUser)
        return (
          <tr key={appointment.id}>
            <td style={{ whiteSpace: "nowrap" }}>{appointment.nameUser}</td>
            <td>{appointment.numberCar}</td>
            <td>{appointment.data}</td>
            <td>{appointment.description}</td>
            <td>
              <ButtonGroup>
                <Button
                  size="sm"
                  color="primary"
                  tag={Link}
                  to={"/appointments/" + appointment.id}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  color="primary"
                  tag={Link}
                  to={"/repairs/new"}
                >
                  Raport
                </Button>
                <Button
                  size="sm"
                  color="primary"
                  tag={Link}
                  to={"/repairs/new" + repairs.id}
                >
                  Edir Raport
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
          <h3>Appointment panel</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="17.5%">User</th>
                <th width="20%"> Registration number</th>
                <th>Data</th>

                <th width="20%">Description</th>
                <th width="20%">Actions</th>
              </tr>
            </thead>
            <tbody>{appointmentList}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default Repairs;
