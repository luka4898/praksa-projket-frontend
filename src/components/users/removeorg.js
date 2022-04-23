import { Button } from "react-bootstrap";
import { Modal, Row, Col, Form } from "react-bootstrap";
import React, { Component } from "react";

export class RemoveOrg extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch(
      "https://localhost:7100/api/Authenticate/removefromorganizeroradmin",
      {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: e.target.email.value,
        }),
      }
    ).then(
      (result) => {
        alert(result);
        this.props.refreshlist();
      },
      (error) => {
        alert(error);
      }
    );
  }

  render() {
    return (
      <div>
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Remove from org
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="email">
                    <Form.Label>Account mail</Form.Label>
                    <Form.Control
                      type="text"
                      name="emial"
                      disabled
                      placeholder="Event type Name"
                      defaultValue={this.props.email}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Remove from org
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
