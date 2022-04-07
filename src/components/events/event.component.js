import React, { Component } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { variables } from "../../Variables";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';

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
    this.setState({
      tableData: filteredData,
    });
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.loadMoreData()
    });

};
loadMoreData() {
  const events = this.state.events;
  const slice = events.slice(this.state.offset, this.state.offset + this.state.perPage)
  this.setState({
      pageCount: Math.ceil(events.length / this.state.perPage),
      tableData: slice
  })

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
      var slice = events.slice(this.state.offset, this.state.offset + this.state.perPage)
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
    var slice = result.slice(this.state.offset, this.state.offset + this.state.perPage)
    this.setState({ events:result,pageCount: Math.ceil(result.length / this.state.perPage),
    tableData: slice,});
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
                      {tableData.length > 0 ? (
                        tableData.map((evn) => (
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
                    <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                    initialPage={0}/>
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

                    <div className="card mb-4">
                    <div className="card-body"> <Link
                                    className="btn btn-info"
                                    to="/calendar"
                                  >
                                   <i class="bi bi-calendar"></i> Calendar 
                                  </Link></div>
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
