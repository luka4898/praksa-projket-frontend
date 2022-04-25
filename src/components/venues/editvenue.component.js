import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import Swal from "sweetalert2";

class EditVenue extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      clearable: true,
      cities: [],
    };
  }

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

  handleSubmit(event) {
    event.preventDefault();

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
          cityId: event.target.cityName.value,
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
                      required
                      placeholder="Venue Name"
                      defaultValue={this.props.venuename}
                    />
                  </Form.Group>

                  <Form.Group controlId="cityName">
                    <Form.Label>City Name</Form.Label>
                    <Form.Control as="select" defaultValue={this.props.cityid}>
                      {this.state.cities.map((c) => (
                        <option key={c.cityId} value={c.cityId}>
                          {c.cityName}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      required
                      placeholder="Address"
                      defaultValue={this.props.address}
                    />
                  </Form.Group>

                  <Form.Group controlId="capacity">
                    <Form.Label>Capacity</Form.Label>
                    <Form.Control
                      type="number"
                      name="capacity"
                      required
                      placeholder="Capacity"
                      defaultValue={this.props.capacity}
                    />
                  </Form.Group>
                  <Form.Group controlId="status">
                    <Form.Label>Status</Form.Label>
                    <Form.Control as="select" defaultValue={this.props.status}>
                      <option key={true} value={true}>
                        true
                      </option>
                      <option key={false} value={false}>
                        false
                      </option>
                    </Form.Control>
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
            <Button variant="danger" onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default EditVenue;
