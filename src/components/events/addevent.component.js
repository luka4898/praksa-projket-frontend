import React, { Component } from "react";
import { Modal, Button, Row, Col, Form, Image } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";

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
      errors: {},
      form: {},
    };
  }
  setField = (field, value) => {
    this.setState({
      form: {
        ...this.state.form,
        [field]: value,
      },
    });

    if (!!this.state.errors[field])
      this.setState({
        errors: {
          ...this.state.errors,
          [field]: null,
        },
      });
  };
  findFormErrors = () => {
    const {
      venueName,
      eventName,
      content,
      price,
      eventTypeName,
      numberOfSeats,
      begin,
      end,
    } = this.state.form;
    const { selectedFile } = this.state;
    const newErrors = {};

    if (!eventName || eventName === "")
      newErrors.eventName = "Name of event is required!";
    if (!eventTypeName || eventTypeName === "")
      newErrors.eventTypeName = "Select a type of event!";
    if (!venueName || venueName === "")
      newErrors.venueName = "Select a venue of event!";
    if (!price || price == "") newErrors.price = "Price is required!";
    else if (price < 1) newErrors.price = "Price must be greater than 0!";
    if (!numberOfSeats || numberOfSeats == "")
      newErrors.numberOfSeats = "Number of seats is required!";
    else if (numberOfSeats < 1)
      newErrors.numberOfSeats = "Number of seats must be greater than 0!";
    if (!content || content === "") newErrors.content = "Content is required!";

    if (!begin || begin == "") newErrors.begin = "Start date is required!";
    if (moment(begin, "YYYY-MM-DDTHH:mm:ss.SSSZ").isBefore(moment()))
      newErrors.begin = "Start date cant be in past!";
    else if (end) {
      if (
        moment(begin, "YYYY-MM-DDTHH:mm:ss.SSSZ").isAfter(
          moment(end, "YYYY-MM-DDTHH:mm:ss.SSSZ")
        )
      )
        newErrors.begin = "Start date cant be after end date!";
    }

    if (!end || end == "") newErrors.end = "End date is required!";
    else if (begin) {
      if (
        moment(end, "YYYY-MM-DDTHH:mm:ss.SSSZ").isBefore(
          moment(begin, "YYYY-MM-DDTHH:mm:ss.SSSZ")
        )
      )
        newErrors.end = "End date cant be before start date!";
    }

    if (!selectedFile.name || selectedFile.name == "")
      newErrors.selectedFile = "Image of event is required!";
    return newErrors;
  };
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
    const newErrors = this.findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      this.setState({ errors: newErrors });
    } else {
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
          this.setState({ errors: {}, form: {}, selectedFile: [] });
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
    }
  };
  render() {
    const { refreshlist, ...rest } = this.props;
    const { errors } = this.state;
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
                      onChange={(e) =>
                        this.setField("eventName", e.target.value)
                      }
                      isInvalid={!!errors.eventName}
                      placeholder="Event Name"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.eventName}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="content">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                      name="content"
                      as="textarea"
                      rows={3}
                      onChange={(e) => this.setField("content", e.target.value)}
                      isInvalid={!!errors.content}
                      placeholder="Content"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.content}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      onChange={(e) => this.setField("price", e.target.value)}
                      isInvalid={!!errors.price}
                      placeholder="Price"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.price}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="numberOfSeats">
                    <Form.Label>Number Of Seats</Form.Label>
                    <Form.Control
                      type="number"
                      name="numberOfSeats"
                      onChange={(e) =>
                        this.setField("numberOfSeats", e.target.value)
                      }
                      isInvalid={!!errors.numberOfSeats}
                      placeholder="Number Of Seats"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.numberOfSeats}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="begin">
                    <Form.Label>Begin</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      name="begin"
                      onChange={(e) => this.setField("begin", e.target.value)}
                      isInvalid={!!errors.begin}
                      placeholder="Begin"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.begin}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="end">
                    <Form.Label>End</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      name="end"
                      onChange={(e) => this.setField("end", e.target.value)}
                      isInvalid={!!errors.end}
                      placeholder="End"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.end}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="eventImage">
                    <Form.Label>Image Path</Form.Label>
                    <Form.Control
                      type="File"
                      onChange={this.fileSelectedHandler}
                      name="eventImage"
                      isInvalid={!!errors.selectedFile}
                      placeholder="event image"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.selectedFile}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="eventTypeName">
                    <Form.Label>Event type</Form.Label>
                    <Form.Control
                      as="select"
                      defaultValue=""
                      onChange={(e) =>
                        this.setField("eventTypeName", e.target.value)
                      }
                      isInvalid={!!errors.eventTypeName}
                    >
                      <option value="" disabled>
                        --Select type of event--
                      </option>
                      {this.state.eventtypes.map((et) => (
                        <option key={et.eventTypeId} value={et.eventTypeId}>
                          {et.eventTypeName}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.eventTypeName}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="venueName">
                    <Form.Label>Venue</Form.Label>
                    <Form.Control
                      as="select"
                      defaultValue=""
                      onChange={(e) =>
                        this.setField("venueName", e.target.value)
                      }
                      isInvalid={!!errors.venueName}
                    >
                      <option value="" disabled>
                        --Select name of venue--
                      </option>
                      {this.state.venues.map((v) => (
                        <option key={v.venueId} value={v.venueId}>
                          {v.venueName}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.venueName}
                    </Form.Control.Feedback>
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
            <Button
              variant="danger"
              onClick={() => {
                this.setState({ errors: {}, form: {}, selectedFile: [] });
                this.props.onHide();
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AddEvent;
