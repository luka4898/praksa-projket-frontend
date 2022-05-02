import React, { useState } from "react";
import { Component } from "react";
import { Button, ButtonToolbar, Table, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import { AddEventType } from "./add-event-type.component";
import { EditEventType } from "./edit-event-type.component";

export class eventTypes extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.state = {
      eventTypes: [],
      addModalShow: false,
      editModalShow: false,
      eventTypeName: "",
      eventTypeNameFilter: "",
      eventTypeWithoutFilter: [],
    };
  }
  FilterFn() {
    var eventTypeNameFilter = this.state.eventTypeNameFilter;

    var filteredData = this.state.eventTypeWithoutFilter.filter(function (el) {
      return el.eventTypeName
        .toString()
        .toLowerCase()
        .includes(eventTypeNameFilter.toString().trim().toLowerCase());
    });
    this.setState({ eventTypes: filteredData });
  }

  sortResult(prop, asc) {
    var sortedData = this.state.eventTypeWithoutFilter.sort(function (a, b) {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
      }
    });

    this.setState({ eventTypes: sortedData });
  }
  refreshList() {
    fetch("https://localhost:7100/api/EventTypes", {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ eventTypes: data, eventTypeWithoutFilter: data });
      });
  }

  changeEventTypeNameFilter = (e) => {
    this.state.eventTypeNameFilter = e.target.value;
    this.FilterFn();
  };
  componentDidMount() {
    this.refreshList();
  }

  /* componentDidUpdate(){
        this.refreshList();
    }*/

  deleteCity(eventTypeId) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((response) => {
      if (response.isConfirmed) {
        fetch("https://localhost:7100/api/EventTypes/" + eventTypeId, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }).then((response) => {
          let success = response.ok;
          response
            .json()
            .then((response) => {
              if (!success) {
                throw Error(response.message);
              }
              Swal.fire("Deleted!", response.message, "success");
              this.refreshList();
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: error,
                button: "OK!",
              });
            });
        });
      }
    });
  }

  render() {
    const { eventTypes, eventTypeId, eventTypeName } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });

    return (
      <div className="container px-4 mt-4">
        <nav className="nav nav-borders">
          <h5 className="custom-header">Event Types</h5>
        </nav>
        <hr className="mt-0 mb-4" />{" "}
        <Card className=" mb-4 h-100">
          <Card.Body>
            <div className="d-flex">
              <input
                className="form-control m-2"
                onChange={this.changeEventTypeNameFilter}
                placeholder="Filter"
              />
              <button
                type="button"
                className="btn btn-light"
                onClick={() => this.sortResult("eventTypeName", true)}
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
                onClick={() => this.sortResult("eventTypeName", false)}
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
                  <th>ID</th>
                  <th>Name</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {eventTypes.map((et) => (
                  <tr key={et.eventTypeId} className="text-center align-middle">
                    <td>{et.eventTypeId}</td>
                    <td>{et.eventTypeName}</td>
                    <td>
                      <ButtonToolbar className="d-flex justify-content-center">
                        <Button
                          className="m-2"
                          variant="info"
                          onClick={() =>
                            this.setState({
                              editModalShow: true,
                              eventTypeId: et.eventTypeId,
                              eventTypeName: et.eventTypeName,
                            })
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          className="m-2"
                          variant="danger"
                          onClick={() => this.deleteCity(et.eventTypeId)}
                        >
                          Delete
                        </Button>
                        <EditEventType
                          refreshlist={this.refreshList}
                          show={this.state.editModalShow}
                          onHide={editModalClose}
                          eventtypeid={eventTypeId}
                          eventtypename={eventTypeName}
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
                Add event type
              </Button>
              <AddEventType
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
