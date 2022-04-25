import React, { Component } from "react";
import {
  Button,
  ButtonToolbar,
  Table,
  ButtonGroup,
  Card,
} from "react-bootstrap";
import dateFormat from "dateformat";
import ViewEvent from "./viewevent.component";
import AddEvent from "./addevent.component";
import moment from "moment";
import Swal from "sweetalert2";

class AllEvents extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.state = {
      events: null,
      isPending: true,
      error: null,
      eventNameFilter: "",
      eventsWithoutFilter: [],
    };
  }
  FilterFn() {
    var eventNameFilter = this.state.eventNameFilter;

    var filteredData = this.state.eventsWithoutFilter.filter(function (el) {
      return el.eventName
        .toString()
        .toLowerCase()
        .includes(eventNameFilter.toString().trim().toLowerCase());
    });
    this.setState({
      events: filteredData,
    });
  }
  refreshList() {
    setTimeout(() => {
      fetch("https://localhost:7100/api/CurrentEvents/getallevents", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw Error("Could not fetch that resource!");
          }
          return response.json();
        })
        .then((data) => {
          this.setState({
            events: data,
            isPending: false,
            error: null,
            eventsWithoutFilter: data,
          });
        })
        .catch((err) => {
          this.setState({ isPending: false, error: err.message });
          console.log(err);
        });
    }, 1000);
  }

  changeEventNameFilter = (e) => {
    this.state.eventNameFilter = e.target.value;
    this.FilterFn();
  };

  componentDidMount() {
    this.refreshList();
  }

  render() {
    const { events, isPending, error } = this.state;

    return (
      <div className="container px-4 mt-4">
        <nav className="nav nav-borders">
          <h5 className="custom-header">All Events</h5>
        </nav>
        <hr className="mt-0 mb-4" />
        <div className="row">
          <div className="col-xl-12">
            <Card className="mb-4 h-100">
              <Card.Body>
                {error && <div className="container">{error}</div>}
                {isPending && <div className="container">Loading...</div>}
                {events && (
                  <>
                    <div className="d-flex">
                      <input
                        className="form-control m-2"
                        onChange={this.changeEventNameFilter}
                        placeholder="Filter by name"
                      />
                    </div>
                    <div>
                      <Table
                        responsive="sm"
                        className="   mt-4"
                        bordered
                        hover
                        size="sm"
                      >
                        <thead>
                          <tr className="text-center">
                            <th>Name</th>
                            <th>Organizer</th>
                            <th>Current profit</th>
                            <th>Date</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {events.map((evn) => (
                            <tr
                              key={evn.eventId}
                              className="text-center align-middle"
                            >
                              <td>{evn.eventName}</td>
                              <td>{evn.organizersName}</td>
                              <td>{evn.profit} KM</td>
                              <td>
                                {dateFormat(evn.begin, "dd. mm. yyyy.") +
                                  " - " +
                                  dateFormat(evn.end, "dd. mm. yyyy.")}
                              </td>
                              <td>
                                {moment(
                                  evn.end,
                                  "YYYY-MM-DDTHH:mm:ss.SSSZ"
                                ).isAfter(moment()) ? (
                                  <span className="text-success m-1">
                                    Active
                                  </span>
                                ) : (
                                  <span className="text-danger m-1">
                                    Finished
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default AllEvents;
