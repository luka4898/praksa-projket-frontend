import React, { Component } from "react";
import { withRouter } from "react-router";
import { Card, Row, Col } from "react-bootstrap";
import { variables } from "../../Variables";
import dateFormat from "dateformat";
import { Link, useHistory } from "react-router-dom";

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.getEvent = this.getEvent.bind(this);
    this.state = {
      event: null,
      isPending: true,
      error: null,
      prevPage: this.props.location.prevPath,
    };
  }

  getEvent() {
    setTimeout(() => {
      fetch(
        `https://localhost:7100/api/CurrentEvents/getonecurrentevent/?id=${this.props.match.params.id}`,
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
            event: data,
            isPending: false,
            error: null,
          });
        })
        .catch((err) => {
          this.setState({ isPending: false, error: err.message });
        });
    }, 1000);
  }

  componentDidMount() {
    this.getEvent();
  }
  render() {
    const { event, isPending, error, prevPage } = this.state;
    console.log(prevPage);
    return (
      <>
        {error && <div className="container mt-4">{error}</div>}
        {isPending && <div className="container">Loading...</div>}
        {event && (
          <div className="container mt-4 ">
            <div className="row justify-content-center">
              <div className="col-md-5">
                <div className="project-info-box mt-0">
                  <h5>{event.eventName}</h5>
                  <p className="mb-0">{event.content}</p>
                </div>

                <div className="project-info-box">
                  <p>
                    <b>Organizer: </b>
                    {event.organizersName}
                  </p>
                  <p>
                    <b>Date: </b>
                    {dateFormat(event.begin, "dd.mm.yyyy.")}
                  </p>
                  <p>
                    <b>Place: </b>
                    {event.venue.venueName}
                  </p>
                  <p>
                    <b>Address: </b>
                    {event.venue.address}
                  </p>
                  <p>
                    <b>Number of tickets: </b>
                    {event.numberOfSeats}
                  </p>
                  <p className="mb-0">
                    <b>Price: </b>
                    {event.price + " KM"}
                  </p>
                </div>
              </div>

              <div className="col-md-5">
                <img
                  src={variables.PHOTO_URL + event.imagePath}
                  alt="project-image"
                  className="rounded img-card-event"
                />
                <div className="project-info-box">
                  <p>
                    <b>Event Type: </b>
                    {event.eventType.eventTypeName}
                  </p>
                  <p>
                    <div
                      class="btn-toolbar"
                      role="toolbar"
                      aria-label="Toolbar with button groups"
                    >
                      <div
                        class="btn-group m-2"
                        role="group"
                        aria-label="First group"
                      >
                        <button type="button" class="btn btn-secondary">
                          Go back
                        </button>
                      </div>
                      <div
                        class="btn-group m-2"
                        role="group"
                        aria-label="Second group"
                      >
                        <button type="button" class="btn btn-success">
                          Buy tickets
                        </button>
                      </div>
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default EventDetails;
