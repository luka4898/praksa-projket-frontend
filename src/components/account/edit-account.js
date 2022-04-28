import React, { useState } from "react";
import { Component } from "react";
import { Button, ButtonToolbar, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { Modal, Row, Col, Form } from "react-bootstrap";

export class AccountEdit extends Component {
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
    const { username, firstname, lastname, email, address, phoneNumber } =
      this.state.form;
    const newErrors = {};
    var pattern1 = new RegExp(
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
    );
    var pattern2 = new RegExp("^[0-9]{9,}$");
    if (!username || username === "")
      newErrors.username = "Name of venue is required!";
    if (!firstname || firstname == "")
      newErrors.firstname = "First name is required!";
    if (!lastname || lastname == "")
      newErrors.lastname = "Last name is required!";
    if (!email || email === "") newErrors.email = "Email is required!";
    else if (!pattern1.test(email))
      newErrors.email = "It should be a valid email address!";
    if (!address || address === "") newErrors.address = "Address is required!";
    if (!phoneNumber || phoneNumber === "")
      newErrors.phoneNumber = "PhoneNumber is required!";
    else if (!pattern2.test(phoneNumber))
      newErrors.phoneNumber =
        "Phone number should have more than 9 characters and only numbers!";

    return newErrors;
  };
  handleSubmit(e) {
    e.preventDefault();
    const newErrors = this.findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      this.setState({ errors: newErrors });
    } else {
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
  }
  /* componentDidUpdate(){
        this.refreshList();
    }*/
  componentWillReceiveProps(props) {
    this.setState({
      form: {
        username: props.username,
        firstname: props.firstname,
        lastname: props.lastname,
        address: props.address,
        email: props.email,
        phoneNumber: props.phonenumber,
      },
    });
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
                      onChange={(e) =>
                        this.setField("username", e.target.value)
                      }
                      isInvalid={!!errors.username}
                      defaultValue={this.state.form.username}
                      placeholder="User name"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="firstname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstname"
                      onChange={(e) =>
                        this.setField("firstname", e.target.value)
                      }
                      isInvalid={!!errors.firstname}
                      defaultValue={this.state.form.firstname}
                      placeholder="First name"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstname}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="lastname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastname"
                      onChange={(e) =>
                        this.setField("lastname", e.target.value)
                      }
                      isInvalid={!!errors.lastname}
                      defaultValue={this.state.form.lastname}
                      placeholder="Last name"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastname}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      onChange={(e) => this.setField("email", e.target.value)}
                      isInvalid={!!errors.email}
                      defaultValue={this.state.form.email}
                      placeholder="Email"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      onChange={(e) => this.setField("address", e.target.value)}
                      isInvalid={!!errors.address}
                      defaultValue={this.state.form.address}
                      placeholder="Address"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.address}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="phoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phoneNumber"
                      onChange={(e) =>
                        this.setField("phoneNumber", e.target.value)
                      }
                      isInvalid={!!errors.phoneNumber}
                      defaultValue={this.state.form.phoneNumber}
                      placeholder="Phone Number"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phoneNumber}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Button variant="primary mt-4" type="submit">
                      Edit
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
