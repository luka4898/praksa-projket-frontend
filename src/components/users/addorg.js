import { Button } from "react-bootstrap";
import { Modal, Row, Col, Form } from "react-bootstrap";
import React, { Component } from "react";
import Swal from "sweetalert2";

export class AddAcountOrg extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add as org!",
    }).then((response) => {
      if (response.isConfirmed) {
        fetch("https://localhost:7100/api/Authenticate/addtoorganizer", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: e.target.email.value,
          }),
        }).then((response) => {
          let success = response.ok;
          response
            .json()
            .then((response) => {
              if (!success) {
                throw Error(response.message);
              }
              Swal.fire("Added!", response.message, "success");
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
    });
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
              Add to Organizer
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
                      Add to org
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
