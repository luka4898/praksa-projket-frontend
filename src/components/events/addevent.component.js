import React, { Component } from "react";
import { Modal, Button, Row, Col, Form, Image } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      selectedFile: [],
      clearable: true,
      eventtypes: [],
      venues: [],
      showSelect: false,
    };
  }
  fileSelectedHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  componentDidMount() {
    fetch("https://localhost:7100/api/EventTypes", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          eventtypes: data,
        });
      });

    fetch("https://localhost:7100/api/Venues", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          venues: data,
        });
      });
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const fd = new FormData();
    fd.append(
      "eventImage",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    fd.append("eventName", event.target.eventName.value);
    fd.append("content", event.target.content.value);
    fd.append("price", event.target.price.value);
    fd.append("numberOfSeats", event.target.numberOfSeats.value);
    fd.append("begin", event.target.begin.value);
    fd.append("end", event.target.end.value);
    fd.append("eventTypeId", event.target.eventTypeName.value);
    fd.append("venueId", event.target.venueName.value);

    axios
      .post("https://localhost:7100/api/CurrentEvents/createevent", fd, {
        withCredentials: true,
      })

      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: response.data.message,
          button: "OK",
        });
        event.target.reset();
        this.props.refreshlist();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message,
          button: "OK!",
        });
      });
  };

  render() {
    const { refreshlist, ...rest } = this.props;

    return (
      <div className="container">
        <Modal
          {...rest}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Event
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={8}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="eventName">
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control
                      name="eventName"
                      required
                      placeholder="Event Name"
                    />
                  </Form.Group>

                  <Form.Group controlId="content">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                      name="content"
                      required
                      placeholder="Content"
                    />
                  </Form.Group>

                  <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      required
                      placeholder="Price"
                    />
                  </Form.Group>

                  <Form.Group controlId="numberOfSeats">
                    <Form.Label>Number Of Seats</Form.Label>
                    <Form.Control
                      type="number"
                      name="numberOfSeats"
                      required
                      placeholder="Number Of Seats"
                    />
                  </Form.Group>

                  <Form.Group controlId="begin">
                    <Form.Label>Begin</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      name="begin"
                      required
                      placeholder="Begin"
                    />
                  </Form.Group>

                  <Form.Group controlId="end">
                    <Form.Label>End</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      name="end"
                      required
                      placeholder="End"
                    />
                  </Form.Group>

                  <Form.Group controlId="eventImage">
                    <Form.Label>Image Path</Form.Label>
                    <Form.Control
                      type="File"
                      onChange={this.fileSelectedHandler}
                      name="eventImage"
                      required
                      placeholder="event image"
                    />
                  </Form.Group>

                  <Form.Group controlId="eventTypeName">
                    <Form.Label>Event type</Form.Label>
                    <Form.Control as="select" defaultValue="">
                      {this.state.eventtypes.map((et) => (
                        <option key={et.eventTypeId} value={et.eventTypeId}>
                          {et.eventTypeName}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="venueName">
                    <Form.Label>Venue</Form.Label>
                    <Form.Control as="select" defaultValue="">
                      {this.state.venues.map((v) => (
                        <option key={v.venueId} value={v.venueId}>
                          {v.venueName}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Button className="mt-4" variant="primary" type="submit">
                      Add Event
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AddEvent;
