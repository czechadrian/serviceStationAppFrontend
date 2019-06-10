import AppNavbar from "./AppNavbar";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchField from "react-search-field";

class History extends Component {
  constructor(props) {
    super(props);

    this.state = { search: "", whichOne: "", histories: [], isLoading: true };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("api/history")
      .then(response => response.json())
      .then(data => this.setState({ histories: data, isLoading: false }));
  }

  addClick() {
    this.setState({ whichOne: "Add" });
  }
  updateClick() {
    this.setState({ whichOne: "Update" });
  }

  onEnter(event) {
    this.setState({ search: event });
  }

  render() {
    const { histories, isLoading } = this.state;
    let filteredHistory = histories.filter(item => {
      return item.date.indexOf(this.state.search) !== -1;
    });

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const historyList = filteredHistory.map(history => {
      return (
        <tr key={history.id}>
          <td style={{ whiteSpace: "nowrap" }}>{history.date}</td>
          <td>{history.time}</td>

          <td>{history.description}</td>
          <td>{history.type}</td>
        </tr>
      );
    });

    const historyList2 = filteredHistory.map(history => {
      if (
        (this.state.whichOne !== null) &
        (history.type === this.state.whichOne)
      )
        return (
          <tr key={history.id}>
            <td style={{ whiteSpace: "nowrap" }}>{history.date}</td>
            <td>{history.time}</td>

            <td>{history.description}</td>
            <td>{history.type}</td>
          </tr>
        );
    });

    const operation = this.state.whichOne;
    let res;
    if (operation === "Add") {
      res = <tbody>{historyList2}</tbody>;
    } else if (operation === "Update") {
      res = <tbody>{historyList2}</tbody>;
    } else res = <tbody>{historyList}></tbody>;
    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <div className="float-right">
            <SearchField
              placeholder="Search..."
              onChange={this.onEnter.bind(this)}
              searchText={this.state.search}
              classNames="test-class"
            />
            <Button color="info" onClick={this.addClick.bind(this)}>
              Search Add type
            </Button>
            <Button color="info" onClick={this.updateClick.bind(this)}>
              Search Update type
            </Button>
          </div>
          <h3>History panel</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="17.5%">Date</th>
                <th width="20%"> Time</th>

                <th width="20%">Description</th>
                <th>Type</th>
              </tr>
            </thead>
            {res}
          </Table>
        </Container>
      </div>
    );
  }
}

export default History;
