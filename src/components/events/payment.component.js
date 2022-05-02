import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import moment from "moment";
import axios from "axios";
import { useCurrentUser } from "../../CurrentUserContext";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";
function withMyHook(Component) {
  return function WrappedComponent(props) {
    const myHookValue = useCurrentUser();
    return <Component {...props} myHookValue={myHookValue} />;
  };
}
class Payment extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      eventid: this.props.eventid,
      user: this.props.myHookValue,
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
    const { cardnumber, date, cvc } = this.state.form;
    const newErrors = {};
    var pattern1 = new RegExp("(^[0-9]{15,16}$)");
    var pattern2 = new RegExp("^(0[1-9]|1[0-2])/?([0-9]{4}|[0-9]{2})$");
    var pattern3 = new RegExp("(^[0-9]{3,4}$)");
    if (!cardnumber || cardnumber === "")
      newErrors.cardnumber = "Card number is required!";
    else if (!pattern1.test(cardnumber))
      newErrors.cardnumber = "Card number must be 15 or 16 digits long!";
    if (!cvc || cvc === "") newErrors.cvc = "CVC is required!!";
    else if (!pattern3.test(cvc))
      newErrors.cvc = "CVC must be 3 or 4 digits long!";
    if (!date || date == "") newErrors.date = "Date is required!";
    else if (!pattern2.test(date)) newErrors.date = "Invalid form of date!";

    return newErrors;
  };
  handleSubmit(event) {
    if (this.state.user.authed) {
      event.preventDefault();
      const newErrors = this.findFormErrors();
      if (Object.keys(newErrors).length > 0) {
        this.setState({ errors: newErrors });
      } else {
        let fd = new FormData();
        var month = event.target.date.value.split("/")[0];
        var year = event.target.date.value.split("/")[1];
        fd.append("cardNumber", event.target.cardnumber.value);
        fd.append("month", month);
        fd.append("year", "20" + year);
        fd.append("cvc", event.target.cvc.value);
        console.log(this.props.quantity);
        axios
          .post(
            `https://localhost:7100/api/CurrentEvents/pay?eventId=${this.state.eventid}&quantity=${this.props.quantity}`,
            fd,
            {
              withCredentials: true,
            }
          )

          .then((response) => {
            if (response.data.split(" ")[0] != "Failed") {
              Swal.fire({
                icon: "success",
                title: "Success!",
                text: response.data,
                button: "OK",
              });
              event.target.reset();
              this.setState({ errors: {}, form: {} });
              this.props.fetchdata();
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: response.data,
                button: "OK!",
              });
            }
          });
      }
    } else {
      this.props.history.push("/login");
    }
  }

  render() {
    const { fetchdata, ...rest } = this.props;
    let authed = this.state.user.authed;
    const { errors } = this.state;
    return (
      <div className="container mt-4 ">
        {" "}
        <Modal
          {...rest}
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Payment
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.handleSubmit}>
            <Modal.Body style={{ background: "#eee" }}>
              <div className="row justify-content-center">
                <div className="col-lg-9">
                  <div className="accordion">
                    <div className="accordion-item mb-3">
                      <h2 className="h5 px-4 py-3 accordion-header d-flex justify-content-between align-items-center">
                        <div className="form-check w-100 collapsed">
                          <label className="form-check-label pt-1">
                            <i className="bi bi-credit-card-2-front"></i> Credit
                            Card
                          </label>
                        </div>
                      </h2>
                      <div
                        className="accordion-collapse collapse show"
                        data-bs-parent="#accordionPayment"
                      >
                        <div className="accordion-body">
                          <Form.Group controlId="cardnumber" className="mb-3">
                            <Form.Label className="form-label">
                              Card Number
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="cardnumber"
                              onChange={(e) =>
                                this.setField("cardnumber", e.target.value)
                              }
                              isInvalid={!!errors.cardnumber}
                              placeholder="Card number"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.cardnumber}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <div className="row">
                            <div className="col-lg-6">
                              <Form.Group controlId="date" className="mb-3">
                                <Form.Label className="form-label">
                                  Expiry date
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  name="date"
                                  placeholder="MM/YY"
                                  onChange={(e) =>
                                    this.setField("date", e.target.value)
                                  }
                                  isInvalid={!!errors.date}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.date}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </div>
                            <div className="col-lg-6">
                              <Form.Group controlId="cvc" className="mb-3">
                                <Form.Label className="form-label">
                                  CVC Code
                                </Form.Label>
                                <Form.Control
                                  type="password"
                                  name="cvc"
                                  placeholder="CVC"
                                  onChange={(e) =>
                                    this.setField("cvc", e.target.value)
                                  }
                                  isInvalid={!!errors.cvc}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.cvc}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3">
                  <div className="card position-sticky top-0">
                    <div className="p-3 bg-light bg-opacity-10">
                      <h6>
                        <strong className="text-dark">Order Summary</strong>
                      </h6>
                      <div className="d-flex justify-content-between mb-1 small">
                        <b>Subtotal</b>{" "}
                        <strong className="text-dark">
                          {this.props.price} BAM
                        </strong>
                      </div>
                      <div className="d-flex justify-content-between mb-1 small">
                        <b>Quantity</b>{" "}
                        <strong className="text-dark">
                          {this.props.quantity}
                        </strong>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between mb-4 small">
                        <b>TOTAL</b>{" "}
                        <strong className="text-dark">
                          {+this.props.price * +this.props.quantity} BAM
                        </strong>
                      </div>
                      <div>
                        <p>
                          For every order you get valid QR code on your email.
                          If issue occurs you can send email to admin.
                        </p>
                      </div>

                      <button
                        className="btn btn-primary w-100 mt-2"
                        type="submit"
                      >
                        Place order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Form>
          <Modal.Footer style={{ background: "#eee" }}>
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
Payment = withRouter(Payment);
export default withMyHook(Payment);
