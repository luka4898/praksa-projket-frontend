import React, { useState } from "react";
import { Form, Col, Button } from "react-bootstrap";

const SendNewsletters = () => {
  const [subject, setSubjet] = useState("");
  const [body, setBody] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `https://localhost:7100/api/Admin/sendnewslettertoallusers?subject=${subject}&body=${body}`,
      {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    ).then(alert("Mail successfully filled"));
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
            onChange={(e) => setSubjet(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} className="mt-2">
          <Form.Label>Body</Form.Label>
          <Form.Control
            name="body"
            as="textarea"
            rows={3}
            onChange={(e) => setBody(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary m-2" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SendNewsletters;
