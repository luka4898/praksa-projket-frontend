import React, { useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const SendNewsletters = () => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };
  const findFormErrors = () => {
    const { body, subject } = form;
    const newErrors = {};
    if (!body || body == "") newErrors.body = "Body is required!";
    if (!subject || subject == "") newErrors.subject = "Subject is required!";
    return newErrors;
  };

  const submit = async (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const res = await fetch(
        `https://localhost:7100/api/Admin/sendnewslettertoallusers?subject=${form.subject}&body=${form.body}`,
        {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
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
              title: "Success!",
              text: response.message,
              button: "OK",
            });
            e.target.reset();
            setErrors({});
            setForm({});
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
  };
  return (
    <div className="container px-4 mt-4">
      <nav className="nav nav-borders">
        <h5 className="custom-header">Send newsletter to all users</h5>
      </nav>
      <hr className="mt-0 mb-4" />

      <Form onSubmit={submit}>
        <Form.Group as={Col}>
          <Form.Label>Subject</Form.Label>
          <Form.Control
            name="subject"
            type="input"
            placeholder="Subject"
            onChange={(e) => setField("subject", e.target.value)}
            isInvalid={!!errors.subject}
          />
          <Form.Control.Feedback type="invalid">
            {errors.subject}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} className="mt-2">
          <Form.Label>Body</Form.Label>
          <Form.Control
            name="body"
            as="textarea"
            rows={3}
            onChange={(e) => setField("body", e.target.value)}
            isInvalid={!!errors.body}
          />
          <Form.Control.Feedback type="invalid">
            {errors.body}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary m-2" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SendNewsletters;
