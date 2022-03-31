import React, { Component } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { variables } from "../../Variables";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";

class Event extends Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.getByEventType = this.getByEventType.bind(this);
    this.state = {
      events: [],
      types: [],
      isLoading: true,
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
  fetchData = async () => {
    try {
      const [events1, types1] = await Promise.all([
        fetch("https://localhost:7100/api/CurrentEvents/getallcurrentevents", {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }),
        fetch("https://localhost:7100/api/EventTypes", {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }),
      ]);
      const events = await events1.json();
      const types = await types1.json();
      this.setState({
        events: events,
        types: types,
        isLoading: false,
        eventsWithoutFilter: events,
      });
    } catch (err) {
      this.setState({ isLoading: false });
      throw err;
    }
  };

  getByEventType = (evnType) => {
    const result = this.state.eventsWithoutFilter.filter((currData) => {
      return currData.eventType.eventTypeName === evnType;
    });
    this.setState({ events: result });
  };

  componentDidMount() {
    this.fetchData();
  }

  changeEventNameFilter = (e) => {
    this.state.eventNameFilter = e.target.value;
    this.FilterFn();
  };
  render() {
    const { events, isLoading, types, price } = this.state;
    return (
      <>
        {isLoading && <div className="container">Loading...</div>}
        {events && (
          <div>
            <div className="mb-4">
              <div className="py-5 bg-light border-bottom mb-4">
                <div className="container">
                  <div className="text-center my-5">
                    <h1 className="fw-bolder">Events</h1>
                    <p className="lead mb-0">
                      “What you need, is an Event, to remember for a lifetime.”
                    </p>
                  </div>
                </div>
              </div>

              <div className="container">
                <div className="row">
                  <div className="col-lg-9">
                    <Row xs={1} md={2} className="g-4">
                      {events.length > 0 ? (
                        events.map((evn) => (
                          <Col key={evn.currentEventId}>
                            <Card>
                              <Card.Img
                                variant="top"
                                className="card-img-top img-card-event"
                                src={variables.PHOTO_URL + evn.imagePath}
                              />
                              <Card.Body>
                                <Card.Title>{evn.eventName}</Card.Title>
                                <Card.Text>
                                  <small className="text-muted">
                                    {"Date: " +
                                      dateFormat(evn.begin, "dd.mm.yyyy") +
                                      " - " +
                                      dateFormat(evn.end, "dd.mm.yyyy")}
                                  </small>
                                </Card.Text>
                                <Card.Text>{evn.content}</Card.Text>
                                <Link
                                  to={{
                                    pathname: `/eventdetails/${evn.currentEventId}`,
                                    state: {
                                      prevPath: window.location.pathname,
                                    },
                                  }}
                                  className="btn btn-secondary"
                                >
                                  Read more →
                                </Link>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))
                      ) : (
                        <div>No results </div>
                      )}
                    </Row>
                  </div>
                  <div className="col-lg-3">
                    <div className="card mb-4">
                      <div className="card-header">Filter</div>
                      <div className="card-body">
                        <div className="input-group">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Enter filter term..."
                            aria-label="Enter search term..."
                            aria-describedby="button-search"
                            onChange={this.changeEventNameFilter}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="card mb-4">
                      <div className="card-header">Types</div>
                      <div className="card-body">
                        <div className="row">
                          <ul className="list-unstyled mb-2">
                            <li>
                              <button
                                className="btn btn-light"
                                onClick={this.fetchData}
                              >
                                All
                              </button>
                            </li>
                          </ul>
                          <div className="col-sm-6">
                            {types.map((ty) => (
                              <ul
                                key={ty.eventTypeId}
                                className="list-unstyled mb-2"
                              >
                                <li>
                                  <button
                                    className="btn btn-light"
                                    onClick={() =>
                                      this.getByEventType(ty.eventTypeName)
                                    }
                                  >
                                    {ty.eventTypeName}
                                  </button>
                                </li>
                              </ul>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Event;
