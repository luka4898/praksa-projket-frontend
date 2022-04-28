import React from "react";
import { Component } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import Swal from "sweetalert2";

export class ChangePassword extends Component {
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
    const { currentPassword, newPassword, confirmNewPassword } =
      this.state.form;
    const newErrors = {};
    var patter1 = new RegExp(
      "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$"
    );
    if (!currentPassword || currentPassword === "")
      newErrors.currentPassword = "CurrentPassword is required!";
    if (!newPassword || newPassword == "")
      newErrors.newPassword = "NewPassword is required!";
    else if (!patter1.test(newPassword))
      newErrors.newPassword =
        "Password should be more than 8 characters and include at least 1 lowercase and uppercase letter, 1 number and 1 special character!";
    if (!confirmNewPassword || confirmNewPassword === "")
      newErrors.confirmNewPassword = "confirmNewPassword is required!";
    if (newPassword !== "undefined" && confirmNewPassword !== "undefined") {
      if (newPassword != confirmNewPassword)
        newErrors.newPassword =
          "New password and confirm password don't match!";
    }

    return newErrors;
  };
  handleSubmit(e) {
    e.preventDefault();
    const newErrors = this.findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      this.setState({ errors: newErrors });
    } else {
      fetch("https://localhost:7100/api/Authenticate/changepassword", {
        method: "POST",
        headers: {
          Acept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: e.target.username.value,
          currentPassword: e.target.currentPassword.value,
          newPassword: e.target.newPassword.value,
          confirmNewPassword: e.target.confirmNewPassword.value,
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
            e.target.reset();
            this.setState({ errors: {}, form: {} });
            this.props.refreshlist();
          })

          .catch((error) => {
            console.log(error);
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

  render() {
    const { errors } = this.state;
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
              Change password
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="username">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      disabled
                      defaultValue={this.props.username}
                      placeholder="User name"
                    />
                  </Form.Group>
                  <Form.Group controlId="currentPassword">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="currentPassword"
                      onChange={(e) =>
                        this.setField("currentPassword", e.target.value)
                      }
                      isInvalid={!!errors.currentPassword}
                      placeholder="Current password"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.currentPassword}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="newPassword">
                    <Form.Label>New password</Form.Label>
                    <Form.Control
                      type="password"
                      name="newPassword"
                      onChange={(e) =>
                        this.setField("newPassword", e.target.value)
                      }
                      isInvalid={!!errors.newPassword}
                      placeholder="New password"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.newPassword}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="confirmNewPassword">
                    <Form.Label>Confirm new password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmNewPassword"
                      onChange={(e) =>
                        this.setField("confirmNewPassword", e.target.value)
                      }
                      isInvalid={!!errors.confirmNewPassword}
                      placeholder="Confirme new password"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmNewPassword}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Button variant="primary mt-4" type="submit">
                      Change Password
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
