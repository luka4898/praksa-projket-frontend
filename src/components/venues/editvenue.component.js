import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import Swal from "sweetalert2";

class EditVenue extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      cities: [],
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
    const { venueName, cityId, capacity, address, status } = this.state.form;
    const newErrors = {};

    if (!venueName || venueName === "")
      newErrors.venueName = "Name of venue is required!";
    if (!cityId || cityId === "") newErrors.cityId = "Select a name of city!";
    if (!status || status === "") newErrors.status = "Select status of venue!";
    if (!capacity || capacity == "")
      newErrors.capacity = "Capacity is required!";
    else if (capacity < 1)
      newErrors.capacity = "Capacity must be greater than 0!";
    if (!address || address === "") newErrors.address = "Address is required!";

    return newErrors;
  };

  componentDidMount() {
    fetch("https://localhost:7100/api/Cities", {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          cities: data,
        });
      });
  }
  componentWillReceiveProps(props) {
    this.setState({
      form: {
        venueName: props.venuename,
        cityId: props.cityid,
        capacity: props.capacity,
        address: props.address,
        status: props.status,
      },
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    const newErrors = this.findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      this.setState({ errors: newErrors });
    } else {
      const response = fetch(
        `https://localhost:7100/api/Venues/${event.target.venueId.value}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            venueId: event.target.venueId.value,
            venueName: event.target.venueName.value,
            address: event.target.address.value,
            capacity: event.target.capacity.value,
            cityId: event.target.cityId.value,
            status: JSON.parse(event.target.status.value),
          }),
        }
      ).then((response) => {
        let success = response.ok;

        response
          .json()
          .then((response) => {
            if (!success) {
              throw Error(response.message);
            }
            Swal.fire({
              icon: "success",
              title: "Updated!",
              text: response.message,
              button: "OK",
            });
            this.props.refreshlist();
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
  }
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
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Venue
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={8}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="venueId">
                    <Form.Label>VenueId</Form.Label>
                    <Form.Control
                      type="text"
                      name="venueId"
                      required
                      placeholder="VenueId"
                      disabled
                      defaultValue={this.props.venueid}
                    />
                  </Form.Group>
                  <Form.Group controlId="venueName">
                    <Form.Label>Venue Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="venueName"
                      onChange={(e) =>
                        this.setField("venueName", e.target.value)
                      }
                      isInvalid={!!errors.venueName}
                      placeholder="Venue Name"
                      defaultValue={this.state.form.venueName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.venueName}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="cityId">
                    <Form.Label>City Name</Form.Label>
                    <Form.Control
                      as="select"
                      defaultValue={this.state.form.cityId}
                      onChange={(e) => this.setField("cityId", e.target.value)}
                      isInvalid={!!errors.cityId}
                    >
                      {this.state.cities.map((c) => (
                        <option key={c.cityId} value={c.cityId}>
                          {c.cityName}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.cityId}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      placeholder="Address"
                      onChange={(e) => this.setField("address", e.target.value)}
                      isInvalid={!!errors.address}
                      defaultValue={this.state.form.address}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.address}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="capacity">
                    <Form.Label>Capacity</Form.Label>
                    <Form.Control
                      type="number"
                      name="capacity"
                      onChange={(e) =>
                        this.setField("capacity", e.target.value)
                      }
                      isInvalid={!!errors.capacity}
                      placeholder="Capacity"
                      defaultValue={this.state.form.capacity}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.capacity}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="status">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      as="select"
                      defaultValue={this.state.form.status}
                      onChange={(e) => this.setField("status", e.target.value)}
                      isInvalid={!!errors.status}
                    >
                      <option key={true} value={true}>
                        true
                      </option>
                      <option key={false} value={false}>
                        false
                      </option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.status}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group>
                    <Button className="mt-4" variant="primary" type="submit">
                      Update
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
                this.setState({ errors: {}, form: {} });
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

export default EditVenue;
