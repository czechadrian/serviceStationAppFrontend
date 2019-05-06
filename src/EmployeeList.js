import React, { Component } from "react";
import { Button, Container, Table } from "reactstrap";
import AppNavbar from "./AppNavbar";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whichOne: "",
      employees: [],
      appointments: [],
      isLoading: true,
      period: ""
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

    fetch("api/appointments")
      .then(response => response.json())
      .then(dataAppointments =>
        this.setState({ appointments: dataAppointments })
      );

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
    const { employees, appointments, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const dateToFormat = new Date();
    var weekStamp = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
    var monthStamp = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
    var yearStamp = new Date().getTime() + 365 * 24 * 60 * 60 * 1000;

    const accountantList = employees.map(accountant => {
      let appointmentWeekly = "";
      let appointmentMonthly = "";
      let appointmentAnnual = "";
      if (accountant.role === "Accountant") {
        const appointmentNote = appointments.map(appointment => {
          let appointmentInformation = "";
          let d = new Date(appointment.data);
          if (appointment.nameUser === accountant.surname) {
            if (d >= dateToFormat && d <= weekStamp) {
              appointmentWeekly +=
                appointment.description +
                " " +
                appointment.data +
                " " +
                appointment.numberCar +
                " " +
                appointment.nameUser +
                " ";
            }
            if (d >= dateToFormat && d <= monthStamp) {
              appointmentMonthly +=
                appointment.description +
                " " +
                appointment.data +
                " " +
                appointment.numberCar +
                " " +
                appointment.nameUser +
                " ";
            }
            if (d >= dateToFormat && d <= yearStamp) {
              appointmentAnnual +=
                appointment.description +
                " " +
                appointment.data +
                " " +
                appointment.numberCar +
                " " +
                appointment.nameUser +
                " ";
            }
          }
          return appointmentInformation;
        });

        return (
          <tr key={accountant.id}>
            <td style={{ whiteSpace: "nowrap" }}>{accountant.name}</td>
            <td>{accountant.surname}</td>
            <td>{accountant.experience}</td>
            <td>{accountant.experienceInCompany}</td>
            <td>{accountant.role}</td>
            <td>
              <Popup
                trigger={
                  <Button color="info" className="button">
                    {" "}
                    Weekly Schedule{" "}
                  </Button>
                }
                modal
              >
                {close => (
                  <div className="carPopup">
                    <a className="close" onClick={close}>
                      &times;
                    </a>
                    <div className="header"> Weekly Schedule </div>
                    <div className="content">
                      {" "}
                      <h1>Appointment information</h1>
                      <div className="textFrame">{appointmentWeekly}</div>
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
            <td>
              <Popup
                trigger={
                  <Button color="info" className="button">
                    {" "}
                    Monthly Schedule{" "}
                  </Button>
                }
                modal
              >
                {close => (
                  <div className="carPopup">
                    <a className="close" onClick={close}>
                      &times;
                    </a>
                    <div className="header"> Monthly Schedule </div>
                    <div className="content">
                      {" "}
                      <h1>Appointment information</h1>
                      <div className="textFrame">{appointmentMonthly}</div>
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
            <td>
              <Popup
                trigger={
                  <Button color="info" className="button">
                    {" "}
                    Annual Schedule{" "}
                  </Button>
                }
                modal
              >
                {close => (
                  <div className="carPopup">
                    <a className="close" onClick={close}>
                      &times;
                    </a>
                    <div className="header"> Annual Schedule </div>
                    <div className="content">
                      {" "}
                      <h1>Appointment information</h1>
                      <div className="textFrame">{appointmentAnnual}</div>
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
            <td>
              {" "}
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
                    <div className="header"> Employee Information </div>
                    <div className="content">
                      {" "}
                      <h1>Name</h1>
                      <div className="textFrame">{accountant.name}</div>
                      <h1>Surname</h1>
                      <div className="textFrame">{accountant.surname}</div>
                      <h1>Experience</h1>
                      <div className="textFrame">{accountant.experience}</div>
                      <h1>ExperienceInCompany</h1>
                      <div className="textFrame">
                        {accountant.experienceInCompany}
                      </div>
                      <h1>Role</h1>
                      <div className="textFrame">{accountant.role}</div>
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
      }
    });
    const logisticianList = employees.map(logistician => {
      let appointmentWeekly = "";
      let appointmentMonthly = "";
      let appointmentAnnual = "";
      if (logistician.role === "Logistician") {
        const appointmentNote = appointments.map(appointment => {
          let appointmentInformation = "";
          let d = new Date(appointment.data);
          if (appointment.nameUser === logistician.surname) {
            if (d >= dateToFormat && d <= weekStamp) {
              appointmentWeekly +=
                appointment.description +
                " " +
                appointment.data +
                " " +
                appointment.numberCar +
                " " +
                appointment.nameUser +
                " ";
            }
            if (d >= dateToFormat && d <= monthStamp) {
              appointmentMonthly +=
                appointment.description +
                " " +
                appointment.data +
                " " +
                appointment.numberCar +
                " " +
                appointment.nameUser +
                " ";
            }
            if (d >= dateToFormat && d <= yearStamp) {
              appointmentAnnual +=
                appointment.description +
                " " +
                appointment.data +
                " " +
                appointment.numberCar +
                " " +
                appointment.nameUser +
                " ";
            }
          }
          return appointmentInformation;
        });

        return (
          <tr key={logistician.id}>
            <td style={{ whiteSpace: "nowrap" }}>{logistician.name}</td>
            <td>{logistician.surname}</td>
            <td>{logistician.experience}</td>
            <td>{logistician.experienceInCompany}</td>
            <td>{logistician.role}</td>
            <td>
              <Popup
                trigger={
                  <Button color="info" className="button">
                    {" "}
                    Weekly Schedule{" "}
                  </Button>
                }
                modal
              >
                {close => (
                  <div className="carPopup">
                    <a className="close" onClick={close}>
                      &times;
                    </a>
                    <div className="header"> Weekly Schedule </div>
                    <div className="content">
                      {" "}
                      <h1>Appointment information</h1>
                      <div className="textFrame">{appointmentWeekly}</div>
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
            <td>
              <Popup
                trigger={
                  <Button color="info" className="button">
                    {" "}
                    Monthly Schedule{" "}
                  </Button>
                }
                modal
              >
                {close => (
                  <div className="carPopup">
                    <a className="close" onClick={close}>
                      &times;
                    </a>
                    <div className="header"> Monthly Schedule </div>
                    <div className="content">
                      {" "}
                      <h1>Appointment information</h1>
                      <div className="textFrame">{appointmentMonthly}</div>
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
            <td>
              <Popup
                trigger={
                  <Button color="info" className="button">
                    {" "}
                    Annual Schedule{" "}
                  </Button>
                }
                modal
              >
                {close => (
                  <div className="carPopup">
                    <a className="close" onClick={close}>
                      &times;
                    </a>
                    <div className="header"> Annual Schedule </div>
                    <div className="content">
                      {" "}
                      <h1>Appointment information</h1>
                      <div className="textFrame">{appointmentAnnual}</div>
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
            <td>
              {" "}
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
                    <div className="header"> Employee Information </div>
                    <div className="content">
                      {" "}
                      <h1>Name</h1>
                      <div className="textFrame">{logistician.name}</div>
                      <h1>Surname</h1>
                      <div className="textFrame">{logistician.surname}</div>
                      <h1>Experience</h1>
                      <div className="textFrame">{logistician.experience}</div>
                      <h1>ExperienceInCompany</h1>
                      <div className="textFrame">
                        {logistician.experienceInCompany}
                      </div>
                      <h1>Role</h1>
                      <div className="textFrame">{logistician.role}</div>
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
      }
    });

    const mechanicList = employees.map(mechanic => {
      let appointmentWeekly = "";
      let appointmentMonthly = "";
      let appointmentAnnual = "";
      if (mechanic.role === "Mechanic") {
        const appointmentNote = appointments.map(appointment => {
          let appointmentInformation = "";
          let d = new Date(appointment.data);
          if (appointment.nameUser === mechanic.surname) {
            if (d >= dateToFormat && d <= weekStamp) {
              appointmentWeekly +=
                appointment.description +
                " " +
                appointment.data +
                " " +
                appointment.numberCar +
                " " +
                appointment.nameUser +
                " ";
            }
            if (d >= dateToFormat && d <= monthStamp) {
              appointmentMonthly +=
                appointment.description +
                " " +
                appointment.data +
                " " +
                appointment.numberCar +
                " " +
                appointment.nameUser +
                " ";
            }
            if (d >= dateToFormat && d <= yearStamp) {
              appointmentAnnual +=
                appointment.description +
                " " +
                appointment.data +
                " " +
                appointment.numberCar +
                " " +
                appointment.nameUser +
                " ";
            }
          }
          return appointmentInformation;
        });

        return (
          <tr key={mechanic.id}>
            <td style={{ whiteSpace: "nowrap" }}>{mechanic.name}</td>
            <td>{mechanic.surname}</td>
            <td>{mechanic.experience}</td>
            <td>{mechanic.experienceInCompany}</td>
            <td>{mechanic.role}</td>
            <td>
              <Popup
                trigger={
                  <Button color="info" className="button">
                    {" "}
                    Weekly Schedule{" "}
                  </Button>
                }
                modal
              >
                {close => (
                  <div className="carPopup">
                    <a className="close" onClick={close}>
                      &times;
                    </a>
                    <div className="header"> Weekly Schedule </div>
                    <div className="content">
                      {" "}
                      <h1>Appointment information</h1>
                      <div className="textFrame">{appointmentWeekly}</div>
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
            <td>
              <Popup
                trigger={
                  <Button color="info" className="button">
                    {" "}
                    Monthly Schedule{" "}
                  </Button>
                }
                modal
              >
                {close => (
                  <div className="carPopup">
                    <a className="close" onClick={close}>
                      &times;
                    </a>
                    <div className="header"> Monthly Schedule </div>
                    <div className="content">
                      {" "}
                      <h1>Appointment information</h1>
                      <div className="textFrame">{appointmentMonthly}</div>
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
            <td>
              <Popup
                trigger={
                  <Button color="info" className="button">
                    {" "}
                    Annual Schedule{" "}
                  </Button>
                }
                modal
              >
                {close => (
                  <div className="carPopup">
                    <a className="close" onClick={close}>
                      &times;
                    </a>
                    <div className="header"> Annual Schedule </div>
                    <div className="content">
                      {" "}
                      <h1>Appointment information</h1>
                      <div className="textFrame">{appointmentAnnual}</div>
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
            <td>
              {" "}
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
                    <div className="header"> Employee Information </div>
                    <div className="content">
                      {" "}
                      <h1>Name</h1>
                      <div className="textFrame">{mechanic.name}</div>
                      <h1>Surname</h1>
                      <div className="textFrame">{mechanic.surname}</div>
                      <h1>Experience</h1>
                      <div className="textFrame">{mechanic.experience}</div>
                      <h1>ExperienceInCompany</h1>
                      <div className="textFrame">
                        {mechanic.experienceInCompany}
                      </div>
                      <h1>Role</h1>
                      <div className="textFrame">{mechanic.role}</div>
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
      }
    });
    const managerList = employees.map(manager => {
      let appointmentWeekly = "";
      let appointmentMonthly = "";
      let appointmentAnnual = "";
      if (manager.role === "Manager") {
        const appointmentNote = appointments.map(appointment => {
          let appointmentInformation = "";
          let d = new Date(appointment.data);
          if (appointment.nameUser === manager.surname) {
            if (d >= dateToFormat && d <= weekStamp) {
              appointmentWeekly +=
                appointment.description +
                " " +
                appointment.data +
                " " +
                appointment.numberCar +
                " " +
                appointment.nameUser +
                " ";
            }
            if (d >= dateToFormat && d <= monthStamp) {
              appointmentMonthly +=
                appointment.description +
                " " +
                appointment.data +
                " " +
                appointment.numberCar +
                " " +
                appointment.nameUser +
                " ";
            }
            if (d >= dateToFormat && d <= yearStamp) {
              appointmentAnnual +=
                appointment.description +
                " " +
                appointment.data +
                " " +
                appointment.numberCar +
                " " +
                appointment.nameUser +
                " ";
            }
          }
          return appointmentInformation;
        });

        return (
          <tr key={manager.id}>
            <td style={{ whiteSpace: "nowrap" }}>{manager.name}</td>
            <td>{manager.surname}</td>
            <td>{manager.experience}</td>
            <td>{manager.experienceInCompany}</td>
            <td>{manager.role}</td>
            <td>
              <Popup
                trigger={
                  <Button color="info" className="button">
                    {" "}
                    Weekly Schedule{" "}
                  </Button>
                }
                modal
              >
                {close => (
                  <div className="carPopup">
                    <a className="close" onClick={close}>
                      &times;
                    </a>
                    <div className="header"> Weekly Schedule </div>
                    <div className="content">
                      {" "}
                      <h1>Appointment information</h1>
                      <div className="textFrame">{appointmentWeekly}</div>
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
            <td>
              <Popup
                trigger={
                  <Button color="info" className="button">
                    {" "}
                    Monthly Schedule{" "}
                  </Button>
                }
                modal
              >
                {close => (
                  <div className="carPopup">
                    <a className="close" onClick={close}>
                      &times;
                    </a>
                    <div className="header"> Monthly Schedule </div>
                    <div className="content">
                      {" "}
                      <h1>Appointment information</h1>
                      <div className="textFrame">{appointmentMonthly}</div>
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
            <td>
              <Popup
                trigger={
                  <Button color="info" className="button">
                    {" "}
                    Annual Schedule{" "}
                  </Button>
                }
                modal
              >
                {close => (
                  <div className="carPopup">
                    <a className="close" onClick={close}>
                      &times;
                    </a>
                    <div className="header"> Annual Schedule </div>
                    <div className="content">
                      {" "}
                      <h1>Appointment information</h1>
                      <div className="textFrame">{appointmentAnnual}</div>
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
            <td>
              {" "}
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
                    <div className="header"> Employee Information </div>
                    <div className="content">
                      {" "}
                      <h1>Name</h1>
                      <div className="textFrame">{manager.name}</div>
                      <h1>Surname</h1>
                      <div className="textFrame">{manager.surname}</div>
                      <h1>Experience</h1>
                      <div className="textFrame">{manager.experience}</div>
                      <h1>ExperienceInCompany</h1>
                      <div className="textFrame">
                        {manager.experienceInCompany}
                      </div>
                      <h1>Role</h1>
                      <div className="textFrame">{manager.role}</div>
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
      }
    });

    const employeeList = employees.map(employee => {
      let appointmentWeekly = "";
      let appointmentMonthly = "";
      let appointmentAnnual = "";
      const appointmentNote = appointments.map(appointment => {
        let appointmentInformation = "";
        let d = new Date(appointment.data);
        if (appointment.nameUser === employee.surname) {
          if (d >= dateToFormat && d <= weekStamp) {
            appointmentWeekly +=
              appointment.description +
              " " +
              appointment.data +
              " " +
              appointment.numberCar +
              " " +
              appointment.nameUser +
              " ";
          }
          if (d >= dateToFormat && d <= monthStamp) {
            appointmentMonthly +=
              appointment.description +
              " " +
              appointment.data +
              " " +
              appointment.numberCar +
              " " +
              appointment.nameUser +
              " ";
          }
          if (d >= dateToFormat && d <= yearStamp) {
            appointmentAnnual +=
              appointment.description +
              " " +
              appointment.data +
              " " +
              appointment.numberCar +
              " " +
              appointment.nameUser +
              " ";
          }
        }
        return appointmentInformation;
      });
      return (
        <tr key={employee.id}>
          <td style={{ whiteSpace: "nowrap" }}>{employee.name}</td>
          <td>{employee.surname}</td>
          <td>{employee.experience}</td>
          <td>{employee.experienceInCompany}</td>
          <td>{employee.role}</td>
          <td>
            <Popup
              trigger={
                <Button color="info" className="button">
                  {" "}
                  Weekly Schedule{" "}
                </Button>
              }
              modal
            >
              {close => (
                <div className="carPopup">
                  <a className="close" onClick={close}>
                    &times;
                  </a>
                  <div className="header"> Weekly Schedule </div>
                  <div className="content">
                    {" "}
                    <h1>Appointment information</h1>
                    <div className="textFrame">{appointmentWeekly}</div>
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
          <td>
            <Popup
              trigger={
                <Button color="info" className="button">
                  {" "}
                  Monthly Schedule{" "}
                </Button>
              }
              modal
            >
              {close => (
                <div className="carPopup">
                  <a className="close" onClick={close}>
                    &times;
                  </a>
                  <div className="header"> Monthly Schedule </div>
                  <div className="content">
                    {" "}
                    <h1>Appointment information</h1>
                    <div className="textFrame">{appointmentMonthly}</div>
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
          <td>
            <Popup
              trigger={
                <Button color="info" className="button">
                  {" "}
                  Annual Schedule{" "}
                </Button>
              }
              modal
            >
              {close => (
                <div className="carPopup">
                  <a className="close" onClick={close}>
                    &times;
                  </a>
                  <div className="header"> Annual Schedule </div>
                  <div className="content">
                    {" "}
                    <h1>Appointment information</h1>
                    <div className="textFrame">{appointmentAnnual}</div>
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
          <td>
            {" "}
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
                  <div className="header"> Employee Information </div>
                  <div className="content">
                    {" "}
                    <h1>Name</h1>
                    <div className="textFrame">{employee.name}</div>
                    <h1>Surname</h1>
                    <div className="textFrame">{employee.surname}</div>
                    <h1>Experience</h1>
                    <div className="textFrame">{employee.experience}</div>
                    <h1>ExperienceInCompany</h1>
                    <div className="textFrame">
                      {employee.experienceInCompany}
                    </div>
                    <h1>Role</h1>
                    <div className="textFrame">{employee.role}</div>
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
