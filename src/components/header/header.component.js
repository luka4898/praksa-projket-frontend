import React, { useState } from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import AccountView from "../account/account-view.component";

const Header = (props) => {
  const logout = async () => {
    await fetch("https://localhost:7100/api/Authenticate/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    props.setName("");
  };

  let menu;
  let menu2;
  let menu3;
  let menu4;
  if (props.role != null && props.role != undefined) {
    if (JSON.stringify(props.role).indexOf("Organizer") > -1) {
      menu3 = (
        <>
          <Nav.Link href="#">About us</Nav.Link>
          <Nav.Link href="/event">Events</Nav.Link>
          <Nav.Link href="/post">Posts</Nav.Link>
          <Nav.Link href="/manageevent">Manage Events</Nav.Link>
          <Nav.Link href="/ticket">My tickets</Nav.Link>
        </>
      );
    }
    if (JSON.stringify(props.role).indexOf("Customer") > -1) {
      menu4 = (
        <>
          <Nav.Link href="#">About us</Nav.Link>
          <Nav.Link href="/event">Events</Nav.Link>
          <Nav.Link href="/post">Posts</Nav.Link>
          <Nav.Link href="/ticket">My tickets</Nav.Link>
        </>
      );
    }
  }
  if (props.name == null || props.name == " " || props.name == "undefined") {
    menu2 = (
      <>
        {" "}
        <Nav.Link href="#">About us</Nav.Link>
        <Nav.Link href="/event">Events</Nav.Link>
        <Nav.Link href="/post">Posts</Nav.Link>
      </>
    );
    menu = (
      <>
        <Nav.Link href="/login">Sign in</Nav.Link>
        <Nav.Link href="/registrate">Registrate</Nav.Link>
      </>
    );
  } else {
    menu = (
      <>
        <NavDropdown title={props.name} id="nav-dropdown">
          <NavDropdown.Item></NavDropdown.Item>
          <AccountView></AccountView>

          <NavDropdown.Item href="/login" onClick={logout}>
            Log out
          </NavDropdown.Item>
        </NavDropdown>
      </>
    );
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Event Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {menu2}
            {menu3}
            {menu4}
          </Nav>
          <Nav>{menu}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
