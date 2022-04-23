import React, { Component } from "react";
import { Button, ButtonToolbar, Card, Table } from "react-bootstrap";
import { AddCities } from "./addcities.comonent";
import { EditCities } from "./editcities.component";

export class Cities extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.state = {
      cities: [],
      addModalShow: false,
      editModalShow: false,
      cityName: "",
      cityNameFilter: "",
      cityWithoutFilter: [],
    };
  }
  FilterFn() {
    var cityNameFilter = this.state.cityNameFilter;

    var filteredData = this.state.cityWithoutFilter.filter(function (el) {
      return el.cityName
        .toString()
        .toLowerCase()
        .includes(cityNameFilter.toString().trim().toLowerCase());
    });
    this.setState({ cities: filteredData });
  }

  sortResult(prop, asc) {
    var sortedData = this.state.cityWithoutFilter.sort(function (a, b) {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
      }
    });

    this.setState({ cities: sortedData });
  }

  refreshList() {
    fetch("https://localhost:7100/api/Cities", {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ cities: data, cityWithoutFilter: data });
      });
  }

  changeCityNameFilter = (e) => {
    this.state.cityNameFilter = e.target.value;
    this.FilterFn();
  };

  componentDidMount() {
    this.refreshList();
  }

  /* componentDidUpdate(){
         this.refreshList();
     }*/

  deleteCity(citiid) {
    if (window.confirm("Are you sure?")) {
      fetch("https://localhost:7100/api/Cities/" + citiid, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      }).then((result) => {
        alert(result);
        this.refreshList();
      });
    }
  }

  render() {
    const { cities, citiid, citiname } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });

    return (
      <div className="container px-4 mt-4">
        <nav className="nav nav-borders">
          <h5 className="custom-header">Cities</h5>
        </nav>
        <hr className="mt-0 mb-4" />{" "}
        <Card className=" mb-4 h-100">
          <Card.Body>
            <div className="d-flex">
              <input
                className="form-control m-2"
                onChange={this.changeCityNameFilter}
                placeholder="Filter"
              />
              <button
                type="button"
                className="btn btn-light"
                onClick={() => this.sortResult("cityName", true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-down-square-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                </svg>
              </button>

              <button
                type="button"
                className="btn btn-light"
                onClick={() => this.sortResult("cityName", false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-up-square-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                </svg>
              </button>
            </div>
            <Table className="mt-4" bordered hover size="sm">
              <thead>
                <tr className="text-center">
                  <th>Id</th>
                  <th>Name</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {cities.map((citi) => (
                  <tr key={citi.cityId} className="text-center align-middle">
                    <td>{citi.cityId}</td>
                    <td>{citi.cityName}</td>
                    <td>
                      <ButtonToolbar className="d-flex justify-content-center">
                        <Button
                          className="m-2"
                          variant="info"
                          onClick={() =>
                            this.setState({
                              editModalShow: true,
                              citiid: citi.cityId,
                              citiname: citi.cityName,
                            })
                          }
                        >
                          Edit
                        </Button>

                        <Button
                          className="m-2"
                          variant="danger"
                          onClick={() => this.deleteCity(citi.cityId)}
                        >
                          Delete
                        </Button>
                        <EditCities
                          refreshlist={this.refreshList}
                          show={this.state.editModalShow}
                          onHide={editModalClose}
                          citiid={citiid}
                          citiname={citiname}
                        />
                      </ButtonToolbar>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <ButtonToolbar>
              <Button
                variant="primary"
                onClick={() => this.setState({ addModalShow: true })}
              >
                Add City
              </Button>
              <AddCities
                refreshlist={this.refreshList}
                show={this.state.addModalShow}
                onHide={addModalClose}
              />{" "}
            </ButtonToolbar>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
