import React, { Component } from "react";
import { Button, Container, Table } from "reactstrap";
import AppNavbar from "./AppNavbar";
import { Link } from "react-router-dom";

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whichOne: "",
      employees: [],
      isLoading: true
    };
  }

  managerClick() {
    this.setState({ whichOne: "Manager" });
  }
  mechanicClick() {
    this.setState({ whichOne: "Mechanic" });
  }
  logisticianClick() {
    this.setState({ whichOne: "Logistician" });
  }
  accountantClick() {
    this.setState({ whichOne: "Accountant" });
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("api/employees")
      .then(response => response.json())
      .then(data => this.setState({ employees: data, isLoading: false }));

    // fetch("api/employees/mechanics")
    //   .then(response => response.json())
    //   .then(data => this.setState({ mechanics: data }));

    // fetch("api/employees/managers")
    //   .then(response => response.json())
    //   .then(dataManager => this.setState({ managers: dataManager }));

    // fetch("api/employees/logisticians")
    //   .then(response => response.json())
    //   .then(data => this.setState({ logisticians: data }));

    // fetch("api/employees/accountants")
    //   .then(response => response.json())
    //   .then(data => this.setState({ accountants: data, isLoading: false }));
  }
  render() {
    const { employees, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    const accountantList = employees.map(accountant => {
      if (accountant.setRole === "Accountant")
        return (
          <tr key={accountant.id}>
            <td style={{ whiteSpace: "nowrap" }}>{accountant.name}</td>
            <td>{accountant.surname}</td>
            <td>{accountant.experience}</td>
            <td>{accountant.experienceInCompany}</td>
            <td>{accountant.setRole}</td>
            <td>
              <Button
                size="md"
                color="primary"
                tag={Link}
                to={"/employees/" + accountant.id}
              >
                Edit
              </Button>
            </td>
          </tr>
        );
    });
    const logisticianList = employees.map(logistician => {
      if (logistician.setRole === "Logistician")
        return (
          <tr key={logistician.id}>
            <td style={{ whiteSpace: "nowrap" }}>{logistician.name}</td>
            <td>{logistician.surname}</td>
            <td>{logistician.experience}</td>
            <td>{logistician.experienceInCompany}</td>
            <td>{logistician.setRole}</td>
            <td>
              <Button
                size="md"
                color="primary"
                tag={Link}
                to={"/employees/" + logistician.id}
              >
                Edit
              </Button>
            </td>
          </tr>
        );
    });

    const mechanicList = employees.map(mechanic => {
      if (mechanic.setRole === "Mechanic")
        return (
          <tr key={mechanic.id}>
            <td style={{ whiteSpace: "nowrap" }}>{mechanic.name}</td>
            <td>{mechanic.surname}</td>
            <td>{mechanic.experience}</td>
            <td>{mechanic.experienceInCompany}</td>
            <td>{mechanic.setRole}</td>
            <td>
              <Button
                size="md"
                color="primary"
                tag={Link}
                to={"/employees/" + mechanic.id}
              >
                Edit
              </Button>
            </td>
          </tr>
        );
    });
    const managerList = employees.map(manager => {
      if (manager.setRole === "Manager")
        return (
          <tr key={manager.id}>
            <td style={{ whiteSpace: "nowrap" }}>{manager.name}</td>
            <td>{manager.surname}</td>
            <td>{manager.experience}</td>
            <td>{manager.experienceInCompany}</td>
            <td>{manager.setRole}</td>
            <td>
              <Button
                size="md"
                color="primary"
                tag={Link}
                to={"/employees/" + manager.id}
              >
                Edit
              </Button>
            </td>
          </tr>
        );
    });
    const employeeList = employees.map(employee => {
      return (
        <tr key={employee.id}>
          <td style={{ whiteSpace: "nowrap" }}>{employee.name}</td>
          <td>{employee.surname}</td>
          <td>{employee.experience}</td>
          <td>{employee.experienceInCompany}</td>
          <td>{employee.setRole}</td>
          <td>
            <Button
              size="md"
              color="primary"
              tag={Link}
              to={"/employees/" + employee.id}
            >
              Edit
            </Button>
          </td>
        </tr>
      );
    });
    const isRole = this.state.whichOne;
    let res;
    if (isRole === "Manager") {
      res = <tbody>{managerList}</tbody>;
    } else if (isRole === "Mechanic") {
      res = <tbody>{mechanicList}</tbody>;
    } else if (isRole === "Logistician") {
      res = <tbody>{logisticianList}</tbody>;
    } else if (isRole === "Accountant") {
      res = <tbody>{accountantList}</tbody>;
    } else res = <tbody>{employeeList}</tbody>;
    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <div className="float-right">
            <Button color="info" onClick={this.managerClick.bind(this)}>
              Search Managers
            </Button>
            <Button color="info" onClick={this.mechanicClick.bind(this)}>
              Search Mechanics
            </Button>
            <Button color="info" onClick={this.logisticianClick.bind(this)}>
              Search Logisticians
            </Button>
            <Button color="info" onClick={this.accountantClick.bind(this)}>
              Search Accountants
            </Button>
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
                <th width="10%">role</th>
              </tr>
            </thead>
            {res}
          </Table>
        </Container>
      </div>
    );
  }
}

export default EmployeeList;
