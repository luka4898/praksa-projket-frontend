import React, { Component } from "react";
import { Modal, Button, Row, Col, Form, Image } from "react-bootstrap";
import axios from "axios";

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      selectedFile: [],
      clearable: true,
      showSelect: false,
    };
  }
  fileSelectedHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
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
        alert("Post added successfully");
        event.target.reset();
        this.props.refreshlist();
        return response.data;
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

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
                      required
                      placeholder="Title"
                    />
                  </Form.Group>

                  <Form.Group controlId="content">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                      name="content"
                      required
                      placeholder="Content"
                      as="textarea"
                      row={3}
                    />
                  </Form.Group>


                  <Form.Group controlId="eventImage">
                    <Form.Label>Image Path</Form.Label>
                    <Form.Control
                      type="File"
                      onChange={this.fileSelectedHandler}
                      name="eventImage"
                      required
                      placeholder="event image"
                      
                    />
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
