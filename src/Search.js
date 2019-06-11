import AppNavbar from "./AppNavbar";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchField from "react-search-field";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = { search: "", whichOne: "", repairs: [], isLoading: true };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("api/repairs")
      .then(response => response.json())
      .then(data => this.setState({ repairs: data, isLoading: false }));
  }

  onEnter(event) {
    this.setState({ search: event });
  }

  render() {
    const { repairs, isLoading } = this.state;
    let filteredRepairs = repairs.filter(item => {
      return item.data.indexOf(this.state.search) !== -1;
    });

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const repairsList = filteredRepairs.map(repair => {
      return (
        <tr key={repair.id}>
          <td style={{ whiteSpace: "nowrap" }}>{repair.data}</td>
          <td>{repair.nameUser}</td>

          <td>{repair.numberCar}</td>
          <td>{repair.sparesCosts}</td>
          <td>{repair.serviceCosts}</td>
          <td>{repair.note}</td>
        </tr>
      );
    });

    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <div className="float-right">
            <SearchField
              placeholder="Date of repair"
              onChange={this.onEnter.bind(this)}
              searchText={this.state.search}
              classNames="test-class"
            />
          </div>
          <h3>Search panel</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th>Date</th>
                <th width="17.5%">User</th>
                <th width="15%"> Registration number</th>

                <th width="15%">spares cost</th>
                <th width="15%">service cost</th>
                <th width="20%">note</th>
              </tr>
            </thead>
            {repairsList}
          </Table>
        </Container>
      </div>
    );
  }
}

export default Search;
