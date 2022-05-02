import { Button } from "react-bootstrap";
import { Modal, Row, Col, Form } from "react-bootstrap";
import React, { Component } from "react";
import Swal from "sweetalert2";

export class AddEventType extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
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
    const { eventTypeName } = this.state.form;
    const newErrors = {};

    if (!eventTypeName || eventTypeName === "")
      newErrors.eventTypeName = "Name of eventType is required!";

    return newErrors;
  };
  handleSubmit(e) {
    e.preventDefault();
    const newErrors = this.findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      this.setState({ errors: newErrors });
    } else {
      fetch("https://localhost:7100/api/EventTypes", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          eventTypeName: e.target.eventType.value,
        }),
      }).then((response) => {
        let success = response.ok;
        response
          .json()
          .then((response) => {
            if (!success) {
              throw Error(response.message);
            }
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "EventType added successfully!",
              button: "OK!",
            });
            e.target.reset();
            this.setState({ errors: {}, form: {} });
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
              Add City
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="eventType">
                    <Form.Label>Event type Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="eventType"
                      onChange={(e) =>
                        this.setField("eventTypeName", e.target.value)
                      }
                      isInvalid={!!errors.eventTypeName}
                      placeholder="EventType name"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.eventTypeName}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Button variant="primary mt-4" type="submit">
                      Add Event Type
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
