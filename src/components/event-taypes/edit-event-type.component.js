import { Button } from "react-bootstrap";
import { Modal, Row, Col, Form } from "react-bootstrap";
import React, { Component } from "react";
import Swal from "sweetalert2";

export class EditEventType extends Component {
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
  componentWillReceiveProps(props) {
    this.setState({
      form: {
        eventTypeName: props.eventTypeName,
      },
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const newErrors = this.findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      this.setState({ errors: newErrors });
    } else {
      fetch(
        "https://localhost:7100/api/EventTypes/" + e.target.eventTypeId.value,
        {
          method: "PUT",
          headers: {
            Acept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            eventTypeId: e.target.eventTypeId.value,
            eventTypeName: e.target.eventTypeName.value,
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
              Edit event type
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="eventTypeId">
                    <Form.Label>Event Type Id</Form.Label>
                    <Form.Control
                      type="text"
                      name="eventTypeId"
                      disabled
                      defaultValue={this.props.eventtypeid}
                      placeholder="Event type Id"
                    />
                  </Form.Group>
                  <Form.Group controlId="eventTypeName">
                    <Form.Label>Event Type Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="eventTypeName"
                      required
                      onChange={(e) =>
                        this.setField("eventTypeName", e.target.value)
                      }
                      isInvalid={!!errors.eventTypeName}
                      defaultValue={this.props.eventTypeName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.eventTypeName}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Button variant="primary mt-4" type="submit">
                      Update event type
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
