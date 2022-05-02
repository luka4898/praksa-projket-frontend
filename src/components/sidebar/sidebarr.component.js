import React, { Component } from "react";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: window.location.pathname.split("/")[1],
    };
  }
  render() {
    const loc = window.location.pathname;
    return (
      <>
        <div className="side-bar">
          <div className="user-info">
            <img
              className="img-profile img-circle img-responsive center-block"
              src="/avatarr.png"
              alt=""
            />
            <ul className="meta list list-unstyled">
              <li className="name">
                <label className="label label-info">Admin</label>
              </li>
            </ul>
          </div>
          <nav className="side-menu">
            <ul className="nav">
              <li
                className={this.state.activeMenu === "" ? "active" : " "}
                onClick={() => {
                  this.setState({ activeMenu: "" });
                }}
              >
                <a href="/">
                  <span className="bi bi-person-fill"></span> Profile
                </a>
              </li>
              <li
                className={
                  this.state.activeMenu === "allevents" ? "active" : " "
                }
                onClick={() => {
                  this.setState({ activeMenu: "allevents" });
                }}
              >
                <a href="/allevents">
                  <span className="bi bi-gear"></span> Manage events
                </a>
              </li>
              <li
                className={
                  this.state.activeMenu === "post-admin" ? "active" : " "
                }
                onClick={() => {
                  this.setState({ activeMenu: "post-admin" });
                }}
              >
                <a href="/post-admin">
                  <span className="bi bi-file-earmark-post-fill"></span> Posts
                </a>
              </li>

              <li>
                <a href="#">
                  <span className="bi bi-envelope"></span> Email
                  <span className="sub-arrow" />
                </a>
                <ul>
                  <li
                    className={
                      this.state.activeMenu === "mail" ? "active" : " "
                    }
                    onClick={() => {
                      this.setState({ activeMenu: "mail" });
                    }}
                  >
                    <a href="/mail">Send mail to organizers</a>
                  </li>
                  <li
                    className={
                      this.state.activeMenu === "newslett" ? "active" : " "
                    }
                    onClick={() => {
                      this.setState({ activeMenu: "newslett" });
                    }}
                  >
                    <a href="/newslett">Send newsletter</a>
                  </li>
                  <li
                    className={
                      this.state.activeMenu === "mailtic" ? "active" : " "
                    }
                    onClick={() => {
                      this.setState({ activeMenu: "mailtic" });
                    }}
                  >
                    <a href="/mailtic">Send mail to ticket holders</a>
                  </li>
                </ul>
              </li>

              <li
                className={this.state.activeMenu === "venue" ? "active" : " "}
                onClick={() => {
                  this.setState({ activeMenu: "venue" });
                }}
              >
                <a href="/venue">
                  <span className="bi bi-shop-window"></span> Venues
                </a>
              </li>
              <li
                className={this.state.activeMenu === "city" ? "active" : " "}
                onClick={() => {
                  this.setState({ activeMenu: "city" });
                }}
              >
                <a href="/city">
                  <span className="bi bi-building"></span> Cities
                </a>
              </li>

              <li
                className={this.state.activeMenu === "users" ? "active" : " "}
                onClick={() => {
                  this.setState({ activeMenu: "users" });
                }}
              >
                <a href="/users">
                  <span className="bi bi-people-fill"></span> Users
                </a>
              </li>
              <li
                className={
                  this.state.activeMenu === "registrateadmin" ? "active" : " "
                }
                onClick={() => {
                  this.setState({ activeMenu: "registrateadmin" });
                }}
              >
                <a href="/registrateadmin">
                  <span className="bi bi-person-plus-fill"></span> Register
                  admin
                </a>
              </li>
              <li
                className={
                  this.state.activeMenu === "registrateorg" ? "active" : " "
                }
                onClick={() => {
                  this.setState({ activeMenu: "registrateorg" });
                }}
              >
                <a href="/registrateorg">
                  <span className="bi bi-person-plus-fill"></span> Register
                  organizer
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  }
}

export default Sidebar;
