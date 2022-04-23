import React from "react";
import { Component } from "react";
import { AccountEdit } from "./edit-account";
import { ChangePassword } from "./changepassword";
import { InfoAccount } from "../users/infoaccount";
import { useCurrentUser } from "../../CurrentUserContext";

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const myHookValue = useCurrentUser();
    return <Component {...props} myHookValue={myHookValue} />;
  };
}
class AccountView extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.state = {
      account: [],
      editModalShow: false,
      chnageModalShow: false,
      infoModalShow: false,
    };
  }

  refreshList() {
    fetch("https://localhost:7100/api/Authenticate/editaccount", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ account: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  /* componentDidUpdate(){
        this.refreshList();
    }*/

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
    const {
      account,
      id,
      username,
      firstname,
      lastname,
      email,
      address,
      phoneNumber,
    } = this.state;
    let editModalClose = () => this.setState({ editModalShow: false });
    let chnageModalClose = () => this.setState({ chnageModalShow: false });
    let infoModalClose = () => this.setState({ infoModalShow: false });
    return (
      <div className="container">
        <div class="bg-c-green counter-block m-t-10 p-20">
          <ul class="list-group">
            {this.props.myHookValue.currentUser.role[0] != "Admin" && (
              <>
                <button
                  class="list-group-item btn btn btn-light"
                  onClick={() =>
                    this.setState({
                      infoModalShow: true,
                      id: account.id,
                      username: account.userName,
                      firstname: account.firstName,
                      lastname: account.lastName,
                      email: account.email,
                      address: account.address,
                      phoneNumber: account.phoneNumber,
                    })
                  }
                >
                  Info
                </button>
                <button
                  class="list-group-item btn btn-light"
                  onClick={() =>
                    this.setState({
                      editModalShow: true,
                      id: account.id,
                      username: account.userName,
                      firstname: account.firstName,
                      lastname: account.lastName,
                      email: account.email,
                      address: account.address,
                      phoneNumber: account.phoneNumber,
                    })
                  }
                >
                  Edit
                </button>
              </>
            )}
            <button
              class="list-group-item btn btn-light"
              onClick={() =>
                this.setState({
                  chnageModalShow: true,
                  id: account.id,
                  username: account.userName,
                })
              }
            >
              Change password
            </button>
            <button
              class="list-group-item list-group-item-danger btn-outline-danger"
              onClick={() => this.deleteAccount(account.id)}
            >
              Delete
            </button>
          </ul>
        </div>

        <InfoAccount
          refreshlist={this.refreshList}
          show={this.state.infoModalShow}
          onHide={infoModalClose}
          id={id}
          username={username}
          firstname={firstname}
          lastname={lastname}
          email={email}
          address={address}
          phonenumber={phoneNumber}
        />
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
        <ChangePassword
          refreshlist={this.refreshList}
          username={username}
          show={this.state.chnageModalShow}
          onHide={chnageModalClose}
        />
      </div>
    );
  }
}
export default withMyHook(AccountView);
