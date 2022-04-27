import React, { Component } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { variables } from "../../Variables";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { withRouter } from "react-router-dom";
import moment from "moment";
class Event extends Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.getByEventType = this.getByEventType.bind(this);
    this.state = {
      offset: 0,
      tableData: [],

      perPage: 4,
      currentPage: 0,
      events: [],
      types: [],
      isLoading: true,
      eventNameFilter: "",
      eventsWithoutFilter: [],
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  FilterFn() {
    var eventNameFilter = this.state.eventNameFilter;

    var filteredData = this.state.eventsWithoutFilter.filter(function (el) {
      return el.eventName
        .toString()
        .toLowerCase()
        .includes(eventNameFilter.toString().trim().toLowerCase());
    });
    var slice = filteredData.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({
      events: filteredData,
      pageCount: Math.ceil(filteredData.length / this.state.perPage),
      tableData: slice,
    });
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.loadMoreData();
      }
    );
  };
  loadMoreData() {
    const events = this.state.events;
    const slice = events.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({
      pageCount: Math.ceil(events.length / this.state.perPage),
      tableData: slice,
    });
  }
  fetchData = async () => {
    try {
      const [events1, types1] = await Promise.all([
        fetch(
          `https://localhost:7100/api/CurrentEvents/getallcurrentevents?$filter=numberOfSeats gt 0 and end gt ${moment().toISOString()}`,
          {
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        ),
        fetch("https://localhost:7100/api/EventTypes", {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }),
      ]);
      const events = await events1.json();
      const types = await types1.json();
      var slice = events.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      this.setState({
        pageCount: Math.ceil(events.length / this.state.perPage),
        tableData: slice,
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
    var slice = result.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({
      events: result,
      pageCount: Math.ceil(result.length / this.state.perPage),
      tableData: slice,
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  changeEventNameFilter = (e) => {
    this.state.eventNameFilter = e.target.value;
    this.FilterFn();
  };
  render() {
    const { events, isLoading, types, price, tableData } = this.state;
    return (
      <>
        {isLoading && <div className="container">Loading...</div>}
        {events && (
          <div>
            <div className="mb-4">
              <div className="container mt-4">
                <div className="row">
                  <h3 className="mb-5">Events</h3>

                  <div className="col-lg-9">
                    <div className="d-flex">
                      <input
                        className="form-control mb-4"
                        onChange={this.changeEventNameFilter}
                        placeholder="Filter"
                      />
                    </div>
                    <Row xs={1} md={2} className="g-4">
                      {tableData.length > 0 ? (
                        tableData.map((evn) => (
                          <Col key={evn.currentEventId}>
                            <Card className="card-event">
                              <Card.Img
                                variant="top"
                                className="card-img-top img-card-event "
                                src={variables.PHOTO_URL + evn.imagePath}
                              />
                              <Card.Body>
                                <Card.Title>{evn.eventName}</Card.Title>
                                <Card.Text>
                                  <small className="text-muted">
                                    {"Date: " +
                                      dateFormat(evn.begin, "dd.mm.yyyy.") +
                                      " - " +
                                      dateFormat(evn.end, "dd.mm.yyyy.")}
                                  </small>
                                </Card.Text>
                                <Card.Text>
                                  {evn.content.split(".")[0]}...
                                </Card.Text>
                                <Link
                                  to={{
                                    pathname: `/eventdetails/${evn.currentEventId}`,
                                    state: { eventTypeId: evn.eventTypeId },
                                  }}
                                  className="event-link"
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
                    <ReactPaginate
                      previousLabel={"<<"}
                      nextLabel={">>"}
                      breakLabel={"..."}
                      breakClassName={"break-me"}
                      pageCount={this.state.pageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={this.handlePageClick}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"}
                      initialPage={0}
                    />
                  </div>
                  <div className="col-lg-3">
                    <div className="card mb-4">
                      <div className="card-header">Types</div>
                      <div className="card-body ">
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

                    <div className="card mb-4">
                      <div className="card-body">
                        {" "}
                        <Link className="btn btn-success" to="/calendar">
                          <i class="bi bi-calendar"></i> Calendar
                        </Link>
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

export default withRouter(Event);
