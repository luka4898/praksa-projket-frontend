import React, { Component } from "react";
import {
  Button,
  ButtonToolbar,
  Table,
  Badge,
  ButtonGroup,
  Card,
} from "react-bootstrap";
import { useCurrentUser } from "../../CurrentUserContext";
import dateFormat from "dateformat";
import ViewEvent from "./viewevent.component";
import AddEvent from "./addevent.component";
import moment from "moment";
import { AccountView } from "../account/account-view.component";
import Swal from "sweetalert2";

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const myHookValue = useCurrentUser();
    return <Component {...props} myHookValue={myHookValue} />;
  };
}

class ManageEvent extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.state = {
      events: null,
      addModalShow: false,
      viewModalShow: false,
      isPending: true,
      error: null,
      user: this.props.myHookValue,
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
      fetch(
        `https://localhost:7100/api/CurrentEvents/getallcurrentevents?$filter=organizersName eq '${this.state.user.currentUser.username}'`,
        {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      )
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

  deleteEvent(eventId) {
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
        fetch(`https://localhost:7100/api/CurrentEvents/${eventId}`, {
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

  componentDidMount() {
    this.refreshList();
  }

  render() {
    const {
      events,
      isPending,
      error,
      end,
      begin,
      numberOfSeats,
      imagePath,
      capacity,
      venueName,
      eventTypeName,
      price,
      content,
      organizersName,
      eventName,
    } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let viewModalClose = () => this.setState({ viewModalShow: false });

    return (
      <div className="container px-4 mt-4 mb-4  min-vh-100">
        <nav className="nav nav-borders">
          <h5 className="custom-header">My events</h5>
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
                            <th>Venue</th>
                            <th>Type</th>
                            <th>Seats</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Options</th>
                          </tr>
                        </thead>
                        <tbody>
                          {events.map((evn) => (
                            <tr
                              key={evn.currentEventId}
                              className="text-center align-middle"
                            >
                              <td>{evn.eventName}</td>
                              <td>{evn.venue.venueName}</td>
                              <td>{evn.eventType.eventTypeName}</td>
                              <td>{evn.numberOfSeats}</td>
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
                              <td>
                                <ButtonToolbar className="d-flex justify-content-center">
                                  <Button
                                    className="m-2"
                                    variant="light"
                                    onClick={() =>
                                      this.setState({
                                        viewModalShow: true,
                                        eventName: evn.eventName,
                                        content: evn.content,
                                        organizersName: evn.organizersName,
                                        price: evn.price,
                                        numberOfSeats: evn.numberOfSeats,
                                        imagePath: evn.imagePath,
                                        venueName: evn.venue.venueName,
                                        capacity: evn.venue.capacity,
                                        eventTypeName:
                                          evn.eventType.eventTypeName,
                                        begin: evn.begin,
                                        end: evn.end,
                                      })
                                    }
                                  >
                                    View
                                  </Button>

                                  <Button
                                    className="m-2"
                                    variant="danger"
                                    onClick={() =>
                                      this.deleteEvent(evn.currentEventId)
                                    }
                                  >
                                    <i className="bi bi-trash" fill="red"></i>
                                  </Button>

                                  <ViewEvent
                                    show={this.state.viewModalShow}
                                    onHide={viewModalClose}
                                    eventname={eventName}
                                    content={content}
                                    organizersname={organizersName}
                                    price={price}
                                    numberofseats={numberOfSeats}
                                    imagepath={imagePath}
                                    venuename={venueName}
                                    capacity={capacity}
                                    eventtypename={eventTypeName}
                                    begin={begin}
                                    end={end}
                                  />
                                </ButtonToolbar>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>

                      <ButtonToolbar>
                        <Button
                          variant="primary m-2 "
                          onClick={() => this.setState({ addModalShow: true })}
                        >
                          Add Event
                        </Button>

                        <AddEvent
                          show={this.state.addModalShow}
                          onHide={addModalClose}
                          refreshlist={this.refreshList}
                        />
                      </ButtonToolbar>
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

export default withMyHook(ManageEvent);
