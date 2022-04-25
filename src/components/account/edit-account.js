import React, { useState } from "react";
import { Component } from "react";
import { Button, ButtonToolbar, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { Modal, Row, Col, Form } from "react-bootstrap";

export class AccountEdit extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch("https://localhost:7100/api/Authenticate/editaccount", {
      method: "POST",
      headers: {
        Acept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        id: e.target.id.value,
        username: e.target.username.value,
        firstname: e.target.firstname.value,
        lastname: e.target.lastname.value,
        email: e.target.email.value,
        address: e.target.address.value,
        phoneNumber: e.target.phoneNumber.value,
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

  /* componentDidUpdate(){
        this.refreshList();
    }*/

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
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit account
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="id">
                    <Form.Label>Id</Form.Label>
                    <Form.Control
                      type="text"
                      name="id"
                      disabled
                      defaultValue={this.props.id}
                      placeholder="Id"
                    />
                  </Form.Group>
                  <Form.Group controlId="username">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      required
                      defaultValue={this.props.username}
                      placeholder="User name"
                    />
                  </Form.Group>
                  <Form.Group controlId="firstname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstname"
                      required
                      defaultValue={this.props.firstname}
                      placeholder="First name"
                    />
                  </Form.Group>
                  <Form.Group controlId="lastname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastname"
                      required
                      defaultValue={this.props.lastname}
                      placeholder="Last name"
                    />
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      required
                      defaultValue={this.props.email}
                      placeholder="Email"
                    />
                  </Form.Group>
                  <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      required
                      defaultValue={this.props.address}
                      placeholder="Address"
                    />
                  </Form.Group>
                  <Form.Group controlId="phoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phoneNumber"
                      required
                      defaultValue={this.props.phonenumber}
                      placeholder="Phone Number"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Edit
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
