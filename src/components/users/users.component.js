import React, { Component } from "react";
import { Button, ButtonToolbar, Table, Card } from "react-bootstrap";
import { InfoAccount } from "./infoaccount";
import { AddAcountOrg } from "./addorg";
import { RemoveOrg } from "./removeorg";
class Users extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.state = {
      customers: [],
      addModalShow: false,
      infoModalShow: false,
      organizers: [],
      organizersWithoutFilter: [],
      organizerNameFilter: "",
      firstName: "",
      accountNameFilter: "",
      accountWithoutFilter: [],
    };
  }

  FiterFnCustomers() {
    var accountNameFilter = this.state.accountNameFilter;
    console.log(this.state.accountWithoutFilter);
    var filteredData = this.state.accountWithoutFilter.filter(function (el) {
      return el.userName
        .toString()
        .toLowerCase()
        .includes(accountNameFilter.toString().trim().toLowerCase());
    });
    this.setState({ customers: filteredData });
  }
  FiterFnOrganizers() {
    var organizerNameFilter = this.state.organizerNameFilter;
    console.log(this.state.organizersWithoutFilter);
    var filteredData = this.state.organizersWithoutFilter.filter(function (el) {
      return el.userName
        .toString()
        .toLowerCase()
        .includes(organizerNameFilter.toString().trim().toLowerCase());
    });
    this.setState({ organizers: filteredData });
  }
  refreshList = async () => {
    try {
      const [customers1, organizers1] = await Promise.all([
        fetch("https://localhost:7100/api/Admin/listcustomers", {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }),
        fetch("https://localhost:7100/api/Admin/listorganizers", {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }),
      ]);
      const customers = await customers1.json();
      const organizers = await organizers1.json();

      this.setState({
        customers: customers,
        organizers: organizers,
        accountWithoutFilter: customers,
        organizersWithoutFilter: organizers,
      });
    } catch (err) {
      throw err;
    }
  };

  changeAccountNameFilterCustomers = (e) => {
    this.state.accountNameFilter = e.target.value;
    this.FiterFnCustomers();
  };
  changeAccountNameFilterOrganizers = (e) => {
    this.state.organizerNameFilter = e.target.value;
    this.FiterFnOrganizers();
  };
  componentDidMount() {
    this.refreshList();
  }

  deleteAccount(accountid) {
    if (window.confirm("Are you sure?")) {
      fetch(
        "https://localhost:7100/api/Authenticate/deleteaccount?id=" + accountid,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      ).then((result) => {
        alert(result);
        this.refreshList();
      });
    }
  }
  render() {
    const { customers, userName, phoneNumber, address, email, organizers } =
      this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    let removeModalClose = () => this.setState({ removeModalShow: false });
    let infoModalClose = () => this.setState({ infoModalShow: false });

    return (
      <div className="container px-4 mt-4">
        <nav className="nav nav-borders">
          <h5 className="custom-header">Customers</h5>
        </nav>
        <hr className="mt-0 mb-4" />
        <div className="row">
          <div className="col-xl-12">
            <Card className="mb-4 h-100">
              <Card.Body>
                <div className="d-flex">
                  <input
                    className="form-control m-2"
                    onChange={this.changeAccountNameFilterCustomers}
                    placeholder="Filter"
                  />
                </div>
                <Table className="mt-4" bordered hover size="sm">
                  <thead>
                    <tr className="text-center">
                      <th>Username</th>
                      <th>Name</th>
                      <th>Last Name</th>
                      <th>Mail</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((ac) => (
                      <tr key={ac.id} className="text-center align-middle">
                        <td>{ac.userName}</td>
                        <td>{ac.firstName}</td>
                        <td>{ac.lastName}</td>
                        <td>{ac.email}</td>

                        <td>
                          <ButtonToolbar className="d-flex justify-content-center">
                            <Button
                              className="m-2"
                              variant="info"
                              onClick={() =>
                                this.setState({
                                  infoModalShow: true,
                                  email: ac.email,
                                  phoneNumber: ac.phoneNumber,
                                  userName: ac.userName,
                                  address: ac.address,
                                })
                              }
                            >
                              Info
                            </Button>
                            <Button
                              className="m-2"
                              variant="info"
                              onClick={() =>
                                this.setState({
                                  addModalShow: true,
                                  email: ac.email,
                                })
                              }
                            >
                              Add to org
                            </Button>
                            <Button
                              className="m-2"
                              variant="danger"
                              onClick={() => this.deleteAccount(ac.id)}
                            >
                              Delete
                            </Button>
                            <InfoAccount
                              show={this.state.infoModalShow}
                              onHide={infoModalClose}
                              email={email}
                              username={userName}
                              address={address}
                              phonenumber={phoneNumber}
                            />
                            <AddAcountOrg
                              show={this.state.addModalShow}
                              onHide={addModalClose}
                              email={email}
                              refreshlist={this.refreshList}
                            />
                          </ButtonToolbar>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
        </div>{" "}
        <nav className="nav nav-borders mt-4">
          <h5 className="custom-header">Organizers</h5>
        </nav>
        <hr className="mt-0 mb-4" />
        <div className="row">
          <div className="col-xl-12">
            <Card className="mb-4 h-100">
              <Card.Body>
                <div className="d-flex">
                  <input
                    className="form-control m-2"
                    onChange={this.changeAccountNameFilterOrganizers}
                    placeholder="Filter"
                  />
                </div>
                <Table className="mt-4" bordered hover size="sm">
                  <thead>
                    <tr className="text-center ">
                      <th>Username</th>
                      <th>Name</th>
                      <th>Last Name</th>
                      <th>Mail</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizers.map((or) => (
                      <tr key={or.id} className="text-center align-middle">
                        <td>{or.userName}</td>
                        <td>{or.firstName}</td>
                        <td>{or.lastName}</td>
                        <td>{or.email}</td>
                        <td>
                          <ButtonToolbar className="d-flex justify-content-center">
                            <Button
                              className="m-2"
                              variant="info"
                              onClick={() =>
                                this.setState({
                                  infoModalShow: true,
                                  address: or.address,
                                  phoneNumber: or.phoneNumber,
                                  userName: or.userName,
                                  email: or.email,
                                })
                              }
                            >
                              Info
                            </Button>
                            <Button
                              className="m-2"
                              variant="info"
                              onClick={() =>
                                this.setState({
                                  removeModalShow: true,
                                  email: or.email,
                                })
                              }
                            >
                              Remove from org
                            </Button>
                            <Button
                              className="m-2"
                              variant="danger"
                              onClick={() => this.deleteAccount(or.id)}
                            >
                              Delete
                            </Button>
                            <InfoAccount
                              show={this.state.infoModalShow}
                              onHide={infoModalClose}
                              email={email}
                              username={userName}
                              address={address}
                              phonenumber={phoneNumber}
                            />
                            <RemoveOrg
                              show={this.state.removeModalShow}
                              onHide={removeModalClose}
                              email={email}
                              refreshlist={this.refreshList}
                            />
                          </ButtonToolbar>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default Users;
