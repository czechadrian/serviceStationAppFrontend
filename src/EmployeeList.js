import React, { Component } from "react";
import { Button, Container, Table } from "reactstrap";
import AppNavbar from "./AppNavbar";
import { Link } from "react-router-dom";

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = { employees: [], isLoading: true };
    // this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("api/employees")
      .then(response => response.json())
      .then(data => this.setState({ employees: data, isLoading: false }));
  }
  //   async remove(id) {
  //     await fetch(`/api/employee/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json"
  //       }
  //     }).then(() => {
  //       let updatedCars = [...this.state.employees].filter(i => i.id !== id);
  //       this.setState({ employees: updatedCars });
  //     });
  //   }
  render() {
    const { employees, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    const employeeList = employees.map(employee => {
      return (
        <tr key={employee.id}>
          <td style={{ whiteSpace: "nowrap" }}>{employee.name}</td>
          <td>{employee.surname}</td>
          <td>{employee.experience}</td>
          <td>{employee.experienceInCompany}</td>
          <td>{employee.id_role}</td>
          <td>
            {/* <ButtonGroup> */}
            <Button
              size="md"
              color="primary"
              tag={Link}
              to={"/employees/" + employee.id}
            >
              Edit
            </Button>
            {/* <Button
                size="sm"
                color="danger"
                onClick={() => this.remove(employee.id)}
              >
                Delete
              </Button> */}
            {/* </ButtonGroup> */}
          </td>
        </tr>
      );
    });
    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/employees/new">
              Add Employee
            </Button>
          </div>
          <h3>Employees service cars app</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="25%">Name</th>
                <th width="25%">Surname</th>
                <th width="20%">experience</th>
                <th width="20%">experienceInCompany</th>
                <th width="10%">id_role</th>
              </tr>
            </thead>
            <tbody>{employeeList}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default EmployeeList;
