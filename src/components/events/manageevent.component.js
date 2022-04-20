import React, { Component } from "react";
import {
  Button,
  ButtonToolbar,
  Table,
  Badge,
  ButtonGroup,
} from "react-bootstrap";
import { useCurrentUser } from "../../CurrentUserContext";
import dateFormat from "dateformat";
import ViewEvent from "./viewevent.component";
import AddEvent from "./addevent.component";
import moment from "moment";
import { AccountView } from "../account/account-view.component";

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
          console.log(err)
        });
    }, 1000);
  }

  changeEventNameFilter = (e) => {
    this.state.eventNameFilter = e.target.value;
    this.FilterFn();
  };

  
  deleteEvent(eventId) {
    if (window.confirm("Are you sure?")) {
      fetch(`https://localhost:7100/api/CurrentEvents/${eventId}`, {
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
  deleteFinishedEvents() {
    if (window.confirm("Are you sure?")) {
      fetch("https://localhost:7100/api/CurrentEvents/deletefinishedevents", {
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
    const hook = this.props.myHookValue;
    let addModalClose = () => this.setState({ addModalShow: false });
    let viewModalClose = () => this.setState({ viewModalShow: false });

    return (
      <div className="container px-4 mt-4">
        <nav className="nav nav-borders">
          <a className="nav-link active ms-0" href="#">
            My events
          </a>
        </nav>
        <hr className="mt-0 mb-4" />
        <div className="row">
          <div className="col-xl-3">
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">User</div>
              <div className="card-body text-center">
                <img
                  className="img-account-profile rounded-circle mb-2"
                  src="/avatar.jpg"
                  alt=""
                />
                <div className="user-data">
                  <h4>{hook.currentUser.username}</h4>
                </div>
                <div className="small font-italic text-muted mb-4">
                  {hook.currentUser.role[0]}
                  <AccountView />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9">
            <div className="card mb-4 h-100">
              <div className="card-header">Manage events</div>

              <hr className="border-light m-0" />
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
                  <div className="table-responsive">
                    <Table
                      className="table table-striped  mt-4 mr-1 ml-1"
                      striped
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
                                <p className="text-success m-1">Active</p>
                              ) : (
                                <p className="text-danger m-1">Finished</p>
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
                      <ButtonGroup>
                        <Button
                          className="m-2"
                          variant="danger"
                          onClick={() => this.deleteFinishedEvents()}
                        >Delete finished</Button>
                      </ButtonGroup>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withMyHook(ManageEvent);
