import React, { Component } from "react";
import { variables } from "../../Variables";
import dateFormat from "dateformat";
import { QuantityPicker } from "react-qty-picker";
import "./event.css";
import { withRouter } from "react-router-dom";
import Payment from "./payment.component";
import "react-multi-carousel/lib/styles.css";
import MultipleCarousel from "../multiplecarousel.component";

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null,
      similarevn: null,
      isPending: true,
      error: null,
      eventId: null,
      quantity: 0,
      paymentModalShow: false,
    };
  }
  
  fetchData = async () => {
    try {
      const [events1, similarevn1] = await Promise.all([
        fetch(
          `https://localhost:7100/api/CurrentEvents/getonecurrentevent/?id=${this.props.match.params.id}`,
          {
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        ),
        fetch(
          `https://localhost:7100/api/CurrentEvents/getallcurrentevents/?$filter=currentEventId ne ${this.props.match.params.id} and eventTypeId eq ${this.props.location.state.eventTypeId}`,
          {
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        ),
      ]);
      const event = await events1.json();
      const similarevn = await similarevn1.json();

      this.setState({
        event: event,
        similarevn: similarevn,
        isPending: false,
      });
    } catch (err) {
      this.setState({ isPending: false });
      throw err;
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { event, isPending, error, similarevn, quantity } = this.state;
    let paymentModalClose = () => this.setState({ paymentModalShow: false });
    return (
      <>
        {error && <div className="container mt-4">{error}</div>}
        {isPending && <div className="container">Loading...</div>}
        {event && (
          <div className="container mt-4 ">
            <div className="row justify-content-center">
              <h3 className="mb-5">Event details</h3>

              <div className="col-md-5">
                <img
                  src={variables.PHOTO_URL + event.imagePath}
                  alt="project-image"
                  className="rounded img-details"
                />
                <div className="project-info-box">
                  <p>
                    <b>Tickets left: </b>
                    {event.numberOfSeats}
                  </p>
                  <p>
                    <b>Price: </b>
                    {event.price + " KM"}
                  </p>
                  <p>
                    <b>Quantity: </b>
                    <QuantityPicker
                      min={1}
                      max={event.numberOfSeats}
                      value={this.state.quantity}
                      onChange={(value) => {
                        this.setState({ quantity: value });
                      }}
                      smooth
                    />
                  </p>
                  <p>
                    <div
                      className="btn-toolbar"
                      role="toolbar"
                      aria-label="Toolbar with button groups"
                    >
                      <div
                        className="btn-group m-2"
                        role="group"
                        aria-label="First group"
                      >
                        <button
                          onClick={this.props.history.goBack}
                          className="btn btn-secondary"
                        >
                          Go back
                        </button>
                      </div>
                      <div
                        className="btn-group m-2"
                        role="group"
                        aria-label="Second group"
                      >
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            this.setState({ paymentModalShow: true })
                          }
                        >
                          <i className="bi bi-ticket m-2"></i> Buy tickets
                        </button>
                      </div>
                      <Payment
                        show={this.state.paymentModalShow}
                        onHide={paymentModalClose}
                        fetchdata={this.fetchData}
                        quantity={quantity}
                        price={event.price}
                        eventid={event.currentEventId}
                      />
                    </div>
                  </p>
                </div>
              </div>
              <div className="col-md-5">
                <div className="project-info-box mt-0">
                  <h5>{event.eventName}</h5>
                  <p className="mb-0">{event.content}</p>
                </div>

                <div className="project-info-box">
                  <p>
                    <b>
                      <i className="bi bi-calendar"></i>{" "}
                    </b>
                    {dateFormat(event.begin, "dd.mm.yyyy.")}
                  </p>
                  <p>
                    <b>
                      <i className="bi bi-clock"></i>{" "}
                    </b>

                    {dateFormat(event.begin, "HH:MM")}
                    <b> - </b>
                    {dateFormat(event.end, "HH:MM")}
                  </p>
                  <p>
                    <b>
                      <i className="bi bi-shop"></i>{" "}
                    </b>
                    {event.venue.venueName}
                  </p>
                  <p>
                    <b>
                      <i className="bi bi-geo-alt"></i>{" "}
                    </b>
                    {event.venue.address}
                  </p>
                </div>

                <div className="project-info-box">
                  <p>
                    <b>Organizer: </b>
                    {event.organizersName}
                  </p>
                  <p>
                    <b>Category: </b>
                    {event.eventType.eventTypeName}
                  </p>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
            <h5 className="m-4">Similar events</h5>

            <MultipleCarousel similarevn={similarevn} history={this.props.history}/>
          </div>
          </div>
        )}
      </>
    );
  }
}

export default withRouter(EventDetails);
