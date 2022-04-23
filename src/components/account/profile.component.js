import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { AccountEdit } from "./edit-account";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.state = {
      editModalShow: false,
      isLoading: true,
      error: null,
      user: null,
    };
  }
  refreshList() {
    setTimeout(() => {
      fetch("https://localhost:7100/api/Authenticate/editaccount", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw Error("Could not fetch that resource!");
          }
          return response.json();
        })
        .then((data) => {
          this.setState({ user: data, isLoading: false, error: null });
        })
        .catch((err) => {
          this.setState({ isLoading: false, error: err.message });
        });
    }, 1000);
  }

  componentDidMount() {
    this.refreshList();
  }

  render() {
    let editModalClose = () => this.setState({ editModalShow: false });
    const {
      error,
      isLoading,
      user,
      id,
      username,
      firstname,
      lastname,
      email,
      address,
      phoneNumber,
    } = this.state;
    return (
      <>
        {error && <div className="container">{error}</div>}
        {isLoading && <div className="container">Loading...</div>}
        {user && (
          <>
            <h2 className="title">Profile</h2>
            <div className="form-horizontal">
              <fieldset className="fieldset">
                <h3 className="fieldset-title">Personal Info</h3>

                <Form.Group className="mb-2">
                  <Form.Label>User Name</Form.Label>
                  <div className="col-md-10 col-sm-9 col-xs-12">
                    <Form.Control type="text" defaultValue={user.userName} />
                  </div>
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>First Name</Form.Label>
                  <div className="col-md-10 col-sm-9 col-xs-12">
                    <Form.Control type="text" defaultValue={user.firstName} />
                  </div>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Last Name</Form.Label>
                  <div className="col-md-10 col-sm-9 col-xs-12">
                    <Form.Control type="text" defaultValue={user.lastName} />
                  </div>
                </Form.Group>
              </fieldset>
              <fieldset className="fieldset">
                <h3 className="fieldset-title">Contact Info</h3>
                <Form.Group className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <div className="col-md-10 col-sm-9 col-xs-12">
                    <Form.Control type="email" defaultValue={user.email} />
                  </div>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Phone</Form.Label>
                  <div className="col-md-10 col-sm-9 col-xs-12">
                    <Form.Control type="text" defaultValue={user.phoneNumber} />
                  </div>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Address</Form.Label>
                  <div className="col-md-10 col-sm-9 col-xs-12">
                    <Form.Control type="url" defaultValue={user.address} />
                  </div>
                </Form.Group>
              </fieldset>
              <hr />
              <Form.Group>
                <div className="col-md-10 col-sm-9 col-xs-12 col-md-push-2 col-sm-push-3 col-xs-push-0">
                  <input
                    className="btn btn-primary"
                    type="submit"
                    onClick={() =>
                      this.setState({
                        editModalShow: true,
                        id: user.id,
                        username: user.userName,
                        firstname: user.firstName,
                        lastname: user.lastName,
                        email: user.email,
                        address: user.address,
                        phoneNumber: user.phoneNumber,
                      })
                    }
                    value="Edit Profile"
                  />
                </div>
                <AccountEdit
                  refreshlist={this.refreshList}
                  show={this.state.editModalShow}
                  onHide={editModalClose}
                  id={id}
                  username={username}
                  firstname={firstname}
                  lastname={lastname}
                  email={email}
                  address={address}
                  phonenumber={phoneNumber}
                />
              </Form.Group>
            </div>
          </>
        )}{" "}
      </>
    );
  }
}

export default Profile;
