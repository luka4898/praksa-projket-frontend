import React, { Component } from "react";
import { Modal, Button, Row, Col, Form, Image } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      selectedFile: [],
      clearable: true,
      showSelect: false,
      errors: {},
      form: {},
    };
  }
  fileSelectedHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };
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
    const { content, title } = this.state.form;
    const { selectedFile } = this.state;
    const newErrors = {};

    if (!title || title === "") newErrors.title = "Title of post is required!";
    if (!content || content === "") newErrors.content = "Content is required!";
    if (!selectedFile.name || selectedFile.name == "")
      newErrors.selectedFile = "Image of post is required!";
    return newErrors;
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = this.findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      this.setState({ errors: newErrors });
    } else {
      const fd = new FormData();
      fd.append(
        "postImage",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
      fd.append("title", event.target.title.value);
      fd.append("content", event.target.content.value);

      axios
        .post("https://localhost:7100/api/Posts/createpost", fd, {
          withCredentials: true,
        })

        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: response.data.message,
            button: "OK",
          });
          event.target.reset();
          this.props.refreshlist();
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.response.data.message,
            button: "OK!",
          });
        });
    }
  };

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
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Post
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={8}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      name="title"
                      onChange={(e) => this.setField("title", e.target.value)}
                      isInvalid={!!errors.title}
                      placeholder="Title"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="content">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                      name="content"
                      onChange={(e) => this.setField("content", e.target.value)}
                      isInvalid={!!errors.content}
                      placeholder="Content"
                      as="textarea"
                      row={3}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.content}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="eventImage">
                    <Form.Label>Image Path</Form.Label>
                    <Form.Control
                      type="File"
                      onChange={this.fileSelectedHandler}
                      name="eventImage"
                      isInvalid={!!errors.selectedFile}
                      placeholder="event image"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.selectedFile}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group>
                    <Button className="mt-4" variant="primary" type="submit">
                      Add Post
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

export default CreatePost;
