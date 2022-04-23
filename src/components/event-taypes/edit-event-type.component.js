import { Button } from "react-bootstrap";
import { Modal, Row, Col, Form } from "react-bootstrap";
import React, { Component } from "react";

export class EditEventType extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch(
      "https://localhost:7100/api/EventTypes/" + e.target.eventTypeId.value,
      {
        method: "PUT",
        headers: {
          Acept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventTypeId: e.target.eventTypeId.value,
          eventTypeName: e.target.eventTypeName.value,
        }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
        },
        (error) => {
          alert("Failed");
        }
      );
  }
  render() {
    return (
      <div className="container">
        <Modal
          {...this.props}
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
                      defaultValue={this.props.eventtypename}
                      placeholder="Event type Name"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Update event type
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
