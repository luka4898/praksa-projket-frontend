import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

class AddVenue extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      selectedOption: "",
      clearable: true,
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
    const { venueName, cityName, capacity, address } = this.state.form;
    const newErrors = {};

    if (!venueName || venueName === "")
      newErrors.venueName = "Name of venue is required!";
    else if (venueName.length > 30)
      newErrors.venueName = "Name of vanue is too long!";
    if (!cityName || cityName === "")
      newErrors.cityName = "Select a name of city!";
    if (!capacity || capacity == "")
      newErrors.capacity = "Capacity is required!";
    else if (capacity < 1)
      newErrors.capacity = "Capacity must be greater than 0!";
    if (!address || address === "") newErrors.address = "Address is required!";
    else if (address.length > 50) newErrors.address = "Address is too long!";

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

  handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = this.findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      this.setState({ errors: newErrors });
    } else {
      fetch("https://localhost:7100/api/Venues", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          venueName: event.target.venueName.value,
          address: event.target.address.value,
          capacity: event.target.capacity.value,
          cityId: event.target.cityName.value,
        }),
      }).then(
        (res) => {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Venue added successfully!",
            button: "OK!",
          });
          event.target.reset();
          this.props.refreshlist();
        },
        (error) => {
          alert(error);
        }
      );
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
              Add Venue
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={8}>
                <Form onSubmit={this.handleSubmit}>
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
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.venueName}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="cityName">
                    <Form.Label>City Name</Form.Label>
                    <Form.Control
                      as="select"
                      defaultValue=""
                      onChange={(e) =>
                        this.setField("cityName", e.target.value)
                      }
                      isInvalid={!!errors.cityName}
                    >
                      <option value="" disabled>
                        --Select city name--
                      </option>
                      {this.state.cities.map((c) => (
                        <option key={c.cityId} value={c.cityId}>
                          {c.cityName}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.cityName}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      onChange={(e) => this.setField("address", e.target.value)}
                      isInvalid={!!errors.address}
                      placeholder="Address"
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
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.capacity}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group>
                    <Button className="mt-4" variant="primary" type="submit">
                      Add Venue
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

export default AddVenue;
